/* @jsx jsx */
import { jsx, css } from '@emotion/react';
import '@fontsource/roboto-mono/latin-100.css';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import * as React from 'react';

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

type Props = {
  headerImg: ImageDataLike;
} & (PropsWithoutTitle | PropsWithTitle);

const Header = ({ hideTitle = false, title, subtitle, date, headerImg }: Props) => {
  const bgImage = getImage(headerImg);
  return (
    <header
      css={css`
        background-size: cover;
        color: #ffffff;
        display: block;
        position: relative;

        h1,
        h3,
        h5 {
          margin: 0 auto;
          text-align: center;
          font-family: 'Roboto Mono', monospace;
          font-weight: 100;
        }
      `}
    >
      {bgImage ? (
        <GatsbyImage
          css={css`
            pointer-events: none;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
          `}
          image={bgImage}
          alt='Banner Image'
        />
      ) : null}
      <div
        css={css`
          background-color: rgba(33, 150, 243, 0.75);
          height: 100%;
        `}
      >
        <div
          css={css`
            max-width: 75rem;
            margin: 0 auto;
            padding: 5rem 0;
          `}
        >
          {hideTitle ? null : (
            <>
              {title ? <h1>{title}</h1> : null}
              {subtitle ? <h3>{subtitle}</h3> : null}
              {!subtitle && date ? <h3>Published {date}</h3> : null}
              {subtitle && date ? <h5>Published {date}</h5> : null}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
