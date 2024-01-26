import { OverlayModal } from '@affine/component/overlay-modal';
import { openStarAFFiNEModalAtom } from '@affine/core/atoms';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const StarAFFiNEModal = () => {
  const t = useAFFiNEI18N();
  const [open, setOpen] = useAtom(openStarAFFiNEModalAtom);

  const onConfirm = useCallback(() => {
    window.open(runtimeConfig.githubUrl, '_blank');
    setOpen(false);
  }, [setOpen]);

  return (
    <OverlayModal
      open={open}
      topImage={
        <video
          width={400}
          style={{ objectFit: 'cover' }}
          src={'/static/gitHubStar.mp4'}
          autoPlay
          loop
        />
      }
      title={t['com.affine.star-affine.title']()}
      onOpenChange={setOpen}
      description={t['com.affine.star-affine.description']()}
      cancelText={t['com.affine.star-affine.cancel']()}
      onConfirm={onConfirm}
      confirmButtonOptions={{
        type: 'primary',
        children: t['com.affine.star-affine.confirm'](),
      }}
    />
  );
};
