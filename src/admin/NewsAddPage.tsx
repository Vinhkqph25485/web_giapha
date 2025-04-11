import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface NewsFormData {
  title: string;
  summary: string;
  content: string;
}

const NewsAddPage: React.FC = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [displayContent, setDisplayContent] = useState<string>('');
  
  const { 
    register, 
    handleSubmit, 
    control, 
    setValue, 
    watch, 
    formState: { errors } 
  } = useForm<NewsFormData>({
    defaultValues: {
      title: '',
      summary: '',
      content: '<p>Viết nội dung bài viết ở đây...</p>'
    }
  });

  const contentValue = watch('content');
  
  const getContent = () => {
    if (editorRef.current) {
      const editorContent = editorRef.current.getContent();
      setDisplayContent(editorContent);
      return editorContent;
    }
    return "";
  };

  const onSubmit: SubmitHandler<NewsFormData> = async (data) => {
    if (!data.title.trim()) {
      alert('Vui lòng nhập tiêu đề bài viết!');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, make an API call to save the article
      const newArticle = {
        ...data,
        createdAt: new Date().toISOString().split('T')[0],
        author: 'Admin' // In a real app, get from user context/auth
      };
      
      console.log('Saving new article:', newArticle);
      // API call would go here
      
      alert('Đã thêm bài viết thành công!');
      navigate('/news'); // Redirect to news list
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Có lỗi xảy ra khi thêm bài viết. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Thêm bài viết mới</h1>
        <button 
          onClick={() => navigate('/news')} 
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded flex items-center transition-colors"
        >
          <span className="mr-2">&larr;</span> Quay lại danh sách
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề:</label>
          <input
            id="title"
            placeholder="Nhập tiêu đề bài viết"
            className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            {...register('title', { required: true })}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">Tiêu đề không được để trống</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Tóm tắt:</label>
          <textarea
            id="summary"
            placeholder="Nhập tóm tắt nội dung bài viết"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            {...register('summary')}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Nội dung:</label>
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Editor
                apiKey="1wtnubcqbaj7x0o55sxessku2gahfypx3jxzjn2tacvyg5i6"
                onInit={(evt, editor) => {
                  editorRef.current = editor;
                }}
                value={value}
                onEditorChange={onChange}
                init={{
                  height: 450,
                  menubar: false,
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
            )}
          />
          
          <div className="flex flex-wrap gap-3 mt-4">
            <button 
              type="button"
              onClick={getContent} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Lấy nội dung
            </button>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(contentValue)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Sao chép nội dung
            </button>
            <button
              type="button"
              onClick={() => editorRef.current?.execCommand("mceFullScreen")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Toàn màn hình
            </button>
            <button
              type="button"
              onClick={() => setValue('content', '<p>Viết nội dung bài viết ở đây...</p>')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Đặt lại
            </button>
          </div>
        </div>
        
        {displayContent && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Nội dung đã lấy:</h3>
            <div
              className="border border-gray-300 rounded-md p-4 max-h-[300px] overflow-auto bg-white"
            >
              <div dangerouslySetInnerHTML={{ __html: displayContent }} />
            </div>
          </div>
        )}
        
        <div className="flex gap-4 pt-4 border-t">
          <button 
            type="submit" 
            className={`px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Đang lưu...' : 'Thêm bài viết'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/news')}
            className={`px-6 py-2.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsAddPage;
