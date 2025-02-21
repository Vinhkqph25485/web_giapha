import Footer from "../components/Footer";
import { useState, useEffect } from "react";

const images = [
  "https://www.hophungvietnam.com/app/webroot/uploads/images/bf4080eb-87a8-45b1-b614-19b0da91a937.jpg",
  "https://cdnmedia.baotintuc.vn/Upload/YZmStSDTjb0M07hFJ2gA/files/2023/05/09/dong-co-110523-3.jpg",
  "https://ktmt.vnmediacdn.com/images/2022/09/29/51-1664442114-3.jpg",
  "https://source.unsplash.com/1600x900/?culture",
];

const HomePage = () => {
  const newsData = [
    {
      id: 1,
      title: "Lễ Tổ Tiên Dòng Họ Nguyễn",
      date: "20/02/2025",
      description:
        "Dòng họ Nguyễn tổ chức lễ tưởng niệm tổ tiên với sự tham gia đông đảo của con cháu.",
      image: "https://www.hophungvietnam.com/app/webroot/uploads/images/bf4080eb-87a8-45b1-b614-19b0da91a937.jpg",
    },
    {
      id: 2,
      title: "Cuộc Họp Mặt Cuối Năm",
      date: "15/12/2024",
      description:
        "Buổi gặp mặt thân mật của dòng họ nhằm tổng kết một năm đầy thành công.",
      image: "https://www.hophungvietnam.com/app/webroot/uploads/images/bf4080eb-87a8-45b1-b614-19b0da91a937.jpg",
    },
    {
      id: 3,
      title: "Kỷ Niệm 100 Năm Dòng Họ",
      date: "01/08/2024",
      description:
        "Một sự kiện trọng đại kỷ niệm 100 năm dòng họ, đánh dấu sự phát triển vững mạnh.",
      image: "https://www.hophungvietnam.com/app/webroot/uploads/images/bf4080eb-87a8-45b1-b614-19b0da91a937.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <div
        className="relative h-[500px] md:h-[600px] bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
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
      <div className="container mx-auto px-4 py-8">
        {/* Giới thiệu */}
        <section className="bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            Lịch Sử Dòng Họ
          </h2>
          <p className="text-gray-700 text-justify leading-relaxed">
            Cây có gốc, nước có nguồn. Người ta ai cũng phải có tổ tiên, ông bà
            cha mẹ thì mới có mình. Đó cũng là lẽ tất nhiên của loài người. Vì
            vậy, đối với tổ tiên ai cũng phải tôn kính, phụng thờ, phải biết ơn
            rõ công lao gây dựng và những ngày tiết lễ, kỵ nhật để trân trọng
            thờ cúng. Báo đáp công ơn thể hiện lòng hiếu kính đối với tổ tiên và
            các bậc tiền nhân đó cũng là nét đẹp văn hóa của con người. Muốn
            biết được đức tính, sự nghiệp của tổ tiên để truyền lại cho muôn đời
            con cháu mai sau phải có phả ký. Phả ký là dẫn chứng cụ thể ghi rõ
            các đời, các vai hàng thứ tự trong từng lớp hậu duệ của dòng họ theo
            hệ thống huyết mạch. Cho dù chế độ đổi thay, nền văn hóa có tiến hóa
            đến đâu thì phả ký vẫn là dẫn chứng cụ thể cần thiết không thể mai
            một được. Phả ký họ Trần Đại Tộc chúng ta từ thửa xưa được ghi bằng
            chữ hán, đến năm 1975 cụ Trần Viết Nhân, cụ Trần Ngọc Phan hậu duệ
            đời thứ 9 đã sưu tầm thêm và dịch thành chữ quốc ngữ cho phù hợp với
            xu thế phát triển của xã hội, thuận tiện cho con cháu trong họ tra
            cứu tìm tòi học tập. Năm 1992 họ cử ra ban phả tiếp tục rà soát bổ
            sung dòng đời của dòng họ. Từ năm 2016 ban phả họ bổ sung chỉnh sửa,
            hoàn chỉnh cuốn phả họ được thông qua đại họ ngày 20/01/2018 (tức
            ngày 4 tháng chạp năm Đinh Dậu). Từ cơ sở nguồn dữ liệu văn bản này,
            để đáp ứng nhu cầu tìm hiểu thông tin, con cháu ở mọi miền trong tổ
            quốc. Dưới sự cho phép của Ban Thường trực dòng họ & Ban phả họ,
            nhóm con cháu đang sinh sống & làm việc tại Hà Nội đã thực hiện số
            hóa các dữ liệu này, hiển thị thông tin trên nền tảng Internet đảm
            bảo nhiệm vụ lưu trữ và truyền tin, bắt kịp xu hướng công nghệ 4.0.
          </p>
        </section>

        {/* Danh sách tin tức */}
        <section className="mt-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            Tin Tức Dòng Họ
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {newsData.map((news) => (
              <div
                key={news.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-40 md:h-48 object-cover rounded-md"
                />
                <h3 className="text-lg md:text-xl font-semibold text-blue-600 mt-3">
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
