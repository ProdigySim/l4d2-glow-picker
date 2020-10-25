import { PojoMap } from "pojo-maps";

export type Normalized<T extends {}, U extends PropertyKey> = {
  byId: PojoMap<U, T>;
  orderedIds: U[];
};

export function normalize<T extends {}, U extends PropertyKey>(
  data: T[],
  indexFn: (item: T) => U
) {
  return {
    byId: PojoMap.fromIndexing(data, indexFn),
    orderedIds: data.map(indexFn),
  } as const;
}

export const Normalized = {
  getOrdered: <T extends {}, U extends PropertyKey>(store: Normalized<T, U>) =>
    store.orderedIds.map((id) => PojoMap.get(store.byId, id)!),
};
