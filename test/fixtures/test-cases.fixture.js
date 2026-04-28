const buildTestCasePayload = (overrides = {}) => {
  const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    projectId: "project-id-placeholder",
    title: `Test Case ${uniqueSuffix}`,
    description: "Automated test case description",
    preconditions: "Authenticated user and valid project",
    steps: ["Access the form", "Fill the required fields", "Submit the request"],
    expectedResult: "The API should create the test case successfully",
    priority: "high",
    status: "ready",
    ...overrides,
  };
};

module.exports = {
  buildTestCasePayload,
};
