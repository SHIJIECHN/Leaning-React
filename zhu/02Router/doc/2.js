let {pathToRegexp} = require('path-to-regexp'); // 把路径转换成正则表达式
let regexp = pathToRegexp('/home',[], {end: true});
console.log(regexp); // /^\/home[\/#\?]?$/i
console.log(regexp.test('/home')); // true
console.log(regexp.test('/home/')); // true
console.log(regexp.test('/home//')); // false
console.log('===================')
let regexp2 = pathToRegexp('/home',[], {end: false});
console.log(regexp2); // /^\/home(?:[\/#\?](?=[]|$))?(?=[\/#\?]|[]|$)/i
console.log(regexp2.test('/home')); // true
console.log(regexp2.test('/home/')); // true
console.log(regexp2.test('/home//')); // true