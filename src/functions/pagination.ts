import { Data } from "../types/type";

const LIMIT = 50;

export const pagination = (array: Data[], currentNumber: number) => {
  const currentDataArray = array.slice(
    LIMIT * (currentNumber - 1),
    LIMIT * currentNumber
  );
  return currentDataArray;
};

export const totalPageNumber = (array: Data[]) => {
  const totalNumber = Math.ceil(array.length / LIMIT);
  return totalNumber;
};
