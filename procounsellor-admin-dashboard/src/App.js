import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllUsersPage from "./pages/AllUsersPage";
import HomePage from "./pages/HomePage";
import UserDetailsPage from "./pages/UserDetailsPage";
import AllChatsPage from "./pages/AllChatsPage";
import TopNewsFormPage from "./pages/News/TopNewsFormPage";
import TopNewsListPage from "./pages/News/TopNewsListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<AllUsersPage />} />
        <Route path="/user/:username" element={<UserDetailsPage />} />
        <Route path="/chats" element={<AllChatsPage />} />
        <Route path="/top-news" element={<TopNewsListPage />} />
          <Route path="/add-news" element={<TopNewsFormPage />} />
      </Routes>
    </Router>
  );
  
}

export default App;