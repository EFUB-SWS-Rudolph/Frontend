import { useState, useEffect } from 'react';
import styled from 'styled-components';
import EDIT_IMG from '../../assets/icon_editImg.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

export default function Profile() {
  const { nickname, profileImg, isEditing, isOnChoice, setNickname, setProfileImg, setIsOnChoice } = useProfileStore();
  const [user, setUser] = useState('');
  
  // api 호출
  const readUserInfo = async() => {
    try {
      const res = await getMemberProfile();
      setUser(res.data);
    } catch (err) {
      throw err;
    }
  }
  useEffect(()=>{
    readUserInfo();
  },[])

  setProfileImg(user.profileImg);
  setNickname(user.nickname);

  // 변경된 이미지 url
  const handleChangeProfileImg = (e) => {
    setProfileImg(e.target.file[0]);
  };

  const handleOnChoice = () => {
    setIsOnChoice(!isOnChoice);
  };

  return (
    <Container>
      {isEditing ?
        <Image src={profileImg} alt="profileimg" />
      :
        <>
          <ImageInput type="file" accept="image/jpg" />
          <EditContainer onClick={handleOnChoice}><EDIT_IMG /></EditContainer>
        </>
      }
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
