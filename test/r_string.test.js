
test( "string:times", function() {
  ok( "hi".times(0) == "", "Passed!" );
  ok( "hi".times(1) == "hi", "Passed!" );
  ok( "hi".times(3) == "hihihi", "Passed!" );
});

test("string:compare", function() {
  ok( "abc".compare("abc") == 0, "Passed!");
  ok( "abc".compare("ab") == 1, "Passed!");
  ok( "abc".compare("abcd") == -1, "Passed!");
  ok( "abc".compare("Abc") == 1, "Passed!");
  ok( "abc".compare("ABc") == 1, "Passed!");
  ok( "abc".compare("12abc") == 1, "Passed!");
  ok( "abc".compare("") == 1, "Passed!");
});

test("string:casecmp", function() {
  ok( "abc".casecmp("abc") == 0, "Passed!");
  ok( "abc".casecmp("ab") == 1, "Passed!");
  ok( "abc".casecmp("abcd") == -1, "Passed!");
  ok( "abc".casecmp("Abc") == 0, "Passed!");
  ok( "abc".casecmp("ABc") == 0, "Passed!");
  ok( "abc".casecmp("12abc") == 1, "Passed!");
  ok( "abc".casecmp("") == 1, "Passed!");
});

test("string::ascii_only", function() {
  ok( "abcdef".ascii_only() == true, "Passed!");
  ok( "abcdef\u6666".ascii_only() == false, "Passed!");

  ok( "abcdef\u0128".ascii_only() == false, "Passed!");
  ok( "".ascii_only() == true, "Passed!");
});

test("string:bytes", function() {
  deepEqual( "abc".bytes(), [97,98,99], "Passed!" );

  var str = [];
  "abc".bytes( function(c){
    str.push(c + "-");
  });
  deepEqual( str, ["97-","98-","99-"], "Passed!");

});


test("string:chars", function() {
  deepEqual( "abc".chars(), ["a","b","c"], "Passed!" );

  var str = [];
  "abc".chars( function(c){
    str.push(c + "-");
  });
  deepEqual( str, ["a-","b-","c-"], "Passed!");

});

test("string:downcase", function(){
  ok( "Abc".downcase() == "abc", "Passed!");
  ok( "1bc".downcase() == "1bc", "Passed!");
  ok( "ABC".downcase() == "abc", "Passed!");
  ok( "".downcase() == "", "Passed!");
  ok( "123".downcase() == "123", "Passed!");
  ok( "-+=".downcase() == "-+=", "Passed!");
});

test("string:upcase", function(){
  ok( "abc".upcase() == "ABC", "Passed!");
  ok( "1bc".upcase() == "1BC", "Passed!");
  ok( "ABC".upcase() == "ABC", "Passed!");
  ok( "".upcase() == "", "Passed!");
  ok( "123".upcase() == "123", "Passed!");
  ok( "-+=".upcase() == "-+=", "Passed!");
});

test("string:capitalize", function(){
  ok( "abc".capitalize() == "Abc", "Passed!");
  ok( "1bc".capitalize() == "1bc", "Passed!");
  ok( "ABC".capitalize() == "Abc", "Passed!");
  ok( "".capitalize() == "", "Passed!");
  ok( "123".capitalize() == "123", "Passed!");
  ok( "-+=".capitalize() == "-+=", "Passed!");
});