const { randomUUID } = require("crypto");

const projectsService = require("./projectsService");
const testCasesService = require("./testCasesService");

const VALID_STATUSES = ["pending", "in_progress", "completed"];
const testRuns = [];

const isValidDateString = (value) => {
  return !Number.isNaN(Date.parse(value));
};

const createTestRun = (payload) => {
  const {
    projectId,
    title,
    description,
    testCaseIds,
    status,
    executedBy,
    startedAt,
    finishedAt,
  } = payload;

  if (!projectId || typeof projectId !== "string" || !projectId.trim()) {
    return {
      error: {
        statusCode: 400,
        message: "Project ID is required",
      },
    };
  }

  if (typeof title !== "string" || !title.trim()) {
    return {
      error: {
        statusCode: 400,
        message: "Test run title is required",
      },
    };
  }

  if (title.trim().length < 3) {
    return {
      error: {
        statusCode: 400,
        message: "Test run title must be at least 3 characters long",
      },
    };
  }

  if (description !== undefined && typeof description !== "string") {
    return {
      error: {
        statusCode: 400,
        message: "Description must be a string",
      },
    };
  }

  if (!Array.isArray(testCaseIds) || testCaseIds.length < 1) {
    return {
      error: {
        statusCode: 400,
        message: "Test case IDs must be an array with at least 1 item",
      },
    };
  }

  const normalizedTestCaseIds = testCaseIds.map((testCaseId) =>
    typeof testCaseId === "string" ? testCaseId.trim() : testCaseId
  );

  if (normalizedTestCaseIds.some((testCaseId) => typeof testCaseId !== "string" || !testCaseId)) {
    return {
      error: {
        statusCode: 400,
        message: "Each test case ID must be a non-empty string",
      },
    };
  }

  const uniqueTestCaseIds = new Set(normalizedTestCaseIds);

  if (uniqueTestCaseIds.size !== normalizedTestCaseIds.length) {
    return {
      error: {
        statusCode: 400,
        message: "Duplicated test case IDs are not allowed in the same test run",
      },
    };
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    return {
      error: {
        statusCode: 400,
        message: "Status must be one of: pending, in_progress, completed",
      },
    };
  }

  if (typeof executedBy !== "string" || !executedBy.trim()) {
    return {
      error: {
        statusCode: 400,
        message: "Executed by is required and must be a string",
      },
    };
  }

  if (startedAt !== undefined && !isValidDateString(startedAt)) {
    return {
      error: {
        statusCode: 400,
        message: "Started at must be a valid date",
      },
    };
  }

  if (finishedAt !== undefined && !isValidDateString(finishedAt)) {
    return {
      error: {
        statusCode: 400,
        message: "Finished at must be a valid date",
      },
    };
  }

  if (
    startedAt !== undefined &&
    finishedAt !== undefined &&
    new Date(finishedAt).getTime() < new Date(startedAt).getTime()
  ) {
    return {
      error: {
        statusCode: 400,
        message: "Finished at cannot be earlier than started at",
      },
    };
  }

  const normalizedProjectId = projectId.trim();
  const normalizedTitle = title.trim();
  const normalizedDescription =
    typeof description === "string" ? description.trim() : "";
  const normalizedExecutedBy = executedBy.trim();

  const projectLookup = projectsService.getProjectById(normalizedProjectId);

  if (projectLookup.error) {
    return {
      error: {
        statusCode: 404,
        message: "Project not found",
      },
    };
  }

  for (const testCaseId of normalizedTestCaseIds) {
    const testCaseLookup = testCasesService.getTestCaseById(testCaseId);

    if (testCaseLookup.error) {
      return {
        error: {
          statusCode: 404,
          message: "Test case not found",
        },
      };
    }

    if (testCaseLookup.testCase.projectId !== normalizedProjectId) {
      return {
        error: {
          statusCode: 400,
          message: "All test cases must belong to the provided project",
        },
      };
    }
  }

  const duplicatedTestRun = testRuns.find(
    (testRun) =>
      testRun.projectId === normalizedProjectId &&
      testRun.title.toLowerCase() === normalizedTitle.toLowerCase()
  );

  if (duplicatedTestRun) {
    return {
      error: {
        statusCode: 409,
        message: "Test run title already exists in this project",
      },
    };
  }

  const timestamp = new Date().toISOString();
  const testRun = {
    id: randomUUID(),
    projectId: normalizedProjectId,
    title: normalizedTitle,
    description: normalizedDescription,
    testCaseIds: normalizedTestCaseIds,
    status: status || "pending",
    executedBy: normalizedExecutedBy,
    startedAt: startedAt || null,
    finishedAt: finishedAt || null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  testRuns.push(testRun);

  return { testRun };
};

const listTestRuns = () => {
  return [...testRuns];
};

module.exports = {
  createTestRun,
  listTestRuns,
};
