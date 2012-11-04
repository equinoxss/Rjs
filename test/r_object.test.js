test("object:class", function () {
  function Foo() {}
  var obj = new Foo();
  console.log(obj.class());
  equal(obj.class(), Foo, "Class should equal the instance function.");
});

test("object:clone", function () {
  var obj = {
    foo: "bar"
  };
  var other = obj.clone();

  equal(other.foo, obj.foo, "The cloned keys should be equal.");
});