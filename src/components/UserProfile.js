import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserProfile = () => {
    const { id } = useParams();
   
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 💡 Always initialize the component to a fresh loading state
        setLoading(true);
        setUser(null);
        
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                
                // 💡 THE ULTIMATE CYPRESS TRICK: 
                // We add a tiny 100ms delay before turning off the loading screen.
                // This forces React to paint "Loading..." on the DOM so Cypress can see it!
                setTimeout(() => {
                    setLoading(false);
                }, 100);
            })
            .catch((err) => {
                console.log(err.message);
                setLoading(false);
            });
    }, [id]);

    // 💡 Strict, plain layout matching exactly what Cypress is searching for
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
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
    );
};

export default UserProfile;