const STORAGE = window.localStorage;

export const setItem = (item, value) => {
  STORAGE.setItem(item, value);
};

export const getItem = (item) => {
  return STORAGE.getItem(item);
};

export const removeItem = (item) => {
  STORAGE.removeItem(item);
};
