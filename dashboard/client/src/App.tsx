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

function LoadStatus({ value }: { value: number | null}) {
  if (value === null || value === undefined) {
    return <span className="gray">No data yet</span>;
  }

  if (value < 300) {
    return <span className="green">● OK - {value} ms</span>;
  }
  else if (value >= 300 && value < 1000) {
    return <span className="yellow">● Slow - {value} ms</span>;
  }
  else {
    return <span className="red">● Critical - {value} ms</span>;
  }
}

function MetricCard({ title, value }: any) {
  return (
    <div className="metric">
      <div style={{ fontSize: "12px", color: "#666" }}>{title}</div>
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>{value}</div>
    </div>
  );
}

function LatencyCard({title, value, description}: {
  title: string;
  value: number | null;
  description: string;
}) {
  return (
    <div className="metric latency-card">
      <div className="metric-title">{title}</div>
      <div className="latency-value">
        {value === null || value === undefined ? "No data" : `${value} ms`}
      </div>
      <div className="latency-status">
        <LoadStatus value={value} />
      </div>
      <p className="metric-description">{description}</p>
    </div>
  );
}

function WeeklyBarChart({title, data, warningThreshold}: {
  title: string;
  data: { day: string; value: number }[];
  warningThreshold: number;
}) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  
  return (
    <div className="chart-card">
      <h4>{title}</h4>

      <div className="bar-chart">
        {data.map((item) => {
          const height = `${(item.value / maxValue) * 100}%`;
          const isWarning = item.value >= warningThreshold;

          return (
            <div className="bar-item" key={item.day}>
              <div className="bar-value">{item.value}</div>
              <div
                className={isWarning ? "bar warning-bar" : "bar normal-bar"}
                style={{ height }}
              />
              <div className="bar-label">{item.day}</div>
            </div>
          );
        })}
      </div>

      <p className="chart-note">
        Alert threshold: {warningThreshold}+ failures/day
      </p>
    </div>
  )
}

export default function App() {
  const [metrics, setMetrics] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await getMetrics();
      setMetrics(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
    }
  };

  if (!metrics) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>CoffeeJelly Dashboard</h2>
      <h2 className="subtitle">Real-time Metrics and Service Health for CoffeeJelly, the educational textbook-annotation platform.</h2>

      {/* OLD VERSION <p className="text-sm text-gray-500 mb-4"> Last updated: {new Date().toLocaleTimeString()} </p> */}
      <p className="last-updated">Last updated: {lastUpdated}</p>

      <div className="dashboard-grid">

        {/* Service Health */}
        <div className="card">
          <h3>Service Health</h3>
          <div className="metric-grid">
            <MetricCard title="Service" value={<Status value={metrics.service_up} />} />
            <MetricCard title="Frontend" value={<Status value={metrics.frontend_up} />} />
            <MetricCard title="Backend" value={<Status value={metrics.backend_up} />} />
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

        {/* Early Alert Latency */}
        <div className="card wide-card">
          <h3>Early Alert: User Experience Latency</h3>
          <p className="card-description">
            These metrics track how long users actually wait for textbook
            content and annotations to load in the browser.
          </p>

          <div className="metric-grid two-col">
            <LatencyCard
              title="Textbook Load Time"
              value={metrics.textbook_load_time_ms}
              description="Measured when the textbook viewer requests chapter sections."
            />

            <LatencyCard
              title="Annotation Load Time"
              value={metrics.annotation_load_time_ms}
              description="Measured when a user clicks an annotation marker."
            />
          </div>
        </div>

        {/* Users */}
        <div className="card">
          <h3>Usage Metrics</h3>
          <div className="metric-grid">
            <MetricCard title="Active Users" value={metrics.active_users} />
            <MetricCard title="Textbooks" value={metrics.textbooks_total} />
            <MetricCard title="Annotations" value={metrics.annotations_total} />
          </div>
        </div>

        {/* Security */}
        <div className="card">
          <h3>Security</h3>
          <div className="metric-grid">
            <MetricCard title="Unauthorized" value={metrics.unauthorized_requests_count} />
            <MetricCard title="Failed Logins" value={metrics.failed_login_count} />
            <MetricCard title="Unknown Requests" value="0" />
          </div>
        </div>

        {/* Early Alert Failure Trends */}
        <div className="card wide-card">
          <h3>Early Alert: Weekly Failure Trends</h3>
          <p className="card-description">
            These trends represent future monitoring for annotation lookup
            failures and student request submission failures.
          </p>

          <div className="charts-grid">
            <WeeklyBarChart
              title="Annotation Lookup Failures"
              data={metrics.annotation_lookup_failures_week}
              warningThreshold={5}
            />

            <WeeklyBarChart
              title="Student Request Submission Failures"
              data={metrics.student_request_submission_failures_week}
              warningThreshold={3}
            />
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