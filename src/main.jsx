import BookDetails from "./components/BookDetails/BookDetails.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Home from "./components/Home/Home.jsx";
import ListedBooks from "./components/ListedBooks/ListedBooks.jsx";
import Root from "./components/Root/Root.jsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthProvider from "./providers/AuthProvider.jsx";
import SignUp from "./components/SignUP/SignUp.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import Cart from "./components/Cart/Cart.jsx";
import PrivateRoute from "./components/Route/PrivateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/listedBooks",
        Component: ListedBooks,
      },
      {
        path: `/book/:bookId`,
        loader: () => fetch("booksData.json"),
        Component: BookDetails,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: '/signin',
        Component: SignIn
      },
      {
        path: '/cart',
        element: <PrivateRoute><Cart></Cart></PrivateRoute>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
);
