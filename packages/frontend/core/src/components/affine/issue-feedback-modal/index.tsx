import { OverlayModal } from '@affine/component/overlay-modal';
import { openIssueFeedbackModalAtom } from '@affine/core/atoms';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const IssueFeedbackModal = () => {
  const t = useAFFiNEI18N();
  const [open, setOpen] = useAtom(openIssueFeedbackModalAtom);

  const onConfirm = useCallback(() => {
    window.open(`${runtimeConfig.githubUrl}/issues/new/choose`, '_blank');
    setOpen(false);
  }, [setOpen]);

  return (
    <OverlayModal
      open={open}
      topImage={
        <video
          width={400}
          style={{ objectFit: 'cover' }}
          src={'/static/newIssue.mp4'}
          autoPlay
          loop
        />
      }
      title={t['com.affine.issue-feedback.title']()}
      onOpenChange={setOpen}
      description={t['com.affine.issue-feedback.description']()}
      cancelText={t['com.affine.issue-feedback.cancel']()}
      onConfirm={onConfirm}
      confirmButtonOptions={{
        type: 'primary',
        children: t['com.affine.issue-feedback.confirm'](),
      }}
    />
  );
};
