import { Component, useEffect, useState } from 'react'

function withInfo(COM) {
  return class extends Component {
    state = {
      info: []
    }

    componentDidMount() {
      ; (
        async () => {
          let res = await fetch('http://jsonplaceholder.typicode.com/users').then(res => res.json());
          this.setState({
            info: res
          })
        }

      )();
    }

    render() {
      return (
        <>
          <COM {...this.state}></COM>
        </>

      )
    }
  }
}


// 自定义hooks
function useInfo() {
  const [info, setInfo] = useState([]);

  // 希望初次加载的时候执行，所有第二个参数是空数组[]
  useEffect(() => {
    (async () => {
      let res = await fetch('http://jsonplaceholder.typicode.com/users').then(res => res.json())

      setInfo(res);
    })();
  }, []);

  return info;
}


export {
  withInfo,
  useInfo
};

/**
 * 高阶组件存在组件嵌套的问题，hooks不存在这个问题
 */