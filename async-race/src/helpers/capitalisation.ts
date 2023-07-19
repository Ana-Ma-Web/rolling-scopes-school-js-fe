export const capitalisation = (str: string): string => {
  const arr = str.split('');
  arr[0] = arr[0].toUpperCase();
  return arr.join('');
};
