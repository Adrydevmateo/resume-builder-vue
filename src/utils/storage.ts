export const addToStorage = (
  type: "session" | "local",
  id: string,
  value: any,
) => {
  if (type === "session") sessionStorage[id] = value;
  else localStorage[id] = value;
};

export const getFromStorage = (type: "session" | "local", id: string) => {
  let result = type === "session" ? sessionStorage[id] : localStorage[id];
  if (result) result = JSON.parse(result);
  return result;
};
