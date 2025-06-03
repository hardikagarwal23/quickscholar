import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Profile from './Pages/Profile.jsx';
import { AppContext } from './contexts/AppContext.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';

import { ToastContainer } from 'react-toastify';

const App = () => {
  const { token,userData, email } = useContext(AppContext);

  useEffect(() => {
    if (token && email) userData();
  }, [token, email]);


return (
 <>
      <ToastContainer position="bottom-right" />

      {token ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </>
);

};

export default App;

