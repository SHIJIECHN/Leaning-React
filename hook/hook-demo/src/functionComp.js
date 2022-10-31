import { useInfo } from './service/index.js';

const useList = (info, itemTpl) => {
  return (
    <ul dangerouslySetInnerHTML={{ __html: info.map(item => itemTpl(item)) }}>
    </ul>
  )
}

function App() {
  const info = useInfo();

  function itemTpl(item) {
    var tpl = '';
    for (let [key, value] of Object.entries(item)) {
      if (typeof value === 'object') {
        tpl += `<ul><li>${key}: ${itemTpl(value)}</li></ul>`
      } else {
        tpl += `<li>${key}: ${value}</li>`
      }

    }
    return tpl;
  }

  return useList(info, itemTpl);
}

export default App;