const fs = require("fs");
const path = require("path");

const METRICS_FILE = path.join(__dirname, "../../data/metrics.json");

const defaultMetrics = {
  service_up: true,
  frontend_up: true,
  backend_up: true,

  api_requests_total: 0,
  api_success_count: 0,
  api_error_count: 0,

  active_users: 1,

  unauthorized_requests_count: 0,
  failed_login_count: 0,

  textbook_load_time_ms: null,
  annotation_load_time_ms: null,

  student_logins_week: [
    { day: "Mon", value: 0 },
    { day: "Tue", value: 0 },
    { day: "Wed", value: 0 },
    { day: "Thu", value: 0 },
    { day: "Fri", value: 0 },
    { day: "Sat", value: 0 },
    { day: "Sun", value: 0 },
  ],

  instructor_logins_week: [
    { day: "Mon", value: 0 },
    { day: "Tue", value: 0 },
    { day: "Wed", value: 0 },
    { day: "Thu", value: 0 },
    { day: "Fri", value: 0 },
    { day: "Sat", value: 0 },
    { day: "Sun", value: 0 },
  ],

  app_version: "1.0.0",
};

function ensureDataDirectoryExists() {
  const dataDir = path.dirname(METRICS_FILE);

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadMetricsFromFile() {
  try {
    ensureDataDirectoryExists();

    if (!fs.existsSync(METRICS_FILE)) {
      fs.writeFileSync(
        METRICS_FILE,
        JSON.stringify(defaultMetrics, null, 2)
      );

      return { ...defaultMetrics };
    }

    const fileData = fs.readFileSync(METRICS_FILE, "utf-8");
    const savedMetrics = JSON.parse(fileData);

    return {
      ...defaultMetrics,
      ...savedMetrics,
    };
  } catch (err) {
    console.error("Failed to load metrics file:", err);
    return { ...defaultMetrics };
  }
}

function saveMetricsToFile() {
  try {
    ensureDataDirectoryExists();

    fs.writeFileSync(
      METRICS_FILE,
      JSON.stringify(metrics, null, 2)
    );
  } catch (err) {
    console.error("Failed to save metrics file:", err);
  }
}

const metrics = loadMetricsFromFile();

function recordMetric(name, value) {
  if (name in metrics) {
    metrics[name] = value;
    saveMetricsToFile();
  }
}

function incrementMetric(name) {
  if (name in metrics && typeof metrics[name] === "number") {
    metrics[name] += 1;
    saveMetricsToFile();
  }
}

function getDayName() {
  const dayIndex = new Date().getDay();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[dayIndex];
}

function incrementWeeklyLogin(role) {
  const today = getDayName();

  let weeklyMetricName = null;

  if (role === "student") {
    weeklyMetricName = "student_logins_week";
  } else if (role === "instructor") {
    weeklyMetricName = "instructor_logins_week";
  } else {
    return;
  }

  const dayEntry = metrics[weeklyMetricName].find(
    (entry) => entry.day === today
  );

  if (dayEntry) {
    dayEntry.value += 1;
    saveMetricsToFile();
  }
}

function getMetrics() {
  return metrics;
}

module.exports = {
  metrics,
  recordMetric,
  incrementMetric,
  incrementWeeklyLogin,
  getMetrics,
};