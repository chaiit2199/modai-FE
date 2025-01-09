import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import InputComponent from '@/components/shared/Input';
import ButtonComponent from '@/components/shared/Button';
import Modal from '../shared/Modal';
import { useRouter } from 'next/router';

export default function ContactUs({ title }) {
  const [contactForm, setContactForm] = useState({});
  const [isModalOpen, setModalIsOpen] = useState(false);
  const { t } = useTranslation();
  const route = useRouter();

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { name, email, phone_number, comment } = contactForm;

      if (!name) {
        throw 'Name cannot be blank';
      }

      if (!email) {
        throw 'Email cannot be blank';
      }

      if (!phone_number) {
        throw 'Phone Number cannot be blank';
      }

      if (!comment) {
        throw 'Message cannot be blank';
      }

      const resp = await axios.post('/api/send-mail', contactForm)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(function () {
          setModalIsOpen(!isModalOpen);
          document.getElementById('contact-us-form').reset();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="contact-us__container">
      <div className="container">
        <div className="d-flex">
          <div className="contact-us__wrapper">
            <div className="contact-us__container__form">
              <div
                className="contact-us__container__form__left"
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-offset="300"
              >
                <h1 className="font-ng-medium contact-us__container__form__title sms-title" dangerouslySetInnerHTML={{ __html: title }} />
              </div>

              <div
                className="contact-us__container__form__right"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000"
              >
                <form id="contact-us-form" onSubmit={handleOnSubmit}>
                  <InputComponent
                    required
                    name="name"
                    placeholder={t('components.form.name')}
                    onChange={(e) => {
                      setContactForm({ ...contactForm, name: e.target.value });
                    }}
                  />
                  <InputComponent
                    required
                    type='email'
                    name="email"
                    placeholder={t('components.form.email')}
                    onChange={(e) => {
                      setContactForm({ ...contactForm, email: e.target.value });
                    }}
                  />
                  <InputComponent
                    required
                    name="phone_number"
                    placeholder={t('components.form.phone')}
                    onChange={(e) => {
                      setContactForm({ ...contactForm, phone_number: e.target.value });
                    }}
                  />
                  <InputComponent
                    required
                    name="comment"
                    placeholder={t('components.form.your_message')}
                    onChange={(e) => {
                      setContactForm({ ...contactForm, comment: e.target.value });
                    }}
                  />
                  <ButtonComponent className="contact-us__container__form__btn" type="black">{t('components.form.send')}</ButtonComponent>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        visible={isModalOpen}
        title={t('components.contact_us.submitted_form_msg.modal.title')}
        body={t('components.contact_us.submitted_form_msg.modal.message')}
        onRequestClose={toggleModal}
      />
    </div>
  );
}
