import { createBrowserRouter } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root.jsx";
import ErrorPage from './error-page.jsx'
import Contact, {
  loader as contactLoader,
  action as contactAction
} from "./routes/contact.jsx";
import EditContact, {
  action as editAction
} from "./routes/edit.jsx";
import {
  action as destroyAction
} from './routes/destroy.jsx'
import Index from "./routes/index.jsx";


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
        index: true,
        element: <Index />
      },
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
        action: contactAction
      }, {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction
      }, {
        path: 'contacts/:contactId/destroy',
        element: <EditContact />,
        action: destroyAction,
        errorElement: <div>Oops! There was an error.</div>
      }
    ]
  },
])

export default router;