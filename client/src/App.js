import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Result from './components/Result';
import Renew from './components/Renew';
import Payment from "./components/Payment";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <section class='main'>
          <Routes>
            <Route path='/' element={<Register/>} />
            <Route path='/renew' element={<Renew/>} />
            <Route path='/payment' element={<Payment/>} />
            <Route path='/result' element={<Result/>} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
