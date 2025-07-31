import { useState, useEffect } from 'react';
import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';
import CHIP from '../../assets/icon_chip.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';
import { getMemberProfile } from '../../../api/myPage';

// 사용자의 tag를 zustand에 저장 -> 해당 변수를 불러와서 tag로 보여줌

export default function Interests() {
  // 서버에서 tag 받아서 리스트 형태로 interestTags에 저장 
  // interestTags의 요소들을 Tag의 key, text로 보냄
  // tag가 3개 이상 -> CHIP 안 보이게 
  // isEditing === true 일 경우에만 CHIP 클릭하면 추가할 수 있게

  const interestTags = useProfileStore((state) => state.interestTags);
  const setInterestTags = useProfileStore((state) => state.setInterestTags); 
  const addInterestTag = useProfileStore((state) => state.addInterestTag);
  const removeInterestTag = useProfileStore((state) => state.removeInterestTag);
  const isEditing = useProfileStore((state) => state.isEditing);
  const [inputValue, setInputValue] = useState('');
  const [isMax, setIsMax] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const readUserInfo = async() => {
    try{
      const res = await getMemberProfile();
      setInterestTags(res.interest);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    readUserInfo();
  }, [])

  const handleRemoveInterestTag = (id) => {
    removeInterestTag(id);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newTag = inputValue.trim();
      if (newTag) {
        addInterestTag(newTag);
        setInputValue('');
        setIsAdding(false);
      }
    }
  };

  useEffect(() => {
    setIsMax(interestTags.length >= 3);
  }, [interestTags]);

  const handleChipClick = () => {
    setIsAdding(true);
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
