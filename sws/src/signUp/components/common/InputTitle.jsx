import styled from 'styled-components';
import theme from '../../../styles/theme';

export default function InputTitle({ title }) {
  const essentialTitle = ['대학', '학과', '닉네임'];
  const inTitle = essentialTitle.includes(title);
  return (
    <Title>
      {title}{inTitle && <span>*</span>}
    </Title>
  );
}

const Title = styled.h2`
  color: var(--Black, #222);
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};

  span {
    color: var(--Warning, var(--Color, #FF4D4D));
  }
`;