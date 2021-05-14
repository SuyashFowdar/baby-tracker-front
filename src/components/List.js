import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/List.scss';

const List = ({
  list,
  itemKey,
  displayAttr,
  toAddAttr,
  addItem,
  unit,
}) => (
  <div className="list">
    <div className="items">
      {list.map((item) => (
        <div key={item[itemKey]} className="row link">
          {displayAttr.map((attr) => (
            <div key={attr} className="flex item">
              <div>{`${item[attr]} ${attr === 'amount' ? unit : ''}`}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
    <form onSubmit={addItem} className="row main-center wrap">
      {toAddAttr.map((attr) => (
        <input key={attr} type="text" name={attr} placeholder={attr} />
      ))}
      <input type="submit" value="Add New" className="link" />
    </form>
  </div>
);

List.defaultProps = {
  list: [],
  unit: '',
};

List.propTypes = {
  list: PropTypes.instanceOf(Array),
  unit: PropTypes.string,
  itemKey: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
  displayAttr: PropTypes.instanceOf(Array).isRequired,
  toAddAttr: PropTypes.instanceOf(Array).isRequired,
};

export default List;
