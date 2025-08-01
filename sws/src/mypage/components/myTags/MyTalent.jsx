import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';
import CHIP from '../../assets/icon_chip.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberTag } from '../../../api/myPage';

export default function MyTalent() {
  const talentTags = useProfileStore((state) => state.talentTags);
  const setTalentTags = useProfileStore((state) => state.setTalentTags);
  const removeTalentTag = useProfileStore((state) => state.removeTalentTag);
  const isEditing = useProfileStore((state) => state.isEditing);
  const [isMax, setIsMax] = useState(false);
  const navigate = useNavigate('');

  const readUserInfo = async () => {
    try {
      const res = await getMemberTag();
      setTalentTags(res.talent);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    readUserInfo();
  }, [])

  useEffect(() => {
    setIsMax(talentTags.length >= 3);
  }, [talentTags]);

  const handleRemoveTalentTag = (id) => {
    removeTalentTag(id);
  };

  const handleChipClick = () => {
    navigate('/mypage/talenttag');
  };

  return (
    <Container>
      <p>나의 재능</p>
      <TagsContainer>
        { Array.isArray(talentTags) && talentTags.length > 0 &&
          talentTags.map((item) => <Tag key={item.id} text={item.tag} onClick={() => handleRemoveTalentTag(item.id)} />)
        }
        {!isMax && !isEditing && <CHIP />}
        {!isMax && isEditing && <CHIP onClick={handleChipClick} />}
      </TagsContainer>
    </Container>
  );
}
