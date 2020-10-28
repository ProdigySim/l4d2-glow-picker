export function isDefined<T extends {}>(item: T | undefined): item is T {
  return typeof item !== "undefined";
}
