export const setStorage = (name: string, value: any) => {
  if (typeof window !== undefined) {
    localStorage.setItem(name, value);
  }
  return;
};

export const getStorage = (name: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(name);
    return item;
  }
  return `[]`;
};

export const removeStorage = (name: string) => {
  if (typeof window !== undefined) {
    localStorage.removeItem(name);
  }
  return;
};
