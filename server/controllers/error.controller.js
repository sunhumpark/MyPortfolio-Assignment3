function handleError(req, res) {
// Your code to handle the error
}
function getErrorMessage(errMsg) {
return errMsg.code === 11000 ? "Email already exists" : errMsg.message;
}
// Export the controller function
export default {
handleError: handleError,
getErrorMessage:getErrorMessage
};