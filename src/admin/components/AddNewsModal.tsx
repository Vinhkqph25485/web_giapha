import { useRef, useState } from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";

const AddNewsModal = () => {
  const [form] = Form.useForm();
  const editorRef = useRef(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const onUploadChange = (info: any) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = () => form.setFieldsValue({ image: reader.result });
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const onAdd = (newPost: any) => {
    console.log("New post added:", newPost);
    // Add logic to handle the new post (e.g., API call)
  };

  const onClose = () => {
    setShowAddModal(false);
    form.resetFields();
  };

  const handleAdd = (data: any) => {
    const newPost = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      imageUrl: data.image,
      createdAt: new Date().toISOString().split("T")[0],
      author: "Admin",
      status: "Bản nháp",
    };
    onAdd(newPost);
    form.resetFields();
    onClose();
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
            name="image"
            label={<span className="font-medium text-gray-700">Ảnh</span>}
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
          >
            <Upload
              listType="picture"
              maxCount={1}
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
