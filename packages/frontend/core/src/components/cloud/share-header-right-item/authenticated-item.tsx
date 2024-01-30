import { Button } from '@affine/component/ui/button';
import { useCurrentUser } from '@affine/core/hooks/affine/use-current-user';
import { useMembers } from '@affine/core/hooks/affine/use-members';
import { useNavigateHelper } from '@affine/core/hooks/use-navigate-helper';
import { useAFFiNEI18N } from '@affine/i18n/hooks';
import { useCallback, useEffect } from 'react';

import type { ShareHeaderRightItemProps } from './index';
import * as styles from './styles.css';

export const AuthenticatedItem = ({
  setShowDivider,
  ...props
}: { setShowDivider: (show: boolean) => void } & ShareHeaderRightItemProps) => {
  const { workspaceId, pageId, publishMode } = props;
  const user = useCurrentUser();
  const members = useMembers(workspaceId, 0);
  const isMember = members.some(m => m.id === user.id);
  const t = useAFFiNEI18N();
  const { jumpToPage } = useNavigateHelper();

  const handleEdit = useCallback(() => {
    jumpToPage(workspaceId, pageId);
  }, [workspaceId, pageId, jumpToPage]);

  useEffect(() => {
    if (isMember || publishMode === 'edgeless') {
      setShowDivider(true);
    }
  }, [isMember, publishMode, setShowDivider]);

  if (isMember) {
    return (
      <Button
        className={styles.editButton}
        onClick={handleEdit}
        data-testid="share-page-edit-button"
      >
        {t['Edit']()}
      </Button>
    );
  }

  return null;
};
