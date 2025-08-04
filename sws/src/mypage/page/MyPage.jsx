import React from 'react';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import MyInfo from '../components/myInfo/MyInfo';
import MyTags from '../components/myTags/MyTags';
import MyPageFooter from '../components/mypagefooter/MyPageFooter';
import Header from '../components/mypageHeader/Header';
import MembershipContainer from '../components/membership/MembershipContainer';
import ChoiceContainer from '../components/editProfile/ChoiceContainer';
import { useProfileStore } from '../stores/ProfileStore';
import MoveWishList from '../components/wishlist/MoveWishList';

export default function MyPage() {
  const { setProfileImg, isOnChoice, isEditing, setIsOnChoice } = useProfileStore();
  const [showChoiceModal, setShowChoiceModal] = useState(false);  // 모달 보이기 여부
  const fileInputRef = useRef(null);  // 갤러리 이미지 선택
  const cameraInputRef = useRef(null);  // 카메라 이미지 선택
  const setImageURL = useProfileStore((state) => state.setImageURL);

  const handleOnChoice = () => {
    setIsOnChoice(!isOnChoice);
  };

  const handleProfileImgClick = () => {
    if (isEditing) setShowChoiceModal(true);
  };

  const albumSelect = () => {
    setShowChoiceModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const cameraSelect = () => {
    setShowChoiceModal(false);
    if (cameraInputRef.current) {
      cameraInputRef.current.value = null;
      cameraInputRef.current.click();
    }
  };

  // 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];  // 사용자가 선택한 파일 중 첫 번째 파일

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {  // 파일 읽기 작업이 수행된 후 이 핸들러가 호출됨
        setProfileImg(selectedFile);
        setImageURL(e.target.result);
      };

      reader.readAsDataURL(selectedFile);  // 파일 읽기 작업
    }
  }

  return (
    <Wrapper>
      <HeaderSpace>
        <Header type="mypage" />
      </HeaderSpace>
      <Content>
        <MyInfo 
          onClick={handleProfileImgClick} 
          onChange={handleImageChange}
          fileRef={fileInputRef}
          cameraRef={cameraInputRef}
        />
        <MyTags />
        <MyPageFooter />
        {!isEditing && 
          <>
            <MoveWishList />
            <MembershipContainer />
          </>
        }

        {isOnChoice && (
          <ChoiceContainer onClose={handleOnChoice} />
        )}
      </Content>
      {showChoiceModal && (
        <ChoiceContainer
          onClose={() => setShowChoiceModal(false)}
          onSelectAlbum={albumSelect}
          onSelectCamera={cameraSelect}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const HeaderSpace = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;