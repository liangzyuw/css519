function findUserByCredentials(users, email, password) {
  return users.find(
    (user) => user.email === email && user.password === password
  ) || null;
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}

function isInstructor(user) {
  return user && user.role === "instructor";
}

module.exports = {
  findUserByCredentials,
  publicUser,
  isInstructor,
};