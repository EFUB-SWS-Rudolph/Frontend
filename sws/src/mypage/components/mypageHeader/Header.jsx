import { useState, useEffort } from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { useProfileStore } from '../../stores/ProfileStore';
import UserProfileCard from '../../../ewhainList/components/memberDetail/UserProfileCard';
import { patchMemberProfile, patchProfileImg, putTalentTag, putInterestTag } from '../../../api/myPage';
import BACK_ARROW from '../../../ewhainList/icons/icon_back.svg?react';

export default function Header({ type, onClick }) {
  const nickname = useProfileStore((state) => state.nickname);
  const college = useProfileStore((state) => state.college);
  const department = useProfileStore((state) => state.department);
  const studentid = useProfileStore((state) => state.studentid);
  const location = useProfileStore((state) => state.location);
  const talentTags = useProfileStore((state) => state.talentTags);
  const interestTags = useProfileStore((state) => state.interestTags);
  const isExchange = useProfileStore((state) => state.isExchange);
  const isDonation = useProfileStore((state) => state.isDonation);
  const isCoffeeChat = useProfileStore((state) => state.isCoffeeChat);
  const isEditing = useProfileStore((state) => state.isEditing);
  const setIsEditing = useProfileStore((state) => state.setIsEditing);
  const profileImg = useProfileStore((state) => state.profileImg);

  const talentArray = talentTags.map(item => item.tag);
  const interestArray = interestTags.map(item => item.tag);

  const [profile, setProfile] = useState(null);

  const patchProfileInfo = async () => {
    try {
      await patchMemberProfile({
        nickname,
        college,
        department,
        studentid,
        location,
        isExchange,
        isCoffeeChat,
        isSkillDonation: isDonation,
      });

      await patchProfileImg({ profileImg });
      
      await putTalentTag({
        tagNames: talentArray
      });

      await putInterestTag({
        tagNames: interestArray
      });

    } catch (err) {
      throw err;
    }
  };

  const handleEditMode = async () => {
    if (isEditing) {
      await patchProfileInfo();
    }
  setIsEditing(!isEditing);
  };

  if (type === "mypage") {
    return (
      <HeaderWrapper>
        <HeaderContainer>마이 페이지</HeaderContainer>
        <EditButton onClick={handleEditMode}>
          <EditText $isediting={isEditing}>{isEditing ? "완료" : "편집" }</EditText>
        </EditButton>
      </HeaderWrapper>
    );
  } else {
    return (
      <HeaderWrapper>
        <BACK_ARROW             
          style={{
            position: "absolute",
            top: "50%",
            left: "1rem",
            transform: "translateY(-50%)",
            color: theme.colors.black, 
          }}
          onClick={onClick}
        />
        <HeaderContainer>{type}</HeaderContainer>
      </HeaderWrapper>
    )
  }
}

const HeaderWrapper = styled.div`
  width: 24.375rem;
  height: 3.75rem;
  padding-top: 1.12rem;
  padding-bottom: 1.06rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeaderContainer = styled.div`
  color: var(--Black, #222);
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.medium.lineHeight};
`;

const EditButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1.69rem;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditText = styled.div`
  color: ${({ $isediting }) =>
    $isediting ? "var(--Primary, #00664F)" : "var(--Gray-500, #999)"
  };
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.display.small.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.small.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.small.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.small.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.small.lineHeight};
`;