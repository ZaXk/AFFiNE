import { DialogTrigger } from '@radix-ui/react-dialog';
import { cssVar } from '@toeverything/theme';
import { memo, useCallback } from 'react';

import { Button, type ButtonProps } from '../button';
import { Modal, type ModalProps } from '../modal';
import * as styles from './overlay-modal.css';

const defaultContentOptions: ModalProps['contentOptions'] = {
  style: {
    padding: 0,
    overflow: 'hidden',
    boxShadow: cssVar('menuShadow'),
  },
};
const defaultOverlayOptions: ModalProps['overlayOptions'] = {
  style: {
    background: cssVar('white80'),
    backdropFilter: 'blur(2px)',
  },
};

export interface OverlayModalProps extends ModalProps {
  to?: string;
  topImage?: React.ReactNode;
  confirmButtonOptions?: ButtonProps;
  onConfirm?: () => void;
  cancelText?: string;
  cancelButtonOptions?: ButtonProps;
  withoutCancelButton?: boolean;
}

export const OverlayModal = memo(function OverlayModal({
  open,
  topImage,
  onOpenChange,
  title,
  description,
  onConfirm,
  to,
  confirmButtonOptions,
  cancelButtonOptions,
  withoutCancelButton,
  contentOptions = defaultContentOptions,
  overlayOptions = defaultOverlayOptions,
  // FIXME: we need i18n
  cancelText = 'Cancel',
  width = 400,
}: OverlayModalProps) {
  const handleConfirm = useCallback(() => {
    if (to) {
      window.open(to, '_blank');
    }
    onOpenChange?.(false);
    onConfirm?.();
  }, [to, onOpenChange, onConfirm]);

  return (
    <Modal
      contentOptions={contentOptions}
      overlayOptions={overlayOptions}
      open={open}
      width={width}
      onOpenChange={onOpenChange}
      withoutCloseButton
    >
      {topImage}
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{description}</div>
      <div className={styles.footer}>
        {!withoutCancelButton ? (
          <DialogTrigger asChild>
            <Button {...cancelButtonOptions}>{cancelText}</Button>
          </DialogTrigger>
        ) : null}
        <Button onClick={handleConfirm} {...confirmButtonOptions}></Button>
      </div>
    </Modal>
  );
});
