/// <reference types="vite/client" />

declare module "*.vue" {
  import { type ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

interface ImportMetaEnv {
  readonly __COMMIT_HASH__: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
