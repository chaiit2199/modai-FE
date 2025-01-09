import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ButtonComponent from '../Button';
import { redirectTo } from '@/helpers';

function ServiceCardComponent({
  icon,
  title,
  desc,
  readMoreUrl,
}) {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const handleOnClickReadMore = () => {
    if (!!readMoreUrl) {
      redirectTo(readMoreUrl, locale);
    }
  };

  return (
    <div className="srv-card-container">
      <div className="srv-card__topline"></div>
      <div className="srv-card__icon">{icon}</div>
      <div className="srv-card__content">
        <div className="srv-card__content__title font-ng-medium">{title}</div>
        <div className="srv-card__content__desc font-ng-regular">{desc}</div>
        <div className="srv-card__content__read-more-btn">
          <ButtonComponent
            type="ghost"
            onClick={handleOnClickReadMore}
          >
            {t('components.services.read_more')}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
}

export default ServiceCardComponent;
