import React, { useState } from 'react';
import axios from 'axios';

const TopNewsFormPage = () => {
  const [descriptionParagraph, setDescriptionParagraph] = useState('');
  const [fullNews, setFullNews] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descriptionParagraph.trim() || !fullNews.trim() || !imageFile) {
      alert('Please fill all fields and select an image.');
      return;
    }

    const news = {
      newsId: Date.now().toString(),
      descriptionParagraph,
      fullNews,
     // date: new Date().toISOString()
    };

    const formData = new FormData();
    formData.append('news', JSON.stringify(news));
    formData.append('image', imageFile);

    console.log('📦 Form data being sent:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://procounsellor-backend-1000407154647.asia-south1.run.app/api/news',
        formData
        // ✅ Do NOT set Content-Type manually – let axios handle it
      );
      console.log('✅ Server response:', response.data);
      alert('✅ News added successfully!');
      // Reset form
      setDescriptionParagraph('');
      setFullNews('');
      setImageFile(null);
    } catch (error) {
      console.error('❌ Error submitting news:', error);
      if (error.response) {
        console.error('📡 Server Response:', error.response.data);
        alert(`Failed to submit. Server says: ${error.response.data}`);
      } else {
        alert(`Failed to submit: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Top News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border p-2"
          placeholder="Description Paragraph"
          value={descriptionParagraph}
          onChange={(e) => setDescriptionParagraph(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2"
          placeholder="Full News Content"
          value={fullNews}
          onChange={(e) => setFullNews(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default TopNewsFormPage;
