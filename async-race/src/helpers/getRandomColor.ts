import { getRandomNumber } from './getRandomNumber';

export const getRandomColor = (): string => {
  const colorArr = [
    getRandomNumber(16).toString(16),
    getRandomNumber(16).toString(16),
    getRandomNumber(16).toString(16),
    getRandomNumber(16).toString(16),
    getRandomNumber(16).toString(16),
    getRandomNumber(16).toString(16),
  ];

  console.log(colorArr);

  return `#${colorArr.join('')}`;
};
