export async function asyncMap<T>(items: T[], callback: (item: T) => T) {
  const result = [];
  for (const item of items) {
    const newItem = await callback(item);
    result.push(newItem);
  }
  return result;
}

export async function asyncForEach<T>(items: T[], callback: (item: T) => void) {
  for (const item of items) {
    await callback(item);
  }
}
