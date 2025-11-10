/* eslint-disable prettier/prettier */
export const setAtPath = (obj: Record<string, any>, path: string, val: any) => {
  const keys = path.split(".");
  // shallow clone root
  const res: Record<string, any> = Array.isArray(obj)
    ? [...(obj as any)]
    : { ...obj };
  let cur: any = res;

  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const isLast = i === keys.length - 1;

    if (isLast) {
      cur[k] = val;
    } else {
      const next = cur[k];

      if (typeof next === "object" && next !== null) {
        cur[k] = Array.isArray(next) ? [...next] : { ...next };
      } else {
        cur[k] = {};
      }

      cur = cur[k];
    }
  }

  return res;
};