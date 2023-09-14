import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Error404 from "../pages/error404/Error404";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import PostCardDetail from "../pages/postCardDetail/PostCardDetail";
import Profile from "../pages/profile/Profile";
import { AppProvider } from "../components/appContext/AppContext";

const AppRouter = () => {
  return (
    <BrowserRouter>
    <AppProvider>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route index element={<Dashboard />} />
           <Route path="home" element={<Home />} /> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="perfil" element={<Profile />} />
          <Route path="/detalle-publicacion/:idPostCard" element={<PostCardDetail />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default AppRouter;