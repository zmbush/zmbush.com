import styled from '@emotion/styled';
import '@fontsource/roboto-mono/100.css';
import BackgroundImage from 'gatsby-background-image';
import { getImage, ImageDataLike } from 'gatsby-plugin-image';
import { convertToBgImage } from 'gbimage-bridge';
import * as React from 'react';

const StyledHeader = styled.header`
  background-color: #2196f3;
  background-size: cover;
  color: #ffffff;
  display: block;

  h1,
  h3,
  h5 {
    margin: 0 auto;
    text-align: center;
    font-family: 'Roboto Mono', monospace;
    font-weight: 100;
  }
`;

const HeaderColor = styled.div`
  background-color: rgba(33, 150, 243, 0.75);
  height: 100%;
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 0;
`;

interface PropsWithoutTitle {
  hideTitle: true;
  title?: never;
  subtitle?: never;
  date?: never;
}

interface PropsWithTitle {
  hideTitle?: false;
  title?: string;
  subtitle?: string;
  date?: string;
}

interface MBIProps {
  headerImg: ImageDataLike;
  children: React.ReactNode;
}

const MaybeBackgroundImage = ({ headerImg, children }: MBIProps) => {
  const bgImage = convertToBgImage(getImage(headerImg));
  if (!bgImage) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  return <BackgroundImage {...bgImage}>{children}</BackgroundImage>;
};

type Props = Omit<MBIProps, 'children'> & (PropsWithoutTitle | PropsWithTitle);

const Header = ({ hideTitle = false, title, subtitle, date, headerImg }: Props) => (
  <StyledHeader>
    <MaybeBackgroundImage headerImg={headerImg}>
      <HeaderColor>
        <HeaderContent>
          {hideTitle ? null : (
            <>
              {title ? <h1>{title}</h1> : null}
              {subtitle ? <h3>{subtitle}</h3> : null}
              {!subtitle && date ? <h3>Published {date}</h3> : null}
              {subtitle && date ? <h5>Published {date}</h5> : null}
            </>
          )}
        </HeaderContent>
      </HeaderColor>
    </MaybeBackgroundImage>
  </StyledHeader>
);

export default Header;
