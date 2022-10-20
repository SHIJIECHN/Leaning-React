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
class MyInput extends React.Component {
    constructor(props) {
        super(props);
        // 创建一个引用值
        this.inputRef = React.createRef();
    }

    state = {
        inputValue: ''
    }

    inputOperating() {
        console.log(this.inputRef);// { curent: input } current就是input真实节点
        // 操作input
        const oInput = this.inputRef.current;

        // oInput.value = ''
        oInput.focus();

        this.setState({
            inputValue: ''
        })
    }

    changeInputValue(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    ref={this.inputRef}
                    value={this.state.inputValue}
                    onChange={this.changeInputValue.bind(this)}
                />
                <button onClick={this.inputOperating.bind(this)}>操作INPUT</button>
            </div>
        )
    }
}

/**
 * 视频媒体管理
 */

class MyVideo extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }
    // 播放
    videoPlay() {
        console.log(this.videoRef)
        this.videoRef.current.play();
    }
    // 暂停
    videoPause() {
        this.videoRef.current.pause();
    }

    render() {
        return (
            <div>
                <video
                    src=""
                    width="300"
                    height="200"
                    controls
                    ref={this.videoRef}
                />
                <button onClick={this.videoPlay.bind(this)}>Play</button>
                <button onClick={this.videoPause.bind(this)}>Pause</button>
            </div>
        )
    }
}

/**
 * 强制动画与集成第三方DOM库JQuery
 */
class MyBox extends React.Component {
    constructor(props) {
        super(props);
        this.boxRef = React.createRef();
    }

    boxExtends() {
        // const oBox = this.boxRef.current;
        // oBox.style.width = '500px';
        // oBox.style.height = '500px';

        // 使用JQuery
        const $box = $(this.boxRef.current);
        console.log($box)
        $box.animate({
            width: '500px',
            height: '500px'
        })
    }
    render() {
        return (
            <>
                <div
                    style={{
                        width: 200 + 'px',
                        height: 200 + 'px',
                        backgroundColor: 'orange',
                        transition: 'all 1s'
                    }}
                    ref={this.boxRef}
                ></div>
                <button onClick={this.boxExtends.bind(this)}>Extend</button>
            </>
        )
    }
}

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

class Modal extends React.Component {
    render() {
        return (
            <div
                style={{
                    width: 300 + 'px',
                    border: '1px solid #000',
                    display: this.props.isOpen ? 'block' : 'none'
                }}
            >
                <h1>This is a Modal</h1>
                <p>This is a super Modal.</p>
            </div>
        )
    }
}

class App extends React.Component {
    modalOpen(status) {
        // switch (status) {
        //     case 'open':
        //         this.modal.open();
        //         break;
        //     case 'close':
        //         this.modal.close();
        //         break;
        //     default:
        //         break;
        // }

        this.setState({
            isOpen: status === 'open' ? true : false
        })
    }

    state = {
        isOpen: false
    }
    render() {
        return (
            <div>
                {/* <MyInput /> */}
                {/* <MyVideo /> */}
                {/* <MyBox /> */}
                {/* onRef是个函数，接收到的参数是组件的实例 */}
                {/* <Modal onRef={(instance) => this.modal = instance} /> */}
                <Modal isOpen={this.state.isOpen} />
                <button onClick={() => this.modalOpen('open')}>open</button>
                <button onClick={() => this.modalOpen('close')}>close</button>
            </div>
        )
    }

}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)

// 还能不嫩state？