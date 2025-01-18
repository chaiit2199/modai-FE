import { useEffect, useState } from 'react';
import Link from 'next/link';
import PlusIcon from 'public/images/icons/chevron-up.svg';
import DropdownComponent from '@/components/shared/Dropdown';
import MinusIcon from 'public/images/icons/chevron-down.svg';

const DEFAULT_LANG = 'vi';

const MenuItems = ({ items, locale }) => {
  const [showSubmenu, setshowSubmenu] = useState(false);

  const handleOnClick = (e) => {
    e.preventDefault();
    setshowSubmenu(!showSubmenu);
  };

  return (
    <Link
      href={items.url} className="nav__menu__link"
      locale={locale}
    >
      {items.text}
    </Link>
  );
};

export default MenuItems;
