import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/navbar'
import Landing from './components/layouts/landing'
import Alert from './components/layouts/alert'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/DashBoard'
import CreateProfile from './components/profile-form/createProfile'
import EditProfile from './components/profile-form/editProfile'
import AddExperience from './components/profile-form/addExperience'
import AddEducation from './components/profile-form/addEducation'
import PrivateRoute from './components/routing/PrivateRoute'

import { Provider } from 'react-redux'
import store  from './store.js'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])
  return(
    <Provider store={store}>
      <Router>
        <div className="App">
        <Fragment>
          <Navbar />
          <Route exact path="/" component={ Landing } />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
          </section>
        </Fragment>
        </div>
      </Router>
    </Provider>
  )
}



export default App;
