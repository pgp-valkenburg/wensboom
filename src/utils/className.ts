export const className = (classes: Record<string, boolean>): string =>
  Object.entries(classes)
    .reduce<string[]>(
      (result, [key, value]) => (value ? result.concat(key) : result),
      []
    )
    .join(" ");
