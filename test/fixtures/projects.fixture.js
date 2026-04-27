const buildProjectPayload = (overrides = {}) => {
  const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    name: `Project ${uniqueSuffix}`,
    description: "Automated test project",
    status: "active",
    ...overrides,
  };
};

module.exports = {
  buildProjectPayload,
};
