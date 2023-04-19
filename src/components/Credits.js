/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Component } from 'react';
import {Link} from 'react-router-dom';

class Credits extends Component{
  constructor(props){
    super(props);
    this.state={
      description:'',
      credit:''
    }
  };

handleDescriptionChange=(e)=>{ // updating the state with new Descriptions 
  this.setState({description: e.target.value});

}
handleAmountChange=(e)=>{ // updating the state with new amounts 
  this.setState({credit: e.target.value});
}

addCredit = (e)=>{ // updating the add credits
  e.preventDefault();
  const {description,credit} = this.state; // collect the current state 
  const newCredit = { 
    description,
    amount: parseInt(credit),
    date: new Date().toISOString(),
  }; 
  this.props.addCredit(newCredit);
  this.setState({
    description:'',
    credit:''
  });
}


 creditsView = () => {
    const { credits } = this.props;
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }


render(){
  return (
    <div>
      <h1>Credits</h1>
      {this.creditsView()}
      <br/>
      <form onSubmit={this.addCredit}>
        <input type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange} placeholder='Description'/>
        <input type="text" name="amount" value={this.state.credit} onChange={this.handleAmountChange} placeholder='Amount'/>
        <button type="submit">Submit</button>
      </form>
      <div>
        Balance: {this.props.accountBalance}
      </div>
      <Link to="/">Return to Home</Link>
    </div>
  );
}
}
export default Credits;