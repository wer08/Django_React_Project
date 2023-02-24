import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom' 
import './App.css'
import SplitPane from 'react-split-pane'
import { Provider } from 'react-redux'
import store from './store'

import Activate from './containers/Activate';
import Home from './containers/Home';
import Login from './containers/Login';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import SignUp from './containers/SignUp';
import Layout from './hocs/layout';
import Profile from './containers/Profile';
import Facebook from './containers/Facebook';
import Google from './containers/Google';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/activate/:uid/:token' element={<Activate />} />
            <Route exact path='/reset_password' element={<ResetPassword />} />
            <Route exact path='/google' element={<Google />} />
            <Route exact path='/facebook' element={<Facebook />} />
            <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
            <Route exact path='/profile' element={<Profile />} />
          </Routes>
        </ Layout>

      </Router>
    </Provider>
  )
}

export default App
