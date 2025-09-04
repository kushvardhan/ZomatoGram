import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/user/sign-up' element={<h1>User register</h1>} />
            <Route path='/user/sign-in' element={<h1>User Login</h1>} />
            <Route path='/food-partner/sign-up' element={<h1>Foodpartner register</h1>} />
            <Route path='/food-partner/sign-in' element={<h1>FoodPartner Login</h1>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes