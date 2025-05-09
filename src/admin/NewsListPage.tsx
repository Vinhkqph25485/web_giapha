import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Image, Modal, Upload, Button, Form, Input, Table, message, Spin, Tag, Space } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import AddNewsModal from "./components/AddNewsModal";
import { useNewsArticles, useDeleteNewsArticle, useUpdateNewsArticle } from "../services/api";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  author: string | { 
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string | null;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
  };
  imageUrl?: string;
  is_published?: string;
}

interface PaginationData {
  current: number;
  pageSize: number;
  total: number;
}

const NewsListPage: React.FC = () => {
  // States for data and UI
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);
  const [itemToChangeStatus, setItemToChangeStatus] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<NewsItem | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [previewItem, setPreviewItem] = useState<NewsItem | null>(null);
  const editorRef = useRef(null);
  const [form] = Form.useForm();

  // API hooks
  const deleteNewsMutation = useDeleteNewsArticle();
  const updateNewsMutation = useUpdateNewsArticle();
  
  const { 
    data: newsData, 
    isLoading: loading, 
    error 
  } = useNewsArticles({
    page: pagination.current,
    page_size: pagination.pageSize
  });
  
  // Form handling
  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      title: itemToEdit?.title || "",
      image: null,
      content: itemToEdit?.content || "",
    },
  });

  // Update local state when API data changes
  useEffect(() => {
    if (newsData) {
      // Assuming the API returns { results: Array, count: number }
      const items = newsData.results || [];
      const transformedItems = items.map((item: any) => ({
        id: item.id,
        title: item.title,
        summary: item.summary || "",
        content: item.content || "",
        createdAt: new Date(item.created_at).toLocaleDateString("vi-VN"),
        author: typeof item.author === 'object' ? 
          (item.author?.username || 
          `${item.author?.first_name || ''} ${item.author?.last_name || ''}`.trim() || 
          'Admin') : 
          (item.author || "Admin"),
        imageUrl: item.image || null,
        is_published: item.is_published === true ? "Đã đăng" : "Bản nháp",
      }));
      
      setNewsItems(transformedItems);
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        total: newsData.count || 0
      }));
    }
  }, [newsData]);

  // Show error message if API fails
  useEffect(() => {
    if (error) {
      message.error("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau!");
    }
  }, [error]);

  const onUploadChange = (info: any) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = () => setValue("image", reader.result as string);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  // Handle table pagination change
  const handleTableChange = (pagination: any) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total
    });
  };

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete !== null) {
      try {
        await deleteNewsMutation.mutateAsync(itemToDelete);
        message.success("Đã xóa bài viết thành công!");
        setShowDeleteModal(false);
        setItemToDelete(null);
      } catch (error) {
        message.error("Có lỗi xảy ra khi xóa bài viết. Vui lòng thử lại sau!");
      }
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

  const confirmStatusChange = async () => {
    if (itemToChangeStatus !== null) {
      const currentItem = newsItems.find(item => item.id === itemToChangeStatus);
      if (currentItem) {
        const newStatus = currentItem.is_published === "Đã đăng" ? false : true;
        const formData = new FormData();
        formData.append('is_published', String(!!newStatus)); 
        
        try {
          await updateNewsMutation.mutateAsync({ 
            id: itemToChangeStatus, 
            data: formData 
          });
          
          message.success("Đã cập nhật trạng thái bài viết thành công!");
          setShowStatusModal(false);
          setItemToChangeStatus(null);
        } catch (error) {
          message.error("Có lỗi xảy ra khi cập nhật trạng thái. Vui lòng thử lại!");
        }
      }
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

  const handlePreviewClick = (item: NewsItem) => {
    setPreviewItem(item);
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    setPreviewItem(null);
  };

  const onSubmit = (data: any) => {
    if (itemToEdit) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      
      if (data.image) {
        // Handle image upload if it's a File object
        if (data.image instanceof File) {
          formData.append('image', data.image);
        }
      }
      

      updateNewsMutation.mutate(
        { id: itemToEdit.id, data: formData },
        {
          onSuccess: () => {
            message.success("Cập nhật bài viết thành công!");
            setShowEditModal(false);
            setItemToEdit(null);
          },
          onError: () => {
            message.error("Có lỗi xảy ra khi cập nhật bài viết!");
          }
        }
      );
    }
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setItemToEdit(null);
  };
  
  // Table columns configuration
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 120,
      render: (imageUrl: string, record: NewsItem) => (
        imageUrl ? (
          <Image
            src={imageUrl}
            alt={record.title}
            width={100}
            className="object-cover rounded-md"
            preview={{
              mask: <div className="text-xs">Xem</div>,
            }}
          />
        ) : (
          <div className="h-20 w-24 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-500">
              No image
            </span>
          </div>
        )
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: NewsItem) => (
        <div>
          <div className="font-medium text-gray-900">{text}</div>
          <div className="text-gray-500 truncate max-w-xs">{record.summary}</div>
        </div>
      ),
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
      width: 120,
      render: (author: string | object) => (
        typeof author === 'object' ? 
          (author.username || 
          `${author.first_name || ''} ${author.last_name || ''}`.trim() || 
          'Không có thông tin') : 
          (author || "Không có thông tin")
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_published',
      key: 'is_published',
      width: 120,
      render: (is_published: string, record: NewsItem) => (
        <Tag
          color={is_published === "Đã đăng" ? "green" : "gold"}
          className="cursor-pointer"
          onClick={() => handleStatusClick(record.id)}
        >
          {is_published}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_, record: NewsItem) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            className="text-blue-600 hover:text-blue-900"
            onClick={() => handlePreviewClick(record)}
          />
          <Button 
            type="text"
            icon={<EditOutlined />} 
            className="text-yellow-600 hover:text-yellow-900"
            onClick={() => handleEditClick(record)}
          />
          <Button 
            type="text"
            icon={<DeleteOutlined />} 
            className="text-red-600 hover:text-red-900"
            onClick={() => handleDeleteClick(record.id)} 
          />
        </Space>
      ),
    },
  ];

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

          <div className="overflow-x-auto">
            <Spin spinning={loading} tip="Đang tải dữ liệu...">
              <Table
                columns={columns}
                dataSource={newsItems}
                rowKey="id"
                pagination={{
                  current: pagination.current,
                  pageSize: pagination.pageSize,
                  total: pagination.total,
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng cộng ${total} bài viết`,
                  pageSizeOptions: ['5', '10', '20', '50'],
                }}
                onChange={handleTableChange}
              />
            </Spin>
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
                ?.is_published === "Đã đăng"
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

      {/* Preview Modal */}
      <Modal
        title={previewItem?.title || "Chi tiết bài viết"}
        open={showPreviewModal}
        onCancel={closePreviewModal}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        {previewItem && (
          <div className="preview-content">
            {previewItem?.imageUrl && (
              <div className="mb-6 text-center">
                <Image
                  src={previewItem?.imageUrl}
                  alt={previewItem?.title}
                  className="max-h-[300px] object-contain rounded-md"
                />
              </div>
            )}
            
            <div className="mb-4 flex justify-between text-sm text-gray-500">
              <div>Tác giả: {
                typeof previewItem.author === 'object' ? 
                  (previewItem.author.username || 
                  `${previewItem.author.first_name || ''} ${previewItem.author.last_name || ''}`.trim() || 
                  'Không có thông tin') : 
                  (previewItem.author || "Không có thông tin")
              }</div>
              <div>Ngày đăng: {previewItem?.createdAt || "Không có thông tin"}</div>
            </div>
            
            {previewItem?.summary && (
              <div className="mb-4 p-4 bg-gray-50 rounded-md italic">
                <p className="text-gray-700">{previewItem?.summary}</p>
              </div>
            )}
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: previewItem?.content || "" }}
            />
            
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
              <button 
                onClick={closePreviewModal}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NewsListPage;
