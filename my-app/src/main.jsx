import { createBrowserRouter } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root.jsx";
import ErrorPage from './error-page.jsx'
import Contact, {
  loader as contactLoader
} from "./routes/contact.jsx";
import EditContact from "./routes/edit.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    // element: <div>Hello world!</div>
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, // 在组件渲染之前执行
    action: rootAction,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader
      }, {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader
      }
    ]
  },
])

export default router;