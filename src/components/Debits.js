/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Component } from 'react';
import {Link} from 'react-router-dom';


class Debits extends Component{
  constructor(props){
    super(props);
    this.state={
      descriptions:'',
      debit:''
    }
  };


  debitsView = () => {
    const { debits } = this.props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }

  handleDescriptionChange=(e)=>{ // updating the state with new Descriptions 
    this.setState({description: e.target.value});
  }

  handleAmountChange=(e)=>{ // updating the state with new amounts 
    this.setState({debit: e.target.value});
  }

  addDebit = (e)=>{ // updating the add credits
    e.preventDefault();
    const {description,debit} = this.state; // collect the current state
    let debitRounded = Math.round(100*parseFloat(debit))/100;
    const newDebit = { 
      description,
      amount: debitRounded, 
      date: new Date().toISOString(),
    }; 
    this.props.addDebit(newDebit);
    this.setState({
      description:'',
      credit:''
    });
  }
  
  // Render the list of Debit items and a form to input new Debit item
  //seems like debitsView already set up to list id, amount, desc, and date. 
  //will need to track id and date somehow
  //otherwise utilize the onchange and onsubmit fuctinos shows in login.js
  render(){
  return (
    <div>
      <h1>Debits</h1>

      {this.debitsView()}

      <form onSubmit={this.addDebit}>
        <input type="text" name="description" value={this.state.description} onChange={this.handleDescriptionChange} placeholder="Description"/>
        <input type="text" name="amount" value={this.state.debit} onChange={this.handleAmountChange} placeholder="Amount"/>
        <button type="submit">Add Debit</button>
      </form>
      <div>
        Balance: {this.props.accountBalance}
      </div>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}
}
export default Debits;