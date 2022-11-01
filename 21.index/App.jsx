/**
 * Refs 
 * 允许我们访问真实DOM
 * 
 * React数据流，通过props来实现父子组件的交互
 * Refs允许我们用于强制修改子组件
 */

/**
 * 管理input的焦点
 * 
 * 通过一个按钮，清空input value，input聚焦
 */
// class MyInput extends React.Component {
//     constructor(props) {
//         super(props);
//         // 创建一个引用值
//         this.inputRef = React.createRef();
//     }

//     state = {
//         inputValue: ''
//     }

//     inputOperating() {
//         console.log(this.inputRef);// { curent: input } current就是input真实节点
//         // 操作input
//         const oInput = this.inputRef.current;

//         // oInput.value = ''
//         oInput.focus();

//         this.setState({
//             inputValue: ''
//         })
//     }

//     changeInputValue(e) {
//         this.setState({
//             inputValue: e.target.value
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <input
//                     type="text"
//                     ref={this.inputRef}
//                     value={this.state.inputValue}
//                     onChange={this.changeInputValue.bind(this)}
//                 />
//                 <button onClick={this.inputOperating.bind(this)}>操作INPUT</button>
//             </div>
//         )
//     }
// }

/**
 * 视频媒体管理
 */

// class MyVideo extends React.Component {
//     constructor(props) {
//         super(props);
//         this.videoRef = React.createRef();
//     }
//     // 播放
//     videoPlay() {
//         console.log(this.videoRef)
//         this.videoRef.current.play();
//     }
//     // 暂停
//     videoPause() {
//         this.videoRef.current.pause();
//     }

//     render() {
//         return (
//             <div>
//                 <video
//                     src=""
//                     width="300"
//                     height="200"
//                     controls
//                     ref={this.videoRef}
//                 />
//                 <button onClick={this.videoPlay.bind(this)}>Play</button>
//                 <button onClick={this.videoPause.bind(this)}>Pause</button>
//             </div>
//         )
//     }
// }

/**
 * 强制动画与集成第三方DOM库JQuery
 */
// class MyBox extends React.Component {
//     constructor(props) {
//         super(props);
//         this.boxRef = React.createRef();
//     }

//     boxExtends() {
//         // const oBox = this.boxRef.current;
//         // oBox.style.width = '500px';
//         // oBox.style.height = '500px';

//         // 使用JQuery
//         const $box = $(this.boxRef.current);
//         console.log($box)
//         $box.animate({
//             width: '500px',
//             height: '500px'
//         })
//     }
//     render() {
//         return (
//             <>
//                 <div
//                     style={{
//                         width: 200 + 'px',
//                         height: 200 + 'px',
//                         backgroundColor: 'orange',
//                         transition: 'all 1s'
//                     }}
//                     ref={this.boxRef}
//                 ></div>
//                 <button onClick={this.boxExtends.bind(this)}>Extend</button>
//             </>
//         )
//     }
// }

/**
 * React 中使用JQuery，操作DOM
 * 引入<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
 */

// 是不是所有的情况都适合Refs呢？
/**
 * 模态框打开关闭
 */

// class Modal extends React.Component {

//     constructor(props) {
//         super(props);

//         this.modalRef = React.createRef();

//         /**
//          * 如果当时使用Modal的时候传入了onRef，就给onRef传入当前this
//          * 也就是说onRef的参数就是当前的组件本身，也就是当前的类的实例，
//          * 这个实例就是可以访问open和close
//          */
//         if (props.onRef) {
//             props.onRef(this);
//         }
//     }

//     open() {
//         this.modalRef.current.style.display = "block"
//     }

//     close() {
//         this.modalRef.current.style.display = "none"
//     }

//     render() {
//         return (
//             <div
//                 style={{
//                     width: 300 + 'px',
//                     border: '1px solid #000',
//                     display: 'none'
//                 }}
//                 ref={this.modalRef}
//             >
//                 <h1>This is a Modal</h1>
//                 <p>This is a super Modal.</p>
//             </div>
//         )
//     }
// }

/**
 * Modal中的open和close实际上是给使用Modal的组件调用的，那父组件怎么调用Modal中的open和close方法呢？
 * 
 * onRef是个函数，接收到的参数是组件的实例 
 * 
 * 
 * 这样做不合理。
 * 考虑status成一个状态，用这个状态控制Modal显示与否
 * 
 * 在Modal中不写open和close方法，利用外界传过来的props里面的isOpen状态，来判断是否显示Modal
 * 
 * 本身isOpen状态应该是Modal的，但是我让给了父组件，这叫做状态提升
 * 
 * 完全是可以状态去控制组件的一些样式，特别是隐藏、显示之类的，包括显示的内容，
 * 我们可以将本身属于子组件里面的状态，让父组件做一次状态的提升，这样的话组件的可配置性更高
 */

// class Modal extends React.Component {
//     render() {
//         return (
//             <div
//                 style={{
//                     width: 300 + 'px',
//                     border: '1px solid #000',
//                     display: this.props.isOpen ? 'block' : 'none'
//                 }}
//             >
//                 <h1>This is a Modal</h1>
//                 <p>This is a super Modal.</p>
//             </div>
//         )
//     }
// }

// class App extends React.Component {
//     modalOpen(status) {
//         this.setState({
//             isOpen: status === 'open' ? true : false
//         })
//     }

//     state = {
//         isOpen: false
//     }
//     render() {
//         return (
//             <div>
//                 <Modal isOpen={this.state.isOpen} />
//                 <button onClick={() => this.modalOpen('open')}>open</button>
//                 <button onClick={() => this.modalOpen('close')}>close</button>
//             </div>
//         )
//     }

// }


/**
 * createRef -> React => React.createRef()
 * 
 * 通过createRef 创建ref对象
 * 通过元素的ref属性可以附加到React元素上
 * 一般通过构造器中给this上的属性赋值ref，方便整个组件使用
 * ref只要传递React元素中，就可以利用current属性访问到该真实DOM节点
 * 
 * ref在什么时候更新呢？
 * ref在componentDidMount和componentDidUpdate触发前更新，也就是说可以
 * 在这两个生命周期函数内访问到ref最终的值。
 */

/**
 * ref有不同的使用方式
 * 1. ref放在html元素上，current就是真实DOM节点
 * 2. ref放在class组件上，current指向组件的实例
 * 3. ref放在函数组件上，函数组件没有实例，createRef附加不到组件上，就不能使用。
 * 
 * 函数组件如何使用ref？
 * useEffect。
 * 
 * 为什么ref是这样的对象（{current：xxx}）？方便以后官方扩展。
 * 为什么赋值在this上？方便整个组件的调用。
 */

// class Test extends React.Component {
//     constructor(props) {
//         super(props);
//         this.divRef = React.createRef();
//         console.log(this.divRef)
//     }
//     componentDidMount() {
//         console.log(this.divRef)
//     }
//     componentDidUpdate() {
//         console.log(this.divRef)
//     }
//     render() {
//         return (
//             <div ref={this.divRef}>{this.props.children}</div>
//         )
//     }
// }

// function Test2() {
//     // 1. 函数组件中使用useRef hooks
//     const divRef = React.useRef(null);

//     // 3. 打印。针对React中的componentDidMount，函数组件中使用useEffect，不依赖任何变量
//     React.useEffect(() => {
//         console.log(divRef)
//     }, [])

//     return (
//         // 2. 附加到元素中
//         <div ref={divRef}>Hello, Function Ref!</div>
//     )
// }

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.TestRef = React.createRef();
//     }
//     state = {
//         text: 'Hello, Ref！'
//     }
//     componentDidMount() {
//         console.log(this.TestRef)
//         setTimeout(() => {
//             this.setState({
//                 text: 'Hello, xiaoye'
//             })
//         }, 1000)
//     }
//     render() {
//         return (
//             <div>
//                 <Test ref={this.TestRef}>
//                     {this.state.text}
//                 </Test>
//                 {/* <Test2 /> */}
//             </div>

//         )
//     }
// }


/**
 * 如何通过ref父组件拿到子组件的元素上的ref？
 * 
 * 在父组件中将子组件中的input清空并聚焦，需要获得子组件中input的DOM
 * 
 * 如何将子节点的ref暴露给父组件
 * 
 * React 16.3以上 Refs转发
 * 将ref自动的通过组件传递给子组件。普通的定义一个类组件作为子组件就无法满足。
 * 
 * 使用React.forwardRef((props, ref) => {return React元素})
 * 
 */

// class MyInput extends React.Component {
//     render() {
//         return (
//             <input type="text" placeholder="请填写..." />
//         )
//     }
// }


// // 3. 通过forwardRef向input转发ref属性
// const MyInput = React.forwardRef((props, ref) => (
//     // 5. ref参数只能用forwardRef定义的组件内可接收
//     <input type="text" placeholder={props.placeholder} ref={ref} />
// ))

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         // 1. 创建ref对象
//         this.myInputRef = React.createRef();
//     }
//     componentDidMount() {
//         // 4. myInputRef.current指向input DOM节点
//         console.log(this.myInputRef);
//     }
//     inputOerate() {
//         const oInput = this.myInputRef.current;

//         oInput.value = '';
//         oInput.focus();
//     }
//     render() {
//         return (
//             <div>
//                 {/* 2. 给组件赋值ref */}
//                 <MyInput ref={this.myInputRef} placeholder="请填写..." />
//                 <button onClick={this.inputOerate.bind(this)}>Click</button>
//             </div>
//         )
//     }
// }


/**
 * 有一个高阶组件，你需要将你的组件实例 转发给子组件
 */

// class MyInput extends React.Component {
//     render() {
//         return (
//             <input type="text" placeholder={this.props.placeholder} />
//         )
//     }
// }

// function InputHoc(WrapperComponent) {
//     class Input extends React.Component {
//         render() {
//             // 2. 在容器组件内部获取ref属性
//             const { forwardedRef, ...props } = this.props;
//             return (
//                 // 3. 将ref传递给参数组件
//                 <WrapperComponent ref={forwardedRef} {...props} />
//             )
//         }
//     }

//     // return React.forwardRef((props, ref) => {
//     //     // 将所有的props传递过去，ref给传递到子组件里去
//     //     return <Input {...props} forwardedRef={ref} />
//     // })

//     // 1. 向子组件传递ref
//     function forwardRef(props, ref) {
//         return <Input {...props} forwardedRef={ref} />
//     }
//     // 给React.forwardRef组件命名
//     forwardRef.displayName = 'input - ' + WrapperComponent.name;
//     return React.forwardRef(forwardRef)
// }

// const MyInputHoc = InputHoc(MyInput);

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.inputRef = React.createRef();
//     }
//     componentDidMount() {
//         // 5. 拿到本身组件的
//         console.log(this.inputRef);
//     }
//     render() {
//         return (
//             // 4. 用ref接收我们转发的ref
//             <MyInputHoc ref={this.inputRef} placeholder="请填写..." />
//         )
//     }
// }

/**
 * React 16.2及 ref转发
 */

// class MyInput extends React.Component {
//     render() {
//         return (
//             <input type="text" ref={this.props.inputRef} />
//         )
//     }
// }

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.inputRef = React.createRef();
//     }
//     componentDidMount() {
//         console.log(this.inputRef);
//     }
//     render() {
//         return (
//             <MyInput inputRef={this.inputRef} />
//         )
//     }
// }

// // 2. 回调一：在本组件中设置回调函数
// class MyInput extends React.Component {
//     constructor(props) {
//         super(props);

//         this.myInput = null;
//     }
//     // 回调函数会接收一个el的参数，这个参数就是节点
//     // setMyInput(el) {
//     //     this.myInput = el;
//     // }
//     // focusInput(e) {
//     //     this.myInput.value = '';
//     //     this.myInput.focus();
//     // }

//     componentDidMount() {
//         console.log(this.refs.inputRef);
//     }
//     render() {
//         return (
//             <div>
//                 {/* <input type="text" ref={this.setMyInput.bind(this)} /> */}
//                 {/* <input type="text" ref={this.props.inputRef} /> */}
//                 {/* <button onClick={this.focusInput.bind(this)}>click</button> */}
//                 <input type="text" ref='inputRef' />
//             </div>
//         )
//     }
// }

// 3. 回调二：在父组件中设置回调函数。在父组件中使用回调函数则可以通过props的方式传进去
// class App extends React.Component {
//     // componentDidMount() {
//     //     console.log(this.oInput)
//     // }
//     render() {
//         return (
//             // <MyInput inputRef={el => this.oInput = el} />
//             <MyInput />
//         )
//     }
// }

// 4. 已经废弃的方式
/**
 * 这种方式的缺点：
 * 1. string Refs依赖于当前组件实例下面的refs集合里的ref
 * 需要React保持追踪当前正在渲染的组件，如果当前组件没有加载完成，this是没法确定的
 * 导致React在获取ref的时候可能回比较慢
 * 
 * 2. 不能在render中工作
 * render(){
 *      console.log(this.refs); // {}
 * }
 * 不能组合，只能有一个ref
 */



// 官网
// const MyInput = React.forwardRef((props, ref) => {
//     return (
//         <input type="text" ref={ref} className="my-input" />
//     )
// })

class MyInput extends React.Component {
    render() {
        return (
            <input type="text" className="my-input" ref={this.props.InputRef} />
        )
    }
}

class App extends React.Component {

    componentDidMount() {
        console.log(this.oInput);
    }
    render() {
        return (
            <div>
                <MyInput InputRef={el => this.oInput = el} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)

