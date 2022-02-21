{
  Function.prototype.myCall = function (context) {
    // 判断调用对象
    if (typeof this !== "function") {
      console.error("type error");
    }
    // 获取参数
    let args = [...arguments].slice(1),
      result = null;
    // 判断 context 是否传入，如果未传入则设置为 window
    context = context || window;
    // 将调用函数设为对象的方法
    context.fn = this;
    // 调用函数
    result = context.fn(...args);
    // 将属性删除
    delete context.fn;
    return result;
  };
  const obj = {
    name: "oylx1",
    fn2() {
      console.log(this.name);
    },
  };

  function fn1() {
    console.log(this.name + "1");
  }

  let fn = fn1.myCall(obj, 1);

  Function.prototype.myBind = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
      throw new TypeError("Error");
    }
    // 获取参数
    var args = [...arguments].slice(1),
      fn = this;
    return function Fn() {
      // 根据调用方式，传入不同绑定值
      return fn.apply(
        this instanceof Fn ? this : context,
        args.concat(...arguments)
      );
    };
  };

  Function.prototype.myBind = function (context) {
    if (typeof this !== "function") {
      throw new TypeError("error");
    }
    var args = [...arguments].slice(1);
    var fn = this;
    return function Fn() {
      return fn.apply(
        this instanceof Fn ? this : context,
        args.concat(...arguments)
      );
    };
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.toString = function () {
    return this.x + "," + this.y;
  };

  var p = new Point(1, 2);
  p.toString(); // '1,2'

  var emptyObj = {};
  var YAxisPoint = Point.myBind(emptyObj, 0 /*x*/);

  // 本页下方的 polyfill 不支持运行这行代码，
  // 但使用原生的 myBind 方法运行是没问题的：

  var YAxisPoint = Point.myBind(null, 0 /*x*/);

  /*（译注：polyfill 的 myBind 方法中，如果把 myBind 的第一个参数加上，
  即对新绑定的 this 执行 Object(this)，包装为对象，
  因为 Object(null) 是 {}，所以也可以支持）*/

  var axisPoint = new YAxisPoint(5);
  console.log(axisPoint.toString()); // '0,5'

  axisPoint instanceof Point; // true
  axisPoint instanceof YAxisPoint; // true
  new YAxisPoint(17, 42) instanceof Point; // true
}

{
  async function func1() {
    return 111;
  }
  console.log(
    func1().then((res) => {
      console.log(res);
    })
  );
}

{
  Promise.resolve('"我错了,请原谅俺!!!"').then((res) => {
    console.log(res);
  });
  Promise.reject("第二次犯错")
    .then(
      (res) => {
        console.log("success", res);
      },
      (res) => {
        console.log("error", res);
      }
    )
    .catch((err) => {
      console.log(err);
    });

  function testPromise(ready) {
    return new Promise(function (resolve, reject) {
      if (ready) {
        resolve("hello world");
      } else {
        reject("No thanks");
      }
    });
  }
  // 方法调用
  testPromise(false).then(
    function (msg) {
      console.log(msg);
    },
    function (error) {
      console.log(error);
    }
  );
}

{
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
  let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
  let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 3000);
  });
  Promise.all([promise1, promise2, promise3]).then((res) => {
    console.log(res);
    //结果为：[1,2,3]
  });
}

{
  let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(1);
    }, 2000);
  });
  let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
  let promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 3000);
  });
  Promise.race([promise1, promise2, promise3]).then(
    (res) => {
      console.log(res);
      //结果：2
    },
    (rej) => {
      console.log(rej);
    }
  );
  Promise.race([promise1, timeOutPromise(5000)]).then((res) => {});
}
