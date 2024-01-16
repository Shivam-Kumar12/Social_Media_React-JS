import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import {PostList} from "../store/Post-list-store";


const getRandomImage = () => {
  const randomImageURL = `https://picsum.photos/50/15/?random=${Math.floor(Math.random() * 1000)}`;

  return randomImageURL;
};
const Post = ({ post }) => {
const {deletepost}=useContext(PostList);

  return (

    <div className="card post-card" style={{ width: "30rem" }}>
      <img src={getRandomImage()} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=>deletepost(post.id)}>
            <MdDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag}  className="badge text-bg-primary hashtag ">{tag}</span>
        ))}
        <div className="alert alert-success reactions " role="alert">
       reacted by {post.reactions} people
        </div>
      </div>

    </div>
  );
};

export default Post;
