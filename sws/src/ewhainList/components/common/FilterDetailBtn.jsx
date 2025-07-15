import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { LiaAngleRightSolid } from "react-icons/lia";
import { useFilterStore } from '../../stores/FilterStore';

// select: 교환 방식, 학과, 최신순, 각 대학
// value: 선택된 값, 처음에는 전체


export default function FilterDetailBtn({ select, value, detailroute, onChange }) {
  const navigate = useNavigate();

  const handleMoveFilterDetail = () => {
    navigate(detailroute);
  };

  const handleClick = () => {
    if (typeof onChange === 'function'){
      onChange(select);
    }
  };

  return (
    <DetailBtnWrapper onClick={handleClick}>
      <DetailType>{select}</DetailType>
      <SelectDetailContainer>
        <SelectedValue $value={value} theme={theme}>{value}</SelectedValue>
        <LiaAngleRightSolid size={20} color="#808080" onClick={handleMoveFilterDetail} cursor="pointer" />
      </SelectDetailContainer>
    </DetailBtnWrapper>
  );
}

const DetailBtnWrapper = styled.div`
  width: 390px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const DetailType = styled.div`
  color: ${({ theme }) => theme.colors.black};
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
  gap: 7px;
`;

const SelectedValue = styled.div`
  color: ${({ $value, theme }) =>
    ($value==="전체") || ($value==="최신순") ? "#808080" : theme.colors.black
  };
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;