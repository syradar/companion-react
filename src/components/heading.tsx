/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { h1Style, h2Style, h3Style, h4Style } from '../styles/globalStyles';

interface HeadingProps {
  lvl: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}

export const Heading: FunctionComponent<HeadingProps> = ({
  lvl,
  children,
}: HeadingProps) => {
  switch (lvl) {
    case 1:
      return <h1 css={[h1Style]}>{children}</h1>;
    case 2:
      return <h2 css={[h2Style]}>{children}</h2>;
    case 3:
      return <h3 css={[h3Style]}>{children}</h3>;
    case 4:
      return <h4 css={[h4Style]}>{children}</h4>;
  }
};

export default Heading;
