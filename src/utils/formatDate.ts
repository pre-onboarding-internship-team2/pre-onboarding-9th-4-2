/** yyyy-mm-dd 형태로 반환 */
export function formatDate(datestring: string): string {
  const dateObject = new Date(datestring);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  return `${year}-${month < 10 && "0"}${month}-${day < 10 && "0"}${day}`;
}
