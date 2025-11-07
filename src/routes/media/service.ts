import { UTApi } from "uploadthing/server";
import ApiError from "@/src/utils/global-error";
import sharp from "sharp";
import db from "@/src/utils/db";

const utapi = new UTApi({});

const optimizeImage = async (file: File): Promise<Buffer> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let optimized = sharp(buffer);
  const metadata = await optimized.metadata();

  if (metadata.width && metadata.width > 1920) {
    optimized = optimized.resize(1920, null, {
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  const optimizedBuffer = await optimized
    .webp({ quality: 80, effort: 6 })
    .toBuffer();

  if (optimizedBuffer.length > 500 * 1024) {
    return await sharp(buffer)
      .resize(1920, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality: 60, effort: 6 })
      .toBuffer();
  }

  return optimizedBuffer;
};

export const uploadMediaService = async (
  file: File,
  uploadType: string,
  entityId: string,
  organizationId: string
) => {
  const validTypes = ["categoryImage", "itemImage", "orgLogo", "avatarImage"];

  if (!validTypes.includes(uploadType)) {
    throw new ApiError("Invalid upload type");
  }

  if (!file.type.startsWith("image/")) {
    throw new ApiError("Only image files are allowed");
  }

  // Check media limit BEFORE uploading
  const subscription = await db.subscription.findUnique({
    where: { organizationId },
    include: { plan: true },
  });

  if (!subscription) throw new ApiError("Organization has no subscription");

  const currentMediaCount = await db.media.count({
    where: { organizationId },
  });

  if (currentMediaCount >= subscription.plan.maxMedia) {
    throw new ApiError(
      `Plan limit reached. Your plan allows ${subscription.plan.maxMedia} media files. Upgrade to add more.`
    );
  }

  try {
    const optimizedBuffer = await optimizeImage(file);
    const customName = `${entityId}.webp`;

    const optimizedFile = new File(
      [new Uint8Array(optimizedBuffer)],
      customName,
      {
        type: "image/webp",
      }
    );

    const response = await utapi.uploadFiles(optimizedFile);

    if (!response.data) {
      throw new ApiError(
        `Upload failed: ${response.error?.message || "Unknown error"}`
      );
    }

    const media = await db.media.create({
      data: {
        url: response.data.url,
        key: response.data.key,
        name: response.data.name,
        size: response.data.size,
        originalSize: file.size,
        originalName: file.name,
        type: uploadType as any,
        entityId,
        organizationId,
      },
    });

    return {
      success: true,
      message: "File uploaded successfully",
      data: media,
    };
  } catch (error: any) {
    throw new ApiError(`Failed to upload file: ${error.message}`);
  }
};

export const deleteMediaService = async (
  mediaId: string,
  organizationId: string
) => {
  const media = await db.media.findFirst({
    where: { id: mediaId, organizationId },
  });

  if (!media?.id) throw new ApiError("Media not found");

  await utapi.deleteFiles(media.key);

  await db.media.delete({ where: { id: media.id } });

  return {
    success: true,
    message: "Media deleted successfully",
    data: null,
  };
};