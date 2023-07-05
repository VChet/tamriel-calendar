import { ref } from "vue";

const MIN_INTERVAL = 24 * 60 * 60 * 1000;
const registration = ref<ServiceWorkerRegistration | null>(null);

async function isActive(tag: string) {
  if (!registration.value) registration.value = await navigator.serviceWorker.ready;
  const tags: string[] = await registration.value.periodicSync.getTags();
  return tags.includes(tag);
}

async function register(tag: string, minInterval = MIN_INTERVAL) {
  if (!registration.value) registration.value = await navigator.serviceWorker.ready;
  return registration.value.periodicSync.register(tag, { minInterval });
}

async function unregister(tag: string) {
  if (!registration.value) registration.value = await navigator.serviceWorker.ready;
  return registration.value.periodicSync.unregister(tag);
}

export function usePeriodicSync(tag: string) {
  return {
    isActive: () => isActive(tag),
    register: () => register(tag),
    unregister: () => unregister(tag)
  };
}
