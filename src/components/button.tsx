/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css, TwStyle } from 'twin.macro';
import { FunctionComponent } from 'react';
import { btnPrimary } from '../styles/globalStyles';

interface ButtonProps {
  onClick: any;
  children: React.ReactNode;
  style?: TwStyle;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  style,
}: ButtonProps) => (
  <button onClick={onClick} type="button" css={[btnPrimary, style ?? '']}>
    {children}
  </button>
);

export default Button;
