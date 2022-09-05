import classNames from 'classnames';
import block from 'bem-css-modules';
import Modal from 'react-modal';

import styles from './dialog.module.scss';

const b = block(styles);

export interface DialogProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Dialog = (props: DialogProps): React.ReactElement => {
  const { children, className, isOpen, onClose } = props;

  return (
    <Modal
      className={classNames(b(), className)}
      overlayClassName={b('overlay')}
      isOpen={isOpen}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <button className={b('button-close')} onClick={onClose}>
        <span>закрыть</span>
      </button>
      {children}
    </Modal>
  );
};
