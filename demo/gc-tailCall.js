// node --expose-gc gc-tailCall.js

/**
 * 单位为字节格式为 MB 输出
 */
const format = function (bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
};

/**
 * 封装 print 方法输出内存占用信息
 */
const print = function () {
  const memoryUsage = process.memoryUsage();

  console.log(
    JSON.stringify({
      rss: format(memoryUsage.rss),
      heapTotal: format(memoryUsage.heapTotal),
      heapUsed: format(memoryUsage.heapUsed),
      external: format(memoryUsage.external),
    })
  );
};

const fn1 = (n) => {
  if (n === 1) return n;
  return n * fn1(n - 1);
};

const fn2 = (n, total) => {
  if (n === 1) return total;
  return fn2(n - 1, total);
};

print();
const n = 10500;
// fn1(n);
fn2(n, 1);
print();
