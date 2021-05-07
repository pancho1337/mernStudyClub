import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/navbar'
import Landing from './components/layouts/landing'
import Alert from './components/layouts/alert'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

import { Provider } from 'react-redux'
import store  from './store.js'

import './App.css';

const App = () => 
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
        </Switch>
      </section>
    </Fragment>
    </div>
  </Router>
</Provider>



export default App;
