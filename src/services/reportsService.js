const projectsService = require("./projectsService");
const testCasesService = require("./testCasesService");
const testRunsService = require("./testRunsService");
const bugsService = require("./bugsService");

const createCounter = (keys) => {
  return keys.reduce((accumulator, key) => {
    accumulator[key] = 0;
    return accumulator;
  }, {});
};

const incrementCounter = (counter, key) => {
  if (Object.prototype.hasOwnProperty.call(counter, key)) {
    counter[key] += 1;
  }
};

const getExecutionSummary = () => {
  const projects = projectsService.listProjects();
  const testCases = testCasesService.listTestCases();
  const testRuns = testRunsService.listTestRuns();
  const bugs = bugsService.listBugs();

  const testCasesByStatus = createCounter(["draft", "ready", "deprecated"]);
  const testRunsByStatus = createCounter(["pending", "in_progress", "completed"]);
  const bugsByStatus = createCounter(["open", "in_progress", "resolved", "closed"]);
  const bugsBySeverity = createCounter(["low", "medium", "high", "critical"]);
  const bugsByPriority = createCounter(["low", "medium", "high", "critical"]);

  testCases.forEach((testCase) => {
    incrementCounter(testCasesByStatus, testCase.status);
  });

  testRuns.forEach((testRun) => {
    incrementCounter(testRunsByStatus, testRun.status);
  });

  bugs.forEach((bug) => {
    incrementCounter(bugsByStatus, bug.status);
    incrementCounter(bugsBySeverity, bug.severity);
    incrementCounter(bugsByPriority, bug.priority);
  });

  return {
    totalProjects: projects.length,
    totalTestCases: testCases.length,
    totalTestRuns: testRuns.length,
    totalBugs: bugs.length,
    testCasesByStatus,
    testRunsByStatus,
    bugsByStatus,
    bugsBySeverity,
    bugsByPriority,
  };
};

module.exports = {
  getExecutionSummary,
};
