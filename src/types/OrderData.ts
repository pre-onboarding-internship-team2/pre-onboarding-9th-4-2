export type OrderData = {
  /** 주문번호 */
  id: number;
  /** 거래시간 */
  transaction_time: string;
  /** 주문처리상태 */
  status: boolean;
  /** 고객번호 */
  customer_id: number;
  /** 고객이름 */
  customer_name: string;
  /** 가격 */
  currency: string;
};
