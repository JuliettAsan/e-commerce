const AUTH_ERROR = Object.freeze({
  AUTH_ERROR: 'AuthError',
  INVALID_PARAMETER: 'InvalidParameterException',
  NOT_AUTHORIZED: 'NotAuthorizedException',
  USER_NOT_FOUND: 'UserNotFoundException',
  CODE_MISMATCH: 'CodeMismatchException',
  LIMIT_EXCEEDED: 'LimitExceededException',
  USER_EXISTS: 'UsernameExistsException',
  INVALID_PASSWORD: 'InvalidPasswordException',
});

module.exports = {
  AUTH_ERROR,
};
