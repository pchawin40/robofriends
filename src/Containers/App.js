import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import './App.css';

// STATE: Description of App (an object that describes application)
// PROPS: Things that come out of state
//? STATE >> props

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [], // robots
      searchfield: ''
    }; 
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      // getting the users and updating the users w/ set state
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = event => 
    this.setState({ searchfield: event.target.value });

  render() {
    const { robots, searchfield } = this.state;

    const filteredRobots = robots.filter(robot =>
      robot.name.toLowerCase().includes(searchfield.toLowerCase()));
    
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots}/>
          </Scroll>
        </div>
      );
  }
}

export default App;
