var crypto = require("crypto");

// Base64 암호화

exports.StringToBase64Encoding = function (arg) {
  var bTemp = Buffer.from(arg, "utf-8");

  var base64encoding = bTemp.toString("base64");
  return base64encoding;
};

//Base64 복호화
exports.Base64ToStringDecoding = function (arg) {
  var strTemp = Buffer.from(arg, "base64");
  var base64decoding = strTemp.toString("utf-8");
  return base64decoding;
};

//비밀번호 암호화
exports.getEncrypt = function (arg) {
  let algorithm = "aes-256-cbc";
  let ourKey = "megaitrea.auth";
  const cipher = crypto.createCipher(algorithm, ourKey);
  let result = cipher.update(arg, "utf-8", "base64");
  result += cipher.final("base64");
  return result;
};

//비밀번호 복호화
exports.getDecrypt = function (arg) {
  let algorithm = "aes-256-cbc";
  let ourKey = "megaitrea.auth";
  const cipher = crypto.createCipher(algorithm, ourKey);
  let result = cipher.update(arg, "base64", "utf-8");
  result += cipher.final("utf-8");
  return result;
};
