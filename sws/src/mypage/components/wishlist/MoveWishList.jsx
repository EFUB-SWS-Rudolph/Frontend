import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../../styles/theme';
import SLIGHT_RIGHT_ARROW from '../../../../ewhainList/icons/icon_next.svg?react';

// select: 언어, 음악/악기, ...
// value: 선택된 값, 처음에는 전체

export default function MoveTagDetail() {
  const category = useProfileStore((state) => state.category);
  const setCategory = useProfileStore((state) => state.setCategory);
  const navigate = useNavigate();

  const handleMoveWishList = () => {
    navigate('/mypage/wishlist');
  };
  
  return (
    <DetailBtnWrapper>
      <DetailType>찜한 강의</DetailType>
      <SelectDetailContainer>
        <SLIGHT_RIGHT_ARROW width="2.75rem" height="2.75rem" onClick={handleMoveWishList} />
      </SelectDetailContainer>
    </DetailBtnWrapper>
  );
}

const DetailBtnWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1.125rem 0.5rem 2.5rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  width: 24.375rem;
  height: 3.75rem;
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