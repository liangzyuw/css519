const metrics = {
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

  app_version: "1.0.0",
};

function recordMetric(name, value) {
  if (name in metrics) {
    metrics[name] = value;
  }
}

function incrementMetric(name) {
  if (name in metrics && typeof metrics[name] === "number") {
    metrics[name] += 1;
  }
}

function getMetrics() {
  return metrics;
}

module.exports = {
  metrics,
  recordMetric,
  incrementMetric,
  getMetrics,
};