import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNewsArticles, useHomepageContent } from "../services/api";
import { Spin, message } from "antd";

const images = [
  "https://www.hophungvietnam.com/app/webroot/uploads/images/bf4080eb-87a8-45b1-b614-19b0da91a937.jpg",
  "https://cdnmedia.baotintuc.vn/Upload/YZmStSDTjb0M07hFJ2gA/files/2023/05/09/dong-co-110523-3.jpg",
  "https://ktmt.vnmediacdn.com/images/2022/09/29/51-1664442114-3.jpg",
  "https://source.unsplash.com/1600x900/?culture",
];

const HomePage = () => {
  // Fetch news from API
  const { 
    data: newsData, 
    isLoading: newsLoading, 
    error: newsError 
  } = useNewsArticles({
    page: 1,
    page_size: 12,
    is_published: true
  });
    // Fetch homepage content from API
  const {
    data: homepageData,
    isLoading: homepageLoading,
    error: homepageError
  } = useHomepageContent();
  
  interface NewsArticle {
    id: number | string;
    title: string;
    date: string;
    description: string;
    image: string;
    content: string;
  }
  
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showSlideshow, setShowSlideshow] = useState(false);
  
  // Process news data when it loads
  useEffect(() => {
    if (newsData && newsData.results) {
      // Define the type of news article from API
      interface NewsApiItem {
        id: number | string;
        title: string;
        created_at: string;
        summary?: string;
        content: string;
        image?: string;
      }
      
      const transformedArticles = newsData.results.map((item: NewsApiItem) => ({
        id: item.id,
        title: item.title,
        date: new Date(item.created_at).toLocaleDateString("vi-VN"),
        description: item.summary || item.content.replace(/<[^>]+>/g, '').substring(0, 120) + '...',
        image: item.image || "https://via.placeholder.com/600x400?text=No+Image",
        content: item.content || ""
      }));
      
      setArticles(transformedArticles);
      setShowSlideshow(transformedArticles.length > 3);
    }
  }, [newsData]);
    // We don't need this useEffect anymore since we're directly rendering the content
  // from homepageData?.results?.[0].content in the JSX
  
  // Show error if news fetch fails
  useEffect(() => {
    if (newsError) {
      message.error("Không thể tải tin tức. Vui lòng thử lại sau!");
    }
    if (homepageError) {
      message.error("Không thể tải nội dung trang chủ. Vui lòng thử lại sau!");
    }
  }, [newsError, homepageError]);
  
  // Rotate banner image automatically
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(bannerInterval);
  }, []);
  
  // Auto rotate news if showing slideshow
  useEffect(() => {
    if (showSlideshow && articles.length > 0) {
      const newsInterval = setInterval(() => {
        setCurrentNewsIndex((prevIndex) => (prevIndex + 3) % articles.length);
      }, 5000);
      
      return () => clearInterval(newsInterval);
    }
  }, [showSlideshow, articles]);

  const prevSlide = () => {
    setCurrentBannerIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevNewsSlide = () => {
    setCurrentNewsIndex(
      (prevIndex) => (prevIndex - 3 + articles.length) % articles.length
    );
  };

  const nextNewsSlide = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 3) % articles.length);
  };
  // Get current articles to display (either all, or 3 for slideshow)
  const getCurrentArticles = (): NewsArticle[] => {
    if (!showSlideshow || articles.length <= 3) {
      return articles.slice(0, 3);
    }
    
    // Return 3 articles starting from currentNewsIndex, with wraparound
    const result: NewsArticle[] = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentNewsIndex + i) % articles.length;
      result.push(articles[index]);
    }
    return result;
  };

  return (
    <>
      <Navbar setSearchValue={() => {}} />
      <div className="bg-gray-100 min-h-screen">
        {/* Banner */}
        <div
          className="relative h-[500px] md:h-[600px] bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${images[currentBannerIndex]})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
              Giới Thiệu Dòng Họ
            </h1>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 px-3 py-2 rounded-full text-gray-700 text-2xl shadow-md hover:bg-opacity-100"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 px-3 py-2 rounded-full text-gray-700 text-2xl shadow-md hover:bg-opacity-100"
          >
            ❯
          </button>
        </div>

        {/* Nội dung chính */}
        <div className="container mx-auto px-4 py-8">          {/* Giới thiệu */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
              Lịch Sử Dòng Họ
            </h2>
            {homepageLoading ? (
              <div className="flex justify-center items-center h-48">
                <Spin size="large" tip="Đang tải nội dung..." />
              </div>
            ) : (
              <div 
                className="text-gray-700 text-justify leading-relaxed"
                dangerouslySetInnerHTML={{ __html: homepageData?.results?.[0]?.content || `
                  Cây có gốc, nước có nguồn. Người ta ai cũng phải có tổ tiên, ông
                  bà cha mẹ thì mới có mình. Đó cũng là lẽ tất nhiên của loài người.
                  Vì vậy, đối với tổ tiên ai cũng phải tôn kính, phụng thờ, phải
                  biết ơn rõ công lao gây dựng và những ngày tiết lễ, kỵ nhật để
                  trân trọng thờ cúng. Báo đáp công ơn thể hiện lòng hiếu kính đối
                  với tổ tiên và các bậc tiền nhân đó cũng là nét đẹp văn hóa của
                  con người.
                ` }}
              />
            )}
          </section>

          {/* Danh sách tin tức */}
          <section className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Tin Tức Dòng Họ
              </h2>
              {showSlideshow && (
                <a href="/tin-tuc" className="text-blue-600 hover:underline">
                  Xem tất cả →
                </a>
              )}
            </div>
            
            {newsLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" tip="Đang tải tin tức..." />
              </div>
            ) : (
              <div className="relative">
                <div className="grid md:grid-cols-3 gap-6">
                  {getCurrentArticles().map((news) => (
                    <div
                      key={news.id}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                      onClick={() => window.location.href = `/tin-tuc/${news.id}`}
                      style={{ cursor: 'pointer' }}
                    >                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-40 md:h-48 object-cover rounded-md"
                        onError={(e) => {
                          if (e.target instanceof HTMLImageElement) {
                            e.target.src = "https://via.placeholder.com/600x400?text=No+Image";
                          }
                        }}
                      />
                      <h3 className="text-lg md:text-xl font-semibold text-blue-600 mt-3">
                        {news.title}
                      </h3>
                      <p className="text-sm text-gray-500">{news.date}</p>
                      <p className="text-gray-700 mt-2">{news.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* News slideshow controls */}
                {showSlideshow && articles.length > 3 && (
                  <>
                    <button
                      onClick={prevNewsSlide}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white bg-opacity-80 px-3 py-2 rounded-full text-gray-700 shadow-md hover:bg-opacity-100 z-10"
                    >
                      ❮
                    </button>
                    <button
                      onClick={nextNewsSlide}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white bg-opacity-80 px-3 py-2 rounded-full text-gray-700 shadow-md hover:bg-opacity-100 z-10"
                    >
                      ❯
                    </button>
                    
                    {/* Slideshow indicators */}
                    <div className="flex justify-center mt-4">
                      {Array.from({ length: Math.ceil(articles.length / 3) }).map((_, index) => (
                        <button 
                          key={index}
                          className={`w-2 h-2 mx-1 rounded-full ${index === Math.floor(currentNewsIndex / 3) ? 'bg-blue-600' : 'bg-gray-300'}`}
                          onClick={() => setCurrentNewsIndex(index * 3)}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                {articles.length === 0 && !newsLoading && (
                  <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p className="text-lg text-gray-600">Không tìm thấy bài viết nào.</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
