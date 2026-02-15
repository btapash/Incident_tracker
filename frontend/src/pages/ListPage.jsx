import { useEffect, useState } from "react";
import { fetchIncidents } from "../api/incidentApi";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/UseDebounce";

export default function ListPage() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [filters, setFilters] = useState({
    status: "",
    service: "",
    severity: ""
  });

  const [appliedFilters, setAppliedFilters] = useState({
    status: "",
    service: "",
    severity: ""
  });

  const [sortBy, setSortBy] = useState("createdAt");
  const [direction, setDirection] = useState("desc");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [page, debouncedSearch, appliedFilters, sortBy, direction]);

  const loadData = async () => {
    setLoading(true);

    const res = await fetchIncidents({
      page,
      size: 5,
      search: debouncedSearch,
      status: appliedFilters.status,
      service: appliedFilters.service,
      severity: appliedFilters.severity,
      sortBy,
      direction
    });

    setData(res.data.content);
    setTotalPages(res.data.totalPages);
    setLoading(false);
  };

  const handleSort = (field) => {
    setSortBy(field);
    setDirection(d => d === "asc" ? "desc" : "asc");
  };

  const getSeverityColor = (sev) => {
    if (sev === "SEV1") return "bg-red-500";
    if (sev === "SEV2") return "bg-orange-400";
    if (sev === "SEV3") return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStatusColor = (status) => {
    if (status === "OPEN") return "bg-green-600";
    if (status === "MITIGATED") return "bg-gray-500";
    return "bg-blue-600";
  };

  const renderPageNumbers = () => {
  let pages = [];

  let start = Math.max(0, page - 2);
  let end = Math.min(totalPages - 1, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="flex justify-between items-center bg-slate-800 text-white px-6 py-4 shadow">
        <h2 className="text-xl font-semibold">Incident Tracker</h2>

        <button
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={() => navigate("/create")}
        >
          + Create New Incident
        </button>
      </div>

      <div className="p-6">

        {/* Filters */}
        <div className="flex flex-wrap gap-3 bg-white p-4 rounded shadow mb-5">

          <input
            className="border p-2 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search by title..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            onChange={e => setFilters({...filters, status: e.target.value})}
          >
            <option value="">Status</option>
            <option>OPEN</option>
            <option>MITIGATED</option>
            <option>RESOLVED</option>
          </select>

          <select
            className="border p-2 rounded"
            onChange={e => setFilters({...filters, severity: e.target.value})}
          >
            <option value="">Severity</option>
            <option>SEV1</option>
            <option>SEV2</option>
            <option>SEV3</option>
            <option>SEV4</option>
          </select>

          <select
            className="border p-2 rounded"
            onChange={e => setFilters({...filters, service: e.target.value})}
          >
            <option value="">Service</option>
            <option>Auth</option>
            <option>Payments</option>
          </select>

          <button
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition"
            onClick={() => {
              setAppliedFilters(filters);
              setPage(0);
            }}
          >
            Apply Filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 cursor-pointer text-left" onClick={() => handleSort("title")}>
                  Title
                </th>
                <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("severity")}>
                  Severity
                </th>
                <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("status")}>
                  Status
                </th>
                <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("createdAt")}>
                  Created At
                </th>
                <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("owner")}>
                  Owner
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : data.map(i => (
                <tr
                  key={i.id}
                  onClick={() => navigate(`/incident/${i.id}`)}
                  className="hover:bg-gray-50 cursor-pointer transition transform hover:scale-[1.01]"
                >
                  <td className="p-3 font-medium text-blue-600 hover:underline">
                    {i.title}
                  </td>

                  <td>
                    <span className={`text-white px-2 py-1 rounded text-sm ${getSeverityColor(i.severity)}`}>
                      {i.severity}
                    </span>
                  </td>

                  <td>
                    <span className={`text-white px-2 py-1 rounded text-sm ${getStatusColor(i.status)}`}>
                      {i.status}
                    </span>
                  </td>

                  <td className="text-sm text-gray-600">
                    {new Date(i.createdAt).toLocaleString()}
                  </td>

                  <td>{i.owner || "-"}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Pagination */}

        <div className="flex flex-col items-center gap-2 mt-6">

            <div className="flex items-center gap-2">

                <button
                disabled={page === 0}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
                >
                Prev
                </button>

                {renderPageNumbers().map(p => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 border rounded 
                    ${p === page ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                >
                    {p + 1}
                </button>
                ))}

                <button
                disabled={page === totalPages - 1}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
                >
                Next
                </button>

            </div>

            <div className="font-medium text-gray-600">
                Page {page + 1} of {totalPages}
            </div>

        </div>


        
        

      </div>
    </div>
  );
}
