import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Users.css';


function PostsUser() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div key={userData.id} className="bg-1">
        <h2>Detalles del Usuario</h2>
        <p>Nombre: {userData.name}</p>
        <p> Email: {userData.email}</p>
      </div>
    </div>
  );
}



export default PostsUser;