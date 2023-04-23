// 匹配分组捕获
console.log('1ab'.match(/1([a-z])([a-z])/));// [ '1ab', 'a', 'b', index: 0, input: '1ab', groups: undefined ]
// 非捕获分组 (?:)
console.log('1ab'.match(/1(?:[a-z])([a-z])/)); // [ '1ab', 'b', index: 0, input: '1ab', groups: undefined ]
// 正向肯定前瞻 (?=) 并不消耗字符
console.log('1a'.match(/\d(?=[a-z])[a-z]/)); // [ '1a', index: 0, input: '1a', groups: undefined ]
// 正向否定前瞻 (?!) 
console.log('1a'.match(/\d(?![A-Z])[a-z]/)); // [ '1a', index: 0, input: '1a', groups: undefined ]
// 反向肯定后瞻 (?<=) 并不消耗字符
console.log('A1a'.match(/(?<=[a-z])\d[a-z]/)); // null
// 反向否定后瞻 (?<!)
console.log('A1a'.match(/(?<![a-z])\d[a-z]/)); // [ '1a', index: 1, input: 'A1a', groups: undefined ]

// 命名捕获分组
console.log(/(?<x>\d{2})-(?<y>\d{2})/.exec('11-22')); // [ '11-22', '11', '22', index: 0, input: '11-22', groups: { x: '11', y: '22' } ]
console.log('11-22'.match(/(?<x>\d{2})-(?<y>\d{2})/)); // [ '11-22', '11', '22', index: 0, input: '11-22', groups: { x: '11', y: '22' } ]