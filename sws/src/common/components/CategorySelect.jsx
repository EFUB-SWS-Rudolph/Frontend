import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ARROW from '../../common/assets/icons/icon_back.svg?react';

const CategorySelect = ({ categoryMap, onSelect, title = '카테고리 선택' }) => {
  const [selectedMain, setSelectedMain] = useState(null);
  const navigate = useNavigate();

  const handleSubSelect = (sub) => {
    onSelect(sub);
  };

  return (
    <Layout>
      <Header>
        <BackBtn onClick={() => navigate(-1)}>
          <ARROW width={24} height={24} /> <Title>{title}</Title>
        </BackBtn>
      </Header>

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
  padding: 24px 16px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 18px;
`;

const CategoryItem = styled.div`
  font-size: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

const BackBtn = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;
