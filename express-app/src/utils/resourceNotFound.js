class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message || 'Resource not found');
    this.name = 'ResourceNotFoundError';
    this.status = 404;
  }
}

module.exports = ResourceNotFoundError;
