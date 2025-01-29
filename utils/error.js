export const errorHandler = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
