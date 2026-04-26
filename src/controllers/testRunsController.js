const testRunsService = require("../services/testRunsService");

const createTestRun = (req, res) => {
  const { error, testRun } = testRunsService.createTestRun(req.body);

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(201).json(testRun);
};

const listTestRuns = (req, res) => {
  const testRuns = testRunsService.listTestRuns();

  return res.status(200).json(testRuns);
};

module.exports = {
  createTestRun,
  listTestRuns,
};
