import React, {Component} from 'react';
import Movies from './components/movies';
import NavBar from './components/navbar';


class App extends Component {

  // constructor(){
  //   super();
  //   console.log('App - Constructor');
  // };

  render(){
    return (
      <main className="container">
        <NavBar />
        <Movies />
      </main>
    );
  }

}

export default App;
