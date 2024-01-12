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
          //console.log(data);
          setUsers(data);
        });
    }, []);
    return (
      <div className='blog-post-page bg'>
        <h1 className='main-title'>USERS LIST</h1>
        <div className='main-content-users'>
          
          {users !== null && users.map((user) => (
            <Link to={`/users/${user.id}`} className='item-user' key={user.id}>
              <div className='column-user column-user-1'>
                <span className='icon-user'><FontAwesomeIcon icon='fa-solid fa-user' /></span>
              </div>
              <div className='column-user column-user-2'>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
              
              
            </Link>
          ))}
        </div>
      </div>
    );
  };
  export default Fetch;
  