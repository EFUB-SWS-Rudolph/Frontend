import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import EDIT_IMG from '../../assets/icon_editImg.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

export default function Profile() {
  const { nickname, profileImg, isEditing, setProfileImg } = useProfileStore();
  const [user, setUser] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const [showChocieModal, setShowChoiceModal] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

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
  
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      // 업로드 취소 시
      setImage(profileImg);
      return;
    }
  };

  return (
    <Container>
      <Image
        src={image || profileImg}
        alt="profileimg"
        onClick={handleProfileImgClick}
      />
      {isEditing && (
        <EditContainer><EDIT_IMG /></EditContainer>
      )}

      <input 
        type="file"
        accept="image/jpeg, image/jpg"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={onChange}
      />
      <input 
        type="file"
        accpet="image/jpeg, image/jpg"
        style={{ display: 'none' }}
        ref={cameraInputRef} 
        capture="environment"
        onChange={onChange}
      />

      {showChoiceModal && (
        <ChoiceContainer
          onClose={() => setShowChoiceModal(false)}
          onSelectAlbum={albumSelect}
          onSelectCamera={cameraSelect}
        />
      )}
      <Name>{nickname}</Name>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 6.5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  position: relative;
`;
const Image = styled.img`
  width: 6.5rem;
  height: 6.5rem;
  flex-shrink: 0;
  border-radius: 6.5rem;
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  box-shadow: 1px 1px 7px 0px rgba(0, 0, 0, 0.25);
`;

const EditContainer = styled.div`
  width: 1.85125rem;
  height: 1.85125rem;
  flex-shrink: 0;
  position: absolute;
  bottom: 2.75rem;
  right: 0.3rem;
  outline: none;
  border: none;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba( 0, 0, 0, 0.18);
`;

const Name = styled.p`
  color: var(--Black, #222);
  text-align: center;

  /* Title/Large */
  font-family: 'Pretendard Variable';
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 1.75rem */
`;
