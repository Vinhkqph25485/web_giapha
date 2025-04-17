import React, { useState, useRef } from "react";
import { Modal, Form, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import { Editor } from "@tinymce/tinymce-react";

const ButtonAddMember = () => {
  const [form] = Form.useForm();
  const editorRef = useRef(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  
  const onUploadChange = (info: any) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
        form.setFieldsValue({ image_url: reader.result });
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      alert('Chỉ có thể tải lên file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert('Hình ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const onClose = () => {
    setShowAddModal(false);
    form.resetFields();
    setImageUrl(undefined);
  };

  const handleAdd = (data: any) => {
    console.log("New family member:", data);
    // Add logic to handle the new family member (e.g., API call)
    // Generate a unique ID for the new member
    const newMember = {
      id: `member-${Date.now()}`,
      name: data.name,
      gender: data.gender,
      parents: data.parents ? data.parents.map((id: string) => ({ id, type: "blood" })) : [],
      spouses: data.spouse ? [{ id: data.spouse, type: "married" }] : [],
      expanded: false,
      date_of_birth: data.date_of_birth,
      date_of_death: data.date_of_death,
      permanent_address: data.permanent_address,
      description: data.biography,
      image_url: data.image_url
    };
    console.log("Formatted new member:", newMember);
    form.resetFields();
    onClose();
  };

  return (
    <>
      <button
        className="absolute top-20 right-20 z-10 bg-[#8B0000] hover:bg-[#c15b49] text-white py-2 px-2 rounded-md shadow-md text-sm flex items-center"
        onClick={() => setShowAddModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
        Thêm Thành viên
      </button>

      <Modal
        title={
          <span className="text-lg font-bold text-gray-800">
            Thêm thành viên mới vào gia phả
          </span>
        }
        open={showAddModal}
        style={{ top: 20 }}
        onOk={() => form.submit()}
        onCancel={onClose}
        okText="Thêm"
        cancelText="Hủy"
        width={1000}
        okButtonProps={{ 
          style: { backgroundColor: '#8B0000', borderColor: '#8B0000' } 
        }}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Hủy
          </Button>,
          <Button 
            key="preview" 
            style={{ backgroundColor: '#2b5797', borderColor: '#2b5797', color: 'white' }}
            onClick={() => {
              const formValues = form.getFieldsValue();
              console.log("Xem nhanh:", formValues);
              // Hiển thị thông tin xem trước nếu cần
              Modal.info({
                title: 'Xem nhanh thông tin thành viên',
                content: (
                  <div>
                    <p><strong>Họ và tên:</strong> {formValues.name}</p>
                    <p><strong>Giới tính:</strong> {formValues.gender === 'male' ? 'Nam' : formValues.gender === 'female' ? 'Nữ' : ''}</p>
                    <p><strong>Địa chỉ:</strong> {formValues.permanent_address}</p>
                    <p><strong>Tiểu sử:</strong> <div dangerouslySetInnerHTML={{ __html: formValues.biography || '' }} /></p>
                  </div>
                ),
                width: 700,
              });
            }}
          >
            Xem nhanh
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => form.submit()}
            style={{ backgroundColor: '#8B0000', borderColor: '#8B0000' }}
          >
            Thêm
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-1/3">
              <Form.Item
                name="name"
                label={<span className="font-medium text-gray-700">Họ và tên</span>}
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input className="border-gray-300 rounded-md" />
              </Form.Item>
            </div>
            
            <div className="px-2 w-1/6">
              <Form.Item
                name="image_url"
                label={<span className="font-medium text-gray-700">Ảnh</span>}
                valuePropName="fileList"
                getValueFromEvent={(e) => e && e.fileList}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  onChange={onUploadChange}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Tải lên</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </div>
            
            <div className="px-2 w-1/4">
              <Form.Item
                name="date_of_birth"
                label={<span className="font-medium text-gray-700">Năm sinh</span>}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
              </Form.Item>
            </div>
            
            <div className="px-2 w-1/4">
              <Form.Item
                name="date_of_death"
                label={<span className="font-medium text-gray-700">Năm mất</span>}
              >
                <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
              </Form.Item>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-1/3">
              <Form.Item
                name="gender"
                label={<span className="font-medium text-gray-700">Giới tính</span>}
                rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
              >
                <Select placeholder="Chọn giới tính">
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                </Select>
              </Form.Item>
            </div>
            
            <div className="px-2 w-1/3">
              <Form.Item
                name="permanent_address"
                label={<span className="font-medium text-gray-700">Địa chỉ</span>}
              >
                <Input className="border-gray-300 rounded-md" />
              </Form.Item>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="px-2 w-1/2">
              <Form.Item
                name="parents"
                label={<span className="font-medium text-gray-700">Cha/Mẹ</span>}
              >
                <Select mode="multiple" placeholder="Chọn cha mẹ">
                  <Select.Option value="p1">Nguyễn Văn A</Select.Option>
                  <Select.Option value="p2">Nguyễn Thị B</Select.Option>
                  <Select.Option value="p3">Trần Văn C</Select.Option>
                  <Select.Option value="p4">Lê Thị D</Select.Option>
                  {/* Có thể thêm danh sách từ API */}
                </Select>
              </Form.Item>
            </div>
            
            <div className="px-2 w-1/2">
              <Form.Item
                name="spouse"
                label={<span className="font-medium text-gray-700">Vợ/Chồng</span>}
              >
                <Select placeholder="Chọn vợ/chồng">
                  <Select.Option value="s1">Nguyễn Văn E</Select.Option>
                  <Select.Option value="s2">Nguyễn Thị F</Select.Option>
                  <Select.Option value="s3">Trần Văn G</Select.Option>
                  <Select.Option value="s4">Lê Thị H</Select.Option>
                  {/* Có thể thêm danh sách từ API */}
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="biography"
            label={<span className="font-medium text-gray-700">Tiểu sử</span>}
          >
            <Editor
              apiKey="1wtnubcqbaj7x0o55sxessku2gahfypx3jxzjn2tacvyg5i6"
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 300,
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

export default ButtonAddMember;
