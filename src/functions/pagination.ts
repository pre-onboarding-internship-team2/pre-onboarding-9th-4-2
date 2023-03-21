import { Data } from "../types/type";

const LIMIT = 50;

export const sortArray = (array: Data[], string: string | null) => {
  switch (string) {
    case "id_asc":
      array.sort((a, b) => a.id - b.id);
      return array;
    case "id_des":
      array.sort((a, b) => b.id - a.id);
      return array;
    case "status_false":
      array.sort((a, b) => (a.status === b.status ? 0 : a.status ? 1 : -1));
      return array;
    case "status_true":
      array.sort((a, b) => (a.status === b.status ? 0 : a.status ? -1 : 1));
      return array;
    case "date_asc":
      array.sort(
        (a, b) =>
          new Date(a.transaction_time).getTime() -
          new Date(b.transaction_time).getTime()
      );

      return array;
    case "date_des":
      array.sort(
        (a, b) =>
          new Date(b.transaction_time).getTime() -
          new Date(a.transaction_time).getTime()
      );
      return array;
    default:
      return array;
  }
};

export const pagination = (
  array: Data[],
  currentNumber: number,
  sort: string | null,
  keyword: string | null
) => {
  if (keyword !== null) {
    const currentDataArray = sortArray(array, sort)
      .filter((item: Data) => item.customer_name.includes(keyword))
      .slice(LIMIT * (currentNumber - 1), LIMIT * currentNumber);
    return currentDataArray;
  }
  const currentDataArray = sortArray(array, sort).slice(
    LIMIT * (currentNumber - 1),
    LIMIT * currentNumber
  );
  return currentDataArray;
};

export const totalPageNumber = (array: Data[], keyword: string | null) => {
  if (keyword !== null) {
    const filteredArray = array.filter((item: Data) =>
      item.customer_name.includes(keyword)
    );
    const totalNumber = Math.ceil(filteredArray.length / LIMIT);
    return totalNumber;
  }
  const totalNumber = Math.ceil(array.length / LIMIT);
  return totalNumber;
};
