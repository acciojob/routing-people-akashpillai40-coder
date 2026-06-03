import React from "react";
import "./../styles/App.css";
import UserProfile from "./UserProfile";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data); //users= {data}
        console.log(data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <BrowserRouter>
      <div>
       
        <Routes>
          <Route path="/" element={ 
            <div><h1>User List</h1> 
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
        </div>
      } 
      />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
