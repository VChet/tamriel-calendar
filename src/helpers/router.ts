import { i18n } from "@/plugins/i18n";

export function composeTitle(prependText?: string) {
  let title = i18n.global.t("router.title");
  if (prependText) title = `${prependText} | ${title}`;
  return title;
}
