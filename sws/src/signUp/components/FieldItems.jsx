import { useState } from 'react';
import styled from 'styled-components';

export default function FieldItems({ fields }) {
  const [selectedFields, setSelectedFields] = useState([]);

  const handleSelectedField = (item) => {
    if (selectedFields.includes(item)) {
      setSelectedFields(selectedFields.filter(field => field !== item));
    } else {
      setSelectedFields([...selectedFields, item]);
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
        <Row key={index} align={index % 2 === 0 ? 'flex-start' : 'flex-end'}>
          {row.map((item) => (
            <FieldItemContainer
              key={item}
              onClick={() => handleSelectedField(item)}
              selected={selectedFields.includes(item)}
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
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: ${(props) => props.align};
`;

const FieldItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  font-size: 15px;
  color: #000;
  background-color: ${(props) =>
    props.selected ? '#baedd4' : '#fff'
  };
  cursor: pointer;
`;