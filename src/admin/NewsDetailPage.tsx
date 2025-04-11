import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewsDetailPage.css';
import MyEditor from '../pages/NewPage';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  author: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [content, setContent] = useState<string>('');
  
  useEffect(() => {
    // In a real app, fetch from API using the ID
    // For demonstration, using mock data
    const mockNewsItem: NewsItem = {
      id: Number(id),
      title: `Bài viết số ${id}`,
      summary: 'Tóm tắt nội dung bài viết...',
      content: '<p>Đây là nội dung chi tiết của bài viết.</p><p>Có thể chỉnh sửa nội dung này.</p>',
      createdAt: '2023-05-01',
      author: 'Admin'
    };
    
    setNewsItem(mockNewsItem);
    setTitle(mockNewsItem.title);
    setSummary(mockNewsItem.summary);
    setContent(mockNewsItem.content);
    setLoading(false);
  }, [id]);

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const handleSave = () => {
    if (newsItem) {
      // In a real app, save to API
      const updatedNewsItem: NewsItem = {
        ...newsItem,
        title,
        summary,
        content
      };
      
      console.log('Saving updated news item:', updatedNewsItem);
      // API call would go here
      
      setNewsItem(updatedNewsItem);
      setEditing(false);
      alert('Đã lưu thành công!');
    }
  };

  if (loading) {
    return <div className="loading">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="news-detail-container">
      <div className="news-detail-header">
        <div className="navigation">
          <button onClick={() => navigate('/news')} className="back-button">
            &larr; Quay lại danh sách
          </button>
        </div>
        
        <div className="actions">
          {!editing ? (
            <button onClick={() => setEditing(true)} className="edit-button">
              Chỉnh sửa
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="save-button">
                Lưu
              </button>
              <button 
                onClick={() => setEditing(false)} 
                className="cancel-button"
              >
                Hủy
              </button>
            </>
          )}
        </div>
      </div>

      <div className="news-detail-content">
        {editing ? (
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="title">Tiêu đề:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="summary">Tóm tắt:</label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="form-control"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Nội dung:</label>
              <MyEditor
                initialValue={content}
                onContentChange={handleContentChange}
                height={400}
              />
            </div>
          </div>
        ) : (
          <>
            <h1>{newsItem?.title}</h1>
            <div className="news-meta">
              <span className="date">{newsItem?.createdAt}</span> | 
              <span className="author">{newsItem?.author}</span>
            </div>
            <div className="summary-section">
              <p className="summary">{newsItem?.summary}</p>
            </div>
            <div 
              className="content" 
              dangerouslySetInnerHTML={{ __html: newsItem?.content || '' }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NewsDetailPage;
