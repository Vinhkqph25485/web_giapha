import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Image, Modal, Upload, Button, Form, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { useForm, Controller } from "react-hook-form";
import AddNewsModal from "./components/AddNewsModal";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  author: string;
  imageUrl?: string;
  status?: string; // Adding status for admin purposes
}

const NewsListPage: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [itemToChangeStatus, setItemToChangeStatus] = useState<number | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<NewsItem | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const editorRef = useRef(null);
  const [form] = Form.useForm();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: itemToEdit?.title || "",
      image: null,
      content: itemToEdit?.content || "",
    },
  });

  const onUploadChange = (info: any) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = () => setValue("image", reader.result as string);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  useEffect(() => {
    const mockNewsItems: NewsItem[] = [
      {
        id: 1,
        title: "Thông báo lễ giỗ tổ năm 2023",
        summary:
          "Thông tin chi tiết về lễ giỗ tổ dòng họ sẽ được tổ chức vào ngày...",
        content: "<p>Nội dung chi tiết về lễ giỗ tổ...</p>",
        createdAt: "2023-03-15",
        author: "Admin",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOTt7x9FYfsiqxRypJ-B6cFWR00ZV8Zx4HcA&s",
      },
      {
        id: 2,
        title: "Kết quả học tập xuất sắc của con cháu trong dòng họ",
        summary:
          "Danh sách các cháu đạt thành tích xuất sắc trong năm học vừa qua...",
        content: "<p>Danh sách chi tiết các cháu đạt thành tích...</p>",
        createdAt: "2023-04-22",
        author: "Admin",
        imageUrl:
          "https://image.vovworld.vn/w500/Uploaded/vovworld/znaeng/2016_02_12/1.jpg",
      },
      {
        id: 3,
        title: "Thông báo họp mặt đầu xuân",
        summary: "Thông tin về buổi họp mặt đầu xuân của gia tộc...",
        content: "<p>Chi tiết buổi họp mặt đầu xuân...</p>",
        createdAt: "2023-01-10",
        author: "Admin",
        imageUrl:
          "https://ims.baoyenbai.com.vn/NewsImg/12_2024/343845_nguoi%20cao%20tuoi%20trong%20dong%20ho.jpg",
      },
    ];

    const itemsWithStatus = mockNewsItems.map((item) => ({
      ...item,
      status: Math.random() > 0.5 ? "Đã đăng" : "Bản nháp",
    }));

    setNewsItems(itemsWithStatus);
    setLoading(false);
  }, []);

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      // In a real application, send delete request to API
      setNewsItems(newsItems.filter((item) => item.id !== itemToDelete));
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleStatusClick = (id: number) => {
    setItemToChangeStatus(id);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (itemToChangeStatus !== null) {
      setNewsItems(
        newsItems.map((item) => {
          if (item.id === itemToChangeStatus) {
            return {
              ...item,
              status: item.status === "Đã đăng" ? "Bản nháp" : "Đã đăng",
            };
          }
          return item;
        })
      );
      setShowStatusModal(false);
      setItemToChangeStatus(null);
    }
  };

  const cancelStatusChange = () => {
    setShowStatusModal(false);
    setItemToChangeStatus(null);
  };

  const handleEditClick = (item: NewsItem) => {
    setItemToEdit(item);
    setShowEditModal(true);
  };

  const onSubmit = (data: any) => {
    if (itemToEdit) {
      setNewsItems(
        newsItems.map((item) =>
          item.id === itemToEdit.id
            ? {
                ...item,
                title: data.title,
                content: data.content,
                imageUrl: data.image,
              }
            : item
        )
      );
      setShowEditModal(false);
      setItemToEdit(null);
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setItemToEdit(null);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 mx-auto bg-gray-50 min-h-screen">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                Quản trị bài viết
              </h1>
              <AddNewsModal/>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10 text-lg text-gray-600">
              Đang tải dữ liệu...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ảnh
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tiêu đề
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tác giả
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ngày tạo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newsItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={100}
                            className=" object-cover rounded-md"
                            preview={{
                              mask: <div className="text-xs">View</div>,
                            }}
                          />
                        ) : (
                          <div className="h-20 w-24 bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                              No image
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-gray-500 truncate max-w-xs">
                          {item.summary}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.createdAt}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleStatusClick(item.id)}
                          className={`px-2 py-1 text-xs font-semibold rounded-full cursor-pointer transition-colors duration-200 ${
                            item.status === "Đã đăng"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          }`}
                        >
                          {item.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <Link
                            to={`/news/detail/${item.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <span className="sr-only">Xem</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleEditClick(item)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            <span className="sr-only">Chỉnh sửa</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <span className="sr-only">Xóa</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">{newsItems.length}</span>{" "}
                kết quả
              </div>
              <div className="flex-1 flex justify-end">
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l4-4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Xác nhận xóa</h3>
            <p className="mb-6">
              Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không
              thể hoàn tác.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Confirmation Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Xác nhận thay đổi trạng thái
            </h3>
            <p className="mb-6">
              {newsItems.find((item) => item.id === itemToChangeStatus)
                ?.status === "Đã đăng"
                ? "Bạn có chắc chắn muốn chuyển bài viết này sang trạng thái Bản nháp?"
                : "Bạn có chắc chắn muốn đăng bài viết này?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelStatusChange}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={confirmStatusChange}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        title="Chỉnh sửa bài viết"
        open={showEditModal}
        onOk={() => form.submit()}
        onCancel={cancelEdit}
        okText="Lưu"
        style={{ top: 5 }}
        cancelText="Hủy"
        width={1000}
      >
        {itemToEdit && (
          <Form
            form={form}
            onFinish={onSubmit}
            layout={"vertical"}
            initialValues={{
              title: itemToEdit.title,
              image: null,
              content: itemToEdit.content,
            }}
          >
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
            >
              <Input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </Form.Item>
            <Form.Item
              name="image"
              label="Ảnh"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
            >
              <Upload
                listType="picture"
                maxCount={1}
                onChange={onUploadChange}
                beforeUpload={() => false} // Prevent automatic upload
              >
                <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="content"
              label="Nội dung"
              rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
            >
              <Editor
                apiKey="1wtnubcqbaj7x0o55sxessku2gahfypx3jxzjn2tacvyg5i6"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={itemToEdit.content}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table code help wordcount",
                    "image textcolor colorpicker link", // Added link plugin
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic forecolor backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help | \
                    fontsizeselect | fontselect | image link | h1 | h2", // Added link button
                  images_upload_handler: (blobInfo, success, failure) => {
                    const reader = new FileReader();
                    reader.onload = () => success(reader.result as string);
                    reader.onerror = () => failure("Image upload failed");
                    reader.readAsDataURL(blobInfo.blob());
                  },
                }}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>

    </>
  );
};

export default NewsListPage;
