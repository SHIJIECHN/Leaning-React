import React, { useContext, useEffect, useRef } from 'react'
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
// const themes = {
//   light: {
//     foreground: '#000000',
//     background: '#222222'
//   },
//   dark: {
//     foreground: '#ffffff',
//     background: '#222222'
//   }
// }

// const ThemeContext = React.createContext(themes.light);

// function App() {
//   return (
//     // Provider 提供值
//     <ThemeContext.Provider value={themes.dark}>
//       <Toolbar />
//     </ThemeContext.Provider>
//   )
// }

// function Toolbar(props) {
//   return (
//     <div>
//       <ThemedButton />
//     </div>
//   )
// }

// function ThemedButton() {
//   // 获取值
//   const theme = useContext(ThemeContext);
//   return (
//     <button style={{
//       background: theme.background,
//       color: theme.foreground
//     }}>
//       I am styled by theme context
//     </button>
//   )
// }

// function TextInputWithFocusButton() {
//   const inputEl = useRef(null);
//   const onButtonClick = () => {
//     inputEl.current.focus();
//   }

//   return (
//     <>
//       <input type="text" ref={inputEl} />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   )
// }

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  const inputMethod = () => {
    console.log('This is FancyInput method.')
  }

  // 通过参数ref把子组件的方法暴露出去
  useImperativeHandle(ref, () => {
    // 返回方法集合
    return {
      inputMethod
    }
  })
  // 抛出子组件的引用
  return <input ref={inputRef} />
})



function App() {
  const myRef = useRef(null);
  useEffect(() => {
    console.log(myRef); // current是一个对象而不是子组件真实DOM 
    /**
      current:
        inputMethod: () => { console.log('This is FancyInput method.'); }
          length: 0
          name: "inputMethod"
          arguments: (...)
          caller: (...)
     */
  })
  return (
    <div>
      <FancyInput ref={myRef} />
    </div>
  )
}

export default App;