// src/main/components/GlobalSearchHeaderContent.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// 필요한 SVG 아이콘 URL 임포트
import IconBackURL from '../../common/assets/icons/icon_back.svg'; // 뒤로 가기 아이콘 URL
// styled-components 정의
const GlobalHeaderContainer = styled.div`
  width: 100%;
  height: 104px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; 
  padding: 0 16px 8px 16px; 
  box-sizing: border-box;
  position: relative; 
`;
const HeaderContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute; 
  top:60px;
  left:8px;
`;
// 뒤로 가기 버튼
const BackButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute; 
  left: 0; 
  top: 16px; 
  transform: translateY(-50%); 
  padding: 0; 
`;
const BackIcon = styled.div`
  width: 18px; 
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
//  타이틀 스타일
const HeaderTitleText = styled.h2`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #000000;
  margin: 0 44px; 
  line-height: 140%;
`;
export default function GlobalSearchHeaderContent({ title = "검색" }) { 
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); 
  };
  return (
    <GlobalHeaderContainer>
      <HeaderContentWrapper>
        <BackButton onClick={handleBackClick}>
          <BackIcon>
            <img src={IconBackURL} alt="뒤로가기" />
          </BackIcon>
        </BackButton>
        <HeaderTitleText>{title}</HeaderTitleText> 
      </HeaderContentWrapper>
    </GlobalHeaderContainer>
  );
}