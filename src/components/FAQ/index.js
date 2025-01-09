import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { redirectTo } from '@/helpers';
import ButtonComponent from '@/components/shared/Button';
import DropdownComponent from '@/components/shared/Dropdown';
import { useRef, useState } from 'react';

export default function FaqComponent({
  className = '',
  headerContent,
  withoutBackground = false,
  url,
  selectedTag
}) {
  const { t } = useTranslation();
  
  const data = [
    {
      question: t('faqs.questions.1'),
      answer: t('faqs.answer.1'),
      status: false,
      category: 'General Questions'
    },
    {
      question: t('faqs.questions.2'),
      answer: t('faqs.answer.2'),
      status: false,
      category: 'General Questions'
    },
    {
      question: t('faqs.questions.3'),
      answer: t('faqs.answer.3'),
      status: false,
      category: 'General Questions'
    },
    {
      question: t('faqs.questions.4'),
      answer: t('faqs.answer.4'),
      status: false,
      category: 'General Questions'
    },
    {
      question: t('faqs.questions.5'),
      answer: t('faqs.answer.5'),
      status: true,
      category: 'General Questions'
    },
    {
      question: t('faqs.questions.6'),
      answer: t('faqs.answer.6'),
      status: true,
      category: 'General Questions'
    },
    {
      question: t('faqs.questions.7'),
      answer: t('faqs.answer.7'),
      status: true,
      category: 'General Questions'
    },
    {
      question: t('faqs.questions.8'),
      answer: t('faqs.answer.8'),
      status: true,
      category: 'General Questions'
    },
    {
      question: t('faqs.questions.9'),
      answer: t('faqs.answer.9'),
      status: true,
      category: 'General Questions'
    },
    {
      question:  t('faqs.questions.10'),
      answer: t('faqs.answer.10'),
      status: true,
      category: 'General Questions'
    },
    {
      question: t('faqs.questions.11'),
      answer: t('faqs.answer.11'),
      status: true,
      category: 'Ordering & Payment'
    },
    {
      question: t('faqs.questions.12'),
      answer: t('faqs.answer.12'),
      status: true,
      category: 'Ordering & Payment'
    },
    {
      question: t('faqs.questions.13'),
      answer: t('faqs.answer.13'),
      status: true,
      category: 'Ordering & Payment'
    },
    {
      question: t('faqs.questions.14'),
      answer: t('faqs.answer.14'),
      status: true,
      category: 'Ordering & Payment'
    },
    {
      question: t('faqs.questions.15'),
      answer: t('faqs.answer.15'),
      status: true,
      category: 'Ordering & Payment'
    },
    {
      question: t('faqs.questions.16'),
      answer: t('faqs.answer.16'),
      status: true,
      category: 'Technical Problems'
    },
    {
      question: t('faqs.questions.17'),
      answer: t('faqs.answer.17'),
      status: true,
      category: 'Technical Problems'
    },
    {
      question: t('faqs.questions.18'),
      answer: t('faqs.answer.18'),
      status: true,
      category: 'Technical Problems'
    },
    {
      question: t('faqs.questions.19'),
      answer: t('faqs.answer.19'),
      status: true,
      category: 'Technical Problems'
    },
    {
      question:  t('faqs.questions.20'),
      answer: t('faqs.answer.20'),
      status: true,
      category: 'Technical Problems'
    },
    {
      question: t('faqs.questions.21'),
      answer: t('faqs.answer.21'),
      status: true,
      category: 'Technical Problems'
    },
  ];

  const { locale } = useRouter();
  const route = useRouter();
  const filteredStatusTrue = data.filter((item) => item.category === selectedTag);
  const filteredStatusFalse = data.filter((item) => item.status === false);
  const myRef = useRef(null);

  const handleOnClickReadMore = () => {
    redirectTo('/faq', locale);
  };

  return (
    <div
      className={`faq-container ${className}${withoutBackground ? ' bg-image-none' : ''
      }`}
    >
      <div className="container">
        <div className="d-flex">
          <div className="faq__wrapper" ref={myRef}>
            {!!headerContent ? (
              headerContent
            ) : (
              <div
                className="header-content font-ng-medium"
                data-aos="zoom-in-down"
                data-aos-delay="200"
                data-aos-duration="600"
              >
                {t('components.faq.title')}
              </div>
            )}
            <div
              className="content"
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="600"
            >
              {route.pathname === '/faq'
                ? filteredStatusTrue.map((item, index) => (
                  <DropdownComponent title={item.question} key={index}>
                    <p
                      className="faq-container__dropdown font-ng-regular"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </DropdownComponent>
                ))
                : filteredStatusFalse.map((item, index) => (
                  <DropdownComponent title={item.question} key={index}>
                    <p
                      className="faq-container__dropdown font-ng-regular"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </DropdownComponent>
                ))}
              {route.pathname !== '/faq' ? <ButtonComponent
                className="faq-container__btn"
                type="ghost"
                onClick={handleOnClickReadMore}
              >
                {t('components.faq.read_more')}
              </ButtonComponent> : ''}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
