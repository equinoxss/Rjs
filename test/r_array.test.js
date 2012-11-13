if (!window.verify_result) {
  window.verify_result = function(v1, v2) {
    ok(v1 == v2, "Was: >" + v1 + "<  Expected: >" + v2 + "<");
  }
  window.verify_not_result = function(v1, v2) {
    ok(v1 != v2, "Was: >" + v1 + "<  Not expected: >" + v2 + "<");
  }
  window.verify_isNaN = function(v1) {
    ok( isNaN(v1), "Was: >" + v1 + "<  Expected: isNan");
  }
  window.verify_deep_equal = function(v1,v2) {
    deepEqual(v1, v2);
  }
}

test("array:times", function() {
  verify_deep_equal([1,2].times(), []);
  verify_deep_equal([1,2].times(1), [1,2]);
  verify_deep_equal([1,2].times(2), [1,2,1,2]);
});

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

test("array:intersect", function() {
  throws(function(){[1,2].intersect();}, "missing argument", "failed");
  throws(function(){[1,2].intersect("abc");}, "invalid argument", "failed");

  verify_deep_equal([1,2].intersect([1]), [1]);
  verify_deep_equal([1,2].intersect([1,2]), [1,2]);
  verify_deep_equal([1,2].intersect([3,4]), []);
  verify_deep_equal([1,2].intersect([1,2,4,5,6,6,7,1,3,2,3,1,3,2,2,2]), [1,2]);

  verify_deep_equal(["a","b"].intersect(["a"]), ["a"]);
  verify_deep_equal(["a","b"].intersect(["a","b"]), ["a","b"]);
  verify_deep_equal(["a","b"].intersect(["a","b","c","a","b","d","e"]), ["a","b"]);

  verify_deep_equal([1,"a",2,"b"].intersect([3,4]), []);
  verify_deep_equal([1,"a",2,"b"].intersect([1,1,"b","b","c","c"]), [1,"b"]);

});

test("array:union", function() {
    verify_deep_equal([1,2].union(), [1,2]);
    verify_deep_equal([1,2].union([1]), [1,2,1]);
    verify_deep_equal([1,2].union([1],[2],["a"]), [1,2,1,2,"a"]);
});

