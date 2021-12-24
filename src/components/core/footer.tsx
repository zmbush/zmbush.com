/* @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { down, up } from '../../util/mediaQueries';

const Footer = () => (
  <footer
    css={css`
      margin-top: 3rem;
      border-top: 0.5rem solid #1976d2;
      padding: 1.5rem;
      font-size: 1.6rem;

      a {
        color: black;
        text-decoration: none;
        padding-left: 1rem;
        padding-right: 1rem;

        &:hover {
          text-decoration: underline;
        }
      }
    `}
  >
    <section
      css={css`
        margin: 0 auto;

        ${up('md')} {
          width: 75rem;
        }
      `}
    >
      <Link
        to='/'
        css={css`
          padding-bottom: 1rem;

          ${down('md')} {
            display: block;
          }
        `}
      >
        <StaticImage
          css={css`
            margin-top: 0.5rem;
            ${down('md')} {
              left: 50%;
              transform: translateX(-50%);
            }
          `}
          height={34}
          src='../../images/zb-logo.svg'
          alt='logo'
          placeholder='tracedSVG'
        />
      </Link>
      <nav
        css={css`
          margin: 0 auto;
          text-align: center;
          line-height: 2.5rem;

          ${up('md')} {
            display: inline-block;
            a {
              padding-top: 1.5rem;
              display: inline-block;
            }
          }
        `}
      >
        <Link to='/'>About Me</Link>
        <Link to='/projects'>Projects</Link>
        <Link to='/contact'>Contact Me</Link>
        {/* <Link to="/blog">Blog</Link> */}
      </nav>
      <div
        css={css`
          text-align: right;
          font-size: 0.9rem;

          ${down('md')} {
            text-align: center;
            padding: 1rem;
          }

          p {
            padding-bottom: 0.5rem;
          }
        `}
      >
        <p>all content &copy; 2011-{new Date().getFullYear()} Zachary Bush</p>
        <p>
          Opinions expressed here are solely my own and do not express the views or opinions of my
          employer.
        </p>
      </div>
    </section>
  </footer>
);

export default Footer;
