// TopNewsListPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopNewsListPage = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    axios.get('https://procounsellor-backend-1000407154647.asia-south1.run.app/api/news')
      .then(res => setNewsList(res.data))
      .catch(err => console.error('Failed to fetch news:', err));
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Top News</h2>
      {newsList.map(news => (
        <div key={news.newsId} className="mb-6 border p-4 rounded shadow">
          <img src={news.imageUrl} alt="News" className="w-full h-64 object-cover rounded mb-2" />
          <p className="text-gray-600">{new Date(news.date).toLocaleDateString()}</p>
          <h3 className="text-xl font-semibold mb-2">{news.descriptionParagraph}</h3>
          <p className="text-gray-800">{news.fullNews}</p>
        </div>
      ))}
    </div>
  );
};

export default TopNewsListPage;