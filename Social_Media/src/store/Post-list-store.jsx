import {
  createContext,
  useReducer,
  useEffect,
  useState,
  useCallback,
} from "react";

export const PostList = createContext({
  postList: [],
  Fetching: false,
  addpost: () => {},
  addInitialposts: () => {},
  deletePost: () => {},
});
const postListReducer = (currpostList, action) => {
  let newPostList = currpostList;
  if (action.type === "DELETE_POST") {
    newPostList = currpostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POST") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currpostList];
  }

  return newPostList;
};
const getRandomImage = () => {
  const randomImageId = Math.floor(Math.random() * 1000) + 1;
  return `https://picsum.photos/seed/${randomImageId}/100/100`;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostlist] = useReducer(postListReducer, []);
  const [Fetching, setFetching] = useState(false);

  const addpost = (post) => {
    dispatchPostlist({
      type: "ADD_POST", // Assuming you have a type for adding posts in your reducer
      payload: post,
    });
    console.log(post);
    // console.log(`${userId} ${postTitle} ${postContent} ${reactions}${tags}`);
  };

  const addInitialposts = (posts) => {
    dispatchPostlist({
      type: "ADD_INITIAL_POST", // Assuming you have a type for adding posts in your reducer
      payload: {
        posts,
      },
    });
  };

  const deletepost = useCallback(
    (postId) => {
      dispatchPostlist({
        type: "DELETE_POST",
        payload: {
          postId,
        },
      });
    },
    [dispatchPostlist]
  );

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Data:", data);
        addInitialposts(data.posts);
        setFetching(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostList.Provider
      value={{
        postList,
        Fetching,
        addpost: addpost,
        deletepost: deletepost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
