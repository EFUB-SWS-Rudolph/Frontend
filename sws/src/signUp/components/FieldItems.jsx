import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { useUserStore } from '../stores/useUserStore';

export default function FieldItems({ fields, type }) {
  const { interests, addInterests, deleteInterests, talents, addTalents, deleteTalents } = useUserStore();

  const handleSelectedField = (item) => {
    if (type === "interest") {
      interests.includes(item) ? deleteInterests(item) : addInterests(item);
    } else {
      talents.includes(item) ? deleteTalents(item) : addTalents(item);
    }
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i=0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(fields, 3);

  return (
    <FieldItemWrapper>
      {rows.map((row, index) => (
        <Row key={index} $align={index % 2 === 0 ? 'flex-start' : 'flex-end'}>
          {row.map((item) => (
            <FieldItemContainer
              key={item}
              onClick={() => handleSelectedField(item)}
              selected={type==="interest" ? interests.includes(item) : talents.includes(item)}
              theme={theme}
            >
                {item}
            </FieldItemContainer>
          ))}
        </Row>
      ))}
    </FieldItemWrapper>
  );
}

const FieldItemWrapper = styled.div`
  width: 364px;
  height: 328px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: ${({$align}) => $align};
`;

const FieldItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0px;
  width: 112px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 20px;
  font-family: ${({ theme }) => theme.fonts.display.body.medium.fontFamily};
  font-size: ${({ theme }) => theme.fonts.display.body.medium.fontSize};
  font-style: ${({ theme }) => theme.fonts.display.body.medium.fontStyle};
  font-weight: ${({ theme }) => theme.fonts.display.body.medium.fontWeight};
  line-height: ${({ theme }) => theme.fonts.display.body.medium.lineHeight};
  color: #000;
  background-color: ${({selected, theme}) =>
    selected ? theme.colors.third : theme.colors.white
  };
  cursor: pointer;
`;