import { useLocation, useNavigate } from 'react-router-dom';
import CategorySelect from './CategorySelect';
import { categoryEnumMap } from '../data/Category';
import { koreaLocationCategoryMap } from '../data/Category';

const CategorySelectWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryMap = location.state?.categoryMap;
  const onSelectType = location.state?.onSelectType;

  if (!categoryMap) {
    return <div>카테고리 데이터가 없습니다.</div>;
  }

  //   const handleSelect = (selected) => {
  //     if (onSelectType === 'location') {
  //       navigate('/add/lecture', { state: { selected, onSelectType: 'location' } });
  //     } else if (onSelectType === 'lecture') {
  //       navigate('/add/lecture', { state: { selected, onSelectType: 'lecture' } });
  //     }
  //   };
  const handleSelect = (selected) => {
    const onSelectType = location.state?.onSelectType;
    const categoryMap = location.state?.categoryMap;
    const draft = location.state?.draft || {};

    let selectedValue = selected;

    if (onSelectType === 'location' && koreaLocationCategoryMap[selected]) {
      selectedValue = koreaLocationCategoryMap[selected];
    }

    navigate('/add/lecture', {
      state: {
        ...draft,
        lecture: onSelectType === 'lecture' ? selected : draft.lecture,
        location: onSelectType === 'location' ? selectedValue : draft.location,
      },
    });
  };

  return (
    <CategorySelect
      categoryMap={categoryMap}
      onSelect={handleSelect}
      title={location.state?.title}
    />
  );
};

export default CategorySelectWrapper;
