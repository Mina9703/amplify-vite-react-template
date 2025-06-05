import React, { useState, FormEvent, ChangeEvent } from 'react';

interface AddPostProps {
  addPost: (title: string, body: string) => void;
}

const AddPost: React.FC<AddPostProps> = ({ addPost }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addPost(title, body);
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Post</h2>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
        />
      </div>
      <button className="btn-submit" type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;

