{
  /**
   * 手写 Object.create
   * 思路：将传入的对象作为原型
   */
  function create(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  }
}

{
  /**
   * ### 手写 instanceof 方法
   * instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
   * 实现步骤：
   * 1. 首先获取类型的原型
   * 2. 然后获得对象的原型
   * 3. 然后一直循环判断对象的原型是否等于类型的原型，直到对象原型为 `null`，因为原型链最终为 `null`
   */
  function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left);
    let prototype = right.prototype;
    while (true) {
      if (!proto) return false;
      if (proto === prototype) return true;
      proto = Object.getPrototypeOf(proto);
    }
  }
}

{
  /**
   * ### 手写 new 操作符
   * 在调用new的过程中会发生以上四件事情：
   *1. 创建一个对象
   *2. 将构造函数的作用域赋给新对象（也就是将对象的**proto**属性指向构造函数的 prototype 属性）
   *3. 指向构造函数中的代码，构造函数中的 this 指向该对象（也就是为这个对象添加属性和方法）
   *4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。
   * @returns
   */
  function objectFactory() {
    let constructor = [].shift.call(arguments);
    let result = null;
    if (typeof constructor !== "function") {
      console.error("type error");
      return;
    }
    let newObject = Object.create(constructor.prototype) || null;
    result = constructor.apply(newObject, arguments);
    let flag =
      result && (typeof result === "function" || typeof result === "object");
    return flag ? result : newObject;
  }
}

{
  /**
   * 函数防抖的实现
   * 函数防抖是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。
   * @param {*} fn
   * @param {*} wait
   * @returns
   */
  function debounce(fn, wait) {
    let timer = null;
    return function () {
      let context = this;
      let args = [...arguments];
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    };
  }

  /**
   * 手写节流函数
   * 函数节流是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。
   * @param {*} fn
   * @param {*} delay
   * @returns
   */
  function throttle(fn, delay) {
    let lastTime = Date.now();

    return function () {
      let cd = false;
      return function () {
        if (cd) return;
        fn.call();
        cd = true;
        setTimeout(() => {
          cd = false;
        }, delay);
      };
    };
  }
}

{
  /**
   * 手写类型判断函数
   * @param {*} value
   * @returns
   */
  function getType(value) {
    // 判断数据是引用类型的情况
    return typeof value === "object"
      ? Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
      : typeof value;
  }
  // console.log(getType([12, 34]));
  // console.log(getType(null));
}

{
  /**
   * 手写 call 函数
   * call 函数的实现步骤：
   * 1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
   * 2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
   * 3. 处理传入的参数，截取第一个参数后的所有参数。
   * 4. 将函数作为上下文对象的一个属性。
   * 5. 使用上下文对象来调用这个方法，并保存返回结果。
   * 6. 删除刚才新增的属性。
   * 7. 返回结果。
   * @returns
   */
  Function.prototype.myCall = function (context) {
    if (typeof this !== "function") {
      console.error("type error");
    }
    let result = null;
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1);
    result = context.fn(...args);
    delete context.fn;
    return result;
  };

  /**
   * ### 手写 apply 函数
   * apply 函数的实现步骤：
   * 1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
   * 2. 判断传入上下文对象是否存在，如果不存在，则设置为 window 。
   * 3. 将函数作为上下文对象的一个属性。
   * 4. 判断参数值是否传入
   * 5. 使用上下文对象来调用这个方法，并保存返回结果。
   * 6. 删除刚才新增的属性
   * 7. 返回结果
   * @param {*} context
   * @returns
   */
  Function.prototype.myApply = function (context) {
    if (typeof this !== "function") {
      console.error("type error");
    }
    console.log(1);
    let result = null;
    context = context || window;
    context.fn = this;
    result = arguments[1] ? context.fn(...arguments[1]) : context.fn();
    delete context.fn;
    return result;
  };

  /**
   * 手写 bind 函数
   * bind 函数的实现步骤：
   * 1. 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
   * 2. 保存当前函数的引用，获取其余传入参数值。
   * 3. 创建一个函数返回
   * 4. 函数内部使用 apply 来绑定函数调用，需要判断函数作为构造函数的情况，这个时候需要传入当前函数的 this 给 apply 调用，其余情况都传入指定的上下文对象。
   * @param {*} context
   * @returns
   */
  Function.prototype.myBind = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
      throw new TypeError("Error"); // 后面不执行
    }
    // 获取参数
    let args = [...arguments].slice(1);
    let fn = this;
    return function Fn() {
      // 根据调用方式，传入不同绑定值
      return fn.apply(
        this instanceof Fn ? this : context,
        args.concat(...arguments)
      );
    };
  };
}

{
  /**
   * 函数柯里化的实现
   * 函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
   * 函数柯里化的实现 f(a,b,c) 转换为可以被以 f(a)(b)(c)
   * 法1
   * @param {*} fn
   * @param {*} args
   * @returns
   */
  function curryOld(fn, args) {
    // 获取函数需要的参数长度
    let length = fn.length;
    args = args || [];
    return function () {
      // 拼接得到现有的所有参数
      let subArgs = args.concat(Array.from(arguments));
      // 判断参数的长度是否已经满足函数所需参数的长度
      if (subArgs.length < length) {
        // 如果不满足，递归返回科里化的函数，等待参数的传入
        return curryOld.call(this, fn, subArgs);
      } else {
        // 如果满足，执行函数
        return fn.apply(this, subArgs);
      }
    };
  }

  /**
   * 法2
   * @param {*} fn
   * @param  {...any} args
   * @returns
   */
  const curryEs6 = (fn, ...args) => {
    return args.length >= fn.length
      ? fn(...args)
      : curryEs6.bind(null, fn, ...args);
  };
  const fn = (a, b, c) => a + b + c;
  const res = curryEs6(fn)(1)(2)(3);
  // console.log(res);

  const fn1 = (a) => (b) => (c) => a + b + c;
  // console.log(fn1(1)(2)(4));
}

{
  /**
   * 创建AJAX请求的步骤：
   * 创建一个 XMLHttpRequest 对象。
   * 在这个对象上**使用 open 方法创建一个 HTTP 请求**，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
   * 在发起请求前，可以为这个对象**添加一些信息和监听函数**。比如说可以通过 setRequestHeader 方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。
   * 当对象的属性和监听函数设置完成后，最后调**用 sent 方法来向服务器发起请求**，可以传入参数作为发送的数据体。
   */
  const SERVER_URL = "/server";
  let xhr = new XMLHttpRequest();
  // 创建 Http 请求
  xhr.open("GET", SERVER_URL, true);
  // 设置状态监听函数
  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return;
    // 当请求成功时
    if (this.status === 200) {
      handle(this.response);
    } else {
      console.error(this.statusText);
    }
  };
  // 设置请求失败时的监听函数
  xhr.onerror = function () {
    console.error(this.statusText);
  };
  // 设置请求头信息
  xhr.responseType = "json";
  xhr.setRequestHeader("Accept", "application/json");
  // 发送 Http 请求
  // xhr.send(null);
}

{
  function getJSON(url) {
    // 创建一个 promise 对象
    let promise = new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      // 新建一个 http 请求
      xhr.open("GET", url, true);
      // 设置状态的监听函数
      xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        // 当请求成功或失败时，改变 promise 的状态
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      // 设置错误监听函数
      xhr.onerror = function () {
        reject(new Error(this.statusText));
      };
      // 设置响应的数据类型
      xhr.responseType = "json";
      // 设置请求头信息
      xhr.setRequestHeader("Accept", "application/json");
      // 发送 http 请求
      xhr.send(null);
    });
    return promise;
  }
  const url = "/server";
  // getJSON(url);
}

{
  /**
   * 深拷贝函数
   * @param {*} object
   * @returns
   */
  function deepCopy(object) {
    if (!object || typeof object !== "object") return;

    let newObject = Array.isArray(object) ? [] : {};

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        newObject[key] =
          typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
      }
    }

    return newObject;
  }

  function clone(target, map = new Map()) {
    if (typeof target === "object") {
      let newObject = Array.isArray(target) ? [] : {};
      if (map.get(target)) return map.get(target);
      map.set(target, newObject);
      for (const key in target) {
        newObject[key] = clone(target[key], map);
      }
      return newObject;
    } else {
      return target;
    }
  }

  const target = {
    field1: 1,
    field2: undefined,
    field3: {
      child: "child",
    },
    field4: [2, 4, 8],
  };
  target.target = target;
  // let res = clone(target);
  // console.log(res);
}

{
  const dateFormat = (dateInput, format) => {
    var day = dateInput.getDate();
    var month = dateInput.getMonth() + 1;
    var year = dateInput.getFullYear();
    format = format.replace(/yyyy/, year);
    format = format.replace(/MM/, month);
    format = format.replace(/dd/, day);
    return format;
  };
  const a = dateFormat(new Date("2020-12-01"), "yyyy/MM/dd"); // 2020/12/01
  const b = dateFormat(new Date("2020-04-01"), "yyyy/MM/dd"); // 2020/04/01
  const c = dateFormat(new Date("2020-04-01"), "yyyy年MM月dd日"); // 2020年04月01日

  console.log(a, b, c);
}

{
  // 实现数组的乱序输出
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (var i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i;
    // [a, b] = [b, a]交换数据
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  console.log(arr);
}

{
  // 实现数组的扁平化
  let arr = [1, 2, 3, [[4, 5], 6], 7, 8, 9];
  // 法1
  b = arr
    .toString()
    .split(",")
    .map((v) => +v);
  console.log(b);
  // 法2
  let c = arr.flat(Infinity);
  // 法3
  function flatten(arr) {
    return arr.reduce((prev, next) => {
      return prev.concat(Array.isArray(next) ? flatten(next) : next);
    });
  }
  let d = [1, 2, 3, 4];
  let e = [5, 6, 7, [8]];
  let f = d.concat(...e);
  console.log(f);
}

{
  var triangle = { a: 1, b: 2, c: 3 };

  function ColoredTriangle() {
    this.color = "red";
  }

  ColoredTriangle.prototype = triangle;

  var obj = new ColoredTriangle();

  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      console.log(`obj.${prop} = ${obj[prop]}`);
    }
  }

  // Output:
  // "obj.color = red"
}

{
  /**
   * 数组的push方法
   * @returns
   */
  Array.prototype._push = function () {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length] = arguments[i];
    }
    return this.length;
  };

  Array.prototype._filter = function (fn) {
    if (typeof fn !== "function") {
      throw Error("参数必须是一个函数");
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
      fn(this[i]) && res.push(this[i]);
    }
    return res;
  };

  Array.prototype._map = function (fn) {
    if (typeof fn !== "function") {
      throw Error("参数必须是一个函数");
    }
    const res = [];
    for (let i = 0, len = this.length; i < len; i++) {
      res.push(fn(this[i]));
    }
    return res;
  };

  Array.prototype._join = function (char) {
    let result = this[0] || "";
    let len = this.length;
    for (let i = 1; i < len; i++) {
      result += char + this[i];
    }
    return result;
  };

  Array.prototype._slice = function (begin, end) {
    let result = [];
    begin = begin || 0;
    end = end || this.length;
    for (let i = begin; i < end; i++) {
      result.push(this[i]);
    }
    return result;
  };

  Array.prototype._splice = function (begin, deleteCount) {
    let length = this.length;
    while (deleteCount && begin < length) {
      this[begin] = this[begin + deleteCount];
      begin++;
    }
    for (let i = 2; i < arguments.length; i++) {
      this[this.length] = arguments[i];
    }
  };

  Array.prototype._sort = function (fn) {
    fn =
      fn ||
      function (a, b) {
        return a - b;
      };
    let round = this.length - 1;
    for (let i = 0; i < round; i++) {
      let midIndex = this[i];
      for (let k = i + 1; k < this.length; k++) {
        if (fn.call(undefined, this[k], this[i]) < 0) {
          [this[i], this[k]] = [this[k], this[i]];
        }
      }
    }
  };

  Array.prototype._forEach = function (fn) {
    for (let i = 0; i < this.length; i++) {
      if (i in this) {
        fn.call(undefined, this[i], i, this);
      }
    }
  };

  Array.prototype._map = function (fn) {
    let result = [];
    for (let i = 0; i < this.length; i++) {
      if (i in this) {
        result[i] = fn.call(undefined, this[i], i, this);
      }
    }
    return result;
  };
}

{
  function repeat(s, n) {
    return new Array(n + 1).join(s);
  }
  console.log(repeat("abc", 2));

  String.prototype._reverse = function (a) {
    return a.split("").reverse().join("");
  };
}

{
  // 转换前：
  const source = [
    { id: 1, pid: 0, name: "body" },
    { id: 2, pid: 1, name: "title" },
    { id: 3, pid: 2, name: "div" },
  ];
  // 转换为:
  const tree = [
    {
      id: 1,
      pid: 0,
      name: "body",
      children: [
        {
          id: 2,
          pid: 1,
          name: "title",
          children: [
            {
              id: 3,
              pid: 1,
              name: "div",
            },
          ],
        },
      ],
    },
  ];

  function jsonToTree(data) {
    let result = [];
    if (!Array.isArray(data)) {
      return result;
    }
    let map = {};
    data.forEach((item) => {
      map[item.id] = item;
    });
    data.forEach((item) => {
      let parent = map[item.pid];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        result.push(item);
      }
    });
    return result;
  }

  const res = jsonToTree(source);
  console.log(res);
}

{
  let url =
    "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";
  parseParam(url);
  /* 结果
  { user: 'anonymous',
    id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
    city: '北京', // 中文需解码
    enabled: true, // 未指定值得 key 约定为 true
  }
  */

  /**
   * 解析 URL Params 为对象
   * @param {*} url
   * @returns
   */
  function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
    const paramsArr = paramsStr.split("&"); // 将字符串以 & 分割后存到数组中
    let paramsObj = {};
    // 将 params 存到对象中
    paramsArr.forEach((param) => {
      if (/=/.test(param)) {
        // 处理有 value 的参数
        let [key, val] = param.split("="); // 分割 key 和 value
        val = decodeURIComponent(val); // 解码
        val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
        if (paramsObj.hasOwnProperty(key)) {
          // 如果对象有 key，则添加一个值
          paramsObj[key] = [].concat(paramsObj[key], val);
        } else {
          // 如果对象没有这个 key，创建 key 并设置值
          paramsObj[key] = val;
        }
      } else {
        // 处理没有 value 的参数
        paramsObj[param] = true;
      }
    });
    return paramsObj;
  }
}

{
  function red() {
    console.log("红灯 3s");
  }
  function green() {
    console.log("绿灯 1s");
  }
  function yellow() {
    console.log("黄灯 2s");
  }

  /**
   * ### 循环打印红黄绿
   * 下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：**红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？**
   * @param {*} timer
   * @param {*} light
   * @returns
   */
  const task = (timer, light) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this[light]();
        resolve();
      }, timer);
    });
  };

  // const step = () =>
  //   task(3000, "red")
  //     .then(() => task(1000, "green"))
  //     .then(() => task(2100, "yellow"))
  //     .then(() => step());
  const taskRunner = async () => {
    await task(3000, "red");
    await task(2000, "green");
    await task(1000, "yellow");
    taskRunner();
  };
  // taskRunner();
  for (let i = 0; i < 5; i++) {
    setTimeout(function () {
      // console.log(i);
    }, i * 1000);
  }

  /**
   * 有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
   */
  let map = new Map();
  for (let i = 0; i < 30; i++) {
    map.set(i + 1, i + 1);
  }
  let j = 1;
  const deepFn = () => {
    for (let [key, value] of map) {
      if (j === 3) {
        map.delete(key);
        j = 1;
      } else {
        j++;
      }
    }
    if (map.size > 1) deepFn();
    else return;
  };
  deepFn();
  console.log(map);
}

{
  let imageAsync = (url) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onload = () => {
        console.log(`图片请求成功,此处进行通用操作`);
        resolve(image);
      };
      img.onerror = (err) => {
        console.log(`失败,此处进行失败的通用操作`);
        reject(err);
      };
    });
  };

  // imageAsync("url")
  //   .then(() => {
  //     console.log("加载成功");
  //   })
  //   .catch((error) => {
  //     console.log("加载失败");
  //   });
}

{
  class EventCenter {
    // 1. 定义事件容器，用来装事件数组
    constructor() {
      this.handlers = {};
    }

    // 2. 添加事件方法，参数：事件名 事件方法
    addEventListener(type, handler) {
      // 创建新数组容器
      if (!this.handlers[type]) {
        this.handlers[type] = [];
      }
      // 存入事件
      this.handlers[type].push(handler);
    }

    // 3. 触发事件，参数：事件名 事件参数
    dispatchEvent(type, params) {
      // 若没有注册该事件则抛出错误
      if (!this.handlers[type]) {
        return new Error("该事件未注册");
      }
      // 触发事件
      this.handlers[type].forEach((handler) => {
        handler(...params);
      });
    }

    // 4. 事件移除，参数：事件名 要删除事件，若无第二个参数则删除该事件的订阅和发布
    removeEventListener(type, handler) {
      if (!this.handlers[type]) {
        return new Error("事件无效");
      }
      if (!handler) {
        // 移除事件
        delete this.handlers[type];
      } else {
        const index = this.handlers[type].findIndex((el) => el === handler);
        if (index === -1) {
          return new Error("无该绑定事件");
        }
        // 移除事件
        this.handlers[type].splice(index, 1);
        if (this.handlers[type].length === 0) {
          delete this.handlers[type];
        }
      }
    }
  }
}

{
  let count = 0;
  const fn = (n) => {
    console.log(`第${++count}次,当前${n}`, `fn(${n - 1}) + fn(${n - 2})`);
    if (n === 0) return 0;
    if (n === 1) return 1;

    return fn(n - 1) + fn(n - 2);
  };
  // console.log(fn(6));

  function fibonacci(n, current, next) {
    console.log("n, current, next:", n, current, next);
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1, next, current + next);
  }
  console.log(fibonacci(6, 0, 1));
}
{
  function mySetInterval(fn, timeout) {
    // 控制器，控制定时器是否继续执行
    var timer = { flag: true };
    // 设置递归函数，模拟定时器执行。
    function interval() {
      if (timer.flag) {
        fn();
        setTimeout(interval, timeout);
      }
    }
    // 启动定时器
    setTimeout(interval, timeout);
    // 返回控制器
    return timer;
  }
  function red() {
    console.log("red");
  }
  // mySetInterval(red, 2000);
}

{
  let timer;
  const fn = () => {
    console.log("start", timer);
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, 1000);
    console.log("end", timer);
  };
  // timer = setTimeout(fn, 1000);
}

{
  // 实现 jsonp
  // 动态的加载js文件
  function addScript(src) {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }
  // addScript("http://xxx.xxx.com/xxx.js?callback=handleRes");
  // 设置一个全局的callback函数来接收回调结果
  function handleRes(res) {
    console.log(res);
  }
  // 接口返回的数据格式
  handleRes({ a: 1, b: 2 });
}

{
  /**
   * 判断对象是否存在循环引用
   * @param {*} obj
   * @param {*} parent
   * @returns
   */
  const isCycleObject = (obj, parent) => {
    const parentArr = parent || [obj];
    for (let i in obj) {
      if (typeof obj[i] === "object") {
        let flag = false;
        parentArr.forEach((pObj) => {
          if (pObj === obj[i]) {
            flag = true;
          }
        });
        if (flag) return true;
        flag = isCycleObject(obj[i], [...parentArr, obj[i]]);
        if (flag) return true;
      }
    }
    return false;
  };

  const a = 1;
  const b = { a };
  const c = { b };
  const o = { d: { a: 3 }, c };
  o.c.b.aa = a;
  console.log(isCycleObject(o));

  function clone(target, map = new WeakMap()) {
    if (typeof target === "object") {
      let cloneTarget = Array.isArray(target) ? [] : {};
      if (map.get(target)) return map.get(target);
      map.set(target, cloneTarget);
      for (const key in target) {
        cloneTarget[key] = clone(target[key], map);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  const target = {
    field1: 1,
    field2: undefined,
    field3: {
      child: "child",
    },
    field4: [2, 4, 8],
  };
  target.target = target;
  console.log(clone(target));
}

{
  const tree = {
    name: "root",
    children: [
      {
        name: "c1",
        children: [
          {
            name: "c11",
            children: [],
          },
          {
            name: "c12",
            children: [],
          },
        ],
      },
      {
        name: "c2",
        children: [
          {
            name: "c21",
            children: [],
          },
          {
            name: "c22",
            children: [],
          },
        ],
      },
    ],
  };

  // 深度优先的方式遍历 打印 name
  // ['root', 'c1','c11', 'c12', 'c2', 'c21', 'c22']

  var maxDepth = function (root) {
    if (!root) return 0;
    let queue = [root],
      res = 0;
    while (queue.length) {
      let temp = [];
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].left) temp.push(queue[i].left);
        if (queue[i].right) temp.push(queue[i].right);
      }
      res += 1;
      queue = temp;
    }
    return res;
  };

  var minDepth = function (root) {
    if (!root) return 0;
    let stack = [root],
      ans = 0;
    while (stack.length) {
      let temp = [];
      ans++;
      for (let i = 0; i < stack.length; i++) {
        if (stack[i].left == null && stack[i].right == null) return ans;
        if (stack[i].left) temp.push(stack[i].left);
        if (stack[i].right) temp.push(stack[i].right);
      }
      stack = temp;
    }
    return ans;
  };
}

{
  const arr = [3, 15, 8, 29, 102, 22];
  arr.sort((a, b) => {
    return ("" + a).charCodeAt() - ("" + b).charCodeAt();
  });
  console.log(arr);
}
{
  Number.prototype.add = function (v) {
    return this.valueOf(v) + v;
  };
  Number.prototype.minus = function (v) {
    return this.valueOf(v) - v;
  };
  console.log((5).add(3).minus(2));
}

{
  const obj = { 1: 222, 2: 123, 5: 888 };
  let arr = Array.from({ length: 12 }).map((v, _i) => obj[_i] || null);
}

{
  const nums1 = [1, 2, 2, 1];
  const nums2 = [2, 2];
  const res = nums1.filter((item) => nums2.includes(item));
}
{
  const arr = [1, 2, 3, 4];
  arr.forEach((val) => {
    if (val === 2) return;
    console.log(val);
  });
  function fn() {
    for (let i = 0; i < arr.length; i++) {
      let val = arr[i];
      if (val === 2) break;
      console.log(val);
    }
  }
  fn();
}
{
  const arr = [2, 10, 3, 4, 5, 11, 10, 11, 20];
  const res = [...new Set(arr)]
    .sort((a, b) => a - b)
    .reduce((prev, next) => {
      const _i = Math.floor(next / 10);
      if (!prev[_i]) prev[_i] = [];
      prev[_i].push(next);
      return prev;
    }, {});
  console.log(Object.values(res));
}
{
  const str = "AbC";
  const res = str.split("").map((v) => {
    const code = v.charCodeAt();
    return String.fromCharCode(code >= 97 ? code - 32 : code + 32);
  });
  console.log(res);
}
