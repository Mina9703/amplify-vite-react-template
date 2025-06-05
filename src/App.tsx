import React, { useState, useEffect } from 'react';
import './App.css';
import AddPost from './components/AddPost';
import Post from './components/post';
import client from './api/client';
import { useAuthenticator } from '@aws-amplify/ui-react';

interface PostType {
  id: number;
  title: string;
  body: string;
  userId?: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user, signOut } = useAuthenticator();

  const userId = user?.username ?? 'unknown';

  const fetchPosts = async (): Promise<void> => {
    try {
      const response = await client.get<PostType[]>('?_limit=4');
      setPosts(response.data);
    } catch (error) {
      console.error('Error al obtener los posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const addPost = async (title: string, body: string): Promise<void> => {
    try {
      const response = await client.post<PostType>('', {
        title,
        body,
        userId,
      });
      setPosts((prevPosts) => [response.data, ...prevPosts]);
    } catch (error) {
      console.error('Error al agregar post:', error);
    }
  };

  const deletePost = async (id: number): Promise<void> => {
    try {
      const response = await client.delete(`/${id}`);
      if (response.status === 200) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar post:', error);
    }
  };

  return (
    <main style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
      <h1>Posts</h1>
      <AddPost addPost={addPost} />
      <h2 className="posts-title">Posts</h2>
      <section className="posts-container">
        {posts.length === 0 ? (
          <p>No posts to show</p>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              deletePost={deletePost}
            />
          ))
        )}
      </section>
      <button onClick={signOut} style={{ marginTop: '2rem' }}>
        Sign out
      </button>
    </main>
  );
};

export default App;
