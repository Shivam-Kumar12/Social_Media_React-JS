import { useState } from "react";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
import "./App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Create_post from "../components/Create_post";
import PostList from "../components/PostList";
import PostListProvider from "../store/Post-list-store";

function App() {
  const [selectedTab, setselectedTab] = useState("Home");

  return (
    <PostListProvider>
      <div className="App-container">
        <Sidebar selectedTab={selectedTab} setselectedTab={setselectedTab} />
        <div className="body-container">
          <Header />
          <div className="card-container">
            {selectedTab === "Home" ? <PostList></PostList> : <Create_post />}
          </div>
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
