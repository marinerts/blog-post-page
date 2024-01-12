import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response3 = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        
          //onst result = await response3.json();
          setComments(response3.data);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchComments();
  }, [postId]);
 

  return (
    <ul className='list-comments-post'>
      {comments !== null && comments.map((comment) => (
        <li className='item-comment' key={comment.id}>
            <div className='container-user-comment'>
                <span className='icon-user'><FontAwesomeIcon icon='fa-solid fa-user' /></span>
                <p>{comment.email}</p>
            </div>  
            <strong className='name-comment'>{comment.name}</strong>
            <p className='body-comment'>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default Comments;