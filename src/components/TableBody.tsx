import { TableProps } from "./Table";

interface TableBodyProps extends TableProps {
  offset: number;
  limit: number;
}

const TableBody = ({ data, offset, limit }: TableBodyProps) => {
  return (
    <tbody>
      {data?.slice(offset, offset + limit).map((item) => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.transaction_time}</td>
          <td>{JSON.stringify(item.status)}</td>
          <td>{item.customer_id}</td>
          <td>{item.customer_name}</td>
          <td>{item.currency}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
