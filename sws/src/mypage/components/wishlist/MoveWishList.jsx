import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SLIGHT_RIGHT_ARROW from '../../../ewhainList/icons/icon_next.svg?react';

// select: 언어, 음악/악기, ...
// value: 선택된 값, 처음에는 전체

export default function MoveTagDetail() {
  const navigate = useNavigate();

  const handleMoveWishList = () => {
    navigate('/mypage/wishlist');
  };
  
  return (
    <Wrapper>
      <DetailBtnWrapper>
        <DetailType>찜한 강의</DetailType>
        <SelectDetailContainer>
          <SLIGHT_RIGHT_ARROW width="2.75rem" height="2.75rem" onClick={handleMoveWishList} />
        </SelectDetailContainer>
      </DetailBtnWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 24.375rem;
  height: 4.625rem;
  padding: 0.75rem 0;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid var(--Gray-300, #D9D9D9);
  background: #FFF;
`;

const DetailBtnWrapper = styled.div`
  display: flex;
  width: 24.375rem;
  height: 3.125rem;
  padding: 0.1875rem 1rem 0.1875rem 2.125rem;
  justify-content: flex-end;
  align-items: center;
  gap: 14.75rem;
  flex-shrink: 0;
`;

const DetailType = styled.div`
  color: #000;
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;

const SelectDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;