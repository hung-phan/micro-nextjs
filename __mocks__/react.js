// https://github.com/airbnb/enzyme/issues/1875
// This is to fix the error with React.memo

module.exports = {
  ...require("react"),
  memo: x => x
};
