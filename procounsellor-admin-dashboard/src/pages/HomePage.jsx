import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to ProCounsellor Admin Dashboard</h1>

      <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            width: "200px",
          }}
          onClick={() => navigate("/users")}
        >
          View All Users
        </button>

        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            width: "200px",
          }}
          onClick={() => navigate("/top-news")}
        >
          View All News
        </button>

        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            width: "200px",
          }}
          onClick={() => navigate("/add-news")}
        >
          Add News
        </button>

        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            width: "200px",
          }}
          onClick={() => navigate("/chats")}
        >
          View All Chats
        </button>
      </div>
    </div>
  );
}

export default HomePage;
