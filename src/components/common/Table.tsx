export default function Table({
  bodyRows,
  headerRows,
  isLoading,
}: {
  bodyRows: { key: string }[];
  headerRows: { title: string; callback?: VoidFunction }[];
  isLoading?: boolean;
}) {
  return (
    <table>
      <thead>
        <tr>
          {headerRows.map(({ title, callback }, i) => (
            <th key={title + i} onClick={callback}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <div>loading</div>
        ) : bodyRows.length === 0 ? (
          <div>empty</div>
        ) : (
          bodyRows.map((row) => (
            <tr key={row.key}>
              {Object.entries(row).map(([title, content]) =>
                title === "key" ? null : (
                  <td key={title + row.key}>{content}</td>
                )
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
