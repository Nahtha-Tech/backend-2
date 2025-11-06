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
  }
}
