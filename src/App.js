import React, {Component} from 'react';
import Movies from './components/movies';
import NavBar from './components/navbar';
import { Route, Switch, Redirect } from "react-router-dom";
import Rentals from './components/rentals';
import Users from './components/users';
import NotFound from './components/notFound';
import Customers from './components/customers';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import { getMovie } from './services/fakeMovieService';
import './App.css';

class App extends Component {

  
  // constructor(){
  //   super();
  //   console.log('App - Constructor');
  // };



  render(){
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            
            {/* if we want to pass props to the component, instead of using component we use render attribute
            passing an arrow function to the component, and there we can pass all props we want */}
            <Route path="/movies/:id" render={(props) => <MovieForm {...props}/>}></Route>
            
            <Route path="/rentals" component={Rentals}/>
            <Route path="/users" component={Users}/>
            <Route path="/customers" component={Customers}/>
            <Route path="/movies" component={Movies}/>
            <Redirect from="/" exact to="/movies" />
            <Route path="/not-found" exact component={NotFound} />
            <Redirect to="/not-found"/>
          </Switch>
        </main>
      </React.Fragment>
    );
  }

}

export default App;
