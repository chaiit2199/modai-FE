import { useTranslation } from 'next-i18next';

import ServiceCardComponent from '@/components/shared/ServiceCard';
import ServicesIcon from 'public/images/icons/services-icon.svg';
import SmsMktIcon from 'public/images/srv-sms-mkt-icon.svg';
import SmsOtpIcon from 'public/images/srv-sms-otp-icon.svg';

function ServicesSection() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="d-flex">
        <div className="home-page__services-section">
          <div
            className="title font-ng-medium"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {t('home.services.title')}
          </div>

          <div className="home-page__services-section__items">
            <div
              className="item"
              data-aos="zoom-in"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <ServiceCardComponent
                title={t('sms_marketing_page.banner.title')}
                desc={t('components.header.send_sms')}
                icon={<SmsMktIcon />}
                readMoreUrl="/marketing"
              />
            </div>

            <div
              className="item"
              data-aos="zoom-in"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <ServiceCardComponent
                title={t('footer.sms_otp_home')}
                desc={t('components.header.sms_api')}
                icon={<SmsOtpIcon />}
                readMoreUrl="/sms-otp"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesSection;
