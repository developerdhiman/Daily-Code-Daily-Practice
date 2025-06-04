
import BookDetails from './components/BookDetails/BookDetails.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import Home from './components/Home/Home.jsx';
import ListedBooks from './components/ListedBooks/ListedBooks.jsx';
import Root from './components/Root/Root.jsx';
import SignIn from './components/SignIn/SignIn.jsx';
import SignUp from './components/SignUP/SignUp.jsx';
import './index.css'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home
      },
      {
        path: "/listedBooks",
        Component: ListedBooks
      },
      {
        path: `/book/:bookId`,
        loader: () => fetch('booksData.json'),
        Component: BookDetails
      },
      {
        path: '/signUp',
        Component: SignUp
      },
      {
        path: '/signIn',
        Component: SignIn
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
);
