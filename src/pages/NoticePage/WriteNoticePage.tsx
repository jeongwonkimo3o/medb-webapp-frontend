import React, { useState } from 'react';
import SideMenu from "../../components/SideMenu";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createNotice } from '../../api/notice';
import { useNavigate } from 'react-router-dom';

const WriteNoticePage = (): JSX.Element => {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const navigate = useNavigate();

  const handleContentChange = (content: string) => {
    setContent(content);
  };

  const goToNoticeList = () => {
    navigate('/notice');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createNotice(title, content); // 공지 작성 함수 호출
      console.log('제목:', title, '내용:', content);
      alert('공지가 작성되었습니다.');
      goToNoticeList();

    } catch (error) {
      console.error("공지 작성 실패", error);
      alert('공지 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };


  return (
    <div className="flex bg-blue-50">
      <SideMenu />
      <div className="flex-1 flex flex-col mt-8 mx-8">
        <div className="p-4 text-lg">
          <span className="font-semibold text-blue-800">공지사항 작성</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="p-2 border border-gray-300 rounded w-full"
              placeholder="제목을 입력하세요"
            />
          </div>
          <div className="quill-editor bg-white "> 
            <ReactQuill className="custom-quill-editor" theme="snow" value={content} onChange={handleContentChange} />
          </div>
          <div className="mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded text-sm hover:bg-blue-900">작성</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteNoticePage;
