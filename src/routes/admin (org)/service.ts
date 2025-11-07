import db from "@/src/utils/db";
import { Static } from "elysia";
import {
  createOrgBodySchema,
  updateOrgBodySchema,
} from "./schemas/request-body";
import ApiError from "@/src/utils/global-error";
import {
  adminDeleteOrgQueryParamsSchema,
  adminListOrgsQueryParamsSchema,
  adminListPaymentsQueryParamsSchema,
  orgSelectQueryParamsSchema,
} from "./schemas/query-params";
import { SubscriptionStatus } from "@/prisma/prismabox/SubscriptionStatus";
import crypto from "crypto";

export const adminListAllOrgsService = async (
  params: Static<typeof adminListOrgsQueryParamsSchema>
) => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const where = {
    id: params.id,
    slug: params.slug,
    email: params.email,
  };

  const [orgs, total] = await Promise.all([
    db.organization.findMany({
      where,
      include: {
        subscription: {
          include: {
            plan: true,
          },
        },
      },
      skip,
      take: limit,
    }),
    db.organization.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "All organizations listed successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      orgs,
    },
  };
};

export const adminCreateOrgService = async (
  body: Static<typeof createOrgBodySchema>
) => {
  const check = await db.organization.findUnique({
    where: {
      slug: body.slug,
    },
  });
  if (check?.id)
    throw new ApiError("Organization with this slug already exists");

  if (body.planId) {
    const plan = await db.plan.findUnique({
      where: { id: body.planId },
    });
    if (!plan?.id) throw new ApiError("Plan with this id doesnt exist");
  }

  const newOrg = await db.organization.create({
    data: {
      name: body.name,
      description: body.description,
      phoneNumber: body.phoneNumber,
      email: body.email,
      googleMapsLink: body.googleMapsLink,
      socialMedia: body.socialMedia || [],
      slug: body.slug,
      logoImgUrl: body.logoImgUrl,
      subscription: body.planId
        ? {
            create: {
              planId: body.planId,
              status: "Inactive",
            },
          }
        : undefined,
    },
    include: {
      subscription: {
        include: {
          plan: true,
        },
      },
    },
  });

  if (!newOrg?.id)
    throw new ApiError("Issue happened while trying to add this organization");

  return {
    success: true,
    message: "Created new organization successfully",
    data: newOrg,
  };
};

export const adminUpdateOrgService = async (
  params: Static<typeof orgSelectQueryParamsSchema>,
  body: Static<typeof updateOrgBodySchema>
) => {
  const org = await db.organization.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
    include: {
      subscription: true,
    },
  });

  if (!org?.id)
    throw new ApiError("Organization with this slug/id doesnt exist");

  if (body.slug) {
    const existingSlugOrg = await db.organization.findUnique({
      where: {
        slug: body.slug,
      },
    });

    if (existingSlugOrg && existingSlugOrg.id !== org.id) {
      throw new ApiError("Organization with this slug already exists");
    }
  }

  if (body.planId) {
    const plan = await db.plan.findUnique({
      where: { id: body.planId },
    });
    if (!plan?.id) throw new ApiError("Plan with this id doesnt exist");
  }

  const updateData: any = {};
  if (body.name) updateData.name = body.name;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.phoneNumber !== undefined) updateData.phoneNumber = body.phoneNumber;
  if (body.email !== undefined) updateData.email = body.email;
  if (body.googleMapsLink !== undefined)
    updateData.googleMapsLink = body.googleMapsLink;
  if (body.socialMedia !== undefined) updateData.socialMedia = body.socialMedia;
  if (body.slug) updateData.slug = body.slug;
  if (body.logoImgUrl !== undefined) updateData.logoImgUrl = body.logoImgUrl;

  if (body.planId !== undefined) {
    if (org.subscription) {
      updateData.subscription = {
        update: {
          planId: body.planId,
        },
      };
    } else {
      updateData.subscription = {
        create: {
          planId: body.planId,
          status: "Inactive",
        },
      };
    }
  }

  const updating = await db.organization.update({
    where: { id: org.id },
    data: updateData,
    include: {
      subscription: {
        include: {
          plan: true,
        },
      },
    },
  });

  if (!updating?.id)
    throw new ApiError("Issue happened while trying to update organization");

  return {
    success: true,
    message: "Organization updated successfully",
    data: updating,
  };
};

export const adminDeleteOrgService = async (
  params: Static<typeof adminDeleteOrgQueryParamsSchema>
) => {
  const org = await db.organization.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
  });
  if (!org?.id)
    throw new ApiError("Organization with this slug/id doesnt exist");

  const deleting = await db.organization.delete({
    where: { id: org.id },
  });
  if (!deleting?.id)
    throw new ApiError("Issue happened while trying to delete organization");

  return {
    success: true,
    message: "Organization deleted successfully",
    data: null,
  };
};

export const adminShowOrgService = async (
  params: Static<typeof orgSelectQueryParamsSchema>
) => {
  if (!params.id && !params.slug)
    throw new ApiError("Please provide id or slug of the organization");

  const org = await db.organization.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
    },
    include: {
      subscription: {
        include: {
          plan: true,
        },
      },
    },
  });
  if (!org?.id)
    throw new ApiError("Organization with this slug/id doesnt exist");

  return {
    success: true,
    message: "Organization details fetched successfully",
    data: org,
  };
};

export const adminCreatePaymentLinkService = async (organizationId: string) => {
  const subscription = await db.subscription.findUnique({
    where: { organizationId },
    include: { plan: true },
  });

  if (!subscription)
    throw new ApiError("Organization does not have a subscription");

  const periodStart = new Date();
  const periodEnd = new Date();
  periodEnd.setMonth(periodEnd.getMonth() + 1);

  const referenceId = `sub-${subscription.id}-${Date.now()}`;

  const toIQDInt = (v: unknown) => {
    const n =
      typeof v === "number"
        ? v
        : typeof v === "bigint"
          ? Number(v)
          : v && typeof (v as any).toNumber === "function"
            ? (v as any).toNumber()
            : Number(v);
    if (!Number.isFinite(n)) throw new ApiError("Invalid plan price");
    return Math.max(1000, Math.round(n));
  };

  const amountIQD = toIQDInt(subscription.plan.price);

  const waylResponse = await fetch(`${Bun.env.WAYL_API_URL}/api/v1/links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WAYL-AUTHENTICATION": Bun.env.WAYL_API_KEY!,
    },
    body: JSON.stringify({
      referenceId,
      total: amountIQD,
      currency: "IQD",
      lineItem: [
        {
          label: `${(subscription.plan as any)?.name?.en || (subscription.plan as any)?.name || "Plan"}`,
          amount: amountIQD,
          type: "increase",
          image:
            "https://img.freepik.com/free-photo/3d-hand-making-cashless-payment-from-smartphone_107791-16609.jpg?w=740&q=80",
        },
      ],
      webhookUrl: `${Bun.env.BACKEND_URL}/webhooks/wayl`,
      webhookSecret: Bun.env.WAYL_WEBHOOK_SECRET!,
      redirectionUrl: `${Bun.env.FRONTEND_URL}/payment/success`,
    }),
  });

  if (!waylResponse.ok) {
    const errorText = await waylResponse.text();
    throw new ApiError(`Wayl API error: ${errorText}`);
  }

  const { data: linkData } = await waylResponse.json();

  const payment = await db.payment.create({
    data: {
      amount: amountIQD,
      paidAt: new Date(),
      periodStart,
      periodEnd,
      subscriptionId: subscription.id,
      waylReferenceId: linkData.referenceId,
      waylLinkId: linkData.id,
      waylStatus: "Pending",
      isPaid: false,
      notes: `Wayl: ${amountIQD} IQD`,
    },
  });

  return {
    success: true,
    message: "Payment link created",
    data: {
      paymentId: payment.id,
      paymentUrl: linkData.url,
      amount: amountIQD,
      currency: "IQD",
      expiresAt: periodEnd,
    },
  };
};

function verifyWebhookSignature(
  data: string,
  signature: string,
  secret: string
) {
  const calculatedSignature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature, "hex");
  const calculatedSignatureBuffer = Buffer.from(calculatedSignature, "hex");

  if (signatureBuffer.length !== calculatedSignatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(signatureBuffer, calculatedSignatureBuffer);
}

export const handleWaylWebhookService = async (
  rawBody: string,
  signature: string | undefined
) => {
  const secret = Bun.env.WAYL_WEBHOOK_SECRET;

  if (!secret) {
    throw new ApiError("Webhook secret is not configured.");
  }
  if (!signature) {
    throw new ApiError("No signature provided.");
  }

  const isVerified = verifyWebhookSignature(rawBody, signature, secret);

  if (!isVerified) {
    throw new ApiError("Invalid webhook signature.");
  }

  const webhookData = JSON.parse(rawBody);

  const { referenceId, paymentStatus, completedAt } = webhookData;

  if (paymentStatus !== "Completed") {
    return {
      success: true,
      message: `Webhook received but payment not completed. Status: ${paymentStatus || "Unknown"}`,
      data: null,
    };
  }

  const payment = await db.payment.findFirst({
    where: { waylReferenceId: referenceId },
    include: { subscription: true },
  });

  if (!payment) {
    throw new ApiError(`Payment not found for reference: ${referenceId}`);
  }

  if (payment.isPaid) {
    return {
      success: true,
      message: "Payment already processed",
      data: null,
    };
  }

  await db.payment.update({
    where: { id: payment.id },
    data: {
      isPaid: true,
      waylStatus: "Completed",
      paidAt: completedAt ? new Date(completedAt) : new Date(),
    },
  });

  await db.subscription.update({
    where: { id: payment.subscriptionId },
    data: {
      status: SubscriptionStatus.ACTIVE,
      endsAt: payment.periodEnd,
    },
  });

  return {
    success: true,
    message: "Payment processed and subscription activated",
    data: null,
  };
};

export const adminListPaymentsService = async (
  params: Static<typeof adminListPaymentsQueryParamsSchema>
) => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const subscription = await db.subscription.findUnique({
    where: { organizationId: params.organizationId },
  });

  if (!subscription) {
    throw new ApiError("Organization does not have a subscription");
  }

  const where = {
    subscriptionId: subscription.id,
    ...(params.isPaid !== undefined && { isPaid: params.isPaid }),
  };

  const [payments, total] = await Promise.all([
    db.payment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.payment.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "Payment history fetched successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      payments,
    },
  };
};
