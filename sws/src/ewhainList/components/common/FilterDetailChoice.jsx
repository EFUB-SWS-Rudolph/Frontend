import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import { useFilterStore } from '../../stores/FilterStore';
import { MdOutlineArrowBackIosNew } from "react-icons/md";

// icon: 교환 방식에서 앞에 svg 컴포넌트
// item: 재능 기부, 재능 교환, 학과, 최신순, 오래된 순
// onClick: 교환방식, 학과, 최신순 handle함수(값 변경)

export default function FilterDetailChoice({ icon: Icon, item, type, onChange }) {
  const handleClick = () => {
    onChange(item);
  };

  const isSelected = type === item;

  return (
    <DetailChoiceWrapper onClick={handleClick}>
      <FilterOption $selected={isSelected}>
        {Icon && <Icon style={{color: isSelected ? theme.colors.secondary : theme.colors.black}} />}
        <Option>{item}</Option>
      </FilterOption>
    </DetailChoiceWrapper>
  );
}

const DetailChoiceWrapper = styled.div`
  width: 390px;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 30px;
  cursor: pointer;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${({ $selected, theme }) => 
    $selected ? theme.colors.secondary : theme.colors.black
  };
`;

const Option = styled.div`
  font-family: ${({ theme }) => theme.fonts.display.body.large.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.large.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.large.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.large.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.large.lineHeight};
`;

const StyledIcon = styled.div`
  width: 24px;
  height: 24px;

  & > svg {
    width: 100%;
    height: 100%;
    fill: ${({ $selected, theme }) =>
      $selected ? theme.colors.secondary : theme.colors.black
    };
  }
`;