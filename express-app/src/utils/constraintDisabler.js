// Constraint disabler is a no-op for MongoDB but kept for test compatibility
module.exports = class ConstraintDisabler {
  constructor() {
    this.disabled = false;
  }

  async disableConstraintsForTable(tableName) {
    // noop for MongoDB
    this.disabled = true;
    return Promise.resolve();
  }

  async restoreConstraints() {
    this.disabled = false;
    return Promise.resolve();
  }
};
