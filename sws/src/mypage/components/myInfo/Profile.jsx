import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import EDIT_IMG from '../../assets/icon_editImg.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

export default function Profile() {
  // zustand 변수 불러오기(닉네임, 프로필 사진)
  const nickname = useProfileStore((state) => state.nickname);
  const profileImg = useProfileStore((state) => state.profileImg);
  const isEditing = useProfileStore((state) => state.isEditing);
  const setProfileImg = useProfileStore((state) => state.setProfileImg);
  const setNickname = useProfileStore((state) => state.setNickname);

  const [user, setUser] = useState('');  // 서버로부터 사용자 정보를 담을 변수
  const [previousImg, setPreviousImg] = useState('');  // 서버에서 받은 이미지
  const [imageURL, setImageURL] = useState('');
  const [showChoiceModal, setShowChoiceModal] = useState(false);  // 모달 보이기 여부

  const fileInputRef = useRef(null);  // 갤러리 이미지 선택
  const cameraInputRef = useRef(null);  // 카메라 이미지 선택

  // 편집모드에서 프로필 이미지 클릭시 발동
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
  /*
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      // 업로드 취소 시
      setImage(profileImg);
      return;
    }
  };
  */

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

  // api 호출
  const readUserInfo = async() => {
    try {
      const res = await getMemberProfile();
      setUser(res);
    } catch (err) {
      throw err;
    }
  }
  useEffect(()=>{
    readUserInfo();
  },[]);

  // user 정보가 바뀔 때마다 이미지, 닉네임 다시 설정
  useEffect(() => {
    if (user?.profileImg) setPreviousImg(user.profileImg);  // 기존 유저가 설정했던 프로필 사진
    if (user?.nickname) setNickname(user.nickname);
  }, [user, setPreviousImg, setNickname]);

  return (
    <Container>
      <Image
        src={imageURL || previousImg}  // imageURL: 수정 버전, profileImg: 기존 사진
        alt="profileimg"
        onClick={handleProfileImgClick}
      />
      {isEditing && (
        <EditContainer onClick={handleProfileImgClick}><EDIT_IMG /></EditContainer>
      )}

      <input 
        type="file"
        accept="image/jpeg, image/jpg"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <input 
        type="file"
        accept="image/jpeg, image/jpg"
        style={{ display: 'none' }}
        ref={cameraInputRef} 
        capture="environment"
        onChange={handleImageChange}
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
  bottom: 1.7rem;
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
