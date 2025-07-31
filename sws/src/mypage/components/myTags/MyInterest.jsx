import { useState, useEffect } from 'react';
import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';
import CHIP from '../../assets/icon_chip.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

// 사용자의 tag를 zustand에 저장 -> 해당 변수를 불러와서 tag로 보여줌

export default function Interests() {
  const { interestTags, isEditing, setInterestTags, addInterestTag, removeInterestTag, resetInterestTags } = useProfileStore();
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const isMax = interestTags.length >= 3;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newTag = inputValue.trim();
      if (newTag) {
        addInterestTag(newTag);;
        setInputValue('');
        setIsAdding(false);
      }
    }
  };

  const readUserInfo = async() => {
    try {
      const res = await getMemberProfile();
      resetInterestTags();
      
      if (Array.isArray(res.data.interest)) {
        const tags = res.data.interest.slice(0, 3).map((tag) => ({ id: Date.now() + Math.random(), tag }));
        setInterestTags(tags);
      } else {
        resetInterestTags();
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

  const handleChipClick = () => {
    if (interestTags.length >= 3) return;
    setIsAdding(true);
    setInputValue('');
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
