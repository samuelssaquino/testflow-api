const buildBugPayload = (overrides = {}) => {
  const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    testRunId: "test-run-id-placeholder",
    testCaseId: "test-case-id-placeholder",
    title: `Bug ${uniqueSuffix}`,
    description: "Automated bug description",
    severity: "high",
    priority: "high",
    status: "open",
    evidence: "Screenshot attached in test evidence repository",
    stepsToReproduce: "Open the target screen and execute the failing action",
    ...overrides,
  };
};

module.exports = {
  buildBugPayload,
};
