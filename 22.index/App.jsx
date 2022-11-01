// class App extends React.Component {
//     render() {
//         return (
//             // <div className="box" id="J_Box">
//             //     <h1 className="title">
//             //         This is a <span>TITLE</span>
//             //     </h1>
//             // </div>
//             React.createElement(
//                 'div',
//                 {
//                     className: 'box',
//                     id: 'J_Box'
//                 },
//                 React.createElement(
//                     'h1',
//                     {
//                         className: 'title'
//                     },
//                     'This is a ',
//                     React.createElement(
//                         'span',
//                         null,
//                         'TITLE'
//                     )
//                 )
//             )
//         )
//     }
// }


/**
 * JSX基本概念：
 * JSX 其实是React.createElement函数调用的语法糖
 * 
 * React会把JSX编译为React.createElement调用形式
 * 
 * 
 * 认识React的元素类型：
 * MyButton就是React元素，并且是React的元素类型
 * 组件里面用了JSX，MyButton这个组件必须存在当前模块的作用域中
 * React会编译JSX变成Reatc.createElement的调用形式
 *  要使用到React.createElement，所以必须要让react库存在当前模块的作用域中
 *  import React from 'react'
 * 
 * 但是在生产环境下，一般都是在index.html 下通过script src引用React的CDN
 * 不需要import React。因为当前React是挂载到全局的
 */

// class MyButton extends React.Component {
//     render() {》
//         return (
//             <button>Click</button>
//         )
//     }
// }

// class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 {
//                     console.log(window)
//                 }
//                 <MyButton />
//             </div>

//         )
//     }
// }

/**
 * 如何在JSX中使用点语法（对象访问的语法）
 * 
 * 在一个UI集合下访问组件。把需要的UI组件封装到一个命名空间里面，调用的时候使用命名空间.组件名 调用。
 */

// const colorSystem = {
//     'primary': 'blue',
//     'success': 'green',
//     'warning': 'orange',
//     'danger': 'red'
// }

// const MyUI = {
//     // 类组件
//     Button: class extends React.Component {
//         render() {
//             const { type, children } = this.props;
//             return (
//                 <button
//                     style={{
//                         color: '#fff',
//                         backgroundColor: colorSystem[type]
//                     }}
//                 >{children}</button>
//             )
//         }
//     },
//     // 函数组件
//     Input: function (props) {
//         const { placeholder, onValueInput } = props;
//         return (
//             <input
//                 type="text"
//                 placeholder={placeholder}
//                 onChange={(e) => onValueInput(e)}
//             />
//         )
//     }
// }

// class App extends React.Component {
//     onValueInput(e) {
//         console.log(e.target.value)
//     }
//     render() {
//         return (
//             <div>
//                 <MyUI.Button type="danger">Click</MyUI.Button>
//                 <MyUI.Input placeholder="请填写" onValueInput={this.onValueInput}></MyUI.Input>
//             </div>

//         )
//     }
// }

/**
 * JSX书写规范
 * 1. 小写字母开头代表HTML的内置组件
 * <div> <h1>
 * 首先将标签转换为字符串'div','h1',作为React.createElement第一个参数
 * 
 * 2. 大写字母开头的自定义组件<MyButton>
 * 直接编译成React.createElement(MyButton)
 * ReactDOM.render(
 *      <App />, // 这里也可以写React.createElement(App)
 *      document.getElementById('app')
 * )
 */

/**
 * 运行时选择React类型: LoginBtnGroup或WelcomInfo
 * 组件就是一个类型
 */
// class LoginBtnGroup extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button>登录</button>
//                 <button>注册</button>
//             </div>
//         )
//     }
// }

// class WelcomInfo extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>欢迎您！{this.props.username}</h1>
//             </div>
//         )
//     }
// }

// class Header extends React.Component {
//     static components = {
//         'login': LoginBtnGroup,
//         'welcome': WelcomInfo
//     }
//     render() {
//         const HeaderUser = Header.components[this.props.type]
//         return (
//             <HeaderUser {...this.props} />
//         )
//     }
// }

// class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 <Header
//                     type={"welcome"}
//                     username='xiaoye'
//                 />
//             </div>
//         )
//     }
// }

/**
 * JSX的props
 * 
 * JSX中的{}，它里面可以传入任何JS表达式，不包括语句if、for、Switch、function。
 * 非表单式，可以在JSX外面使用
 * 
 * 通过一个state来管理到底显示主标题还是子标题
 */

// function MyTitle(props) {
//     const { title, author } = props;

//     return (
//         <div>
//             <h1>{title}</h1>
//             <p>{author}</p>
//         </div>
//     )
// }

// class App extends React.Component {
//     state = {
//         mainTitle: "This is a MainTitle",
//         subTitle: "This is a SubTitle",
//         titleShow: '1' // sub
//     }

//     render() {
//         let title = ""
//         // 1. 使用if进行判断
//         // if (this.state.titleShow === 'sub') {
//         //     title = <h2>{this.state.subTitle}</h2>
//         // } else {
//         //     title = <h1>{this.state.mainTitle}</h1>
//         // }
//         // 2. 有多个标题可以使用switch
//         // switch (this.state.titleShow) {
//         //     case 'main':
//         //         title = <h1>{this.state.mainTitle}</h1>
//         //         break;
//         //     case 'sub':
//         //         title = <h2>{this.state.subTitle}</h2>
//         //         break;
//         //     default:
//         //         title = <h3>There is no Title</h3>
//         //         break;
//         // }

//         // 解构
//         const { titleShow, mainTitle, subTitle } = this.state;

//         return (
//             // <MyTitle
//             //     title={`${this.state.mainTitle}(${this.state.subTitle})`}
//             //     author="Xiaoye"
//             // />
//             <div>
//                 {/* {title} */}
//                 {/* 3. 不用Switch直接在JSX里面写三目运算符，只适合只有main和sub的情况 */}
//                 {
//                     this.state.titleShow === 'sub'
//                         ? <h2>{subTitle}</h2>
//                         : <h1>{mainTitle}</h1>
//                 }

//             </div>
//         )
//     }
// }
/**
 * 任何地方都可以写JSX，如render中，不一定都写在return里面，只要最后把JSX return出去就可以了。
 */

/**
 * 1. 字符串字面量赋值方式：title="这是一个标题"
 * 2. 表单式的方式：title={'这是一个标题'}
 * 
 * 如果是 title='这是一个<标题>'。显示为：这是一个<标题>
 * 如果是 title={'这是一个&lt;标题&gt;'}。 显示：这是一个&lt;标题&gt;
 * 如果是 title='这是一个&lt;标题&gt;'。显示为：这是一个<标题>
 * 字符串字面量传入props的方式不会对html实体转移，但是JS表单式传入props实体字符会被转移为普通字符。
 */

// class App extends React.Component {
//     render() {
//         return (
//             <MyTitle
//                 // title="这是一个标题"
//                 title={'这是一个<标题>'}
//                 author=""
//             />
//         )
//     }
// }
/**
 * props的布尔表达
 * 
 * 案例：根据authorShow判断author是不是要显示
 */

// function MyTitle(props) {
//     const { title, author, authorShow } = props;

//     return (
//         <div>
//             <h1>{title}</h1>
//             {
//                 /**
//                  * 1. 语义：authorShow Boolean 真假
//                  */
//                 authorShow
//                     ? <p>{author}</p>
//                     : ''
//             }

//         </div>
//     )
// }
// class App extends React.Component {
//     render() {
//         return (
//             <MyTitle
//                 title="This is a Title"
//                 author="Xiaye"
//                 /**
//                  * authorShow="true"
//                  * 2. 语义：字符串传入的意义是字符串的意思，不代表布尔真假
//                  * 逻辑：字符串true是逻辑真
//                  * 应该写成表达式：authorShow={ true }
//                  */
//                 // 语义和逻辑：Bool true的意义代表Bool真假
//                 // authorShow={true}

//                 // 不赋值属性，默认就是Bool 真
//                 // 不推荐这么做，语义不好
//                 // authorShow
//             />
//         )
//     }
// }

/**
 * 属性展开操作
 */
// function MyTitle(props) {
//     const { children, author, authorShow } = props;

//     return (
//         <div>
//             {/* 没有显示的传入children */}
//             <h1>{children}</h1>
//             {
//                 authorShow
//                     ? <p>{author}</p>
//                     : ''
//             }

//         </div>
//     )
// }
// class App extends React.Component {
//     render() {
//         // const { title, author, authorShow } = this.props;
//         const { a, ...others } = this.props;

//         return (
//             <MyTitle
//                 // title="This is a Title"
//                 // author="Xiaye"
//                 // authorShow={true}
//                 {...others}
//             />
//         )
//     }
// }

// ReactDOM.render(
//     <App
//         title="This is a Title"
//         author="Xiaye"
//         authorShow={true}
//         a="1"
//     >This is a Title.</App>,
//     document.getElementById('app')
// )

/**
 * JSX 子元素
 * 
 * 字符串字面量作为子元素有什么特点
 * JSX作为JSX子元素
 */
// class MyTitle extends React.Component {
//     render() {
//         return (
//             <h1>{this.props.children}</h1>
//         )
//     }
// }
// class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 {/**
//                  * 字符串字面量：是不转义的
//                  * 1. 去掉首位空格、换行
//                  * 2. 字符串之间的多个空格压缩为一个空格，可以通过字符实体&nbsp;多个空格
//                  * 3. 字符串之间的换行压缩为一个空格。使用<br/>换行
//                  */}
//                 <MyTitle>This is a Title</MyTitle>
//             </div>
//         )
//     }
// }
/**
 * JSX作为JSX子元素
 */

// class MyList extends React.Component {
//     render() {
//         return (
//             <div className={this.props.listClassName}>
//                 <h1>{this.props.title}</h1>
//                 <ul className="my-list">{this.props.children}</ul>
//             </div>
//         )
//     }
// }

// class ListItem extends React.Component {
//     render() {
//         return (
//             <li>{this.props.children}</li>
//         )
//     }
// }

// class ListItems extends React.Component {
//     render() {
//         // 返回数据
//         // return [
//         //     <li key="1">This is content 1.</li>,
//         //     <li key="2">This is content 2.</li>,
//         //     <li key="3">This is content 3.</li>
//         // ]

//         // 如果想返回一组JSX的话，可以直接返回数组
//         return this.props.listData.map((item, index) => (
//             <li key={index}>{item}</li>
//         ))
//     }
// }


// class App extends React.Component {
//     //可以把children写成数据
//     state = {
//         listData: [
//             'This is my content 1.',
//             'This is my content 2.',
//             'This is my content 3.'
//         ]
//     }
//     render() {
//         return (
//             <MyList
//                 listClassName="my-list-container"
//                 title="This is my list"
//             >
//                 {/* <ListItem>This is my content 1.</ListItem>
//                 <ListItem>This is my content 2.</ListItem>
//                 <ListItem>This is my content 3.</ListItem> */}
//                 {/* {
//                     this.state.listData.map((item, index) => (
//                         <ListItem key={index}>Hello, {item}</ListItem>
//                     ))
//                 } */}
//                 {/* <ListItems />
//                  */}
//                 <ListItems listData={this.state.listData} />
//             </MyList>
//         )
//     }
// }

/**
 * JSX 子元素 
 * null undefined bool都是可以作为JSX的子元素，
 * 这些子元素是会被忽略不会渲染的，标签是会渲染的
 * 
 * 为什么不会渲染呢？
 * 为解决条件渲染的问题
 */

// class App extends React.Component {
//     state = {
//         show: true,
//         data: []
//     }

//     render() {
//         return (
//             <div>
//                 {/* 都不会渲染 */}
//                 <div>{true}</div>
//                 <div>{false}</div>
//                 <div>{undefined}</div>
//                 <div>{null}</div>

//                 {/* 渲染 */}
//                 <div>{String(null)}</div>
//                 <div>
//                     {this.state.show ? 'ok' : '不ok'}
//                 </div>
//                 <div>
//                     {
//                         this.state.show && 'ok'
//                     }
//                 </div>
//                 <div>
//                     {
//                         this.state.data.length ? '有数据' : '无数据'
//                     }
//                 </div>
//                 <div>
//                     {
//                         // 显示0。因为JSX中0是会渲染的，这个条件
//                         // this.state.data.length && '有数据'

//                         this.state.data.lenght > 0 && '有数据'
//                     }
//                 </div>
//             </div>

//         )
//     }
// }

/**
 * 函数作为子元素 props.children是函数
 * 
 * JSX的props.children根props本身是有一直2的特性
 * props.children就可以传递任何类型的子元素
 * 
 * 适合视图渲染前的一些逻辑
 */

//定义一个Repeat组件专门来循环子项并打印出来且每次的index都不同
// class Repeat extends React.Component {
//     render() {
//         const jsxArr = [];
//         for (var i = 0; i < this.props.num; i++) {
// this.props.children 
// -> 父组件App里传入的值是一个函数(index) 
// => <p>...</p>
//并将传入的函数执行并传入参数i的结果依次存入数组
//             jsxArr.push(this.props.children(i));
//         }
//         return jsxArr;
//         /**
//          * <p>This is item 1.</p>
//          * <p>This is item 2.</p>
//          */
//     }
// }

// class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 <Repeat num={10}>
//                     {
//                         (index) => <p key={index}>This is item {index + 1}.</p>
//                     }
//                 </Repeat>
//             </div>
//         )
//     }
// }

/**
 * 表格 getStudents getTeachers
 */
// import Http from './Http'
// class App extends React.Component {
//     render() {
//         return (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>姓名</th>
//                         <th>年级</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <Http.Get
//                         url="http://localhost:8888/getStudents"
//                         loading={
//                             <tr colSpan="3">正在加载中...</tr>
//                         }
//                     >
//                         {
//                             (data) => {
//                                 return data.map((item, index) => (
//                                     <tr key={item.id}>
//                                         <td>{item.id}</td>
//                                         <td>{item.name}</td>
//                                         <td>{item.grade}</td>
//                                     </tr>
//                                 ))
//                             }
//                         }
//                     </Http.Get>
//                 </tbody>
//             </table>
//         )
//     }
// }

function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i))
    }
    return <div>{items}</div>
}

function App() {
    return (
        <Repeat numTimes={10}>{
            (index) => (
                <div key={index}>This is item {index} in the list.</div>
            )
        }</Repeat>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)