import React from 'react';
import styled from 'styled-components';

import IconBookmarkEmptyURL from '../../common/assets/icons/icon_bookmark.svg';
import IconBookmarkFilledURL from '../../common/assets/icons/icon_bookmark_dis.svg';

const FooterBar = styled.div`
  width: 24.375rem; /* 390px / 16 = 24.375rem */
  height: 8.5rem; /* 136px / 16 = 8.5rem */
  background: #ffffff;
  box-shadow: 0rem 0.25rem 1.25rem 0rem rgba(0, 0, 0, 0.25); /* 0 4px 20px 0 rgba(0, 0, 0, 0.25) */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0rem 1.5rem; /* 0 24px / 16 = 0 1.5rem */
  box-sizing: border-box;
`;

const BookmarkButton = styled.button`
  width: 3rem; /* 48px / 16 = 3rem */
  height: 3rem; /* 48px / 16 = 3rem */
  border-radius: 1.875rem; /* 30px / 16 = 1.875rem (원형에 가깝게) */
  border: 0.0625rem solid #e0e0e0; /* 1px / 16 = 0.0625rem */
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 1rem; /* 16px / 16 = 1rem */

  & > img {
    width: 1.5rem; /* 24px / 16 = 1.5rem */
    height: 1.5rem; /* 24px / 16 = 1.5rem */
    object-fit: contain;
  }
`;

const ChatButton = styled.button`
  flex-grow: 1;
  height: 3.5rem; /* 56px / 16 = 3.5rem */
  border-radius: 0.75rem; /* 12px / 16 = 0.75rem */
  background: #00664f;
  color: white;
  font-family: Pretendard Variable;
  font-weight: 600;
  font-size: 1.125rem; /* 18px / 16 = 1.125rem */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LectureDetailCustomFooter = ({ isBookmarked, onBookmarkToggle, onApplyClick }) => {
  return (
    <FooterBar>
      <BookmarkButton onClick={onBookmarkToggle}>
        <img src={isBookmarked ? IconBookmarkFilledURL : IconBookmarkEmptyURL} alt="북마크" />
      </BookmarkButton>
      <ChatButton onClick={onApplyClick}>채팅하기</ChatButton>
    </FooterBar>
  );
};

export default LectureDetailCustomFooter;
