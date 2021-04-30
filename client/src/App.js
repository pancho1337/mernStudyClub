import { Fragment } from 'react';
import './App.css';
import Navbar from './components/layouts/navbar'
import Landing from './components/layouts/landing'

const App = () => 
  <Fragment className="App">
    <Navbar />
    <Landing />
  </Fragment>


export default App;
