import { Route, Routes } from "react-router-dom";
import React from 'react'
import Loading from "../component/Loading/Loading";
import Profile from "../pages/Profile/Profile";
import Home from "../pages/Home/Home";

import LayoutNoRightSide from "../component/Layout/LayoutNoRightSide";
import { ProtectedPage } from "../component/ProtectedPage/ProtectedPage";
import Search from "../pages/Search/Search";
import Messages from "../pages/Messages/Messages";
import Friends from "../pages/Friends/Friends";
import Notification from "../pages/Notification/Notification";
import PostDetail from "../pages/PostDetail/PostDetail";
const Login = React.lazy(() => import('../pages/Login/Login'))
export default function Router() {
    
    return (
        <Routes>
        <Route
          index
          element={
            <React.Suspense fallback={<Loading/>}>
                <ProtectedPage page={Home} layout ={LayoutNoRightSide}/>

            </React.Suspense>
          }
        />
        <Route
          path="login"
          element={
            <React.Suspense fallback={<Loading/>}>
              <Login />
            </React.Suspense>
          }
        />
        <Route
          path="profile/:id?"
          element={
            <React.Suspense fallback={<Loading/>}>
                <ProtectedPage page={Profile} layout ={LayoutNoRightSide}/>
            </React.Suspense>
          }
        />
        <Route
          path="post/:q"
          element={
            <React.Suspense fallback={<Loading/>}>
                <ProtectedPage page={PostDetail} layout ={LayoutNoRightSide}/>
            </React.Suspense>
          }
        />
        <Route
          path="search/:q?"
          element={
            <React.Suspense fallback={<Loading/>}>
                <ProtectedPage page={Search} layout ={LayoutNoRightSide}/>
            </React.Suspense>
          }
        />
        <Route
          path="messages/:q?"
          element={
            <React.Suspense fallback={<Loading/>}>
                <ProtectedPage page={Messages} layout ={LayoutNoRightSide}/>
            </React.Suspense>
          }
        />
        <Route
          path="friends"
          element={
            <React.Suspense fallback={<Loading/>}>
                <ProtectedPage page={Friends} layout ={LayoutNoRightSide}/>
            </React.Suspense>
          }
        />

        <Route
          path="notify"
          element={
            <React.Suspense fallback={<Loading/>}>
                <ProtectedPage page={Notification} layout ={LayoutNoRightSide}/>
            </React.Suspense>
          }
        />

        <Route path="*" element={<>404</>} />
      </Routes>
    );
}
