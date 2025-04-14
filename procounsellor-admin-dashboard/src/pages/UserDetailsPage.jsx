// src/pages/UserDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserDetailsPage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://procounsellor-backend-uat-1000407154647.asia-south1.run.app/api/user/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user details");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setLoading(false);
      });
  }, [username]);

  if (loading) return <p>Loading user details...</p>;
  if (!user) return <p>User not found.</p>;

  const renderList = (list) => {
    if (!list || list.length === 0) return "N/A";
    if (Array.isArray(list)) return list.join(", ");
    return JSON.stringify(list);
  };

  const renderCallHistory = (history) => {
    if (!history || history.length === 0) return <p>N/A</p>;
    return (
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Call ID</th>
            <th>Caller ID</th>
            <th>Receiver ID</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>Picked Time</th>
            <th>End Time</th>
            <th>Duration</th>
            <th>Call Type</th>
          </tr>
        </thead>
        <tbody>
          {history.map((call, idx) => (
            <tr key={idx}>
              <td>{call.callId || "N/A"}</td>
              <td>{call.callerId || "N/A"}</td>
              <td>{call.receiverId || "N/A"}</td>
              <td>{call.status || "N/A"}</td>
              <td>{call.startTime ? new Date(call.startTime).toLocaleString() : "N/A"}</td>
              <td>{call.pickedTime ? new Date(call.pickedTime).toLocaleString() : "N/A"}</td>
              <td>{call.endTime ? new Date(call.endTime).toLocaleString() : "N/A"}</td>
              <td>{call.duration || "N/A"}</td>
              <td>{call.callType || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderChatIds = (chatIds) => {
    if (!chatIds || chatIds.length === 0) return <p>N/A</p>;
    return (
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>User 1</th>
            <th>User 2</th>
            <th>Chat ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {chatIds.map((chat, idx) => (
            <tr key={idx}>
              <td>{chat.user1 || "N/A"}</td>
              <td>{chat.user2 || "N/A"}</td>
              <td>{chat.chatId || "N/A"}</td>
              <td>
                <button onClick={() => navigate(`/chats?chatId=${chat.chatId}`)}>
                  View Chat
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Details</h2>
      {user.photo && (
        <img src={user.photo} alt="User" style={{ width: "150px", borderRadius: "8px" }} />
      )}
      <p><strong>User Name:</strong> {user.userName || "N/A"}</p>
      <p><strong>First Name:</strong> {user.firstName || "N/A"}</p>
      <p><strong>Last Name:</strong> {user.lastName || "N/A"}</p>
      <p><strong>Email:</strong> {user.email || "N/A"}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber || "N/A"}</p>
      <p><strong>Role:</strong> {user.role || "N/A"}</p>
      <p><strong>Wallet Amount:</strong> ₹{user.walletAmount || 0}</p>
      <p><strong>Bank Details:</strong> {user.bankDetails ? JSON.stringify(user.bankDetails) : "N/A"}</p>
      <p><strong>Interested Course:</strong> {user.interestedCourse || "N/A"}</p>
      <p><strong>Interested States:</strong> {renderList(user.userInterestedStateOfCounsellors)}</p>
      <p><strong>Subscribed Counsellors:</strong> {renderList(user.subscribedCounsellorIds)}</p>
      <p><strong>Followed Counsellors:</strong> {renderList(user.followedCounsellorsIds)}</p>
      <p><strong>Interested Colleges:</strong> {renderList(user.interestedColleges)}</p>
      <p><strong>Interested College Locations:</strong> {renderList(user.interestedLocationsForCollege)}</p>
      <p><strong>User Review IDs:</strong> {renderList(user.userReviewIds)}</p>
      <p><strong>Languages Known:</strong> {renderList(user.languagesKnow)}</p>
      <p><strong>FCM Token:</strong> {user.fcmToken || "N/A"}</p>
      <p><strong>VOIP Token:</strong> {user.voipToken || "N/A"}</p>
      <div style={{ marginTop: "20px" }}>
        <strong>Chat IDs Created:</strong>
        {renderChatIds(user.chatIdsCreatedForUser)}
      </div>
      <p><strong>Activity Log:</strong> {renderList(user.activityLog)}</p>
      <div style={{ marginTop: "20px" }}>
        <strong>Call History:</strong>
        {renderCallHistory(user.callHistory)}
      </div>
    </div>
  );
}

export default UserDetailsPage;
