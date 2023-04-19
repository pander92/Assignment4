/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  //hit API to grab existing debits
  async componentDidMount() {
    let linkToAPI = 'https://johnnylaicode.github.io/api/debits.json';
    let response = await axios.get(linkToAPI);
    console.log(response);
    this.setState({debitList: response.data});

    //must be done here as response data gets overwritten below
    const totalDebits = response.data.reduce((acc,current)=> acc+current.amount,0); 
    console.log("total debits: " + totalDebits);

    linkToAPI = 'https://johnnylaicode.github.io/api/credits.json';
    response = await axios.get(linkToAPI);
    console.log(response);
    this.setState({creditList: response.data});

    //now calculate credits with new response data
    const totalCredits = response.data.reduce((acc,current)=> acc+current.amount,0);
    console.log("total credits: " +totalCredits);
    
    const accountBalance = totalCredits-totalDebits;
    console.log("account balance: " + accountBalance)
    this.setState({accountBalance});
  }

  calculateBalance() {
    let i = 1;
    const totalCredits = this.state.creditList.reduce((acc, curr) => acc + curr.amount,0);
    const totalDebits = this.state.debitList.reduce((acc, curr) => acc + curr.amount,0);
    const accountBalance = totalCredits - totalDebits;
    this.setState({ accountBalance });
    console.log("count: "+ i + " calbal: " + accountBalance);
    i++;
  }

  addCredit = (e) =>{
    const creditList=[...this.state.creditList,e];
    this.setState({creditList},this.calculateBalance); 
  }

  addDebit = (e) =>{
    const debitList=[...this.state.debitList,e];
    this.setState({debitList},this.calculateBalance); 
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;