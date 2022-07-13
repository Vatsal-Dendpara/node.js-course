const genMessages = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};

const genLocationMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  genMessages,
  genLocationMessage,
};
