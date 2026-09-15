import type {
  CollectionTranslation,
  EditorialTranslation,
  Locale,
  ProductTranslation,
  Product,
  SeoContent,
  PostTranslation,
} from "./schemas";

export type ImageAsset = { id: string; src: string; width: number; height: number; alt: string };
export type SiteLink = { id: string; label: string; href: string };
export type AlternatePaths = Record<Locale, string>;
export type RouteData = { path: string; alternates: AlternatePaths; breadcrumbs: SiteLink[] };
export type ProductCardModel = Pick<ProductTranslation, "name" | "subtitle" | "summary"> & {
  id: string;
  href: string;
  image: ImageAsset;
  alternateImage: ImageAsset | null;
  categoryId: string;
  materialIds: string[];
  collectionIds: string[];
  sortOrder: number;
};
export type ProductModel = ProductCardModel &
  ProductTranslation & {
    gallery: ImageAsset[];
    dimensions: Product["dimensions"];
    collections: SiteLink[];
    related: ProductCardModel[];
  };
export type CollectionModel = CollectionTranslation & {
  id: string;
  href: string;
  hero: ImageAsset;
  products: ProductCardModel[];
};
export type CollectionCardModel = Pick<
  CollectionModel,
  "id" | "href" | "hero" | "name" | "title" | "description"
>;
export type EditorialModel = EditorialTranslation & {
  id: string;
  hero: ImageAsset;
  sectionIds: string[];
};
export type PostCardModel = Pick<PostTranslation, "title" | "excerpt"> & {
  id: string;
  href: string;
  cover: ImageAsset;
  publishedAt: string;
};
export type PostModel = PostCardModel & {
  seo: SeoContent;
  html: string;
  headings: { id: string; title: string }[];
  readingMinutes: number;
  author: { type: "Person" | "Organization"; name: string; url?: string };
  related: ProductCardModel[];
};
export type ShellData = {
  logo: ImageAsset;
  fallback: ImageAsset;
  socialImage: ImageAsset;
  primaryLinks: SiteLink[];
  footerLinks: SiteLink[];
  store: {
    email: string;
    phoneDisplay: string;
    phoneHref: string | null;
    directionsUrl: string;
    geo: { latitude: number; longitude: number };
    openingHours: { days: string[]; opens: string; closes: string }[];
  };
};
export type BasePageProps = { locale: Locale; shell: ShellData; route: RouteData };
export type CatalogOptions = {
  categories: SiteLink[];
  materials: SiteLink[];
  collections: SiteLink[];
};
