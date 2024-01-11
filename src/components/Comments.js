import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <ul>
      {comments !== null && comments.map((comment) => (
        <li key={comment.id}>
          <strong>{comment.name}</strong>
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default Comments;