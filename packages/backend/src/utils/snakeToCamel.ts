/**
 * スネークケースをキャメルケースに変換するヘルパー関数
 * @param obj - The object to convert.
 * @returns The converted object.
 */
export function snakeToCamel<T, U = T>(obj: T): U {
  if (typeof obj !== "object" || obj === null || obj instanceof Date) {
    return obj as unknown as U;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamel) as U;
  }

  // オブジェクトの場合
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [
        key.replace(/_([a-z0-9])/g, (_, letter) => letter.toUpperCase()),
        snakeToCamel(value),
      ];
    })
  ) as U;
}
