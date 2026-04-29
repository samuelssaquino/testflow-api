const testCasesService = require("../services/testCasesService");

const createTestCase = (req, res) => {
  const { error, testCase } = testCasesService.createTestCase(req.body);

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(201).json(testCase);
};

const listTestCases = (req, res) => {
  const testCases = testCasesService.listTestCases();

  return res.status(200).json(testCases);
};

const updateTestCase = (req, res) => {
  const { error, testCase } = testCasesService.updateTestCase(
    req.params.testCaseId,
    req.body
  );

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(200).json(testCase);
};

const deleteTestCase = (req, res) => {
  const { error, message } = testCasesService.deleteTestCase(req.params.testCaseId);

  if (error) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(200).json({ message });
};

module.exports = {
  createTestCase,
  listTestCases,
  updateTestCase,
  deleteTestCase,
};
