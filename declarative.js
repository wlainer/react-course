var numbers = [4,2,3,6]
var total = numbers.reduce(function(previous, current) {
  return previous + current;
});

console.log(total);