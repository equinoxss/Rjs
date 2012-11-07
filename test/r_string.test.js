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

test( "string:times", function() {
  verify_result( "hi".times(0), "" );
  verify_result( "hi".times(1), "hi" );
  verify_result( "hi".times(3), "hihihi" );
});

test("string:compare", function() {
  verify_result( "abc".compare("abc"), 0 );
  verify_result( "abc".compare("ab"), 1 );
  verify_result( "abc".compare("abcd"), -1 );
  verify_result( "abc".compare("Abc"), 1 );
  verify_result( "abc".compare("ABc"), 1 );
  verify_result( "abc".compare("12abc"), 1 );
  verify_result( "abc".compare(""), 1 );
});

test("string:casecmp", function() {
  verify_result( "abc".casecmp("abc"), 0 );
  verify_result( "abc".casecmp("ab"), 1 );
  verify_result( "abc".casecmp("abcd"), -1 );
  verify_result( "abc".casecmp("Abc"), 0 );
  verify_result( "abc".casecmp("ABc"), 0 );
  verify_result( "abc".casecmp("12abc"), 1 );
  verify_result( "abc".casecmp(""), 1 );
});

test("string::ascii_only", function() {
  verify_result( "abcdef".ascii_only(), true );
  verify_result( "abcdef\u6666".ascii_only(), false );

  verify_result( "abcdef\u0128".ascii_only(), false );
  verify_result( "".ascii_only(), true );
});

test("string:bytes", function() {
  deepEqual( "abc".bytes(), [97,98,99]  );

  var str = [];
  "abc".bytes( function(c){
    str.push(c + "-");
  });
  deepEqual( str, ["97-","98-","99-"] );

});

test("string:chars", function() {
  deepEqual( "abc".chars(), ["a","b","c"]  );

  var str = [];
  "abc".chars( function(c){
    str.push(c + "-");
  });
  deepEqual( str, ["a-","b-","c-"] );
});

test("string:each_char", function() {
  deepEqual( "abc".each_char(), ["a","b","c"]  );

  var str = [];
  "abc".each_char( function(c){
    str.push(c + "-");
  });
  deepEqual( str, ["a-","b-","c-"] );
});


test("string:downcase", function(){
  verify_result( "Abc".downcase(), "abc" );
  verify_result( "1bc".downcase(), "1bc" );
  verify_result( "ABC".downcase(), "abc" );
  verify_result( "".downcase(), "" );
  verify_result( "123".downcase(), "123" );
  verify_result( "-+=".downcase(), "-+=" );
});

test("string:upcase", function(){
  verify_result( "abc".upcase(), "ABC" );
  verify_result( "1bc".upcase(), "1BC" );
  verify_result( "ABC".upcase(), "ABC" );
  verify_result( "".upcase(), "" );
  verify_result( "123".upcase(), "123" );
  verify_result( "-+=".upcase(), "-+=" );
});

test("string:capitalize", function(){
  verify_result( "abc".capitalize(), "Abc" );
  verify_result( "1bc".capitalize(), "1bc" );
  verify_result( "ABC".capitalize(), "Abc" );
  verify_result( "".capitalize(), "" );
  verify_result( "123".capitalize(), "123" );
  verify_result( "-+=".capitalize(), "-+=" );
});

test("string:chomp", function(){
  verify_result( "hello".chomp(), "hello" );
  verify_result( "hello\n".chomp(), "hello" );
  verify_result( "hello\r\n".chomp(), "hello" );
  verify_result( "hello\n\r".chomp(), "hello" );
  verify_result( "hello\r".chomp(), "hello" );
  verify_result( "hello \n there".chomp(), "hello \n there" );
  verify_result( "hello".chomp("llo"), "he" );
});

test("string:chop", function(){
  verify_result( "hello".chop(), "hell" );
  verify_result( "hello\n".chop(), "hello" );
  verify_result( "hello\r\n".chop(), "hello" );
  verify_result( "hello\n\r".chop(), "hello" );
  verify_result( "hello\r".chop(), "hello" );
  verify_result( "hello \n there".chop(), "hello \n ther" );
  verify_result( "hello".chop().chop(), "hel" );
});

// test("string:intersection", function(){
//   var result = "hello".intersection("lo");
//   verify_result( result, "lo", "Was: " + result + "  expected: lo");
  
//   result = "hello".intersection("hello");
//   verify_result( result, "hello", "Was: " + result + "  expected: hello");
  
//   result = "hello".intersection("no");
//   verify_result( result, "o", "Was: " + result + "  expected: o");

//   result = "hello".intersection("bird");
//   verify_result( result, "", "Was: " + result + "  expected: <blank>");

//   verify_result( "hello".intersection("olleh"), "hello" );
//   verify_result( "hello".intersection("he","llo"), "hello" );
//   verify_result( "hello".intersection(""), "" );
// });

// test("string:union", function(){
//   verify_result( "hello".union("lo"), "hello", "Was: " + "hello".union("lo") + "  expected: hello");
//   verify_result( "hello".union("hello"), "hello", "Was: " + "hello".union("hello") + "  expected: hello");
//   verify_result( "hello".union("no"), "hellon", "Was: " + "hello".union("no") + "  expected: hellon");
//   verify_result( "hello".union("bird"), "hellobird", "Was: " + "hello".union("bird") + "  expected: hellobird");
//   verify_result( "hello".union("olleh"), "hello", "Was: " + "hello".union("olleh") + "  expected: hello");
//   verify_result( "hello".union("he","llo"), "hello", "Was: " + "hello".union("he","llo") + "  expected: hello");
//   verify_result( "hello".union(""), "hello", "Was: " + "hello".union("") + "  expected: hello");
// });

test("string:hash_code", function(){
  verify_result( "hello".hash_code(), 99162322 );
  verify_result( "Hello".hash_code(), 69609650 );
  verify_result( "hEllo".hash_code(), 98209010 );
  verify_not_result( "Hello".hash_code(), "hello".hash_code() );
  verify_result( "The lazy fox jumped".hash_code(), -75483944933 );
  verify_result( "12345678".hash_code(), -79170764668 );
  verify_result( "Thi!! is99 a$%^".hash_code(), 229496955239 );
});

test("string:each_line", function(){
  deepEqual( "hello".each_line(), ["hello"] );
  deepEqual( "hello\rthere".each_line(), ["hello","there"] );
  deepEqual( "hello\r\nthere\rdude\n".each_line(), ["hello","there","dude",""] );
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
  verify_result( "hello".is_empty(), false );
  verify_result( ".".is_empty(), false );
  verify_result( "".is_empty(), true );
});

test("string:end_with", function(){
  verify_result( "hello".end_with("o"), true );
  verify_result( "icon.png".end_with(".png"), true );
  verify_result( "/usr/local/bin/app/logo.jpeg".end_with(".png",".gif",".jpg"), false );
  verify_result( "[ERROR]".end_with("[ERROR]"), true );
});

test("string:eql", function(){
  verify_result( "hello".eql(), false );
  verify_result( "hello".eql("hello"), true );
  verify_result( "hello".eql("hellO"), false );
  verify_result( "#$%^#".eql("#$%^#"), true );
});

test("string:equals", function(){
  verify_result( "hello".equals(), false );
  verify_result( "hello".equals("hello"), true );
  verify_result( "hello".equals("hellO"), false );
  verify_result( "#$%^#".equals("#$%^#"), true );
});

test("string:gsub", function(){
  verify_result( "hello".gsub("l","r"), "herro" );
  verify_result( "hello".gsub(/E/,"R"), "hello" );
  verify_result( "the lazy brown fox".gsub(" ", ""), "thelazybrownfox" );
  verify_not_result( "#$%^#".gsub("#",""), "#$%^#" );
});

test("string:lstrip", function(){
  verify_result( "hello".lstrip(), "hello" );
  verify_result( "    hello".lstrip(), "hello" );
  verify_result( "       hello  ".lstrip(), "hello  " );
});

test("string:rstrip", function(){
  verify_result( "hello".rstrip(), "hello" );
  verify_result( "hello   ".rstrip(), "hello" );
  verify_result( "hello\r\n  ".rstrip(), "hello" );
});

test("string:strip", function(){
  verify_result( "hello".strip(), "hello" );
  verify_result( "  hello   ".strip(), "hello" );
  verify_result( "   hello\r\n  ".strip(), "hello" );
});

test("string:hex", function(){
  verify_result( "1".hex(), 1 );
  verify_result( "-10".hex(), -16 );
  verify_result( "0x1".hex(), 1 );
  verify_isNaN( "sbcee".hex() );
  verify_result( "0x100".hex(), 256 );
  verify_result( "100".hex(), 256);
});

test("string:include", function(){
  verify_result( "hello".include("lo"), true );
  verify_result( "hello".include("ol"), false );
  verify_result( "hello".include("hello"), true );
});

test("string:includes", function(){
  verify_result( "hello".includes("lo"), true );
  verify_result( "hello".includes("ol"), false );
  verify_result( "hello".includes("hello"), true );
});

test("string:index", function(){
  verify_result( "hello".index("lo"), 3 );
  verify_result( "hello".index("ol"), null );
  verify_result( "hello".index("hello"), 0 );

  verify_result( "hello".index("lo", 1), 3 );
  verify_result( "hello".index("ol", -3), null );
  verify_result( "hello".index("hello", -5), 0 );

  verify_result( "hello".index(/lo/, 1), 3 );
  verify_result( "hello".index(/ol/, -3), null );
  verify_result( "hello".index(/hello/, -5), 0 );
});

test("string:insert", function(){
  verify_result( "abcd".insert(0, 'X'), "Xabcd" );
  verify_result( "abcd".insert(3, 'X'), "abcXd" );
  verify_result( "abcd".insert(4, 'X'), "abcdX" );
  verify_result( "abcd".insert(-3, 'X'), "abXcd" );
  verify_result( "abcd".insert(-1, 'X'), "abcdX" );
});

test("string:ljust", function(){
  verify_result( "abcd".ljust(0), "abcd" );
  verify_result( "abcd".ljust(5), "abcd " );
  verify_result( "abcd".ljust(10), "abcd      " );
  verify_result( "abcd".ljust(5, '_'), "abcd_" );
  verify_result( "abcd".ljust(10, '_ignore'), "abcd______" );
});

test("string:rjust", function(){
  verify_result( "abcd".rjust(0), "abcd" );
  verify_result( "abcd".rjust(5), " abcd" );
  verify_result( "abcd".rjust(10), "      abcd" );
  verify_result( "abcd".rjust(5, '_'), "_abcd" );
  verify_result( "abcd".rjust(10, '_ignore'), "______abcd" );
});

test("string:center", function(){
  verify_result( "abcd".center(0), "abcd" );
  verify_result( "abcd".center(5), " abcd" );
  verify_result( "abcd".center(10), "   abcd   " );
  verify_result( "abcd".center(5, '_'), "_abcd" );
  verify_result( "abcd".center(10, '_ignore'), "___abcd___" );
});

test("string:partition", function() {
  verify_deep_equal( "hello".partition("l"), ["he", "l", "lo"] );
  verify_deep_equal( "hello".partition("x"), ["hello", "", ""] );
  verify_deep_equal( "hello".partition(/.l/), ["h", "el", "lo"] );
});

test("string:reverse", function(){
  verify_result( "abcd".reverse(0), "dcba" );
  verify_result( "stressed".reverse(), "desserts" );
  verify_result( "!@#$".reverse(), "$#@!" );
});

test("string:rindex", function(){
  verify_result( "hello".rindex('e'), 1 );
  verify_result( "hello".rindex('l'), 3 );
  verify_result( "hello".rindex('a'), null );
  verify_result( "hello".rindex(/[aeiou]/), 4);
  verify_result( "hello".rindex(/[aeiou]/, -2), 1);
});

test("string:scan", function() {
  verify_deep_equal( "hello".scan(/./), ["h", "e", "l", "l", "o"] );
  verify_deep_equal( "hello".scan(/../), ["he", "ll"] );
  verify_deep_equal( "hello".scan(/.l/), ["el"] );

  var buffer = []
  "hello".scan(/./, function(match) {
    buffer.push(match);
  });
  deepEqual(buffer, ["h", "e", "l", "l", "o"]);
});

test("string:squeeze", function(){
  verify_result( "aaaabbbccdd".squeeze(), "abcd" );
  verify_result( "stressed".squeeze(), "stresed" );
  verify_result( "!!    @##$".squeeze(), "! @#$" );
});

test("string:start_with", function(){
  verify_result( "hello".start_with("he"), true );
  verify_result( "hello".start_with("hello"), true );
  verify_result( "hello".start_with("heaven","hell"), true );
  verify_result( "hello".start_with("cat","dog"), false );
});

test("string:translate", function() {
  verify_result( "hello".translate('el', 'ip'), "hippo" );
  verify_result( "hello".translate('aeiou', '*'), "h*ll*" );
  verify_result( "hello".translate('^aeiou', '*'), "*e**o" );
});

