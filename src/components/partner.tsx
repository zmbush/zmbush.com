import * as React from 'react';

interface Props {
  url: string;
  name: string;
  children: React.ReactNode;
}

const Partner = ({ url, name, children }: Props) => (
  <a href={url} title={name}>
    {children}
  </a>
);

export default Partner;
