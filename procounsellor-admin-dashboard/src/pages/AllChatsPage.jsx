// src/pages/AllChatsPage.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function AllChatsPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");

  useEffect(() => {
    if (!chatId) return;
    fetch(`https://procounsellor-backend-uat-1000407154647.asia-south1.run.app/api/chats/${chatId}/messages`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      });
  }, [chatId]);

  const renderMessages = () => {
    if (!messages || messages.length === 0) return <p>No messages found.</p>;
    return (
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Sender ID</th>
            <th>Text</th>
            <th>File</th>
            <th>File Type</th>
            <th>Seen</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, idx) => (
            <tr key={idx}>
              <td>{msg.senderId || "N/A"}</td>
              <td>{msg.text || "-"}</td>
              <td>
                {msg.fileUrl ? (
                  msg.fileType && msg.fileType.startsWith("image") ? (
                    <img src={msg.fileUrl} alt="file" style={{ maxWidth: "100px" }} />
                  ) : (
                    <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">Download</a>
                  )
                ) : "-"}
              </td>
              <td>{msg.fileType || "-"}</td>
              <td>{msg.isSeen ? "Yes" : "No"}</td>
              <td>{msg.timestamp ? new Date(msg.timestamp).toLocaleString() : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat Messages</h2>
      {loading ? <p>Loading messages...</p> : renderMessages()}
    </div>
  );
}

export default AllChatsPage;
