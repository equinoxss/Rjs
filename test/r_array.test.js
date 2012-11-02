
test("array:each", function() {

  var data = [1,2,3,4,5],
      data2 = [1,"hi",{"this":"that"}],
      buffer = [];

  [].each(function(item) {
    buffer.push(item);
  });
  deepEqual(buffer, []);   

  buffer = [];
  data.each(function(item) {
    buffer.push(item);
  });
  deepEqual(buffer, data);

  buffer = [];
  data2.each(function(item) {
    buffer.push(item);
  });
  deepEqual(buffer, data2);

});