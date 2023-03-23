import classes from "./TableHead.module.css";

interface TableHeadProps {
  onClick?: (e: React.BaseSyntheticEvent) => void;
}

const TableHead = ({ onClick }: TableHeadProps) => {
  return (
    <thead>
      <tr className={classes.table_head}>
        <th data-testid="sort__id" abbr="id" onClick={onClick}>
          ID
        </th>
        <th abbr="transaction_time" onClick={onClick}>
          Transaction_Time
        </th>
        <th>Status</th>
        <th>Customer_ID</th>
        <th>Customer_Name</th>
        <th>Currency</th>
      </tr>
    </thead>
  );
};

export default TableHead;
