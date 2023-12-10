import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarComponent from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import ListUsers from './Components/ListUsers';
import Footer from './Components/Footer';


function App() {
  return (
    <Router>
      <div>
        <NavbarComponent />
        <Switch>
          <Route path="/" exact component= {Home} />
          <Route path="/About" component= {About} />
          <Route path="/contact" component= {Contact} />
          <Route path="/Users" component= {ListUsers} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;