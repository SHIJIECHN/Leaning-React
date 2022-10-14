import React, { lazy, Suspense, Component } from 'react'
import Loading from './14.loading.js';

import { Route, Routes } from 'react-router'

const MainComponent = lazy(() => import('./14.main.js'))
class App extends Component {
  /**
      <Suspense fallback={<Loading />}>
        <MainComponent />
      </Suspense>
   */
  render() {
    return (
      <Suspense fallback={<Loading />}>
        <div className='app'>
          <Routes>
            <Route path="/page1" element={lazy(() => import('./views/page1.jsx'))}></Route>
            <Route path="/page2" element={lazy(() => import('./views/page2.jsx'))}></Route>
            <Route path="/page3" element={lazy(() => import('./views/page3.jsx'))}></Route>
          </Routes>

        </div>
      </Suspense>
    );
  }
}

export default App;