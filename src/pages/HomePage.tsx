import Footer from "../components/Footer";

const HomePage = () => {
  const newsData = [
    {
      id: 1,
      title: "Lễ Tổ Tiên Dòng Họ Nguyễn",
      date: "20/02/2025",
      description:
        "Dòng họ Nguyễn tổ chức lễ tưởng niệm tổ tiên với sự tham gia đông đảo của con cháu.",
      image: "https://source.unsplash.com/400x300/?ceremony,tradition"
    },
    {
      id: 2,
      title: "Cuộc Họp Mặt Cuối Năm",
      date: "15/12/2024",
      description:
        "Buổi gặp mặt thân mật của dòng họ nhằm tổng kết một năm đầy thành công.",
      image: "https://source.unsplash.com/400x300/?meeting,family"
    },
    {
      id: 3,
      title: "Kỷ Niệm 100 Năm Dòng Họ",
      date: "01/08/2024",
      description:
        "Một sự kiện trọng đại kỷ niệm 100 năm dòng họ, đánh dấu sự phát triển vững mạnh.",
      image: "https://source.unsplash.com/400x300/?celebration,anniversary"
    },
  ];
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <div
        className="relative h-60 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?family')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Giới Thiệu Dòng Họ</h1>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-4 py-8">
        {/* Giới thiệu */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Lịch Sử Dòng Họ</h2>
          <p className="text-gray-700">
            Dòng họ Nguyễn có lịch sử lâu đời, trải qua nhiều thế hệ phát triển
            và đóng góp tích cực cho xã hội. Chúng tôi tự hào về truyền thống
            đoàn kết và nhân nghĩa của dòng họ.
          </p>
        </section>

        {/* Danh sách tin tức */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Tin Tức Dòng Họ</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {newsData.map((news) => (
              <div key={news.id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={news.image} alt={news.title} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-xl font-semibold text-blue-600 mt-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-500">{news.date}</p>
                <p className="text-gray-700 mt-2">{news.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
