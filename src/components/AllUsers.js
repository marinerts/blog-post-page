import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Fetch = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUsers(data);
        });
    }, []);
    return (
      <div className='blog-post-page'>
        <div className='main-content bg'>
          
          {users.map((user) => (
            <Link to={`/users/${user.id}`} className='item-user'>
              <span className='icon-user'><FontAwesomeIcon icon="fa-solid fa-user" /></span>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  export default Fetch;
  