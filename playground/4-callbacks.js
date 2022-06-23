const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
};

add(5, 5, (sum) => {
  console.log("sum is: " + sum);
});
