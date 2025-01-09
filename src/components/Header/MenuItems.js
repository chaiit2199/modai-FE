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
    <>
      {items.submenu ? (
        <>
          <Link
            href={items.url}
            className="nav__menu__link font-ng-light"
            onClick={handleOnClick}
            locale={locale}
          >
            {<DropdownComponent title={items.text} />}
          </Link>

          <div className={`nav__submenu${showSubmenu ? ' show' : ''}`}>
            {items.submenu.map((submenu, index) => (
              <Link
                href={submenu.url}
                key={index}
                className="nav__submenu-item"
                locale={locale}
              >
                <div className="nav__submenu-item__icon">{submenu.icon}</div>
                <div className="nav__submenu-item__content">
                  <div className="nav__submenu-item__content__title font-ng-medium">{submenu.text}</div>
                  <div className="nav__submenu-item__content__desc font-ng-regular">{submenu.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Link
          href={items.url} className="nav__menu__link font-ng-light"
          locale={locale}
        >
          {items.text}
        </Link>
      )}
    </>
  );
};

export default MenuItems;
