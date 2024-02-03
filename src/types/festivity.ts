export interface BaseEntry {
  name: string
  description: string
}

export interface DataEntry extends BaseEntry {
  date: string
  image?: string
}

export type SingleEntry<T extends object | string> = Record<string, T>;
export type NestedEntry<T extends object | string> = Record<string, SingleEntry<T>>;
