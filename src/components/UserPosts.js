import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Users.css';
import Comments from './Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function UserPosts() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [postsUser, setPostsUser] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [posts, setPosts] = useState([]);

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
        const postsWithComments = await Promise.all(
          response2.data.map(async (post) => {
            const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
            
            const commentsCount = commentsResponse.data.length;
            
            return {
              postId: post.id,
              title: post.title,
              count: commentsCount,
              
            };
          })
        );
        
        setPosts(postsWithComments);
        
        //const postsWithComments = await Promise.all(postsData);
        //setPosts(postsData);
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
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='main-content-user bg-1'>
      <div className='user-details-container' key={userData.id} >
        <div className='user-details'>
          <div className="column-ico-user">
            <span className='icon-user'><FontAwesomeIcon icon='fa-solid fa-user' /></span>
          </div>
          <div className='column-info-user'>
            <h2>Posts by <strong>{userData.name}</strong></h2>
            <p>Ciudad: {userData.address.city}</p>
            <p>Email: {userData.email}</p>
            <p>Website: {userData.website}</p>
          </div>
        </div>
      </div>
      <div className='user-post-list-container'>
        {/*<pre>
          {JSON.stringify(postsUser)}
        </pre>*/}
        <ul className='list-posts'>
          {postsUser !== null && postsUser.map((post) => (
            <li className='item-post' item={post.id} key={post.id}>
              <div className='container-info-post'>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
                
              <Link className='btn-comment' onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
                <span>Comentarios {post.count}</span>
              </Link>
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