import Header from "./components/Header";
import Users from "./components/Users";
import { useState } from 'react';

function App() {
  const [users, setUsers] = useState([
      {
          "id":4,
          "email":"Example1",
          "password":"1234",
      },
      {
          "id":5,
          "email":"Example2",
          "password":"1234",
      },
      {
          "id":6,
          "email":"Example3",
          "password":"1234",
      },
  ])

  // Delete User
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div className="container">
      <Header />
      {users.length > 0 ?
       <Users users={users} onDelete={deleteUser} /> :
       'No tasks to show'}
    </div>
  );
}

export default App;
