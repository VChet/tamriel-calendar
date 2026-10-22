import slugify from "@sindresorhus/slugify";
import { i18n } from "@/plugins/i18n";

export function composeTitle(prependText?: string) {
  let title = i18n.global.t("router.title");
  if (prependText) title = `${prependText} | ${title}`;
  return title;
}

export function composeSlug(name: string): string {
  return slugify(name);
}

export function findBySlug<T extends { slug: string }>(entries: Iterable<T>, slug: string): T | undefined {
  return Array.from(entries).find((entry) => entry.slug === slug);
}
