export default function Filters({ status, setStatus, search, setSearch }) {
  return (
    <div className="card">
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="OPEN">OPEN</option>
        <option value="MITIGATED">MITIGATED</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>
    </div>
  );
}
