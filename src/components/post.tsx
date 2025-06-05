import React from 'react';

interface PostProps {
  id: number;
  title: string;
  body: string;
  deletePost: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ id, title, body, deletePost }) => {
  return (
    <div className="post-card">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      <button
        className="btn-delete"
        onClick={() => deletePost(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Post;
