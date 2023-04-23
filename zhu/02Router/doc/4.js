let reg = /([a-z])([0-9])([a-z])/;
let result = '@#a1c888'.match(reg);
console.log(result);
/**
 * 陪陪到的字符串部分为 a1c，后面就是分组 3个分组，值分别是 a 1 c，最后结果数组中的元素有4个
[
  'a1c',
  'a',
  '1',
  'c',
  index: 2,
  input: '@#a1c888',
  groups: undefined
]
 */
console.log(result.length); // 4

let arr = ['a1c', 'a', '1', 'c'];
arr.index = '@#a1c888'.indexOf('a1c');
arr.input = '@#a1c888';
console.log(arr);