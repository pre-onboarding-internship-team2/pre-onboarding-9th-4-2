import { formatDate } from "../utils/formatDate";
test("formatDate", () => {
  const transaction_time = "2023-03-08 07:47:08";
  const formatted = formatDate(transaction_time);
  expect(formatted).toBe("2023-03-08");
});
