import Tag from './Tag';
import { Container, TagsContainer } from './TagCommonStyleFrame';
import CHIP from '../../assets/icon_chip.svg?react';

export default function Interests() {
  return (
    <Container>
      <p>관심 분야</p>
      <TagsContainer>
        <Tag text="음악" />
        <CHIP />
      </TagsContainer>
    </Container>
  );
}
