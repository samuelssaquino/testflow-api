const reportsService = require("../services/reportsService");

const getExecutionSummary = (req, res) => {
  const summary = reportsService.getExecutionSummary();

  return res.status(200).json(summary);
};

module.exports = {
  getExecutionSummary,
};
