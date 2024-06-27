type StoreValue<T> = {
  value: T;
  expiresAt: number | null;
};

interface Store {
  strings: Record<string, StoreValue<string>>;
  lists: Record<string, StoreValue<string[]>>;
  sets: Record<string, StoreValue<Set<string>>>;
  hashes: Record<string, StoreValue<Record<string, string>>>;
}

export const store: Store = {
  strings: {},
  lists: {},
  sets: {},
  hashes: {}
};
