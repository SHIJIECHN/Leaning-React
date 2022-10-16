import Loading from "./16.loading.jsx";
// import Test from "./16.main.jsx";
// import ErrorBoundary from './ErrorBoundary.jsx'

// const TestComponent = React.lazy(() => import('./16.module.jsx'))
// class App extends React.Component {
//     render() {
//         return (
//             // <Test />
//             <div>
//                 <div>123</div>
//                 <ErrorBoundary>
//                     <React.Suspense fallback={<Loading />}>
//                         {/* TestComponent组件内部发生错误 */}
//                         <TestComponent />
//                     </React.Suspense>
//                 </ErrorBoundary>

//             </div>

//         )
//     }
// }

const Test1 = React.lazy(() => import('./16.modules.folder/Test1.jsx'))
const Test2 = React.lazy(() => import('./16.modules.folder/Test2.jsx'))

class App extends React.Component {
    render() {
        return (
            <div>
                <React.Suspense fallback={<Loading />}>
                    <Test1 />
                    <Test2 />
                </React.Suspense>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)