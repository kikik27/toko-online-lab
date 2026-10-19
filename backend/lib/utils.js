const formatValidationError = (error) => {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(err => err.message);
    return messages.join(', ');
  }
  return error.message;
};

module.exports = {
  formatValidationError,
};
