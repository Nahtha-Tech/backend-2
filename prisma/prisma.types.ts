export {};

declare global {
  namespace PrismaJson {
    type LocalString = {
      en?: string;
      ar?: string;
      ku?: string;
      tr?: string;
      [key: string]: string | undefined;
    };

    type SocialMediaLink = {
      label: string;
      type:
        | "instagram"
        | "facebook"
        | "twitter"
        | "tiktok"
        | "youtube"
        | "linkedin"
        | "whatsapp";
      link: string;
    };

    type ItemVariantOption = {
      label: LocalString;
      priceModifier: string;
      isDefault?: boolean;
      imageUrl?: string;
      color?: string;
    };

    type ItemVariantGroup = {
      name: LocalString;
      required: boolean;
      allowMultiple: boolean;
      options: ItemVariantOption[];
    };
  }
}
