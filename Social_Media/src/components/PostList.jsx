import React, { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/Post-list-store";
import Welcomemessage from "./Welcomemessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, Fetching } = useContext(PostListData);

  return (
    <>
      {Fetching && <LoadingSpinner />}
      {!Fetching && postList.length === 0 && <Welcomemessage />}
      {!Fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
