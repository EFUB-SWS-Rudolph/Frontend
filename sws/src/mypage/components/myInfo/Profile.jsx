import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import EDIT_IMG from '../../assets/icon_editImg.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';
import ChoiceContainer from '../editProfile/ChoiceContainer';

export default function Profile({ onClick, onChange, fileRef, cameraRef }) {
  // zustand 변수 불러오기(닉네임, 프로필 사진)
  const nickname = useProfileStore((state) => state.nickname);
  const profileImg = useProfileStore((state) => state.profileImg);
  const isEditing = useProfileStore((state) => state.isEditing);
  const setProfileImg = useProfileStore((state) => state.setProfileImg);
  const setNickname = useProfileStore((state) => state.setNickname);
  const previousImg = useProfileStore((state) => state.previousImg);
  const setPreviousImg = useProfileStore((state) => state.setPreviousImg);
  const imageURL = useProfileStore((state) => state.imageURL);

  const [user, setUser] = useState('');  // 서버로부터 사용자 정보를 담을 변수

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
    if (user.profileImage) setPreviousImg(user.profileImage);  // 기존 유저가 설정했던 프로필 사진
    if (user.nickname) setNickname(user.nickname);
  }, [user, setPreviousImg, setNickname]);

  console.log("user정보:", user);
  return (
    <Container>
      <Image
        src={imageURL || previousImg}  // imageURL: 수정 버전, profileImg: 기존 사진
        alt="profileimg"
        onClick={onClick}
      />
      {isEditing && (
        <EditContainer onClick={onClick}><EDIT_IMG /></EditContainer>
      )}

      <input 
        type="file"
        accept="image/jpeg, image/jpg"
        style={{ display: 'none' }}
        ref={fileRef}
        onChange={onChange}
      />
      <input 
        type="file"
        accept="image/jpeg, image/jpg"
        style={{ display: 'none' }}
        ref={cameraRef} 
        capture="environment"
        onChange={onChange}
      />
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
  bottom: 3rem;
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
