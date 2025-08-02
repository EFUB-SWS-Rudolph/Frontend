import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';
import CHIP from '../../assets/icon_chip.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberTag } from '../../../api/myPage';

// 사용자의 tag를 zustand에 저장 -> 해당 변수를 불러와서 tag로 보여줌

export default function Interests() {
  // 서버에서 tag 받아서 리스트 형태로 interestTags에 저장 
  // interestTags의 요소들을 Tag의 key, text로 보냄
  // tag가 3개 이상 -> CHIP 안 보이게 
  // isEditing === true 일 경우에만 CHIP 클릭하면 추가할 수 있게

  const interestTags = useProfileStore((state) => state.interestTags);
  const setInterestTags = useProfileStore((state) => state.setInterestTags);
  const removeInterestTag = useProfileStore((state) => state.removeInterestTag);
  const isEditing = useProfileStore((state) => state.isEditing);
  const [isMax, setIsMax] = useState(true);
  const navigate = useNavigate();

  const readUserInfo = async() => {
    try{
      const res = await getMemberTag();
      setInterestTags(res.interest.tagNames);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    !isEditing && readUserInfo();
  }, [])

  const handleRemoveInterestTag = (id) => {
    removeInterestTag(id);
  };

  useEffect(() => {
    setIsMax(interestTags.length >= 3);
  }, [interestTags]);

  const handleChipClick = () => {
    navigate('/mypage/interesttag');
  };
  
  return (
    <Container>
      <p>관심 분야</p>
      <TagsContainer>
        { Array.isArray(interestTags) && interestTags.length > 0 &&
          interestTags.map((item) => <Tag key={item.id} text={item.tag} onClick={() => handleRemoveTalentTag(item.id)} />)
        }
        {!isMax && !isEditing && <CHIP />}
        {!isMax && isEditing && <CHIP onClick={handleChipClick} />}
      </TagsContainer>
    </Container>
  );
}
