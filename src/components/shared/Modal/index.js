/* eslint-disable react/no-unescaped-entities */

import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

import CloseIcon from 'public/images/icons/close-icon.svg';

const Modal = ({
  body,
  title,
  visible,
  onRequestClose,
}) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.keyCode === 27) {
        onRequestClose();
      }
    };

    if (visible) {
      // Prevent scolling
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKeyDown);
    }


    // Clear things up when unmounting this component
    return () => {
      document.body.style.overflow = 'visible';
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <div className={`modal__backdrop font-ng-regular${visible ? ' --show' : ''}`}>
      <div className="modal__container">
        <div className="modal__header">
          <button
            className="modal__close"
            onClick={onRequestClose}
          >
            <CloseIcon />
          </button>
          <h3 className="modal__title font-ng-medium">{title}</h3>
        </div>
        <div className="modal__body">{body}</div>
      </div>
    </div>
  );
};

export default Modal;
