// 5单选  5 不定项选 3编程  单选：变量作用域看输出、eventLoop看输出、原型链constructor看输出  不定项：dom事件流的三个阶段，es6与commonJs模块化的一些判断、
// 编程：flat、判断对象是否存在循环引用、实现eventEmitter
{
  const fn = () => {
    console.log("script start");

    async function async1() {
      await async2();
      console.log("async1 end");
    }
    async function async2() {
      console.log("async2 end");
    }
    async1();

    setTimeout(function () {
      console.log("setTimeout");
    }, 0);

    new Promise((resolve) => {
      console.log("Promise");
      resolve();
    })
      .then(function () {
        console.log("promise1");
      })
      .then(function () {
        console.log("promise2");
      });

    console.log("script end");
  };
  // fn()
}
{
  const fn = () => {
    const promise = new Promise((resolve, reject) => {
      console.log(1);
      console.log(2);
    });
    promise.then(() => {
      console.log(3);
    });
    console.log(4);
  };
  // fn()
  // 1 2 4
}
{
  const fn = () => {
    const promise = new Promise((resolve, reject) => {
      console.log(1);
      setTimeout(() => {
        console.log("timerStart");
        resolve("success");
        console.log("timerEnd");
      }, 0);
      console.log(2);
    });
    promise.then((res) => {
      console.log(res);
    });
    console.log(4);
  };
  // fn();
  // 1 2 4 timerStart timerEnd success
}
{
  const fn = () => {
    Promise.resolve().then(() => {
      console.log("promise1");
      const timer2 = setTimeout(() => {
        console.log("timer2");
      }, 0);
    });
    const timer1 = setTimeout(() => {
      console.log("timer1");
      Promise.resolve().then(() => {
        console.log("promise2");
      });
    }, 0);
    console.log("start");
  };
  // fn();
  // start promise1 timer1 promise2 timer2
}
{
  const fn = () => {
    const promise = new Promise((resolve, reject) => {
      resolve("success1");
      reject("error");
      resolve("success2");
    });
    promise
      .then((res) => {
        console.log("then:", res);
      })
      .catch((err) => {
        console.log("catch:", err);
      });
  };
  // fn();
  // then: success1
}
{
  // Promise.resolve方法的参数如果是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为resolved，Promise.resolve方法的参数，会同时传给回调函数。
  // .then 或.catch 的参数期望是函数，传入非函数则将其解释为then(null),会发生值透传(前一个Promise的结果会传递下面)。
  const fn = () => {
    Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
  };
  // fn();
  // 1
}
{
  const fn = () => {
    const promise1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("success");
      }, 1000);
    });
    const promise2 = promise1.then(() => {
      throw new Error("error!!!");
    });
    console.log("promise1", promise1);
    console.log("promise2", promise2);
    setTimeout(() => {
      console.log("promise1", promise1);
      console.log("promise2", promise2);
    }, 2000);
  };
  // fn();
  // promise1 Promise {<pending>}
  // promise2 Promise {<pending>}

  // Uncaught (in promise) Error: error!!!
  // promise1 Promise {<fulfilled>: "success"}
  // promise2 Promise {<rejected>: Error: error!!}
}

{
  // return 和resolve一样
  const fn = () => {
    Promise.resolve(1)
      .then((res) => {
        console.log(res);
        return 2;
      })
      .catch((err) => {
        return 3;
      })
      .then((res) => {
        console.log(res);
      });
  };
  // fn();
  // 1 2
}

{
  const fn = () => {
    Promise.resolve()
      .then(() => {
        // 返回任意一个非 promise 的值都会被包裹成 promise 对象，因此这里的return new Error('error!!!')也被包裹成了return Promise.resolve(new Error('error!!!'))，因此它会被then捕获而不是catch。
        // 不同于throw new Error("error!!!")与 Promise.reject("err!!!")
        return new Error("error!!!");
      })
      .then((res) => {
        console.log("then: ", res);
      })
      .catch((err) => {
        console.log("catch: ", err);
      });
  };
  // fn()
  // then:  Error: error!!!
}
{
  const fn = () => {
    const promise = Promise.resolve(1).then((v) => {
      console.log(v);
      // .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
      return promise;
    });
    promise.catch(console.err);
  };
  // fn();
  // Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
}
{
  const fn = () => {
    Promise.reject("err!!!")
      .then(
        (res) => {
          console.log("success", res);
        },
        (err) => {
          console.log("error", err);
        }
      )
      .catch((err) => {
        console.log("catch", err);
      });
  };
  // fn();
  // error:err!!!
}
{
  const fn = () => {};
  fn();
}
{
  const fn = () => {
    Promise.resolve()
      .then(
        function success(res) {
          throw new Error("error!!!");
        },
        function fail1(err) {
          console.log("fail1", err);
        }
      )
      .catch(function fail2(err) {
        console.log("fail2", err);
      });
  };
  // fn();
  // fail2 Error: error!!!
}
{
  const fn = () => {
    Promise.resolve("1")
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        console.log("finally");
      });
    Promise.resolve("2")
      .finally(() => {
        console.log("finally2");
        return "我是finally2返回的值";
      })
      .then((res) => {
        console.log("finally2后面的then函数", res);
      });
  };
  // fn();
}
{
  const fn = () => {
    Promise.resolve("1")
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        console.log("finally");
      });
    Promise.resolve("2")
      .finally(() => {
        console.log("finally2");
        return "我是finally2返回的值";
      })
      .then((res) => {
        console.log("finally2后面的then函数", res);
      });
  };
  // fn();
}
{
  const fn = () => {
    function runAsync(x) {
      const p = new Promise((resolve) =>
        setTimeout(() => resolve(x, console.log(x)), 1000)
      );
      return p;
    }

    Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then((res) =>
      console.log(res)
    );
  };
  // fn();
}
{
  const fn = () => {
    function runAsync(x) {
      const p = new Promise((r) =>
        setTimeout(() => r(x, console.log(x)), 1000)
      );
      return p;
    }
    function runReject(x) {
      const p = new Promise((res, rej) =>
        setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
      );
      return p;
    }
    Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  // fn();
}
{
  const fn = () => {
    function runAsync(x) {
      const p = new Promise((r) =>
        setTimeout(() => r(x, console.log(x)), 1000)
      );
      return p;
    }
    Promise.race([runAsync(1), runAsync(2), runAsync(3)])
      .then((res) => console.log("result: ", res))
      .catch((err) => console.log(err));
  };
  // fn();
}
{
  const fn = () => {
    async function async1() {
      console.log("async1 start");
      await async2();
      console.log("async1 end");
    }
    async function async2() {
      console.log("async2");
    }
    async1();
    console.log("start");
  };
  // fn();
}
{
  const fn = () => {
    async function async1() {
      console.log("async1 start");
      await async2();
      console.log("async1 end");
      setTimeout(() => {
        console.log("timer1");
      }, 0);
    }
    async function async2() {
      setTimeout(() => {
        console.log("timer2");
      }, 0);
      console.log("async2");
    }
    async1();
    setTimeout(() => {
      console.log("timer3");
    }, 0);
    console.log("start");
  };
  // fn();
  //async1 start  async2 start async1 end timer2 timer3 timer1
}
{
  const fn = () => {
    async function async1() {
      console.log("async1 start");
      await new Promise((resolve) => {
        console.log("promise1"); // 没有返回值，始终pending
      });
      console.log("async1 success");
      return "async1 end";
    }
    console.log("script start");
    async1().then((res) => console.log(res));
    console.log("script end");
  };
  // fn();
  // script start async1 start promise1 script end
}
{
  const fn = () => {
    async function async1() {
      console.log("async1 start");
      await new Promise((resolve) => {
        console.log("promise1");
        resolve("promise1 resolve");
      }).then((res) => console.log(res));
      console.log("async1 success");
      return "async1 end";
    }
    console.log("script start");
    async1().then((res) => console.log(res));
    console.log("script end");
  };
  // fn();
  // script start async1 start promise1 script end promise1 resolve async1 success async1 end
}
{
  const fn = () => {
    async function async1() {
      console.log("async1 start");
      await async2();
      console.log("async1 end");
    }

    async function async2() {
      console.log("async2");
    }

    console.log("script start");

    setTimeout(function () {
      console.log("setTimeout");
    }, 0);

    async1();

    new Promise((resolve) => {
      console.log("promise1");
      resolve();
    }).then(function () {
      console.log("promise2");
    });
    console.log("script end");
  };
  fn();
  // 1.script start 2.async1 start 3. async2 3.promise1 4.script end 5.async1 end 6.promise2 7.setTimeout
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
{
  const fn = () => {};
  fn();
}
{
  const fn = () => {};
  fn();
}
