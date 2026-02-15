export default function Table({ data, onRowClick, onSort }) {

  const handleSort = (field) => {
    onSort(field);
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("title")}>Title</th>
          <th onClick={() => handleSort("service")}>Service</th>
          <th onClick={() => handleSort("severity")}>Severity</th>
          <th onClick={() => handleSort("status")}>Status</th>
        </tr>
      </thead>

      <tbody>
        {data.map(i => (
          <tr key={i.id} onClick={() => onRowClick(i.id)}>
            <td>{i.title}</td>
            <td>{i.service}</td>
            <td>{i.severity}</td>
            <td>{i.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
