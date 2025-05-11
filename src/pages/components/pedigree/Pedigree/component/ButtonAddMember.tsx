import { useState, useRef, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  message,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import type { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { Editor } from "@tinymce/tinymce-react";
import {
  familyMemberApiService,
  useAddFamilyMember,
} from "../../../../../services/api";
import dayjs from "dayjs";
import type { Editor as TinyMCEEditor } from "tinymce";

const ButtonAddMember = () => {
  interface PreviewData {
    name?: string;
    gender?: string;
    formattedBirthDate?: string;
    formattedDeathDate?: string;
    parents?: string[];
    spouse?: string;
    permanent_address?: string;
    biography?: string;
    generation_level?: string;
    family_rank?: string;
  }

  interface FamilyMember {
    id: string | number;
    name: string;
    gender: "male" | "female";
  }

  const [form] = Form.useForm();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState<boolean>(false);

  console.log("familyMembers", familyMembers);
  console.log("form.getFieldValue.length", form.getFieldValue("parents")?.length);

  const addFamilyMemberMutation = useAddFamilyMember();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMembers(true);
        const response = await familyMemberApiService.getFamilyMembers({
          gender: "male",
        });
        const members = response.results || response;
        console.log("API response:", response);
        setFamilyMembers(Array.isArray(members) ? members : []);
      } catch (error) {
        console.error("Error fetching family members:", error);
        message.error("Không thể tải danh sách thành viên gia đình");
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchData();
  }, []);

  // Handle parent selection to disable spouse field
  const handleParentChange = (value: any) => {
    if (value && value.length > 0) {
      form.setFieldsValue({ spouse: undefined });
    }
  };

  // Handle spouse selection to disable parent field
  const handleSpouseChange = (value: any) => {
    if (value) {
      form.setFieldsValue({ parents: [] });
    }
  };

  const onUploadChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      if (info.file.originFileObj) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result as string);
          setImageFile(info.file.originFileObj as RcFile);
          form.setFieldsValue({ image_url: reader.result });
        };
        reader.readAsDataURL(info.file.originFileObj);
      }
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      alert("Chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert("Hình ảnh phải nhỏ hơn 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const onClose = () => {
    setShowAddModal(false);
    form.resetFields();
    setImageUrl(undefined);
    setImageFile(null);
  };
  const handleAdd = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      // Create FormData object
      const formData = new FormData();

      // Add the basic fields
      formData.append("name", data.name);
      formData.append("gender", data.gender);

      // Format and add dates if they exist
      if (data.date_of_birth) {
        formData.append(
          "date_of_birth",
          dayjs(data.date_of_birth).format("YYYY-MM-DD")
        );
      }

      if (data.date_of_death) {
        formData.append(
          "date_of_death",
          dayjs(data.date_of_death).format("YYYY-MM-DD")
        );
      }

      // Add address
      if (data.permanent_address) {
        formData.append("permanent_address", data.permanent_address);
      }

      // Add biography/description
      if (data.biography) {
        formData.append("description", data.biography);
      }

      // Add parent_id if selected
      if (data.parents && data.parents.length > 0) {
        formData.append("parent_id", data.parents[0]); // Assuming we only take the first parent
      } else {
        formData.append("parent_id", ""); // Empty string as in the curl example
      }

      // Add spouse_id if selected
      if (data.spouse) {
        formData.append("spouse_id", data.spouse);
      } else {
        formData.append("spouse_id", ""); // Empty string as in the curl example
      }

      // Add generation level (default to 1 as in the example)
      formData.append("generation_level", data.generation_level || "1");

      // Add photo if it exists
      if (imageFile) {
        formData.append("photo", imageFile);
      }

      // Send the API request
      await addFamilyMemberMutation.mutateAsync(formData);

      message.success("Thành viên mới đã được thêm thành công!");
      form.resetFields();
      onClose();
    } catch (err) {
      console.error("Error adding family member:", err);
      message.error("Có lỗi xảy ra khi thêm thành viên mới!");
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateObj: Date | string | null) => {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    return !isNaN(date.getTime())
      ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      : "";
  };

  const handlePreview = () => {
    const formValues = form.getFieldsValue();
    console.log("Xem nhanh:", formValues);

    const birthDate = formValues.date_of_birth
      ? formatDate(formValues.date_of_birth)
      : "";
    const deathDate = formValues.date_of_death
      ? formatDate(formValues.date_of_death)
      : "";

    setPreviewData({
      ...formValues,
      formattedBirthDate: birthDate,
      formattedDeathDate: deathDate,
    });
    setShowPreviewModal(true);
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
  };

  return (
    <>
      <button
        className="absolute top-20 right-20 z-10 bg-[#8B0000] hover:bg-[#c15b49] text-white py-2 px-4 rounded-md shadow-md text-sm flex items-center add-member-button"
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
        bodyStyle={{
          padding: "24px",
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
        }}
        okButtonProps={{
          style: { backgroundColor: "#8B0000", borderColor: "#8B0000" },
          loading: loading,
        }}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              key="cancel"
              onClick={onClose}
              className="min-w-[80px] h-[32px] flex items-center justify-center"
            >
              Hủy
            </Button>
            <Button
              key="preview"
              style={{
                backgroundColor: "#2b5797",
                borderColor: "#2b5797",
                color: "white",
                minWidth: "80px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handlePreview}
            >
              Xem nhanh
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={() => form.submit()}
              style={{
                backgroundColor: "#8B0000",
                borderColor: "#8B0000",
                minWidth: "80px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              loading={loading}
            >
              Thêm
            </Button>
          </div>
        }
      >
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <div className="mb-8 pb-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Thông tin cá nhân
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <Form.Item
                  name="name"
                  label={
                    <span className="font-medium text-gray-700">Họ và tên</span>
                  }
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input className="border-gray-300 rounded-md" />
                </Form.Item>
              </div>

              <div className="col-span-1">
                <Form.Item
                  name="gender"
                  label={
                    <span className="font-medium text-gray-700">Giới tính</span>
                  }
                  rules={[
                    { required: true, message: "Vui lòng chọn giới tính!" },
                  ]}
                >
                  <Select placeholder="Chọn giới tính">
                    <Select.Option value="male">Nam</Select.Option>
                    <Select.Option value="female">Nữ</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="col-span-1">
                <Form.Item
                  name="date_of_birth"
                  label={
                    <span className="font-medium text-gray-700">Năm sinh</span>
                  }
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                    placeholder="Chọn ngày sinh"
                  />
                </Form.Item>
              </div>

              <div className="col-span-1">
                <Form.Item
                  name="date_of_death"
                  label={
                    <span className="font-medium text-gray-700">Năm mất</span>
                  }
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                    placeholder="Chọn ngày mất (nếu có)"
                  />
                </Form.Item>
              </div>

              <div className="col-span-1">
                <Form.Item
                  name="permanent_address"
                  label={
                    <span className="font-medium text-gray-700">Địa chỉ</span>
                  }
                >
                  <Input className="border-gray-300 rounded-md" />
                </Form.Item>
              </div>

              <div className="col-span-1 flex items-center justify-center">
                <Form.Item
                  name="image_url"
                  label={
                    <span className="font-medium text-gray-700 block text-center w-full">
                      Ảnh đại diện
                    </span>
                  }
                  valuePropName="fileList"
                  getValueFromEvent={(e) => e && e.fileList}
                  className="text-center"
                >
                  <Upload
                    listType="picture-card"
                    maxCount={1}
                    onChange={onUploadChange}
                    beforeUpload={beforeUpload}
                    showUploadList={false}
                    className="flex justify-center"
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <UploadOutlined style={{ fontSize: "24px" }} />
                        <div className="mt-2">Tải lên</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="mb-8 pb-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Thông tin gia đình
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {" "}
              <div className="col-span-1">
                <Form.Item
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.spouse !== currentValues.spouse
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item
                      name="parents"
                      label={
                        <span className="font-medium text-gray-700">Cha</span>
                      }
                    >
                      <Select
                        placeholder="Chọn cha mẹ"
                        className="rounded-md"
                        allowClear
                        loading={loadingMembers}
                        notFoundContent={
                          loadingMembers ? <Spin size="small" /> : null
                        }
                        onChange={handleParentChange}
                        disabled={!!getFieldValue("spouse")}
                      >
                        {familyMembers.map((member) => (
                          <Select.Option
                            key={member.id}
                            value={member.id.toString()}
                          >
                            {member.name}{" "}
                            {member.gender === "male" ? "(Nam)" : "(Nữ)"}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
              </div>
              <div className="col-span-1">
                <Form.Item
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.parents !== currentValues.parents
                  }
                >
                  {({ getFieldValue }) => (
                    <Form.Item
                      name="spouse"
                      label={
                        <span className="font-medium text-gray-700">Chồng</span>
                      }
                    >
                      <Select
                        placeholder="Chọn chồng"
                        className="rounded-md"
                        allowClear
                        loading={loadingMembers}
                        notFoundContent={
                          loadingMembers ? <Spin size="small" /> : null
                        }
                        onChange={handleSpouseChange}
                        disabled={(getFieldValue("parents") || []).length > 0}
                      >
                        {familyMembers.map((member) => (
                          <Select.Option
                            key={member.id}
                            value={member.id.toString()}
                          >
                            {member.name}{" "}
                            {member.gender === "male" ? "(Nam)" : "(Nữ)"}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Tiểu sử</h3>
            <Form.Item name="biography" className="mb-0">
              {" "}
              <Editor
                apiKey="1wtnubcqbaj7x0o55sxessku2gahfypx3jxzjn2tacvyg5i6"
                onInit={(_evt, editor) => (editorRef.current = editor)}
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
                  images_upload_handler: (
                    blobInfo: { blob: () => Blob },
                    success: (url: string) => void,
                    failure: (message: string) => void
                  ) => {
                    const reader = new FileReader();
                    reader.onload = () => success(reader.result as string);
                    reader.onerror = () => failure("Image upload failed");
                    reader.readAsDataURL(blobInfo.blob());
                  },
                }}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <Modal
        title={previewData?.name || "Xem nhanh thông tin thành viên"}
        open={showPreviewModal}
        onCancel={closePreviewModal}
        footer={null}
        width={600}
        className="preview-modal"
      >
        {previewData && (
          <div className="flex flex-col items-center">
            <div className="text-center mb-4">
              <p className="text-lg font-semibold">
                {previewData.gender === "male"
                  ? "👨 Nam"
                  : previewData.gender === "female"
                  ? "👩 Nữ"
                  : ""}
                {previewData.family_rank ? ` ${previewData.family_rank}` : ""}
                {previewData.generation_level
                  ? ` - Thế hệ thứ ${previewData.generation_level}`
                  : ""}
              </p>
              <p className="text-sm">
                {previewData.formattedBirthDate
                  ? `Sinh ngày ${previewData.formattedBirthDate}`
                  : ""}
                {previewData.formattedDeathDate
                  ? ` - Mất ngày: ${previewData.formattedDeathDate}`
                  : ""}
              </p>
            </div>

            <div className="flex justify-center mb-4">
              {imageUrl ? (
                <img
                  className="p-2 w-24 h-24 rounded-full"
                  src={imageUrl}
                  alt={previewData.name}
                />
              ) : (
                <div className="p-2 w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  {previewData.gender === "male" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              )}
            </div>

            <div className="text-left w-full px-4">
              {previewData.parents && previewData.parents.length > 0 && (
                <p className="text-sm mb-2">
                  <strong>Cha:</strong>{" "}
                  {Array.isArray(previewData.parents)
                    ? previewData.parents.join(", ")
                    : previewData.parents}
                </p>
              )}

              {previewData.spouse && (
                <p className="text-sm mb-2">
                  <strong>Chồng:</strong> {previewData.spouse}
                </p>
              )}

              <p className="text-sm mb-2">
                <strong>Địa chỉ:</strong>{" "}
                {previewData.permanent_address || "Chưa có thông tin"}
              </p>

              {previewData.biography && (
                <div className="text-sm mb-2">
                  <strong>Tiểu sử:</strong>
                  <div
                    dangerouslySetInnerHTML={{ __html: previewData.biography }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ButtonAddMember;
