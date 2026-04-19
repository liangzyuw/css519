import "./App.css";
import { useEffect, useState } from "react";
import { getMetrics } from "./api";

function Status({ value }: { value: boolean }) {
  return (
    <span className={value ? "green" : "red"}>
      {value ? "● UP" : "● DOWN"}
    </span>
  );
}

function MetricCard({ title, value }: any) {
  return (
    <div className="metric">
      <div style={{ fontSize: "12px", color: "#666" }}>{title}</div>
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>{value}</div>
    </div>
  );
}

export default function App() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await getMetrics();
      setMetrics(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!metrics) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h1>CoffeeJelly Dashboard</h1>

      <p className="text-sm text-gray-500 mb-4"> Last updated: {new Date().toLocaleTimeString()} </p>

      <div className="dashboard-grid">

        {/* Service Health */}
        <div className="card">
          <h3>Service Health</h3>
          <div className="metric-grid">
            <MetricCard title="Service" value={<Status value={metrics.service_up} />} />
            <MetricCard title="Frontend" value={<Status value={metrics.frontend_up} />} />
          </div>
        </div>

        {/* API Metrics */}
        <div className="card">
          <h3>API Metrics</h3>
          <div className="metric-grid">
            <MetricCard title="Requests" value={metrics.api_requests_total} />
            <MetricCard title="Success" value={metrics.api_success_count} />
            <MetricCard title="Errors" value={metrics.api_error_count} />
          </div>
        </div>

        {/* Users */}
        <div className="card">
          <h3>Users</h3>
          <div className="metric-grid">
            <MetricCard title="Active" value={metrics.active_users} />
            <MetricCard title="Annotations" value={metrics.annotations_total} />
          </div>
        </div>

        {/* Security */}
        <div className="card">
          <h3>Security</h3>
          <div className="metric-grid">
            <MetricCard title="Unauthorized" value={metrics.unauthorized_requests_count} />
          </div>
        </div>

        {/* Deployment */}
        <div className="card">
          <h3>Deployment</h3>
          <div className="metric-grid">
            <MetricCard title="Version" value={metrics.app_version} />
          </div>
        </div>

      </div>
    </div>
  );
}