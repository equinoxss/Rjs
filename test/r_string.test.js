
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

test("string:each_char", function() {
  deepEqual( "abc".each_char(), ["a","b","c"], "Passed!" );

  var str = [];
  "abc".each_char( function(c){
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

test("string:chomp", function(){
  ok( "hello".chomp() == "hello", "Passed!");
  ok( "hello\n".chomp() == "hello", "Passed!");
  ok( "hello\r\n".chomp() == "hello", "Passed!");
  ok( "hello\n\r".chomp() == "hello", "Passed!");
  ok( "hello\r".chomp() == "hello", "Passed!");
  ok( "hello \n there".chomp() == "hello \n there", "Passed!");
  ok( "hello".chomp("llo") == "he", "Passed!");
});

test("string:chop", function(){
  ok( "hello".chop() == "hell", "Passed!");
  ok( "hello\n".chop() == "hello", "Passed!");
  ok( "hello\r\n".chop() == "hello", "Passed!");
  ok( "hello\n\r".chop() == "hello", "Passed!");
  ok( "hello\r".chop() == "hello", "Passed!");
  ok( "hello \n there".chop() == "hello \n ther", "Passed!");
  ok( "hello".chop().chop() == "hel", "Passed!");
});

// test("string:intersection", function(){
//   var result = "hello".intersection("lo");
//   ok( result == "lo", "Was: " + result + "  expected: lo");
  
//   result = "hello".intersection("hello");
//   ok( result == "hello", "Was: " + result + "  expected: hello");
  
//   result = "hello".intersection("no");
//   ok( result == "o", "Was: " + result + "  expected: o");

//   result = "hello".intersection("bird");
//   ok( result == "", "Was: " + result + "  expected: <blank>");

//   ok( "hello".intersection("olleh") == "hello", "Passed!");
//   ok( "hello".intersection("he","llo") == "hello", "Passed!");
//   ok( "hello".intersection("") == "", "Passed!");
// });

// test("string:union", function(){
//   ok( "hello".union("lo") == "hello", "Was: " + "hello".union("lo") + "  expected: hello");
//   ok( "hello".union("hello") == "hello", "Was: " + "hello".union("hello") + "  expected: hello");
//   ok( "hello".union("no") == "hellon", "Was: " + "hello".union("no") + "  expected: hellon");
//   ok( "hello".union("bird") == "hellobird", "Was: " + "hello".union("bird") + "  expected: hellobird");
//   ok( "hello".union("olleh") == "hello", "Was: " + "hello".union("olleh") + "  expected: hello");
//   ok( "hello".union("he","llo") == "hello", "Was: " + "hello".union("he","llo") + "  expected: hello");
//   ok( "hello".union("") == "hello", "Was: " + "hello".union("") + "  expected: hello");
// });

test("string:hash_code", function(){
  ok( "hello".hash_code() == 99162322, "Was: " + "hello".hash_code() + "  expected: 99162322");
  ok( "Hello".hash_code() == 69609650, "Was: " + "hello".hash_code() + "  expected: 69609650");
  ok( "hEllo".hash_code() == 98209010, "Was: " + "hello".hash_code() + "  expected: 98209010");
  ok( "Hello".hash_code() != "hello".hash_code(), "Was: " + ("Hello".hash_code() != "hello".hash_code()) + "  expected: true");
  ok( "The lazy fox jumped".hash_code() == -75483944933, "Was: " + "The lazy fox jumped".hash_code() + "  expected: -75483944933");
  ok( "12345678".hash_code() == -79170764668, "Was: " + "12345678".hash_code() + "  expected: -79170764668");
  ok( "Thi!! is99 a$%^".hash_code() == 229496955239, "Was: " + "Thi!! is99 a$%^".hash_code() + "  expected: 229496955239");
});

test("string:each_line", function(){
  deepEqual( "hello".each_line(), ["hello"], "Passed!");
  deepEqual( "hello\rthere".each_line(), ["hello","there"], "Passed!");
  deepEqual( "hello\r\nthere\rdude\n".each_line(), ["hello","there","dude",""], "Passed!");
});

test("string:lines", function(){
  var buffer = []
  "hello".lines( function(line) {
    buffer.push(line);
  });
  deepEqual(buffer, ["hello"]);

  buffer = []
  "hello\rthere".lines( function(line) {
    buffer.push(line);
  });
  deepEqual(buffer, ["hello","there"]);

  buffer = []
  "hello\r\nthere\rdude\n".lines( function(line) {
    buffer.push(line);
  });
  deepEqual(buffer, ["hello","there","dude",""]);
});

test("string:empty", function(){
  ok( "hello".is_empty() == false, "Was: " + "hello".is_empty() + "  expected: false");
  ok( ".".is_empty() == false, "Was: " + ".".is_empty() + "  expected: false");
  ok( "".is_empty() == true, "Was: " + "".is_empty() + "  expected: true");
});

test("string:end_with", function(){
  ok( "hello".end_with("o") == true, "Was: " + "hello".end_with("o") + "  expected: true");
  ok( "icon.png".end_with(".png") == true, "Was: " + "icon.png".end_with(".png") + "  expected: true");
  ok( "/usr/local/bin/app/logo.jpeg".end_with(".png",".gif",".jpg") == false, "Was: " + "/usr/local/bin/app/logo.jpeg".end_with(".png",".gif",".jpg") + "  expected: false");
  ok( "[ERROR]".end_with("[ERROR]") == true, "Was: " + "[ERROR]".end_with("[ERROR]") + "  expected: true");
});

test("string:is_eql", function(){
  ok( "hello".is_eql() == false, "Was: " + "hello".is_eql() + "  expected: false");
  ok( "hello".is_eql("hello") == true, "Was: " + ".".is_eql("hello") + "  expected: true");
  ok( "hello".is_eql("hellO") == false, "Was: " + "hello".is_eql("hellO") + "  expected: false");
  ok( "#$%^#".is_eql("#$%^#") == true, "Was: " + "#$%^#".is_eql("#$%^#") + "  expected: true");
});

test("string:gsub", function(){
  ok( "hello".gsub("l","r") == "herro", "Was: " + "hello".gsub("l","r") + "  expected: true");
  ok( "hello".gsub(/E/,"R") == "hello", "Was: " + "hello".gsub("E","R") + "  expected: true");
  ok( "the lazy brown fox".gsub(" ", "") == "thelazybrownfox", "Was: " + "the lazy brown fox".gsub(" ", "") + "  expected: true");
  ok( "#$%^#".gsub("#","") != "#$%^#", "Was: " + "#$%^#".gsub("#","") + "  expected: false");
});

test("string:lstrip", function(){
  ok( "hello".lstrip() == "hello", "Was: " + "hello".lstrip() + "  expected: true");
  ok( "    hello".lstrip() == "hello", "Was: " + "    hello".lstrip() + "  expected: true");
  ok( "       hello  ".lstrip() == "hello  ", "Was: " + "       hello  ".lstrip() + "  expected: true");
});

test("string:rstrip", function(){
  ok( "hello".rstrip() == "hello", "Was: " + "hello".rstrip() + "  expected: true");
  ok( "hello   ".rstrip() == "hello", "Was: " + "hello   ".rstrip() + "  expected: true");
  ok( "hello\r\n  ".rstrip() == "hello", "Was: " + "hello\r\n  ".rstrip() + "  expected: true");
});

test("string:strip", function(){
  ok( "hello".strip() == "hello", "Was: " + "hello".strip() + "  expected: true");
  ok( "  hello   ".strip() == "hello", "Was: " + "  hello  ".strip() + "  expected: true");
  ok( "   hello\r\n  ".strip() == "hello", "Was: " + "    hello\r\n  ".strip() + "  expected: true");
});

test("string:hex", function(){
  ok( "1".hex() == 1, "Was: " + "1".hex() + "  expected: 1");
  ok( "-10".hex() == -16, "Was: " + "-10".hex() + "  expected: -16");
  ok( "0x1".hex() == 1, "Was: " + "0x1".hex() + "  expected: 1");
  ok( isNaN( "sbcee".hex() ), "Was: " + "sbcee".hex() + "  expected: NaN");
  ok( "0x100".hex() == 256, "Was: " + "0x1".hex() + "  expected: 256");
  ok( "100".hex() == 256, "Was: " + "0x1".hex() + "  expected: 256");
});


