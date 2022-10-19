/**
 * Student List 
 * {
 *  id, name, grade
 * }
 * 
 * Teacher List 
 * {
 *  id, name, subject, like
 * }
 */

import { fetchListData } from './model'

class App extends React.Component {
  componentDidMount() {
    fetchListData('student').then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="app">123</div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)