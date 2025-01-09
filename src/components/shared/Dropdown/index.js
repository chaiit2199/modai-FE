import { useState } from 'react';
import PlusIcon from 'public/images/icons/chevron-up.svg';
import MinusIcon from 'public/images/icons/chevron-down.svg';

function DropdownComponent({
  className = '',
  title,
  children
}) {
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className={`dropdown-container${toggle ? ' open' : ''} ${className}`}>
      <div className="dropdown-container__group">
        <p className="dropdown-container__title" onClick={onToggle}>{title}</p>
        <div className={`dropdown-container__dropdown ${!toggle ? '--hide' : ''}`}>{children}</div>
      </div>
      <div className="dropdown-container__icons">
        <div className="dropdown-container__icon --minus"><MinusIcon /></div>
        <div className="dropdown-container__icon --plus"><PlusIcon /></div>
      </div>
    </div>

  );
}

export default DropdownComponent;
