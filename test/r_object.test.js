test("object:class", function () {
  function Foo() {}
  var obj = new Foo();
  equal(obj.class(), Foo, "Class should equal the instance function.");
});

test("object:clone", function () {
  var obj = {
    foo: "bar"
  };
  var other = obj.clone();

  equal(other.foo, obj.foo, "The cloned keys should be equal.");
});

test("object:define_singleton_method", function () {
  function Foo() {}
  var obj = new Foo();
  obj.define_singleton_method("hello", function () {
    return "hello";
  });
  equal(Foo.hello(), "hello", "The singleton method should be defined.");
});

test("object:display", function () {
  var passed = false;
  port = {
    write: function () {
      passed = true;
    }
  };
  new Object().display(port);
  ok(passed, "The port's write method should be called.");
});