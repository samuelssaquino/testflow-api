const buildTestRunPayload = (overrides = {}) => {
  const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    projectId: "project-id-placeholder",
    title: `Test Run ${uniqueSuffix}`,
    description: "Automated test run description",
    testCaseIds: ["test-case-id-placeholder"],
    status: "pending",
    executedBy: "qa.automation",
    startedAt: "2026-04-28T10:00:00.000Z",
    finishedAt: "2026-04-28T11:00:00.000Z",
    ...overrides,
  };
};

module.exports = {
  buildTestRunPayload,
};
