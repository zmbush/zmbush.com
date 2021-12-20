/* @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { ImageDataLike, StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';
import { Helmet } from 'react-helmet';

import { GetSiteMetadataAndImageQuery } from '../../types/graphql-types';
import { up, down } from '../util/mediaQueries';

import Base from './base';
import Header from './header';
import Navbar from './navbar';

const Footer = styled.footer`
  margin-top: 30px;
  border-top: 5px solid #1976d2;
  padding: 15px;
  font-size: .9rem;
  
  section.main {
    margin: 0 auto;
  }

  ${up('md')} {
    section.main {
      width: 800px;
    }
  }

  .copyright {
    text-align: right;
    font-size: .5rem;

    ${down('md')} {
      text-align: center;
      padding: 10px;
    }
  }

  .logo-icon {
    font-size: 2rem;
    padding-bottom: 10px;

    ${down('md')} {
      font-size: 1.5rem;
    }
  }

  a {
    color: black;
    text-decoration: none;
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
      text-decoration: underline;
    }
  }

  nav {
    margin: 0 auto;
    text-align: center;
    line-height: 25px;

    ${up('md')} {
      display: inline-block;
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
          siteUrl
        }
      }
    }
  `);
  const metadata = data.site?.siteMetadata || {};
  return (
    <Base>
      <Helmet>
        <meta charSet='utf-8' />
        <title>
          {pageTitle}
          {metadata.title ? ` | ${metadata.title}` : ''}
        </title>
        {metadata.siteUrl ? <link rel='canonical' href={metadata.siteUrl} /> : null}
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
                padding-top: 10px;
                max-width: 800px;
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

                > p {
                  ${down('sm')} {
                    padding-left: 10px;
                    padding-right: 10px;
                  }

                  &:first-of-type {
                    text-indent: 0;

                    &::first-letter {
                      color: #1976d2;
                      float: left;
                      font-size: 230%;
                      font-weight: 300;
                      line-height: 1;
                    }
                  }

                  text-indent: 25px;
                  margin-bottom: 10px;
                }

                p {
                  line-height: 1.5;
                }

                img {
                  ${down('sm')} {
                    width: 100%;
                    height: auto;
                  }
                }

                .gatsby-resp-image-figcaption {
                  text-align: right;
                  padding-bottom: 10px;
                  color: #9e9e9e;
                  font-size: 0.8rem;
                }
              `]: true,
            })}
          >
            {children}
          </article>
        )}
      </ClassNames>
      <Footer>
        <section className='main'>
          <Link to='/' className='logo-icon'>
            <StaticImage
              css={css`
                margin-top: 5px;
              `}
              height={34}
              src='../images/zb-logo.svg'
              alt='logo'
              placeholder='tracedSVG'
            />
          </Link>
          <nav>
            <Link to='/'>About Me</Link>
            <Link to='/projects'>Projects</Link>
            <Link to='/contact'>Contact Me</Link>
            {/* <!-- <Link to="/blog">Blog</Link> --> */}
          </nav>
          <div className='copyright'>
            all content &copy; 2011-{new Date().getFullYear()} Zachary Bush
            <br />
            <br />
            Opinions expressed here are solely my own and do not express the views or opinions of my
            employer.
          </div>
        </section>
      </Footer>
    </Base>
  );
};

export default Default;
