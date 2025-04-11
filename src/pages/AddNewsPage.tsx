import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const AddNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Submitted news article:', {
        title,
        summary,
        content,
        author,
        createdAt: new Date().toISOString().split('T')[0] 
      });
      
      navigate('/news');
    } catch (error) {
      console.error('Error submitting news article:', error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/news');
  };

  return (
    <>
      <Navbar />
      <div className="px-10 mx-auto">
        <div className="w-full font-light text-[#222] antialiased leading-[1.5]">
          <div className="max-w-3xl mx-auto my-8 p-5 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-5">Thêm bài viết mới</h1>
            
            <form onSubmit={handleSubmit} className="">
              <div className="mb-5">
                <label htmlFor="title" className="block mb-1 font-medium text-gray-800">Tiêu đề</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-2.5 border border-gray-300 rounded text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="summary" className="block mb-1 font-medium text-gray-800">Tóm tắt</label>
                <textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                  className="w-full p-2.5 border border-gray-300 rounded text-base resize-y min-h-[100px] transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  rows={3}
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="content" className="block mb-1 font-medium text-gray-800">Nội dung</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full p-2.5 border border-gray-300 rounded text-base resize-y min-h-[100px] transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  rows={10}
                />
              </div>
              
              <div className="mb-5">
                <label htmlFor="author" className="block mb-1 font-medium text-gray-800">Tác giả</label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded text-base transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
              
              <div className="flex justify-end gap-2.5 mt-8">
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="px-5 py-2.5 bg-gray-100 text-gray-800 border border-gray-300 rounded text-base cursor-pointer transition-colors duration-300 hover:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-green-500 text-white rounded text-base cursor-pointer transition-colors duration-300 hover:bg-green-600 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang lưu...' : 'Lưu bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewsPage;
