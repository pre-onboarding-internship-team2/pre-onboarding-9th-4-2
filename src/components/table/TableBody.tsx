import classes from "./TableBody.module.css";
import { CustomerType } from "../../types/customer.types";

interface TableBodyProps {
  data: CustomerType[];
  offset: number;
  limit: number;
}

const TableBody = ({ data, offset, limit }: TableBodyProps) => {
  return (
    <tbody>
      {data.length === 0 && (
        <tr>
          <td colSpan={6} className={classes.data__none}>
            Data none!
          </td>
        </tr>
      )}
      {data?.slice(offset, offset + limit).map((item) => (
        <tr className={classes.table_body} key={item.id}>
          <td>{item.id}</td>
          <td>{item.transaction_time}</td>
          <td>{item.status === true ? "배송완료" : "상품준비중"}</td>
          <td>{item.customer_id}</td>
          <td>{item.customer_name}</td>
          <td>{item.currency}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
