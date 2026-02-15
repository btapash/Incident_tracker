import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIncident, updateIncident } from "../api/incidentApi";

export default function DetailPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    const res = await getIncident(id);
    setData(res.data);
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    await updateIncident(id, {
      service: data.service,
      severity: data.severity,
      status: data.status,
      owner: data.owner,
      summary: data.summary
    });

    alert("Updated successfully!");
    navigate("/");
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">

      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-2">
          {data.title}
        </h2>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6 text-sm">

          <span className="bg-red-500 text-white px-2 py-1 rounded">
            {data.severity}
          </span>

          <span className="bg-green-600 text-white px-2 py-1 rounded">
            {data.status}
          </span>

          <span className="text-gray-500">
            Created on {new Date(data.createdAt).toLocaleString()}
          </span>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Owner */}
          <div>
            <label className="font-medium">
              Owner <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border p-2 rounded mt-1"
              value={data.owner || ""}
              onChange={e => handleChange("owner", e.target.value)}
            />
          </div>

          {/* Service */}
          <div>
            <label className="font-medium">Service</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={data.service || ""}
              onChange={e => handleChange("service", e.target.value)}
            >
              <option>Auth</option>
              <option>Payments</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="font-medium">
              Severity <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={data.severity || ""}
              onChange={e => handleChange("severity", e.target.value)}
            >
              <option>SEV1</option>
              <option>SEV2</option>
              <option>SEV3</option>
              <option>SEV4</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="font-medium">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={data.status || ""}
              onChange={e => handleChange("status", e.target.value)}
            >
              <option>OPEN</option>
              <option>MITIGATED</option>
              <option>RESOLVED</option>
            </select>
          </div>

        </div>

        {/* Summary */}
        <div className="mt-6">
          <label className="font-medium">Summary</label>
          <textarea
            className="w-full border p-2 rounded mt-1"
            rows="4"
            value={data.summary || ""}
            onChange={e => handleChange("summary", e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={() => navigate("/")}
            className="border px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            Back to List
          </button>

          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}
