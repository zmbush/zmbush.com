/* @jsx jsx */
import '@fontsource/roboto-mono/latin-100.css';
import { GatsbyImage, getImage, ImageDataLike, StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';

import { jsx, css } from '../../util/emotionReact';
import theme from '../../util/theme';

interface PropsWithoutTitle {
  hideTitle: true;
  title?: never;
  subtitle?: never;
  technologies?: never;
  date?: never;
}

interface PropsWithTitle {
  hideTitle?: false;
  title?: string;
  subtitle?: string;
  technologies?: React.ReactNode;
  date?: string;
}

type Props = {
  headerImg: ImageDataLike;
  headerImgAlign?: `TOP` | `BOTTOM` | `CENTER`;
} & (PropsWithoutTitle | PropsWithTitle);

const imgCss = css`
  pointer-events: none;
  position: absolute;
  width: 100%;
  z-index: -1;
`;

const Header = ({
  hideTitle = false,
  title,
  subtitle,
  date,
  technologies,
  headerImg,
  headerImgAlign = `CENTER`,
}: Props) => {
  const bgImage = getImage(headerImg);
  return (
    <header
      css={css`
        background-size: cover;
        color: ${theme.colors.text.base};
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
      <div
        css={css`
          overflow: hidden;
          position: absolute;
          height: 100%;
          width: 100%;
          pointer-events: none;

          .gatsby-image-wrapper {
            &.align-TOP,
            &.align-CENTER {
              top: 0;
            }

            &.align-BOTTOM,
            &.align-CENTER {
              bottom: 0;
            }
          }
        `}
      >
        {bgImage ? (
          <GatsbyImage
            className={`align-${headerImgAlign}`}
            css={imgCss}
            image={bgImage}
            alt='Banner Image'
          />
        ) : (
          <StaticImage
            className='align-TOP'
            css={imgCss}
            src='../../images/pano-in-a-park.jpg'
            alt='Banner Image'
          />
        )}
      </div>
      <div
        css={css`
          background-color: ${theme.colors.primary.base.darken(1).alpha(0.75)};
          height: 100%;
        `}
      >
        <div
          css={css`
            max-width: ${theme.breakpoints.value(`article`)};
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
              <div
                css={css`
                  text-align: center;
                  margin-top: 0.5rem;
                `}
              >
                {technologies}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
