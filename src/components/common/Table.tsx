export default function Table({
  bodyRows,
  headerRows,
}: {
  bodyRows: { key: string }[];
  headerRows: { title: string; callback?: VoidFunction }[];
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
        {bodyRows.map((row) => (
          <tr key={row.key}>
            {Object.entries(row).map(([title, content]) =>
              title === "key" ? null : <td key={title + row.key}>{content}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
