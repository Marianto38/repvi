import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../pages/layout/Layout";
import Error404 from "../pages/error404/Error404";
import Home from "../pages/home/Home";


const AppRouter = () => {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route element={<Layout />}>
             <Route path="/" Component={Home} /> 
         
          </Route>
    
          <Route path="*" Component={Error404} />
        </Routes>
      
    </BrowserRouter>
  );
};

export default AppRouter;