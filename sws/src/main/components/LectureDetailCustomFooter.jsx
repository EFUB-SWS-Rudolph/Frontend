import React from 'react';
import styled from 'styled-components';

import IconBookmarkActive from '../../common/assets/icons/icon_bookmark.svg';
import IconBookmarkDis from '../../common/assets/icons/icon_bookmark_dis.svg';

const FooterBar = styled.div`
 width: auto;
  height: 5.19rem;
  background: #ffffff;
  box-shadow: 0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 50%;
  bottom: 0;
  padding: 1rem;
  gap: 1.2rem;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  z-index: 1000;`;

const BookmarkButton = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  flex-shrink: 0;
  margin-top: 0.75rem;
  padding: 0;

  & > img {
    
    object-fit: contain;
  }
`;

const ChatButton = styled.button`
  flex-grow: 1;
  width: 18.625rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  background: #00664f;
  color: white;
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.38rem;
`;
const LectureDetailCustomFooter = ({ isBookmarked, onBookmarkToggle, onApplyClick }) => { // 🔴 props 이름도 통일
  return (
    <FooterBar>
        <BookmarkButton onClick={onBookmarkToggle}> 
          <img src={isBookmarked ? IconBookmarkActive : IconBookmarkDis } alt="북마크" />
        </BookmarkButton>
        <ChatButton onClick={onApplyClick}>채팅하기</ChatButton> 
      </FooterBar>
  );
};

export default LectureDetailCustomFooter;