import { useTranslation } from 'next-i18next';

import PlatformIcon from 'public/images/icons/platform-icon.svg';
import NetworkIcon from 'public/images/icons/network-icon.svg';
import ComputerNetworkIcon from 'public/images/icons/computer-network-icon.svg';
import LocalizeServiceIcon from 'public/images/icons/localize-service-icon.svg';

function AdvantagesSection() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="d-flex line-top-96">
      </div>
      <div className="d-flex">
        <div className="home-page__advantages-section">
          <div
            className="home-page__advantages-section__title font-ng-medium"
            data-aos="fade-right"
            data-aos-delay="700"
            data-aos-easing="ease-in-out-cubic"
          >
            {t('home.advantages.why_choosen_us')}
          </div>
          <div className="home-page__advantages-section__items">
            <div
              className="home-page__advantages-section__item"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-offset="100"
              data-aos-delay="800"
            >
              <div className="icon"><PlatformIcon /></div>
              <div className="item-content">
                <div className="title font-ng-medium">{t('home.advantages.first_item.title')}</div>
                <div className="description font-ng-regular">{t('home.advantages.first_item.description')}</div>
              </div>
            </div>

            <div
              className="home-page__advantages-section__item"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-offset="100"
              data-aos-delay="800"
            >
              <div className="icon"><NetworkIcon /></div>
              <div className="item-content">
                <div className="title font-ng-medium">{t('home.advantages.second_item.title')}</div>
                <div className="description font-ng-regular">{t('home.advantages.second_item.description')}</div>
              </div>
            </div>

            <div
              className="home-page__advantages-section__item"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-offset="100"
              data-aos-delay="800"
            >
              <div className="icon"><ComputerNetworkIcon /></div>
              <div className="item-content">
                <div className="title font-ng-medium">{t('home.advantages.third_item.title')}</div>
                <div className="description font-ng-regular">{t('home.advantages.third_item.description')}</div>
              </div>
            </div>

            <div
              className="home-page__advantages-section__item"
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-offset="100"
              data-aos-delay="800"
            >
              <div className="icon"><LocalizeServiceIcon /></div>
              <div className="item-content">
                <div className="title font-ng-medium">{t('home.advantages.fourth_item.title')}</div>
                <div className="description font-ng-regular">{t('home.advantages.fourth_item.description')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvantagesSection;
