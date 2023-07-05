/// <reference types="vite/client" />

declare module "*.vue" {
  import { type ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

interface ImportMetaEnv {
  readonly VITE_GIT_COMMIT_HASH: string;
  readonly VITE_GIT_COMMIT_DATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface SyncManager {
  getTags(): Promise<string[]>;
  register(tag: string, options?: { minInterval: number }): Promise<undefined>;
  unregister(tag: string): Promise<void>;
  getTags(): Promise<Array<string>>;
}

interface ServiceWorkerRegistration {
  readonly sync: SyncManager;
  readonly periodicSync: SyncManager;
}

interface SyncEvent extends ExtendableEvent {
  readonly lastChance: boolean;
  readonly tag: string;
}

interface ServiceWorkerGlobalScopeEventMap {
  sync: SyncEvent;
  periodicSync: SyncEvent;
}
