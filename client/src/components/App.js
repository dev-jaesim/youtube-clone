import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './about';
import RegisterLogin from './registerLogin';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<RegisterLogin />} />
      </Routes>
    </div>
  );
}

export default App;
