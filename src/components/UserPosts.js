import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Users.css';
import Comments from './Comments';


function UserPosts() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [postsUser, setPostsUser] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

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

  
  useEffect(() => {
    const fetchPostsUser = async () => {
      try {
        const response2 = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
        setPostsUser(response2.data);
        
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchPostsUser();
  }, [id]);
  
  const handlePostClick = (postId) => {
    setSelectedPostId((prevId) => (prevId === postId ? null : postId));
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-content-user bg-1'>
      <div key={userData.id} >
        <h2>Posts by <strong>{userData.name}</strong></h2>
        <p>Nombre: {userData.name}</p>
        <p> Email: {userData.email}</p>
      </div>
      <div>
        {/*<pre>
          {JSON.stringify(postsUser)}
        </pre>*/}
        <ul>
          {postsUser !== null && postsUser.map((post) => (
            <li item={post.id} key={post.id}>
              <strong onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
                {post.title}
              </strong>
              <p>{post.body}</p>
              
              {selectedPostId === post.id && (
                <Comments postId={post.id} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
}



export default UserPosts;