/// <reference types="vite/client" />

declare module "*.vue" {
  import type { ComponentOptions } from "vue";

  const Component: ComponentOptions;
  export default Component;
}

interface ImportMetaEnv {
  readonly VITE_GIT_COMMIT_HASH: string
  readonly VITE_GIT_COMMIT_DATE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
