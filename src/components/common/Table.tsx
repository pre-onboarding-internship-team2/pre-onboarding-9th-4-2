export default function Table({
  bodyRows,
  headerRows,
}: {
  bodyRows: { key: string }[];
  headerRows: string[];
}) {
  return (
    <table>
      <thead>
        <tr>
          {headerRows.map((title, i) => (
            <th key={title + i}>{title}</th>
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
