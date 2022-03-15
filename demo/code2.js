{
  // function sayHi() {
  //   console.log("Hello,", this.name);
  // }
  // var person = {
  //   name: "YvetteLau",
  //   sayHi,
  // };
  // var name = "Wiliam";
  // person.sayHi();
}
{
  // function foo() {
  //   console.log(this.a);
  // }
  // function doFoo() {
  //   foo();
  // }
  // var obj = {
  //   a: "YvetteLau",
  //   doFoo,
  // };
  // var a = "Wiliam";
  // obj.doFoo();
}
{
  function sayHi() {
    console.log("Hello,", this.name);
  }
  var person1 = {
    name: "YvetteLau",
    sayHi: function () {
      setTimeout(function () {
        console.log("Hello,", this.name);
      });
    },
  };
  var person2 = {
    name: "Christina",
    sayHi: sayHi,
  };
  var name = "Wiliam";
  person1.sayHi();
  setTimeout(person2.sayHi, 100);
  setTimeout(function () {
    person2.sayHi();
  }, 200);
}
{
  var a = 10;
  var obj = {
    a: 20,
    say: () => {
      console.log(this.a);
    },
  };
  obj.say();

  var anotherObj = { a: 30 };
  obj.say.apply(anotherObj);
}
{
  function a() {
    console.log(this);
  }
  a.call(null);
}
{
  function isCycle(target) {
    let map = new Map();
    let isCycled = false;
    const detect = (target) => {
      if (typeof target === "object") {
        let newObject = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
          isCycled = true;
          return;
        }
        map.set(target, newObject);
        for (const key in target) {
          newObject[key] = detect(target[key], map);
        }
      }
    };
    detect(target);
    return isCycled;
  }
  let obj = { a: { b: 1 }, b: 2 };
  obj.c = obj.a.b;
  console.log(isCycle(obj));
}
{
  const fn = () => {};
  fn();
}
{
  const fn = () => {};
  fn();
}
{
  const fn = () => {};
  fn();
}
