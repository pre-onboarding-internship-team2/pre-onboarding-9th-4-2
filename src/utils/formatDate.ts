/** yyyy-mm-dd 형태로 반환 */
export function formatDate(datestring: string): string {
  return new Date(datestring).toISOString().slice(0, 10);
}
