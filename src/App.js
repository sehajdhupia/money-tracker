//in money-track directory to run, in terminal type "nodemon index.js"
//then in new terminal, cd to api directory and type "nodemon index.js"
//it will be on localhost3000


import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() =>{
    getTransactions().then(setTransactions)
  }, []);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }


  function addNewTransaction(ev){
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const inputText = name.trim();
    const price = parseFloat(inputText.split(' ')[0]);
    const itemName = inputText.substring(price.toString().length + 1).trim();
  
    // Check if the name is valid before sending the request
    if (!itemName) {
      alert('Please enter a valid item name.');
      return;
    }
  
    fetch(url, {
      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify({
        price,
        name: itemName,
        description, 
        datetime
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDatetime('');
        setDescription('')
        setTransactions(prevTransactions => [...prevTransactions, json]);
        console.log('result', json);
      })
    })
  }
  
  let balance =0;
  for (const transaction of transactions){
    balance = balance + transaction.price;
  }
  
  balance = balance.toFixed(2);//has turned to string
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];
  
  return (
    <main>
      <h1>Expense tracker</h1>
      <h1>${balance}<span>{fraction}</span></h1>
      
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" 
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder={'+200 for new samsung tv'}/>
          
          <input type="datetime-local" 
            value={datetime}
            onChange={ev => setDatetime(ev.target.value)}/>
        </div>
        
        <div className="description">
          <input type="text" 
          value={description}
          onChange={ev => setDescription(ev.target.value)}
          placeholder={'description'}/>
        </div>

        <button type="submit">Add new transaction</button>
        
        

      
      
      </form>
      
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price " + (transaction.price<0 ? 'red':'green')}>
              {transaction.price}
              </div>
            <div className="datetime">{transaction.datetime}</div>
          </div>
        </div>
        ))}
          
          
      </div>
    </main>
  );
}

export default App;
