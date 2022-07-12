const genMessages = (text) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};

const genLocationMessage = (text) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  genMessages,
  genLocationMessage,
};
