import React from 'react';
import { useState, createContext, useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./src/components/login";
import Main from "./src/components/main";
import Signup from './src/components/signup';

const App: React.FC = () => {
  return (
    <div className='app'>
      {/* <h1>Best Interview Tracker Ever </h1> */}
      <Routes>
        <Route path='/' element={ <Login/> } />
        <Route path='/main' element={ <Main/> } />
        <Route path='/signup' element={ <Signup/> } />
      </Routes>
    </div>
  );
};

export default App;
