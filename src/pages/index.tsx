/* @jsx jsx */
import { graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { IndexCopyQuery } from '../../types/graphql-types';
import Default from '../components/core/default';
import CodeSnippet from '../components/shortcodes/code-snippet';
import TypeOut from '../components/typeout';
import { jsx, css } from '../util/emotionReact';
import theme from '../util/theme';

export const query = graphql`
  query IndexCopy {
    file(relativePath: { eq: "index.mdx" }) {
      childMdx {
        body
      }
    }
  }
`;

interface Props {
  data: IndexCopyQuery;
}

const Index = ({ data }: Props) => (
  <Default hideTitle pageTitle='About Me'>
    <div
      css={css`
        position: relative;
        margin: 0 auto;
        padding-bottom: 5vw;
        box-shadow: 0 -0.5rem 2rem black;
        clip-path: inset(0 0 -20px 0);

        ${theme.breakpoints.down(`md`)} {
          display: inherit;
        }

        p {
          flex-grow: 1;
          ${theme.breakpoints.up(`article`)} {
            margin: auto;
          }
        }
      `}
    >
      <StaticImage
        alt=''
        css={css`
          pointer-events: none;
          position: absolute;
          width: 100%;
          z-index: -1;
          bottom: -1rem;
        `}
        src='../images/pano-in-a-park-nosky.jpg'
        transformOptions={{
          duotone: {
            highlight: `#ffffff`,
            shadow: `#bbbbbb`,
          },
        }}
      />
      <div
        css={css`
          display: flex;
          justify-content: center;
          width: 100%;
        `}
      >
        <StaticImage
          css={css`
            border-radius: 50%;
            margin-top: 5rem;
            flex-grow: 0;
            filter: drop-shadow(0px 0px 1rem black);
            ${theme.breakpoints.up(`md`)} {
              min-width: 25rem;
            }
            ${theme.breakpoints.down(`sm`)} {
              margin: 1rem;
              width: 50vw;
              height: 50vw;
              filter: drop-shadow(0px 0px 0.5rem black);
            }
          `}
          width={250}
          src='../images/albany-bulb-portrait-square.jpg'
          alt='Me'
        />
      </div>
      <h1
        css={css`
          margin-top: 5vw;
          font-family: 'Roboto Mono', monospace;
          clear: both;
          max-width: ${theme.breakpoints.value(`article`)};
          margin-left: auto;
          margin-right: auto;
          filter: drop-shadow(0px 0px 1rem black);
          ${theme.breakpoints.down(`sm`)} {
            font-size: 4vw;
            filter: drop-shadow(0px 0px 0.5rem black);
          }
        `}
      >
        <CodeSnippet
          css={css`
            pre {
              text-align: center;
            }
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
          `}
          codeString='$ whois zmbush'
          language='shell-session'
        >
          <TypeOut
            options={[
              `A Software Engineer`,
              `A Game Developer`,
              `A Woodworker`,
              `An Amateur Pianist`,
              `A Writer`,
            ]}
          />
        </CodeSnippet>
      </h1>
    </div>
    <div
      className='with-big-letter'
      css={css`
        padding-top: 1rem;
        max-width: ${theme.breakpoints.value(`article`)};
        margin: 2rem auto;
      `}
    >
      <MDXRenderer>{data.file!.childMdx!.body}</MDXRenderer>
    </div>
  </Default>
);

export default Index;
