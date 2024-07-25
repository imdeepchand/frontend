

import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom"
const Login = React.lazy(() => import("./page/Login"));
const Blog = React.lazy(() => import("./page/Blog"));
const EditBlog = React.lazy(() => import("./page/EditBlog"));


interface SuspenseWrapperProps {
  children: React.ReactNode
}

const SuspenseWrapperLogin = (props: SuspenseWrapperProps) => {
  return <>
      <Suspense fallback={'Loading...'}>
          {props.children}
      </Suspense>
  </>
}

export const router = createBrowserRouter([
  {
      path: '/login',
      children: [
          {
              index: true,
              element: <SuspenseWrapperLogin children={<Login />} />
          }
      ]
  },
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/edit-blog',
    element: <EditBlog />,
  }
]);