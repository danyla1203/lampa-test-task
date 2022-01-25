class CustomError extends Error {
  constructor(code, message) {
    super();
    this.statusCode = code;
    this.text = message;
  }
}

class IncorrectData extends CustomError {
  constructor(code, message) {
    super(code, message);
  }
}

module.exports.CustomError = CustomError;
module.exports.IncorrectData = IncorrectData;