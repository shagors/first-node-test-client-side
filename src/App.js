import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect( () => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  }, []);

  const handleAddUser = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = {name, email};

    // post data to server

    fetch('http://localhost:5000/user', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      .then(response => response.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log('Success', data);
      })

  }

  return (
    <div className="App">
      <h1>My own data: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='name' required/>
        <input type="email" name="email" placeholder='email' required/>
        <input type="submit" value="Add User" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>ID: {user.id} - Name: {user.name} Email: {user.email} Phone: {user.phone} Job: {user.job}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
