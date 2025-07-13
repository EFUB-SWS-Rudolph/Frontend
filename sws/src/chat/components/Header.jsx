import styled from 'styled-components';
import HeaderButton from './HeaderButton';
import { HEADER_BUTTON_LIST } from '../constant/headerButtonList';

export default function Header() {
  return (
    <Wrapper>
      <HeaderButton text={HEADER_BUTTON_LIST[0]} />
      <HeaderButton text={HEADER_BUTTON_LIST[1]} />
      <HeaderButton text={HEADER_BUTTON_LIST[2]} />
      <HeaderButton text={HEADER_BUTTON_LIST[3]} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 18.8rem;
  height: 2.13rem;
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
`;
