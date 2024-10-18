import { i18n } from "@/main";

interface ComposeTitleOptions {
  /** Pass raw text instead of translation token */
  raw?: boolean
}
export function composeTitle(prependText: string | undefined, options: ComposeTitleOptions = {}) {
  let title = i18n.global.t("router.title");
  if (prependText) {
    if (!options.raw) prependText = i18n.global.t(prependText);
    title = `${prependText} | ${title}`;
  }
  return title;
}
