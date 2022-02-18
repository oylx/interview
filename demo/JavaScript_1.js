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
  function myInstanceof(left, right) {
    // 获取对象的原型
    let proto = Object.getPrototypeOf(left);
    // 获取构造函数的 prototype 对象
    let prototype = right.prototype;

    // 判断构造函数的 prototype 对象是否在对象的原型链上
    while (true) {
      if (!proto) return false;
      if (proto === prototype) return true;
      // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
      proto = Object.getPrototypeOf(proto);
    }
  }

  const left = new Number(1);
  const right = Array;
  // console.log(myInstanceof(left, right));
}

{
  const fn = () => {
    const a = new Number(1);
    console.log(1, Number);
    console.log(2, Number.prototype);
    console.log(3, Number.__proto__);

    console.log(4, Number.prototype === a.__proto__);
    console.log(5, Number.__proto__ === Function.prototype);

    console.log(6, Function);
    console.log(7, Number.__proto__ === Function.prototype);
    console.log(8, Function.__proto__ === Function.prototype);

    console.log(9, Function.prototype);
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

    // 原型都有toString valueOf方法
    console.log(
      Number,
      typeof Number,
      Object.getPrototypeOf(Number) === Function.prototype
    ); // ƒ Number() { [native code] }
    console.log(new Number(1).__proto__);
    // constructor: ƒ Number()
    // toExponential: ƒ toExponential()
    // toFixed: ƒ toFixed()
    // toLocaleString: ƒ toLocaleString()
    // toPrecision: ƒ toPrecision()
    // toString: ƒ toString()
    // valueOf: ƒ valueOf()
    // [[Prototype]]: Object
    // [[PrimitiveValue]]: 0
    console.log(String, typeof String, String.__proto__); // ƒ String() { [native code] }
    console.log(new String("abc").__proto__);
    // charAt: ƒ charAt()
    // concat: ƒ concat()
    // constructor: ƒ String()
    // fixed: ƒ fixed()
    // includes: ƒ includes()
    // indexOf: ƒ indexOf()
    // length: 0
    // repeat: ƒ repeat()
    // replace: ƒ replace()
    // search: ƒ search()
    // slice: ƒ slice()
    // split: ƒ split()
    // startsWith: ƒ startsWith()
    // strike: ƒ strike()
    // sub: ƒ sub()
    // substr: ƒ substr()
    // toLocaleLowerCase: ƒ toLocaleLowerCase()
    // toLowerCase: ƒ toLowerCase()
    // toString: ƒ toString()
    // trim: ƒ trim()
    // trimEnd: ƒ trimEnd()
    // valueOf: ƒ valueOf()
    // Symbol(Symbol.iterator): ƒ [Symbol.iterator]()
    // [[Prototype]]: Object
    // [[PrimitiveValue]]: ""
    console.log(Boolean, typeof Boolean, Boolean.__proto__); // ƒ Boolean() { [native code] }
    console.log(new Boolean(true).__proto__);
    // constructor: ƒ Boolean()
    // toString: ƒ toString()
    // valueOf: ƒ valueOf()
    // [[Prototype]]: Object
    // [[PrimitiveValue]]: false
    console.log(Object, typeof Object, Object.__proto__); // ƒ Object() { [native code] }
    console.log(new Object({}).__proto__); // function
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
    // __proto__: (...)
    // get __proto__: ƒ __proto__()
    // set __proto__: ƒ __proto__()
    console.log(Array, typeof Array, Array.__proto__); // ƒ Array() { [native code] }
    console.log([1, 2].__proto__); // function
    // at: ƒ at()
    // concat: ƒ concat()
    // constructor: ƒ Array()
    // copyWithin: ƒ copyWithin()
    // entries: ƒ entries()
    // every: ƒ every()
    // fill: ƒ fill()
    // filter: ƒ filter()
    // find: ƒ find()
    // findIndex: ƒ findIndex()
    // findLast: ƒ findLast()
    // findLastIndex: ƒ findLastIndex()
    // flat: ƒ flat()
    // flatMap: ƒ flatMap()
    // forEach: ƒ forEach()
    // includes: ƒ includes()
    // indexOf: ƒ indexOf()
    // join: ƒ join()
    // keys: ƒ keys()
    // lastIndexOf: ƒ lastIndexOf()
    // length: 0
    // map: ƒ map()
    // pop: ƒ pop()
    // push: ƒ push()
    // reduce: ƒ reduce()
    // reduceRight: ƒ reduceRight()
    // reverse: ƒ reverse()
    // shift: ƒ shift()
    // slice: ƒ slice()
    // some: ƒ some()
    // sort: ƒ sort()
    // splice: ƒ splice()
    // toLocaleString: ƒ toLocaleString()
    // toString: ƒ toString()
    // unshift: ƒ unshift()
    // values: ƒ values()
    // Symbol(Symbol.iterator): ƒ values()
    // Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}
    // [[Prototype]]: Object
    console.log(Function, typeof Function, Function.__proto__); // ƒ Function() { [native code] }
    console.log(F.__proto__); // ƒ () { [native code] }
    if (Array.__proto__ === Function.prototype) console.log(2); // Array/Number/String/Boolean/Function/Object都一样
    console.log(true.__proto__); // Boolean {false, constructor: ƒ, toString: ƒ, valueOf: ƒ}
    console.log({}.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
    console.log(new Number(1).__proto__); // Number {0, constructor: ƒ, toExponential: ƒ, toFixed: ƒ, toPrecision: ƒ, …}
    console.log([].__proto__); // [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
    console.log("".__proto__); // String {'', constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}
  };
  // fn();
}

{
  const fn = () => {
    let a = 0.1;
    let b = 0.2;
    console.log(a + b);
    const precisionRound = (value, decimals) => {
      console.log(`${value}e${decimals}`);
      return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
    };
    const res = precisionRound(0.1 + 0.2, 2);
    console.log(res);
  };
  // fn();
}
{
  const fn = () => {
    let a = isNaN("1");
    let b = Number.isNaN("1");
    console.log(a);
    console.log(b);

    // a&&b a||b 返回的是第一个或者第二个的值，不是判断条件结果（true或者false）
    const c = null && 11;
    const d = 11 && 22;
    const e = 33 || -1;
    const f = null || 44;
    const g = (a = 1) && (b = "b");
    console.log(c, d, e, f, g, b);
  };
  // fn();
}

{
  function fn() {
    var id = "Global";
    let fun1 = () => {
      console.log(arguments); // 1
      console.log(this.id);
    };
    fun1(); // 'Global'
    fun1.call({ id: "Obj" }); // 'Global'
    fun1.apply({ id: "Obj" }); // 'Global'
    fun1.bind({ id: "Obj" })(); // 'Global'
  }

  // fn(1);
}

{
  let a = [1, 2, 3];
  let fn = (a, b, c) => {
    // Rest element must be last element
    // const [first, ...rest] = [1, 2, 3, 4, 5];
    const [first, , , rest] = [1, 2, 3, 4];
    console.log(first, rest);
    return a + b + c;
  };
  // 将数组转换为参数序列，对象不可以
  // console.log(fn(...a));
}

{
  let onWatch = (obj, setBind, getLogger) => {
    let handler = {
      get(target, property, receiver) {
        getLogger(target, property);
        return Reflect.get(target, property, receiver);
      },
      set(target, property, value, receiver) {
        setBind(value, property);
        return Reflect.set(target, property, value);
      },
    };
    return new Proxy(obj, handler);
  };
  let obj = { a: 1 };
  let p = onWatch(
    obj,
    (v, property) => {
      console.log(`监听到属性${property}改变为${v}`);
    },
    (target, property) => {
      console.log(`'${property}' = ${target[property]}`);
    }
  );
  // p.a = 2; // 监听到属性a改变2
  // console.log(p.a); // 'a' = 2
}

{
  function objectFactory() {
    let newObject = null;
    let constructor = [].shift.call(arguments);
    let result = null;
    // 判断参数是否是一个函数
    if (typeof constructor !== "function") {
      console.error("type error");
      return;
    }
    // 1.新建一个空对象，2.对象的原型为构造函数的 prototype 对象
    newObject = Object.create(constructor.prototype);
    // 3.将 this 指向新建对象，并执行函数
    result = constructor.apply(newObject, arguments);
    debugger;
    // 4.判断返回对象,返回结果
    let flag =
      result && (typeof result === "object" || typeof result === "function");
    return flag ? result : newObject;
  }

  // 使用方法
  function fn() {
    console.log(arguments);
    return [...arguments].reduce((prev, next) => prev + next, 0);
  }

  // const res = objectFactory(fn, [1,2,3]);
  // console.log(res)
}

{
  const m1 = new Map();
  m1.set("a", 1);
  m1.set("四", 2);
  m1.set("1", 3);
  m1.set(null, 4);
  console.log(m1);

  const o1 = new Object({ a: 1, 四: 2, 1: 3 });
  console.log(o1); // {1: 3, a: 1, 四: 2}

  // Object.keys()---无序？
  // 首先遍历所有数值键，按照数值升序排列。--- 数值只对非负整数
  // 其次遍历所有字符串键，按照加入时间升序排列。
  // 最后遍历所有 Symbol 键，按照加入时间升序排列。
  var origin_obj = { 1: "a", 四: "d", a: "e", 2: "b", 3: "c" };
  var origin_keys = Object.keys(origin_obj);
  console.log(origin_keys); // ['1', '2', '3', '四', 'a']

  var origin_obj = { a: "e", 2: "b", 1: "a", 四: "d", 3: "c" };
  var origin_keys = Object.keys(origin_obj);
  console.log(origin_keys); // ['1', '2', '3', 'a', '四']

  var s = Symbol("hh");
  var origin_obj = {
    s: "1",
    "-4": "负数3",
    a: "e",
    2: "b",
    1: "a",
    四: "d",
    "-1": "负数2",
    "-2": "负数",
    3: "c",
  };
  var origin_keys = Object.keys(origin_obj);
  console.log(origin_keys); // ['1', '2', '3', '-4', 'a', '四', '-1', '-2']
}
