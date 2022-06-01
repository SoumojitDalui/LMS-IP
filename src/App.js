import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './Components/Home'
import Employee from './Components/Employee';
import Manager from './Components/Manager';
import LeavesOfIndividual from './Components/LeavesOfIndividual';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="emp" element={<Employee/>} />
            <Route path="mnger" element={<Manager/>} />
            <Route path="check" element={<LeavesOfIndividual/>} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
