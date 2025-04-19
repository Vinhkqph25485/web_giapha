import { useRef, useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { useAddNewsArticle } from "../../services/api";

const AddNewsModal = () => {
  const [form] = Form.useForm();
  const editorRef = useRef(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Use the mutation hook from react-query
  const addNewsArticle = useAddNewsArticle();

  const onUploadChange = (info: any) => {
    setFileList(info.fileList);
    
    // Update the form field value for preview
    if (info.fileList.length > 0) {
      const file = info.fileList[info.fileList.length - 1];
      if (file.status === "done") {
        const reader = new FileReader();
        reader.onload = () => form.setFieldsValue({ image: reader.result });
        reader.readAsDataURL(file.originFileObj);
      }
    } else {
      form.setFieldsValue({ image: null });
    }
  };

  const onClose = () => {
    setShowAddModal(false);
    form.resetFields();
    setFileList([]);
  };

  const handleAdd = async (formData: any) => {
    try {
      setLoading(true);
      
      // Create FormData for API request
      const apiFormData = new FormData();
      apiFormData.append('title', formData.title);
      apiFormData.append('content', formData.content);
      
      // Add image if exists
      if (fileList.length > 0 && fileList[0].originFileObj) {
        apiFormData.append('image', fileList[0].originFileObj);
      }
      
      // Add summary if available in your form
      if (formData.summary) {
        apiFormData.append('summary', formData.summary);
      }

      // Use the mutation to create the article
      await addNewsArticle.mutateAsync(apiFormData);
      
      // Show success message
      message.success('Đã thêm bài viết mới thành công!');
      
      // Reset and close
      form.resetFields();
      setFileList([]);
      onClose();
    } catch (error) {
      console.error('Error adding news article:', error);
      message.error('Có lỗi xảy ra khi thêm bài viết. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowAddModal(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition-transform duration-200 hover:scale-105"
      >
        + Thêm bài viết mới
      </button>
      <Modal
        title={
          <span className="text-lg font-bold text-gray-800">
            Thêm bài viết mới
          </span>
        }
        open={showAddModal}
        style={{ top: 5 }}
        onOk={() => form.submit()}
        onCancel={onClose}
        okText="Thêm"
        cancelText="Hủy"
        width={1000}
        confirmLoading={loading}
      >
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item
            name="title"
            label={<span className="font-medium text-gray-700">Tiêu đề</span>}
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input className="border-gray-300 rounded-md" />
          </Form.Item>

          <Form.Item
            name="summary"
            label={<span className="font-medium text-gray-700">Tóm tắt</span>}
          >
            <Input.TextArea
              className="border-gray-300 rounded-md"
              rows={3}
              placeholder="Nhập tóm tắt nội dung bài viết"
            />
          </Form.Item>

          <Form.Item
            name="image"
            label={<span className="font-medium text-gray-700">Ảnh</span>}
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Upload
              listType="picture"
              maxCount={1}
              fileList={fileList}
              onChange={onUploadChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="content"
            label={<span className="font-medium text-gray-700">Nội dung</span>}
            rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
          >
            <Editor
              apiKey="1wtnubcqbaj7x0o55sxessku2gahfypx3jxzjn2tacvyg5i6"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table code help wordcount",
                  "image textcolor colorpicker link",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic forecolor backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help | \
                fontsizeselect | fontselect | image link | h1 | h2",
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
      </Modal>
    </>
  );
};

export default AddNewsModal;
