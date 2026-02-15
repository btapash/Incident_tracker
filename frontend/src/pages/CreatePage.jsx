import { useState } from "react";
import { createIncident } from "../api/incidentApi";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    service: "",
    severity: "",
    status: "",
    owner: "",
    summary: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.service.trim()) newErrors.service = "Service is required";
    if (!form.severity) newErrors.severity = "Severity is required";
    if (!form.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await createIncident(form);
      alert("Incident created!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      {/* Card */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Incident
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400"
            value={form.title}
            onChange={e => {
              setForm({ ...form, title: e.target.value });
              setErrors({ ...errors, title: "" });
            }}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Service */}
          <div>
            <label className="font-medium">
              Service <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border p-2 rounded mt-1"
              value={form.service}
              onChange={e => {
                setForm({ ...form, service: e.target.value });
                setErrors({ ...errors, service: "" });
              }}
            />
            {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
          </div>

          {/* Severity */}
          <div>
            <label className="font-medium">
              Severity <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={form.severity}
              onChange={e => {
                setForm({ ...form, severity: e.target.value });
                setErrors({ ...errors, severity: "" });
              }}
            >
              <option value="">Select Severity</option>
              <option value="SEV1">SEV1</option>
              <option value="SEV2">SEV2</option>
              <option value="SEV3">SEV3</option>
              <option value="SEV4">SEV4</option>
            </select>
            {errors.severity && <p className="text-red-500 text-sm">{errors.severity}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="font-medium">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={form.status}
              onChange={e => {
                setForm({ ...form, status: e.target.value });
                setErrors({ ...errors, status: "" });
              }}
            >
              <option value="">Select Status</option>
              <option value="OPEN">OPEN</option>
              <option value="MITIGATED">MITIGATED</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
          </div>

          {/* Owner */}
          <div>
            <label className="font-medium">
              Owner <span className="text-gray-400">(optional)</span>
            </label>
            <input
              className="w-full border p-2 rounded mt-1"
              value={form.owner}
              onChange={e =>
                setForm({ ...form, owner: e.target.value })
              }
            />
          </div>

        </div>

        {/* Summary */}
        <div className="mt-4">
          <label className="font-medium">
            Summary <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            className="w-full border p-2 rounded mt-1"
            rows="3"
            value={form.summary}
            onChange={e =>
              setForm({ ...form, summary: e.target.value })
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Create
          </button>

          <button
            onClick={() => navigate("/")}
            className="border px-6 py-2 rounded hover:bg-gray-200 transition"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}
