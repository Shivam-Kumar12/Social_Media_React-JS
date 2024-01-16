import React, { useContext, useRef } from "react";
import { PostList as PostListData } from "../store/Post-list-store";

const Createpost = () => {
  const { addpost } = useContext(PostListData);

  const userIdElement = useRef();
  const PostTitleElement = useRef();
  const postBodyElement = useRef();
  const postreactionsElement = useRef();
  const tagsElement = useRef();

  const HandleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = PostTitleElement.current.value;
    const postbody = postBodyElement.current.value;
    const reactions = postreactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    tagsElement.current.value = "";
    postreactionsElement.current.value = "";
    postBodyElement.current.value = "";
    PostTitleElement.current.value = "";
    userIdElement.current.value = "";
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postbody,
        reactions: reactions,
        userId: userId,
        tags: tags,
        /* other post data */
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        console.log("Got post from server", post);

        addpost(post);
      });
  };
  return (
    <form className="create-post" onSubmit={HandleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter Your User-Id:
        </label>
        <input
          type="text"
          ref={userIdElement}
          className="form-control"
          placeholder="Your UserId here"
          id="userId"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Title" className="form-label">
          Post-Title:
        </label>
        <input
          type="text"
          ref={PostTitleElement}
          className="form-control"
          placeholder="How are You feeling today?"
          id="title"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post-body:
        </label>
        <textarea
          type="text"
          ref={postBodyElement}
          rows="4"
          className="form-control"
          placeholder="Tell us more About it"
          id="body"
          name="body"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          No Of Reactions:
        </label>
        <input
          type="text"
          ref={postreactionsElement}
          className="form-control"
          placeholder="How many people reacted to this post"
          id="reactions"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hash-Tags here:
        </label>
        <input
          type="text"
          ref={tagsElement}
          className="form-control"
          placeholder="Enter your tags"
          id="Tags"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Createpost;
