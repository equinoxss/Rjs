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

test("array:includes", function() {
    verify_result([1,2].includes(1), true);
    verify_result([1,2].includes(""), false);
    verify_result([1,2].includes(3), false);
});

test("array:delete_if", function() {
  verify_deep_equal([1,2].delete_if(function(i){return false;}), [1,2]);
  verify_deep_equal([1,2].delete_if(function(i){return true;}), []);
  verify_deep_equal([1,2].delete_if(function(i){return i == 1;}), [2]);
  verify_deep_equal([1,2,3,4,1,1,5,3,1,6].delete_if(function(i){return i == 1;}), [2,3,4,5,3,6]);
});

test("array:reject", function() {
  verify_deep_equal([1,2].reject(function(i){return false;}), [1,2]);
  verify_deep_equal([1,2].reject(function(i){return true;}), []);
  verify_deep_equal([1,2].reject(function(i){return i == 1;}), [2]);
  verify_deep_equal([1,2,3,4,1,1,5,3,1,6].reject(function(i){return i == 1;}), [2,3,4,5,3,6]);
});

test("array:compare", function() {
  verify_result(["a","b"].compare(["a","b"]), 0);
  verify_result(["a","b"].compare(["a"]), 1);
  verify_result(["a","b"].compare(["a","b","c"]), -1);
});

test("array:equals", function() {
  verify_result(["a","b"].equals(["a","b"]), true);
  verify_result(["a","b"].equals(["a"]), false);
  verify_result(["a","b"].equals(["a","b","c"]), false);
});

test("array:map", function() {
  verify_deep_equal([1,2].map(function(i){return i+1;}), [2,3]);
  verify_deep_equal([1,2].map(function(i){return "a"+i;}), ["a1","a2"]);
  verify_deep_equal(["a","b","c"].map(function(i){return i.upcase()}), ["A","B","C"]);
});
