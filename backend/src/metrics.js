const metrics = {
  service_up: true,
  frontend_up: true,

  api_requests_total: 0,
  api_success_count: 0,
  api_error_count: 0,

  active_users: 0, // placeholder
  annotations_total: 0, // update later if needed
  unauthorized_requests_count: 0,

  app_version: "1.0.0",
};

module.exports = metrics;