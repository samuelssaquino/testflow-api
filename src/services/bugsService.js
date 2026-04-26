const { randomUUID } = require("crypto");

const testRunsService = require("./testRunsService");
const testCasesService = require("./testCasesService");

const VALID_LEVELS = ["low", "medium", "high", "critical"];
const VALID_STATUSES = ["open", "in_progress", "resolved", "closed"];
const bugs = [];

const normalizeOptionalText = (value) => {
  if (value === undefined) {
    return "";
  }

  return typeof value === "string" ? value.trim() : value;
};

const createBug = (payload) => {
  const {
    testRunId,
    testCaseId,
    title,
    description,
    severity,
    priority,
    status,
    evidence,
    stepsToReproduce,
  } = payload;

  if (!testRunId || typeof testRunId !== "string" || !testRunId.trim()) {
    return {
      error: {
        statusCode: 400,
        message: "Test run ID is required",
      },
    };
  }

  if (!testCaseId || typeof testCaseId !== "string" || !testCaseId.trim()) {
    return {
      error: {
        statusCode: 400,
        message: "Test case ID is required",
      },
    };
  }

  if (typeof title !== "string" || !title.trim()) {
    return {
      error: {
        statusCode: 400,
        message: "Bug title is required",
      },
    };
  }

  if (title.trim().length < 3) {
    return {
      error: {
        statusCode: 400,
        message: "Bug title must be at least 3 characters long",
      },
    };
  }

  if (typeof description !== "string" || !description.trim()) {
    return {
      error: {
        statusCode: 400,
        message: "Bug description is required",
      },
    };
  }

  if (!VALID_LEVELS.includes(severity)) {
    return {
      error: {
        statusCode: 400,
        message: "Severity must be one of: low, medium, high, critical",
      },
    };
  }

  if (!VALID_LEVELS.includes(priority)) {
    return {
      error: {
        statusCode: 400,
        message: "Priority must be one of: low, medium, high, critical",
      },
    };
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    return {
      error: {
        statusCode: 400,
        message: "Status must be one of: open, in_progress, resolved, closed",
      },
    };
  }

  if (evidence !== undefined && typeof evidence !== "string") {
    return {
      error: {
        statusCode: 400,
        message: "Evidence must be a string",
      },
    };
  }

  if (stepsToReproduce !== undefined && typeof stepsToReproduce !== "string") {
    return {
      error: {
        statusCode: 400,
        message: "Steps to reproduce must be a string",
      },
    };
  }

  const normalizedTestRunId = testRunId.trim();
  const normalizedTestCaseId = testCaseId.trim();
  const normalizedTitle = title.trim();

  const testRunLookup = testRunsService.getTestRunById(normalizedTestRunId);

  if (testRunLookup.error) {
    return {
      error: {
        statusCode: 404,
        message: "Test run not found",
      },
    };
  }

  const testCaseLookup = testCasesService.getTestCaseById(normalizedTestCaseId);

  if (testCaseLookup.error) {
    return {
      error: {
        statusCode: 404,
        message: "Test case not found",
      },
    };
  }

  if (!testRunLookup.testRun.testCaseIds.includes(normalizedTestCaseId)) {
    return {
      error: {
        statusCode: 400,
        message: "Test case must belong to the informed test run",
      },
    };
  }

  const duplicatedBug = bugs.find(
    (bug) =>
      bug.testRunId === normalizedTestRunId &&
      bug.testCaseId === normalizedTestCaseId &&
      bug.title.toLowerCase() === normalizedTitle.toLowerCase()
  );

  if (duplicatedBug) {
    return {
      error: {
        statusCode: 409,
        message: "Bug title already exists for this test run and test case",
      },
    };
  }

  const timestamp = new Date().toISOString();
  const bug = {
    id: randomUUID(),
    testRunId: normalizedTestRunId,
    testCaseId: normalizedTestCaseId,
    title: normalizedTitle,
    description: description.trim(),
    severity,
    priority,
    status: status || "open",
    evidence: normalizeOptionalText(evidence),
    stepsToReproduce: normalizeOptionalText(stepsToReproduce),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  bugs.push(bug);

  return { bug };
};

module.exports = {
  createBug,
};
