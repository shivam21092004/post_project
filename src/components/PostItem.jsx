import React, { useState } from "react";
import UserModal from "./UserModal"; 
const PostItem = ({ post }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 120)}...</p>
      <p>
        Post ID: {post.id} | User ID: {post.userId}
      </p>
      <button onClick={() => setModalOpen(true)}>View User Details</button>
      {isModalOpen && (
        <UserModal userId={post.userId} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};
export default PostItem;
