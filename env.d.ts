/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GIT_COMMIT_HASH: string
  readonly VITE_GIT_COMMIT_DATE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface SyncManager {
  register: (tag: string, options?: { minInterval: number }) => Promise<undefined>
  unregister: (tag: string) => Promise<void>
  getTags: (() => Promise<string[]>) & (() => Promise<string[]>)
}

interface ServiceWorkerRegistration {
  readonly sync: SyncManager
  readonly periodicSync: SyncManager
}

interface SyncEvent extends ExtendableEvent {
  readonly lastChance: boolean
  readonly tag: string
}

interface ServiceWorkerGlobalScopeEventMap {
  sync: SyncEvent
  periodicSync: SyncEvent
}
