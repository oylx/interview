import { a, cloneLoop } from "./a.js";
console.log(a);
a = {
  name: "eight",
};
console.log(a); // Uncaught TypeError: Assignment to constant variable.
