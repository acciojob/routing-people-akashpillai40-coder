import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const UserProfile = () => {
    const {id} = useParams();
   
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(() =>{
        
        fetch (`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res)=> res.json())
        .then((data) => {
            setUser(data)
            setLoading(false)
        }) // user = {user1}
        .catch((err) =>console.log(err.message))
     }, [id]);

   if(loading) {
        return <div>Loading...</div>
     }
     if (!user){
        return <div>User not found</div>;
     }
    

  return (
    
    <div>
      <Link to="/">Back to Home</Link>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
    </div>
  )
}

export default UserProfile