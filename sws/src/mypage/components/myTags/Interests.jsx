import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';
import CHIP from '../../assets/icon_chip.svg?react';
import { useProfileStore } from '../../stores/ProfileStore';

// 사용자의 tag를 zustand에 저장 -> 해당 변수를 불러와서 tag로 보여줌

export default function Interests() {
  const { interestTags, setInterestTags, removeTalentTag } = useProfileStore();
  const isMax = interestTags.length === 3;

  return (
    <Container>
      <p>관심 분야</p>
      <TagsContainer>
        {interestTags.map((item) => <Tag text={item} />)}
        {!isMax && <CHIP />}
      </TagsContainer>
    </Container>
  );
}
