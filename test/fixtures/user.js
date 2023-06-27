const User = require('../../src/models/userModel');
async function deleteUser() {
  await User.deleteMany({});
}

module.exports = {
  deleteUser,
};