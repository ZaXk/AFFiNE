import { style } from '@vanilla-extract/css';

export const title = style({
  padding: '20px 24px 8px 24px',
  fontSize: 'var(--affine-font-h-6)',
  fontFamily: 'var(--affine-font-family)',
  fontWeight: '600',
  lineHeight: '26px',
});

export const content = style({
  padding: '0px 24px 8px',
  fontSize: 'var(--affine-font-base)',
  lineHeight: '24px',
  fontWeight: 400,
});

export const footer = style({
  padding: '20px 24px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '20px',
});

export const gotItBtn = style({
  fontWeight: 500,
});
