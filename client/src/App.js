import { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layouts/navbar'
import Landing from './components/layouts/landing'

import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => 
<Router>
  <div className="App">
  <Fragment>
    <Navbar />
    <Route exact path="/" component={ Landing } />
    <section className='container'>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </section>
  </Fragment>
  </div>
</Router>



export default App;
