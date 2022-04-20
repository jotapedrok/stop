import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import ICategory from '../../interfaces/ICategory.interface';

interface CategoryProps {
  category: ICategory;
}

export default function Category(props: CategoryProps) {
  const [state, setState] = useState({
    answerList: [],
  });
  const { category } = props;
  return (
    <div className="category">
      <div className="category-title">{category.category}</div>
      <div className="category-answer-list">l1</div>
      <div className="category-input-container container">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Answer"
            aria-label="Answer"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
    </div>
  );
}
