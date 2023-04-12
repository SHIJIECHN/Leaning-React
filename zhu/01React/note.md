## 虚拟DOM

- React元素是构建React应用的最小单位，也就是所谓的虚拟DOM。
- jsx在执行的时候其实是一个函数调用，它是一个创建元素的工厂函数。

```javascript
let el1 = <h1>Hello</h1>;
console.log(el1)
/**
也就是虚拟DOM，其实就是一个普通的JS对象
jsx element = {
    "type": "h1", // 元素的类型
    // "key": null,  // 是用来区分同一个父亲的不同的儿子的 DOM-DIFF会用
    // "ref": null,  // 这个用来获取真的DOM元素 ref会用
    "props": {
        "children": "Hello"
    },
}
 */
```
所谓的渲染就是按照react元素所描述的结构，创建真实的DOM元素，并插入root容器内。

会由ReactDOM来确定浏览器的真实DOM和虚拟DOM是一致的

```javascript
ReactDOM.render(
  el1,
  document.getElementById('root')
);
```

