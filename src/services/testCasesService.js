const { randomUUID } = require("crypto");

const projectsService = require("./projectsService");

const VALID_PRIORITIES = ["low", "medium", "high", "critical"];
const VALID_STATUSES = ["draft", "ready", "deprecated"];
const testCases = [];

const normalizeOptionalText = (value) => {
  if (value === undefined) {
    return "";
  }

  return typeof value === "string" ? value.trim() : value;
};

const validateCreatePayload = (payload) => {
  const {
    projectId,
    title,
    description,
    preconditions,
    steps,
    expectedResult,
    priority,
    status,
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
        message: "Test case title is required",
      },
    };
  }

  if (title.trim().length < 3) {
    return {
      error: {
        statusCode: 400,
        message: "Test case title must be at least 3 characters long",
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

  if (preconditions !== undefined && typeof preconditions !== "string") {
    return {
      error: {
        statusCode: 400,
        message: "Preconditions must be a string",
      },
    };
  }

  if (!Array.isArray(steps) || steps.length < 1) {
    return {
      error: {
        statusCode: 400,
        message: "Steps must be an array with at least 1 item",
      },
    };
  }

  if (typeof expectedResult !== "string" || !expectedResult.trim()) {
    return {
      error: {
        statusCode: 400,
        message: "Expected result is required",
      },
    };
  }

  if (!VALID_PRIORITIES.includes(priority)) {
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
        message: "Status must be one of: draft, ready, deprecated",
      },
    };
  }

  return {
    normalizedPayload: {
      projectId: projectId.trim(),
      title: title.trim(),
      description: normalizeOptionalText(description),
      preconditions: normalizeOptionalText(preconditions),
      steps,
      expectedResult: expectedResult.trim(),
      priority,
      status: status || "draft",
    },
  };
};

const createTestCase = (payload) => {
  const { error, normalizedPayload } = validateCreatePayload(payload);

  if (error) {
    return { error };
  }

  const projectLookup = projectsService.getProjectById(normalizedPayload.projectId);

  if (projectLookup.error) {
    return {
      error: {
        statusCode: 404,
        message: "Project not found",
      },
    };
  }

  const duplicatedTestCase = testCases.find(
    (testCase) =>
      testCase.projectId === normalizedPayload.projectId &&
      testCase.title.toLowerCase() === normalizedPayload.title.toLowerCase()
  );

  if (duplicatedTestCase) {
    return {
      error: {
        statusCode: 409,
        message: "Test case title already exists in this project",
      },
    };
  }

  const timestamp = new Date().toISOString();
  const testCase = {
    id: randomUUID(),
    projectId: normalizedPayload.projectId,
    title: normalizedPayload.title,
    description: normalizedPayload.description,
    preconditions: normalizedPayload.preconditions,
    steps: normalizedPayload.steps,
    expectedResult: normalizedPayload.expectedResult,
    priority: normalizedPayload.priority,
    status: normalizedPayload.status,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  testCases.push(testCase);

  return { testCase };
};

const listTestCases = () => {
  return [...testCases];
};

const updateTestCase = (testCaseId, payload) => {
  const testCase = testCases.find((item) => item.id === testCaseId);

  if (!testCase) {
    return {
      error: {
        statusCode: 404,
        message: "Test case not found",
      },
    };
  }

  const forbiddenFields = ["id", "projectId", "createdAt"];
  const forbiddenField = forbiddenFields.find((field) => field in payload);

  if (forbiddenField) {
    return {
      error: {
        statusCode: 400,
        message: `${forbiddenField} cannot be updated`,
      },
    };
  }

  if ("title" in payload) {
    if (typeof payload.title !== "string" || !payload.title.trim()) {
      return {
        error: {
          statusCode: 400,
          message: "Test case title must be a non-empty string",
        },
      };
    }

    if (payload.title.trim().length < 3) {
      return {
        error: {
          statusCode: 400,
          message: "Test case title must be at least 3 characters long",
        },
      };
    }

    const duplicatedTestCase = testCases.find(
      (item) =>
        item.id !== testCase.id &&
        item.projectId === testCase.projectId &&
        item.title.toLowerCase() === payload.title.trim().toLowerCase()
    );

    if (duplicatedTestCase) {
      return {
        error: {
          statusCode: 409,
          message: "Test case title already exists in this project",
        },
      };
    }
  }

  if ("description" in payload && typeof payload.description !== "string") {
    return {
      error: {
        statusCode: 400,
        message: "Description must be a string",
      },
    };
  }

  if ("preconditions" in payload && typeof payload.preconditions !== "string") {
    return {
      error: {
        statusCode: 400,
        message: "Preconditions must be a string",
      },
    };
  }

  if ("steps" in payload && (!Array.isArray(payload.steps) || payload.steps.length < 1)) {
    return {
      error: {
        statusCode: 400,
        message: "Steps must be an array with at least 1 item",
      },
    };
  }

  if (
    "expectedResult" in payload &&
    (typeof payload.expectedResult !== "string" || !payload.expectedResult.trim())
  ) {
    return {
      error: {
        statusCode: 400,
        message: "Expected result must be a non-empty string",
      },
    };
  }

  if ("priority" in payload && !VALID_PRIORITIES.includes(payload.priority)) {
    return {
      error: {
        statusCode: 400,
        message: "Priority must be one of: low, medium, high, critical",
      },
    };
  }

  if ("status" in payload && !VALID_STATUSES.includes(payload.status)) {
    return {
      error: {
        statusCode: 400,
        message: "Status must be one of: draft, ready, deprecated",
      },
    };
  }

  if ("title" in payload) {
    testCase.title = payload.title.trim();
  }

  if ("description" in payload) {
    testCase.description = payload.description.trim();
  }

  if ("preconditions" in payload) {
    testCase.preconditions = payload.preconditions.trim();
  }

  if ("steps" in payload) {
    testCase.steps = payload.steps;
  }

  if ("expectedResult" in payload) {
    testCase.expectedResult = payload.expectedResult.trim();
  }

  if ("priority" in payload) {
    testCase.priority = payload.priority;
  }

  if ("status" in payload) {
    testCase.status = payload.status;
  }

  testCase.updatedAt = new Date().toISOString();

  return { testCase };
};

module.exports = {
  createTestCase,
  listTestCases,
  updateTestCase,
};
