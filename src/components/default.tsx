/* @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import '@fontsource/roboto/latin-300.css';
import '@fontsource/roboto/latin-400.css';
import { MDXProvider } from '@mdx-js/react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { ImageDataLike, StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { GetSiteMetadataAndImageQuery } from '../../types/graphql-types';
import { up, down } from '../util/mediaQueries';

import Base from './base';
import Caption from './caption';
import Header from './header';
import Navbar from './navbar';
import Toc from './toc';

const shortCodes = {
  Toc,
  Caption,
};

const Footer = styled.footer`
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
}
`;

interface Props {
  pageTitle: string;
  hideTitle?: boolean;
  subtitle?: string;
  date?: string;
  headerImg?: {
    childImageSharp?: {
      gatsbyImageData?: any | null;
    } | null;
  } | null;
  children: React.ReactNode;
  article?: boolean;
}

const Default = ({
  pageTitle,
  hideTitle,
  children,
  headerImg,
  subtitle,
  date,
  article = false,
}: Props) => {
  const data = useStaticQuery<GetSiteMetadataAndImageQuery>(graphql`
    query GetSiteMetadataAndImage {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const metadata = data.site?.siteMetadata || {};
  return (
    <Base>
      <MDXProvider components={shortCodes}>
        <Helmet>
          <meta charSet='utf-8' />
          <title>
            {pageTitle}
            {metadata.title ? ` | ${metadata.title}` : ''}
          </title>
        </Helmet>
        <Navbar />
        {hideTitle ? null : (
          <Header
            title={pageTitle}
            subtitle={subtitle}
            date={date}
            headerImg={headerImg as ImageDataLike}
          />
        )}
        <ClassNames>
          {({ css: cs, cx }) => (
            <article
              css={cx({
                [cs`
                padding-top: 1rem;
                max-width: 75rem;
                margin: 0 auto;
              `]: article,
                [cs`
                &:before,
                &:after {
                  content: '';
                  display: table;
                }

                &:after {
                  clear: both;
                }

                a {
                  text-decoration: none;
                  font-weight: 400;
                  color: #1565c0;

                  &:hover {
                    text-decoration: underline;
                  }
                }

                h1, h2, h3, h4, h5, h6 {
                  margin-top: 2rem;

                  > a {
                    color: inherit;
                    font-weight: inherit;
                  }
                }

                > {
                  p, div.gatsby-highlight, h1, h2, h3, h4, h5, h6, div.toc {
                    ${down('article')} {
                      margin-left: 1rem;
                      margin-right: 1rem;
                    }
                  }
                }

                > p {

                  &:first-of-type {
                    text-indent: 0;

                    &::first-letter {
                      color: #1976d2;
                      float: left;
                      font-size: 4.3rem;
                      font-weight: 300;
                      line-height: 1;
                    }
                  }

                  text-indent: 2.5rem;
                  margin-bottom: 1rem;
                }

                p {
                  margin-top: 1rem;
                  line-height: 1.5;
                }

                img {
                  ${down('sm')} {
                    width: 100%;
                    height: auto;
                  }
                }

                ol,ul {
                  // negative hanging indent for first line
                  text-indent: -3rem;
                  padding-left: 3rem;
                }

                ol li {
                  counter-increment: step-counter;

                  &::before {
                    content: counter(step-counter) ". ";
                    margin-right: 0.5rem;
                    margin-left: 1rem;
                    font-size: 1.5rem;
                  }
                }

                em {
                  font-style: italic;
                }

                strong {
                  font-weight: bold;
                }

                .gatsby-resp-image-figcaption {
                  text-align: center;
                  display: block;
                  padding-bottom: 2rem;
                  margin-top: 0.5rem;
                  font-style: italic;
                }
              `]: true,
              })}
            >
              {children}
            </article>
          )}
        </ClassNames>
        <Footer>
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
                src='../images/zb-logo.svg'
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
                Opinions expressed here are solely my own and do not express the views or opinions
                of my employer.
              </p>
            </div>
          </section>
        </Footer>
      </MDXProvider>
    </Base>
  );
};

export default Default;
