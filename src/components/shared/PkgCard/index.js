/* @params
  - pkgName: package name, eg: Price/Message, Package A, ...
  - pkgPrice: package price
  - unit: the unit of package price, eg: Baht, USD, ...
  - description: package's description
  - pkgURL: the URL to buy package
  - validityPeriod: Package's validity period
  - numberOfMessages: number of messages
  - goldPkg: Gold Package
  - topLineColor: Line on the top of card, valid values: pkg-first || pkg-second || pkg-third
*/

import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { CurrencyFormatted, NumberOfMessagesFormatted } from '@/utils';
import ButtonComponent from '../Button';

function PkgCardComponent({
  pkgName,
  pkgPrice,
  unit,
  price,
  description,
  pkgURL,
  numberOfMessages,
  validityPeriod,
  goldPkg = false,
  topLineColor
}) {
  const { t } = useTranslation();
  const toplineKlass = goldPkg ? 'top-line-gold' : `pkg-card__topline-${topLineColor}`;

  const handleOnClick = () => {
    if (!!pkgURL) {
      window.location.href = pkgURL;
    }
  };

  return (
    <div className={`pkg-card-container${goldPkg ? ' pkg-card-gold-pkg' : ''}`}>
      <div className="pkg-card-wrapper">
        <div className={toplineKlass}></div>
        <div className="pkg-card__header">
          <div className="pkg-card__header__title font-ng-regular">{pkgName}</div>
          <div className="pkg-card__header__price font-ng-medium">{CurrencyFormatted(pkgPrice)} {unit}</div>
        </div>
        <div className="pkg-card__body">
          <div className="pkg-card__body__item font-ng-regular">
            <div className="text">{t('home.pricing.price')}</div>
            <div className="font-ng-medium">{price}</div>
          </div>
          <div className="pkg-card__body__item font-ng-regular">
            <div className="text">{t('components.pkgs.num_of_msg')}</div>
            <div className="font-ng-medium">{NumberOfMessagesFormatted(numberOfMessages)}</div>
          </div>
          <div className="pkg-card__body__item font-ng-regular">
            <div className="text">{t('components.pkgs.validity_period')}</div>
            <div className="font-ng-medium">{validityPeriod}</div>
          </div>
        </div>
        <div className="pkg-card__footer">
          <ButtonComponent
            type="black"
            onClick={handleOnClick}
          >
            <div dangerouslySetInnerHTML={{__html: t('pricing_page.packages.buy_now')}}/>
            <span>
              <Image src="/images/buy-icon.svg" alt="buy icon" width={24} height={24} />
            </span>
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}

export default PkgCardComponent;
