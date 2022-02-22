import { a, cloneLoop } from "./a.js";
{
  const fn = () => {
    console.log(a);
    a = {
      name: "eight",
    };
    console.log(a); // Uncaught TypeError: Assignment to constant variable.
  };
  // fn();
}

function debounce(fn, delay) {
  let timer = null;
  return function () {
    const args = arguments;
    const context = this;
    if (timer) {
      timer = clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

function throttle(fn, delay) {
  let lastTime = Date.now();
  return function () {
    let args = arguments;
    let context = this;
    let newTime = Date.now();
    if (newTime - lastTime >= delay) {
      lastTime = Date.now();
      fn.apply(context, args);
    }
  };
}

const div = document.createElement("div");
div.style = "width:100px;height:100px;border:solid 1px #000000;";
document.body.appendChild(div);

const ele = document.createElement("button");
ele.innerText = "button";
let count = 1;
div.appendChild(ele);
const debounceFn = () => {
  console.log(`button第${count++}点击`);
};
const delay = 1000;
const debounceFn2 = debounce(debounceFn, delay);
const throttleFn = () => {
  console.log(`div第${count++}点击`);
};
const throttleFn2 = throttle(throttleFn, delay);

ele.addEventListener("click", debounceFn2);

div.addEventListener("click", throttleFn2);
