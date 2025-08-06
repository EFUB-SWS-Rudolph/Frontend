import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ARROW from '../../common/assets/icons/icon_back.svg?react';
import Header from './Header';

const CategorySelect = ({ categoryMap, onSelect, title = '카테고리 선택' }) => {
  const [selectedMain, setSelectedMain] = useState(null);
  const navigate = useNavigate();

  const handleSubSelect = (sub) => {
    onSelect(sub);
  };

  return (
    <Layout>
      <Header onClick={() => navigate(-1)} header="강의 희망 지역"></Header>

      {!selectedMain ? (
        categoryMap &&
        Object.keys(categoryMap).map((main) => (
          <CategoryItem key={`categorySelect-${main}`} onClick={() => setSelectedMain(main)}>
            {main}
          </CategoryItem>
        ))
      ) : Array.isArray(categoryMap?.[selectedMain]) ? (
        categoryMap[selectedMain].map((sub, idx) => (
          <CategoryItem
            key={`sub-${selectedMain}-${sub}-${idx}`}
            onClick={() => handleSubSelect(sub)}
          >
            {sub}
          </CategoryItem>
        ))
      ) : (
        <CategoryItem key={`single-${selectedMain}`} onClick={() => handleSubSelect(selectedMain)}>
          {selectedMain}
        </CategoryItem>
      )}
    </Layout>
  );
};

export default CategorySelect;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  width: 100%;
  margin: 0 auto;
`;

const CategoryItem = styled.div`
  font-size: 16px;
  padding: 12px 12px;
  cursor: pointer;
`;

const BackBtn = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;
