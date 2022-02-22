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
  const myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left)
    let prototype = right.prototype
    while(true) {
      if (!proto) return false
      if (proto === prototype) return true
      proto = Object.getPrototypeOf(proto)
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
    let constructor = [].shift.call(arguments)
    let result = null
    if(typeof constructor !== 'function') {
      console.error('type error');
      return
    }
    let newObject = Object.create(constructor.prototype) || null
    result = constructor.apply(newObject, arguments)
    let flag = result && (typeof result === 'function' || typeof result === 'object')
    return flag ? result : newObject
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
    return function() {
      let context = this;
      let args = [...arguments]
      if(timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, wait)
    }
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
  
    return function() {
      let context = this,
          args = arguments,
          nowTime = Date.now();
  
      // 如果两次时间间隔超过了指定时间，则执行函数。
      if (nowTime - lastTime >= delay) {
        lastTime = Date.now();
        return fn.apply(context, args);
      }
    };
  }
}

{
  const throttle = (fn, delay) => {
    let timer = null
    return function () {
      const args = arguments
      const context = this 
      if(timer) {
        timer = clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }

  const throttle = (fn, delay) => {
    let lastTime = Date.now()
    return function() {
      let args = arguments
      let context = this
      let newTime = Date.now()
      if(newTime - lastTime >= delay) {
        lastTime = Date.now()
        fn.apply(context, args)
      }
    }
  }

}
