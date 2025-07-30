import { useState, useEffect } from 'react';
import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';
import CHIP from '../../assets/icon_chip.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

// 사용자의 tag를 zustand에 저장 -> 해당 변수를 불러와서 tag로 보여줌

export default function Interests() {
  const { interestTags, isEditing, addInterestTag, removeInterestTag, resetInterestTags } = useProfileStore();
  const [user, setUser] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const isMax = interestTags.length >= 3;

  const readUserInfo = async() => {
    try {
      const res = await getMemberProfile();
      setUser(res.data);

      resetInterestTags();
      
      if (Array.isArray(res.data.interest)) {
        user.interest.slice(0, 3).forEach(tag => {
          addInterestTag(tag);
        });
      }

    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    readUserInfo();
  }, [])

  const handleRemoveInterestTag = (key) => {
    removeInterestTag(key);
  };

  const handleAddTag = () => {
    const newTag = prompt('추가할 관심 분야 태그를 입력하세요');
    if (newTag && newTag.trim() !== '') {
      addInterestTag(newTag.trim());
    }
  };

  return (
    <Container>
      <p>관심 분야</p>
      <TagsContainer>
        {interestTags.map((item) => <Tag key={item.id} text={item.tag} onClick={() => handleRemoveInterestTag(item.id)} />)}
        {!isMax && !isEditing && <CHIP />}
        {!isMax && isEditing && (
          isAdding ?
          <input 
            type="text"
            value={inputValue}
            onKeyDown={handleInputKeyDown}
            onBlur={() => setIsAdding(false)}
            style={{display:"flex", justifyContent:"center", alignItems:"center", 
                    width:"6.3125rem", height:"2.25rem", borderRadius:"1.25rem", border:"1px solid transparnet",
                    background: "linear-gradient(theme.colors.white, theme.colors.white) padding-box, linear-gradient(to right, theme.colors.primary, theme.colors.third) border-box"
                  }}
          />
        : 
          <CHIP onClick={handleAddTag} />
        )}
      </TagsContainer>
    </Container>
  );
}
