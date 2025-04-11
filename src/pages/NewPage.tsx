// File: src/components/MyEditor.jsx

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";

const MyEditor = ({
  initialValue = "<p>Viết nội dung ở đây...</p>",
  onContentChange = null,
  height = 500,
}) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialValue);
  const [displayContent, setDisplayContent] = useState("");

  console.log("content", content);
  console.log("displayContent", displayContent);

  const handleEditorChange = (content, editor) => {
    setContent(content);
    if (onContentChange) {
      onContentChange(content);
    }
  };

  const getContent = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      setDisplayContent(editorContent);
      return editorContent;
    }
    return "";
  };

  return (
    <div>
      <Editor
        apiKey="1wtnubcqbaj7x0o55sxessku2gahfypx3jxzjn2tacvyg5i6" // Đăng ký API key miễn phí tại https://www.tiny.cloud/auth/signup/
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        onEditorChange={handleEditorChange}
        init={{
          height,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "paste",
            "pagebreak",
            "emoticons",
            "template",
            "print",
          ],
          toolbar: [
            "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | \
         alignleft aligncenter alignright alignjustify | \
         bullist numlist outdent indent | link image media table | removeformat | pagebreak | help",
            "fontselect fontsizeselect | emoticons hr | fullscreen code | print",
          ],
          // Thêm cấu hình để upload hình ảnh
          image_advtab: true,
          file_picker_types: "image",
          automatic_uploads: true,
          content_style:
            "body { font-family: Arial, sans-serif; font-size: 14px }",
          paste_data_images: true,
          contextmenu: "link image table paste",
          branding: false,
          resize: "both",
          table_style_by_css: true,
          table_responsive_width: true,
          table_default_styles: {
            borderCollapse: "collapse",
            width: "100%",
          },
        }}
      />
      <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
        <button onClick={getContent} className="editor-button primary">
          Lấy nội dung
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(content)}
          className="editor-button"
        >
          Sao chép nội dung
        </button>
        <button
          onClick={() => editorRef.current?.execCommand("mceFullScreen")}
          className="editor-button"
        >
          Toàn màn hình
        </button>
        <button
          onClick={() => setContent(initialValue)}
          className="editor-button danger"
        >
          Đặt lại
        </button>
      </div>

      {displayContent && (
        <div style={{ marginTop: "20px" }}>
          <h3>Nội dung đã lấy:</h3>
          <div
            className="content-preview"
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: displayContent }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEditor;
