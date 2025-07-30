import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';

export default function MyTalent() {

  const handleRemoveTalentTag = (index) => {
    removeTalentTag(index);
  }

  return (
    <Container>
      <p>나의 재능</p>
      <TagsContainer>
        <Tag text="음악" onClick={handleRemoveTalentTag} />
        <Tag text="독일어" onClick={handleRemoveTalentTag} />
        <Tag text="영어" onClick={handleRemoveTalentTag} />
      </TagsContainer>
    </Container>
  );
}
