import { DialogTrigger } from '@radix-ui/react-dialog';
import { memo, useCallback, useEffect } from 'react';

import { Button, type ButtonProps } from '../../ui/button';
import { Modal, type ModalProps } from '../../ui/modal';
import * as styles from './overlay-modal.css';

const defaultContentOptions: ModalProps['contentOptions'] = {
  style: {
    padding: 0,
    overflow: 'hidden',
    boxShadow: 'var(--affine-menu-shadow)',
  },
};
const defaultOverlayOptions: ModalProps['overlayOptions'] = {
  style: {
    background: 'var(--affine-white-80)',
    backdropFilter: 'blur(2px)',
  },
};

export interface OverlayModalProps extends ModalProps {
  topImage?: React.ReactNode;
  confirmButtonOptions?: ButtonProps;
  onConfirm?: () => void;
  cancelText?: string;
  cancelButtonOptions?: ButtonProps;
}

export const OverlayModal = memo(function OverlayModal({
  open,
  topImage,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmButtonOptions,
  cancelButtonOptions,
  contentOptions = defaultContentOptions,
  overlayOptions = defaultOverlayOptions,
  // FIXME: we need i18n
  cancelText = 'Cancel',
  width = 400,
}: OverlayModalProps) {
  // blur modal background, can't use css: `backdrop-filter: blur()`,
  // because it won't behave as expected on client side (texts over transparent window are not blurred)
  useEffect(() => {
    const appDom = document.querySelector('#app') as HTMLElement;
    if (!appDom) return;
    appDom.style.filter = open ? 'blur(7px)' : 'none';

    return () => {
      appDom.style.filter = 'none';
    };
  }, [open]);

  const handleConfirm = useCallback(() => {
    onOpenChange?.(false);
    onConfirm?.();
  }, [onOpenChange, onConfirm]);

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
        <DialogTrigger asChild>
          <Button {...cancelButtonOptions}>{cancelText}</Button>
        </DialogTrigger>
        <Button onClick={handleConfirm} {...confirmButtonOptions}></Button>
      </div>
    </Modal>
  );
});
