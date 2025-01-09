import { useTranslation } from 'next-i18next';
import HelpCircleIcon from 'public/images/icons/help-circle-black.svg';
import ShoppingCartIcon from 'public/images/icons/shopping-cart.svg';
import CodeIcon from 'public/images/icons/code.svg';


export default function SelectTags({
  className = '',
  setSelectedTag,
  selectedTag
}) {
  const { t } = useTranslation();

  const tags = [
    { label: t('faqs.general_questions'), value: 'General Questions', icon: <HelpCircleIcon />, selected: true },
    { label: t('faqs.order_payment'), value: 'Ordering & Payment', icon: <ShoppingCartIcon />, selected: false },
    { label: t('faqs.technical_problems'), value: 'Technical Problems', icon: <CodeIcon />, selected: false },
  ];

  return (
    <div className={`select-tags font-ng-medium ${className}`}>
      {
        tags.map((tag, key) => (
          <div key={key} onClick={() => setSelectedTag(tag.value)} className={`select-tags__item ${tag.value === selectedTag ? '--active' : ''}`}>
            {tag.icon}{tag.label}
          </div>
        ))
      }
    </div>
  );
}
