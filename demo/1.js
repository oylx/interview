{
  const fn = () => {
    let a = [1, 2, 3, 4];
    let b = a.toString();
    let c = JSON.stringify(a);
    let toString = Object.prototype.toString; // {}.toString
    console.log(b);
    console.log(toString.call(a));
    console.log(c);
  };
  // fn();
}

{
  const fn = () => {
    let F = function () {
      console.log(1);
    };
    let f = new F();

    if (f.__proto__ === F.prototype) {
      console.log(2);
    } //1.对象.__proto__===构造函数.prototype,注意f为new出来的对象

    if (f.__proto__ !== Function.prototype) {
      console.log(2.1);
    }
    if (F.__proto__ === Function.prototype) {
      console.log(3);
    } //2.函数.__proto__===Function.prototype
    if (Function.__proto__ === Function.prototype) {
      console.log(5);
    } //2.Function.__proto__===Function.prototype

    if (F.prototype.__proto__ === Object.prototype) {
      console.log(4);
    } //3.函数.prototype.__proto__===Object.prototype

    if (Function.prototype.__proto__ === Object.prototype) {
      console.log(6);
    } //3.Function.prototype.__proto__===Object.prototype

    if (Object.__proto__ === Function.prototype) {
      console.log(7);
    }

    if (Object.prototype.__proto__ === Function.prototype) {
      console.log(8);
    } //不成立，并且Object.prototype.__proto__为null
  };
  // fn();
}

{
  // var 对象 = new 函数()
  // 对象.__proto__ === 函数.prototype

  // 1.宗旨    对象.__proto__ === 构造函数.prototype === Object.getPrototypeOf(对象)
  // 2.        函数.__proto__ === Function.prototype   函数(包括普通函数/Function[包含Number/String/Boolean/Object/Array])的构造函数是Function
  // 3.        函数.prototype.__proto__ === Object.prototype(函数(包括普通函数以及Function[包含Number/String/Boolean/Object/Array])) (函数.prototype)的构造函数是Object
  // 4.总结    严格遵循[对象.__proto__===构造函数.prototype],除了(prototype)的构造函数是Object,其余(函数、Object)的构造函数是Function,遇到fn.__proto__.__proto__,将fn.__proto__替换为Function.prototype,结果为Object.prototype
  // 5.				3的例外 Object.prototype.__proto__为null
  // 6.       只有函数才可以写prototype
  const fn = () => {
    var obj1 = new Object();
    var obj2 = { key: "hi" };
    console.log(obj1.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
    console.log(obj2.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
    console.log(obj2.prototype); // undefined,只有函数才可以写prototype
    console.log(Object.getPrototypeOf(obj1)); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
    console.log(Object.prototype); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
    // 具体打印
    // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
    // constructor: ƒ Object()
    // hasOwnProperty: ƒ hasOwnProperty()
    // isPrototypeOf: ƒ isPrototypeOf()
    // propertyIsEnumerable: ƒ propertyIsEnumerable()
    // toLocaleString: ƒ toLocaleString()
    // toString: ƒ toString()
    // valueOf: ƒ valueOf()
    // __defineGetter__: ƒ __defineGetter__()
    // __defineSetter__: ƒ __defineSetter__()
    // __lookupGetter__: ƒ __lookupGetter__()
    // __lookupSetter__: ƒ __lookupSetter__()
    // __proto__: null 此处高能:Object.prototype.__proto__是null
    // get __proto__: ƒ __proto__()
    // set __proto__: ƒ __proto__()
    console.log(Object.prototype.__proto__); // 此处高能:Object.prototype.__proto__是null

    var F = function () {
      console.log(1);
    };
    // var F = () => {}; // 箭头函数不能用做构造函数
    console.log(F);
    var f = new F();
    if (F.prototype.__proto__ === Object.prototype) console.log(4);
    // 不成立，并且Object.prototype.__proto__为null
    if (Object.prototype.__proto__ === Function.prototype) console.log(8);
    // 注意看题，反向思考，左右互换
    if (Object.prototype === Object.getPrototypeOf(obj1)) console.log(9);

    console.log(Number); // ƒ Number() { [native code] }
    console.log(typeof Number);
    console.log(String); // ƒ String() { [native code] }
    console.log(typeof String);
    console.log(Boolean); // ƒ Boolean() { [native code] }
    console.log(typeof Boolean);
    console.log(Object); // ƒ Object() { [native code] }
    console.log(typeof Object); // function

    console.log(Array); // ƒ Array() { [native code] }
    console.log(typeof Array); // function
    console.log(Function); // ƒ Function() { [native code] }
    console.log(typeof Function); // function

    if (Array.__proto__ === Function.prototype) console.log(2); // Array/Number/String/Boolean/Function/Object都一样
    console.log(true.__proto__); // Boolean {false, constructor: ƒ, toString: ƒ, valueOf: ƒ}
    console.log({}.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
    console.log(new Number(1).__proto__); // Number {0, constructor: ƒ, toExponential: ƒ, toFixed: ƒ, toPrecision: ƒ, …}
    console.log([].__proto__); // [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
    console.log("".__proto__); // String {'', constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}
  };
  fn();
}
