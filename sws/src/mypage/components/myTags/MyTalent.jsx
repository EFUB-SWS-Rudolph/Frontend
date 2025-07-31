import { useState, useEffect } from 'react';
import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';
import CHIP from '../../assets/icon_chip.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberTag } from '../../../api/myPage';

export default function MyTalent() {
  const talentTags = useProfileStore((state) => state.talentTags);
  const setTalentTags = useProfileStore((state) => state.setTalentTags);
  const addTalentTag = useProfileStore((state) => state.addTalentTag);
  const removeTalentTag = useProfileStore((state) => state.removeTalentTag);
  const isEditing = useProfileStore((state) => state.isEditing);
  const [inputValue, setInputValue] = useState('');
  const [isMax, setIsMax] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

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
  }, talentTags);

  const handleRemoveTalentTag = (id) => {
    removeTalentTag(id);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleChipClick = () => {
    setIsAdding(true);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newTag = inputValue.trim();
      if (newTag) {
        addTalentTag(newTag);
        setInputValue('');
        setIsAdding(false);
      }
    }
  };


  return (
    <Container>
      <p>나의 재능</p>
      <TagsContainer>
        {talentTags.map((item) => <Tag key={item.id} text={item.tag} onClick={() => handleRemoveTalentTag(item.id)} />)}
        {!isMax && !isEditing && <CHIP />}
        {!isMax && isEditing && (
          isAdding ?
          <input 
            type="text"
            value={inputValue}
            onKeyDown={handleInputKeyDown}
            onBlur={() => setIsAdding(false)}
            style={{display:"flex", justifyContent:"center", alignItems:"center", textAlign: "center",
                    width:"6.3125rem", height:"2.25rem", borderRadius:"1.25rem", border:"1px solid transparent",
                    background: "linear-gradient(#fff, #fff) padding-box, linear-gradient(to right, #00664f, #baedd4) border-box"
                  }}
            onChange={handleInputChange}
          />
        :
          <CHIP onClick={handleChipClick} />
        )}
      </TagsContainer>
    </Container>
  );
}
