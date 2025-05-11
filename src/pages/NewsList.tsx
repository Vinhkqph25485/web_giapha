import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useNewsArticles } from "../services/api";
import { Spin, message } from "antd";

const NewsList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  
  // Fetch articles from API
  const { 
    data: newsData, 
    isLoading: loading,
    error 
  } = useNewsArticles({
    page: pagination.current,
    page_size: pagination.pageSize,
    is_published: true, // Only fetch published articles
    search: searchValue
  });
 
  // Transform API data into articles array
  const [articles, setArticles] = useState([]);
  const [mainArticle, setMainArticle] = useState(null);

  // Update articles when API data changes
  useEffect(() => {
    if (newsData) {
      const items = newsData.results || [];

      const transformedItems = items.map(item => ({
        id: item.id,
        title: item.title,
        date: new Date(item.created_at).toLocaleDateString("vi-VN"),
        image: item.image || "https://via.placeholder.com/600x400?text=No+Image",
        content: item.content || "",
        summary: item.summary || "",
        author: item.author ? (typeof item.author === 'object' ? 
          item.author.username || `${item.author.first_name || ''} ${item.author.last_name || ''}`.trim() : 
          item.author) : "Admin"
      }));
      
      // Set main article and remaining articles
      if (transformedItems.length > 0) {
        setMainArticle(transformedItems[0]);
        setArticles(transformedItems.slice(1));
      } else {
        setMainArticle(null);
        setArticles([]);
      }
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        total: newsData.count || 0
      }));
    }
  }, [newsData]);

  // Show error message if API call fails
  useEffect(() => {
    if (error) {
      message.error("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau!");
    }
  }, [error]);

  const openArticlePopup = (article) => {
    setCurrentArticle(article);
    setShowPopup(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = "auto";
  };
  
  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setPagination(prev => ({
      ...prev,
      current: pageNumber
    }));
  };
  
  // Handle search
  const handleSearch = () => {
    setPagination(prev => ({
      ...prev,
      current: 1 // Reset to first page on new search
    }));
    // The search value is already being used in the useNewsArticles hook
  };

  return (
    <div className="bg-[#e5dfdf]">
      <Navbar hideSearch={false} />
      {/* Banner Section */}
      <div
        className="relative h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://via.placeholder.com/1200x300')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Bài viết</h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="mt-[-40px] flex justify-center">
        <div className="relative mx-auto w-1/2 mt-5 mb-5">
          <input 
            type="text" 
            className="w-full p-3 rounded-md text-black" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#8B0000] px-3 py-1 rounded-md text-white"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-10 mt-5 mb-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" tip="Đang tải bài viết..." />
          </div>
        ) : (
          <>
            {/* News Items */}
            <div className="space-y-4">
              {mainArticle && (
                <div 
                  className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openArticlePopup(mainArticle)}
                >
                  <div className="p-4 col-span-3">
                    <img
                      src={mainArticle.image}
                      alt={mainArticle.title}
                      className="w-full h-45 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="py-4 px-4 col-span-7">
                    <h2 className="text-xl text-[#cda66f]">{mainArticle.date}</h2>
                    <h2 className="mb-4 text-2xl font-semibold">{mainArticle.title}</h2>
                    <p>{mainArticle.summary || mainArticle.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...'}</p>
                  </div>
                </div>
              )}
              
              {articles.map(article => (
                <div 
                  key={article.id}
                  className="bg-white grid grid-cols-10 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openArticlePopup(article)}
                >
                  <div className="p-4 col-span-3">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-45 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="py-4 px-4 col-span-7">
                    <h2 className="text-xl text-[#cda66f]">{article.date}</h2>
                    <h2 className="mb-4 text-2xl font-semibold">{article.title}</h2>
                    <p>{article.summary || article.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...'}</p>
                  </div>
                </div>
              ))}
              
              {articles.length === 0 && !mainArticle && (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <p className="text-lg text-gray-600">Không tìm thấy bài viết nào.</p>
                </div>
              )}
            </div>
            
            {/* Pagination Controls */}
            {(pagination.total > pagination.pageSize) && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button 
                    className={`px-3 py-1 rounded-md border border-gray-300 ${pagination.current === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => pagination.current > 1 && handlePageChange(pagination.current - 1)}
                    disabled={pagination.current === 1}
                  >
                    Trước
                  </button>
                  
                  {Array.from({ length: Math.min(5, Math.ceil(pagination.total / pagination.pageSize)) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button 
                        key={pageNumber}
                        className={`px-3 py-1 rounded-md border border-gray-300 ${pagination.current === pageNumber ? 'bg-[#8B0000] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  <button 
                    className={`px-3 py-1 rounded-md border border-gray-300 ${pagination.current === Math.ceil(pagination.total / pagination.pageSize) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => pagination.current < Math.ceil(pagination.total / pagination.pageSize) && handlePageChange(pagination.current + 1)}
                    disabled={pagination.current === Math.ceil(pagination.total / pagination.pageSize)}
                  >
                    Sau
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      {/* Article Detail Popup */}
      {showPopup && currentArticle && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closePopup} // Close when clicking on the overlay
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on content from closing
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[#cda66f] text-lg font-semibold">{currentArticle.date}</p>
                <button 
                  onClick={closePopup}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-6">{currentArticle.title}</h2>
              
              {/* Updated image container with responsive sizing and error handling */}
              <div className="mb-6 flex justify-center">
                <div className="w-full max-w-2xl">
                  <img 
                    src={currentArticle.image} 
                    alt={currentArticle.title}
                    className="w-full h-auto object-contain rounded-lg mx-auto"
                    style={{ maxHeight: '50vh' }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Available";
                    }}
                  />
                </div>
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default NewsList;
