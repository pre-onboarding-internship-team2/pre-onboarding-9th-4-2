import { formatDate } from "../utils/formatDate";
import { OrderDataProcessor } from "../utils/orderDataProcessor";
test("formatDate", () => {
  const transaction_time = "2023-03-08 07:47:08";
  const formatted = formatDate(transaction_time);
  expect(formatted).toBe("2023-03-08");
});

describe("orderDataProcessor", () => {
  describe("applyFilter", () => {
    test("date filter", () => {
      const orderDataProcessor = setUpOrderDataProcessor();
      const { data } = orderDataProcessor
        .applyFilter({ date: "2023-03-07" })
        .getProcessedResult();
      expect(data.length).toBe(1);
    });

    test("customerName filter", () => {
      const orderDataProcessor = setUpOrderDataProcessor();
      const { data } = orderDataProcessor
        .applyFilter({ customerName: "ann" })
        .getProcessedResult();
      expect(data.length).toBe(1);
    });

    test("orderStatus filter", () => {
      const orderDataProcessor = setUpOrderDataProcessor();
      const { data } = orderDataProcessor
        .applyFilter({ orderStatus: "false" })
        .getProcessedResult();
      expect(data.length).toBe(1);
    });

    test("multiple options", () => {
      const orderDataProcessor = setUpOrderDataProcessor();
      const { data } = orderDataProcessor
        .applyFilter({
          orderStatus: "false",
          date: "2023-03-08",
          customerName: "powell",
        })
        .getProcessedResult();
      expect(data.length).toBe(1);
    });
  });

  describe("applySort", () => {
    test('sortBy: "id", sortOrder: "desc"', () => {
      const orderDataProcessor = setUpOrderDataProcessor();
      const { data } = orderDataProcessor
        .applySort({ sortBy: "id", sortOrder: "desc" })
        .getProcessedResult();
      expect(data[0].id).toBe(4);
    });

    test('sortBy: undefined, sortOrder: "desc"', () => {
      const orderDataProcessor = setUpOrderDataProcessor();
      const { data } = orderDataProcessor
        .applySort({ sortOrder: "desc" })
        .getProcessedResult();
      expect(data[0].id).toBe(1);
    });

    test('sortBy: transaction_time, sortOrder: "desc"', () => {
      const orderDataProcessor = setUpOrderDataProcessor();
      const { data } = orderDataProcessor
        .applySort({ sortBy: "transaction_time", sortOrder: "desc" })
        .getProcessedResult();
      expect(data[1].id).toBe(2);
    });
  });
});

function setUpOrderDataProcessor() {
  const data = [
    {
      id: 1,
      transaction_time: "2023-03-07 17:39:50",
      status: true,
      customer_id: 15,
      customer_name: "Holmes Howard",
      currency: "$5.61",
    },
    {
      id: 2,
      transaction_time: "2023-03-08 06:59:37",
      status: true,
      customer_id: 16,
      customer_name: "Cynthia Terrell",
      currency: "$10.99",
    },
    {
      id: 3,
      transaction_time: "2023-03-08 00:41:58",
      status: true,
      customer_id: 17,
      customer_name: "Ann Barron",
      currency: "$37.87",
    },
    {
      id: 4,
      transaction_time: "2023-03-08 12:00:18",
      status: false,
      customer_id: 18,
      customer_name: "Wade Powell",
      currency: "$30.96",
    },
  ];
  return new OrderDataProcessor(data);
}
