import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import SLIGHT_RIGHT_ARROW from '../../../common/assets/icons/icon_next_square.svg?react';

// select: 교환 방식, 학과, 최신순, 각 대학
// value: 선택된 값, 처음에는 전체

export default function FilterDetailBtn({ type, select, value, detailroute, fromheader, onChange }) {
  const navigate = useNavigate();

  const handleMoveFilterDetail = () => {
    if (fromheader) {
      navigate(detailroute, { state: { fromHeader: true } });
    } else {
      navigate(detailroute);
    }
  };

  const handleClick = () => {
    if (typeof onChange === 'function'){
      onChange(select);
    }
  };

  return (
    <DetailBtnWrapper $type={type} onClick={handleClick}>
      <DetailType>{select}</DetailType>
      <SelectDetailContainer>
        <SelectedValue $value={value} theme={theme}>{value}</SelectedValue>
        <SLIGHT_RIGHT_ARROW width="2.75rem" height="2.75rem" onClick={handleMoveFilterDetail} cursor="pointer" />
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

const SelectedValue = styled.div`
  color: ${({ $value, theme }) =>
    ($value==="전체") || ($value==="최신순") ? "#808080" : "#000"
  };
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;