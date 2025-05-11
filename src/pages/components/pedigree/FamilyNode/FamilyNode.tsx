import React, { useState, useRef } from "react";
import type { ExtNode, Gender } from "relatives-tree/lib/types";
import css from "./FamilyNode.module.css";
import classNames from "classnames";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import type { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import dayjs from "dayjs";
import manJpg from "./man.jpg";
import womanJpg from "./woman.jpg";
import {
  familyMemberApiService,
  isAuthenticated,
  useUpdateFamilyMember,
  useDeleteFamilyMember,
} from "../../../../services/api";

interface MyExtNode1 extends ExtNode {
  hasSubTree?: boolean;
  id: string;
  name: string;
  gender: Gender;
  image?: string;
  date_of_birth?: string;
  date_of_death?: string;
  family_rank?: string;
  generation_level?: number;
  permanent_address?: string;
  description?: string;
}

interface DefaultNode {
  id: string;
  children?: DefaultNode[];
  [key: string]: any;
}

interface FamilyNodeProps {
  node: MyExtNode1;
  isRoot: boolean;
  isHover?: boolean;
  onClick: (id: string) => void;
  onSubClick: (id: string) => void;
  isExpanded: boolean;
  style?: React.CSSProperties;
  defaultNodes?: DefaultNode[];
}

export const FamilyNode = React.memo(function FamilyNode({
  node,
  isRoot,
  onSubClick,
  isExpanded,
  style,
  defaultNodes,
}: FamilyNodeProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [memberDetail, setMemberDetail] = useState<any>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const updateMemberMutation = useUpdateFamilyMember();
  const deleteMemberMutation = useDeleteFamilyMember();

  const handleNodeClick = () => {
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const handleUpdateClick = async () => {
    try {
      if (node.id) {
        setLoading(true);
        const response = await familyMemberApiService.getFamilyMemberById(
          parseInt(node.id)
        );
        setMemberDetail(response);

        // Set form values
        form.setFieldsValue({
          name: response.name,
          gender: response.gender,
          date_of_birth: response.date_of_birth
            ? dayjs(response.date_of_birth)
            : undefined,
          date_of_death: response.date_of_death
            ? dayjs(response.date_of_death)
            : undefined,
          permanent_address: response.permanent_address,
          biography: response.description || "",
        });

        // Set image URL if available
        if (response.image) {
          setImageUrl(response.image);
        }

        setIsUpdateModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching member details:", error);
      message.error("Không thể tải thông tin thành viên!");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteClick = () => {
    deleteMemberMutation.mutateAsync(parseInt(node.id));
    message.success("Đã xóa thành viên thành công!");
    setIsModalVisible(false);
  };
  console.log("node?.children", node?.children);
  interface DefaultNode {
    id: string;
    children?: DefaultNode[];
    [key: string]: any;
  }
  const hasChildrenInDefaultNodes = (id: string) => {
    const defaultNode = defaultNodes?.find((n: DefaultNode) => n.id === id);
    if (defaultNode?.children && defaultNode.children.length > 0) {
      return true;
    }
    return false;
  };
  const onUploadChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      if (info.file.originFileObj) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageUrl(reader.result as string);
          setImageFile(info.file.originFileObj as RcFile);
          // Don't update the form value as it's causing the error
        };
        reader.readAsDataURL(info.file.originFileObj);
      }
    }
  };
  const beforeUpload = (file: RcFile): boolean => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Hình ảnh phải nhỏ hơn 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const closeUpdateModal = () => {
    setIsUpdateModalVisible(false);
    form.resetFields();
    setImageUrl(undefined);
    setImageFile(null);
  };
  const handleUpdate = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Add basic fields
      formData.append("name", data.name);
      formData.append("gender", data.gender);

      // Format and add dates
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
        // Lấy nội dung dạng chuỗi từ editor
        const biographyContent =
          typeof data.biography === "string"
            ? data.biography
            : editorRef.current
            ? editorRef.current.getContent()
            : "";

        formData.append("description", biographyContent);
      } // Add photo if it exists
      if (imageFile) {
        formData.append("photo", imageFile); // Sử dụng "photo" thay vì "image" để phù hợp với API
      }

      // Send API request to update
      await updateMemberMutation.mutateAsync({
        id: parseInt(node.id),
        data: formData,
      });

      message.success("Thành viên đã được cập nhật thành công!");
      form.resetFields();
      closeUpdateModal();
    } catch (err) {
      console.error("Error updating family member:", err);
      message.error("Có lỗi xảy ra khi cập nhật thành viên!");
    } finally {
      setLoading(false);
    }
  };

  console.log("node?.children", node);

  if (!node) {
    return <></>;
  }

  return (
    <div className={css.root} style={style}>
      <div
        className={classNames(
          css.inner,
          css[node?.gender],
          isRoot && css.isRoot
        )}
        onClick={handleNodeClick}
      >
        <div className="flex flex-col justify-center items-center">
          <img
            className="p-2 w-12 h-12 rounded-full"
            src={node?.image}
            alt={node?.id}
          />
          <div className="font-bold text-black text-xs text-center">
            {node?.name}
          </div>

          <div className="absolute bottom-0 right-0">
            {hasChildrenInDefaultNodes(node?.id) == true &&
              node?.gender === "male" && (
                <button
                  className="bg-white text-black rounded-full text-xs px-2 py-1 mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSubClick(node?.id);
                  }}
                >
                  {isExpanded ? "-" : "+"}
                </button>
              )}
          </div>
        </div>
      </div>{" "}
      <Modal
        title={node?.name}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={
          isAuthenticated() ? (
            <div className="flex gap-2 justify-end">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleUpdateClick}
                style={{
                  backgroundColor: "#8B0000",
                  borderColor: "#8B0000",
                }}
              >
                Cập nhật
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleDeleteClick}
              >
                Xóa
              </Button>
            </div>
          ) : null
        }
        className={css.modal}
      >
        <div className="flex flex-col items-center">
          <div className="text-center mb-4">
            <p className="text-lg font-semibold">
              {node?.gender === "male" ? "👨 Nam" : "👩 Nữ"} {node?.family_rank}{" "}
              - Thế hệ thứ {node?.generation_level}
            </p>
            <p className="text-sm">
              Sinh ngày{" "}
              {node?.date_of_birth
                ? (() => {
                    const date = new Date(node?.date_of_birth);
                    return !isNaN(date.getTime())
                      ? `${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()}`
                      : node?.date_of_birth;
                  })()
                : ""}{" "}
              {node?.date_of_death
                ? `- Mất ngày: ${(() => {
                    const date = new Date(node?.date_of_death);
                    return !isNaN(date.getTime())
                      ? `${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()}`
                      : node?.date_of_death;
                  })()}`
                : ""}
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <img
              className="p-2 w-24 h-24 rounded-full"
              src={node?.image}
              alt={node?.id}
            />
          </div>

          <div className="text-left w-full px-4">
            {node?.children.length > 0 && (
              <p className="text-sm mb-2">Số con: {node?.children.length}</p>
            )}
            <p className="text-sm mb-2">Địa chỉ: {node?.permanent_address}</p>
            {node?.description ? (
              <div
                className="text-sm mb-2"
                dangerouslySetInnerHTML={{ __html: node?.description }}
              />
            ) : (
              <p className="text-sm mb-2">Không có thông tin</p>
            )}
          </div>
        </div>
      </Modal>
      {/* Update Modal */}
      <Modal
        title={`Cập nhật thông tin: ${node?.name}`}
        open={isUpdateModalVisible}
        onCancel={closeUpdateModal}
        width={1000}
        style={{ top: 20 }}
        footer={
          <div className="flex justify-end gap-3">
            <Button
              key="cancel"
              onClick={closeUpdateModal}
              className="min-w-[80px] h-[32px] flex items-center justify-center"
            >
              Hủy
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
              Cập nhật
            </Button>
          </div>
        }
        styles={{
          body: {
            padding: "24px",
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
          },
        }}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
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
              </div>{" "}
              <div className="col-span-1 flex items-center justify-center">
                <Form.Item
                  name="image_url"
                  label={
                    <span className="font-medium text-gray-700 block text-center w-full">
                      Ảnh đại diện
                    </span>
                  }
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
                        <div className="mt-2">Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Tiểu sử</h3>
            <Form.Item name="biography" className="mb-0">
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
    </div>
  );
});
