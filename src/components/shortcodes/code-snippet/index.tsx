/* @jsx jsx */
import '@fontsource/roboto-mono/latin-300.css';
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
  Prism as RPrism,
} from 'prism-react-renderer';
import Prism from 'prismjs';
import * as React from 'react';

// eslint-disable-next-line import/no-relative-packages
import parseMetaString from '../../../../plugins/gatsby-remark-embed-snippet-local/parse-metastring';
import { jsx, css } from '../../../util/emotionReact';

import dedent from './dedent';
import lineStateManager from './lineStateManager';

(typeof global !== `undefined` ? global : window).Prism = Prism;

require(`prismjs/components/prism-rust`);
require(`prismjs/components/prism-c`);
require(`prismjs/components/prism-glsl`);
require(`prismjs/components/prism-markup-templating`);
require(`prismjs/components/prism-handlebars`);
require(`prismjs/components/prism-bash`);
require(`prismjs/components/prism-shell-session`);
require(`prismjs/components/prism-jsx`);
require(`prismjs/components/prism-typescript`);
require(`prismjs/components/prism-tsx`);
type Lang =
  | Language
  | `rust`
  | `c`
  | `glsl`
  | `markup-templating`
  | `handlebars`
  | `bash`
  | `shell-session`
  | `jsx`
  | `typescript`;

const displayLang = (lang: Lang) => {
  switch (lang) {
    case `rust`:
      return `Rust`;
    case `jsx`:
      return `JS`;
    case `tsx`:
    case `typescript`:
      return `TS`;
    default:
      return lang;
  }
};

type Props = {
  codeString: string;
  metastring?: string;
  className?: string;
  children?: React.ReactNode;
} & ({ inline?: never; language: Lang } | { inline: true; language?: never });

const colors = {
  base03: `#002b36`,
  base02: `#073642`,
  base01: `#586e75`,
  base00: `#657b83`,
  base0: `#839496`,
  base1: `#93a1a1`,
  base2: `#eee8d5`,
  base3: `#fdf6e3`,
  yellow: `#b58900`,
  orange: `#cb4b16`,
  red: `#dc322f`,
  magenta: `#d33682`,
  violet: `#6c71c4`,
  blue: `#268bd2`,
  cyan: `#2aa198`,
  green: `#859900`,
};

const theme: PrismTheme = {
  plain: {
    color: colors.base1,
    backgroundColor: colors.base03,
  },
  styles: [
    {
      types: [`attr-name`, `comment`, `prolog`, `doctype`, `cdata`],
      style: {
        color: colors.base00,
        fontStyle: `italic`,
      },
    },
    {
      types: [`punctuation`],
      style: {
        color: colors.base01,
      },
    },
    {
      types: [`namespace`],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: [`property`, `boolean`, `number`, `constant`, `symbol`, `deleted`],
      style: {
        color: colors.magenta,
      },
    },
    {
      types: [`attr-value`, `selector`, `string`, `char`, `builtin`, `url`, `inserted`, `entity`],
      style: {
        color: colors.cyan,
      },
    },
    {
      types: [`atrule`, `keyword`],
      style: {
        color: colors.yellow,
      },
    },
    {
      types: [`tag`, `function`],
      style: {
        color: colors.blue,
      },
    },
    {
      types: [`regex`, `important`, `variable`, `class-name`],
      style: {
        color: colors.orange,
      },
    },
    {
      types: [`important`, `bold`],
      style: {
        fontWeight: `bold`,
      },
    },
    {
      types: [`italic`],
      style: {
        fontStyle: `italic`,
      },
    },
    {
      types: [`entity`],
      style: {
        cursor: `help`,
      },
    },
  ],
};

const padding = `1.5rem`;
const langPadding = `0.8rem`;

const CodeSnippet = ({ codeString, className, metastring = ``, children, ...props }: Props) => {
  const metaArgs = parseMetaString(metastring);
  const lineState = lineStateManager(metaArgs.highlight);
  let filename: string | undefined;
  if (metaArgs.filename && typeof metaArgs.filename === `string`) {
    filename = metaArgs.filename;
  }
  if (props.inline) {
    return (
      <span
        css={css`
          background-color: ${colors.base03};
          border-radius: 0.5rem;
          color: ${colors.base1};
          padding: 0.2rem 0.5rem;
          overflow: auto;
        `}
      >
        {codeString}
      </span>
    );
  }
  const { language } = props;
  return (
    <div
      css={css`
        color: ${colors.base1};
        font-family: 'Roboto Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-weight: 300;
      `}
    >
      <Highlight
        {...defaultProps}
        theme={theme}
        code={dedent(codeString)}
        language={language as Language}
        Prism={Prism as any as typeof RPrism}
      >
        {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
          <>
            <div
              css={css`
                background-color: ${colors.base03};
                border-top-left-radius: calc(${padding} / 2);
                border-top-right-radius: calc(${padding} / 2);
                margin-top: calc(${padding} / 2);
                padding-bottom: ${padding};
                overflow: auto;
              `}
            >
              <span
                css={css`
                  background-color: ${colors.blue};
                  color: ${colors.base03};
                  border-bottom-right-radius: calc(${langPadding} / 2);
                  padding: calc(${langPadding} / 2);
                  padding-left: ${langPadding};
                  padding-right: ${langPadding};
                  line-height: 3.2rem;
                `}
              >
                {filename || displayLang(language)}
              </span>
            </div>
            <div
              css={css`
                background-color: ${colors.base03};
                border-bottom-left-radius: calc(${padding} / 2);
                border-bottom-right-radius: calc(${padding} / 2);
                margin-bottom: calc(${padding} / 2);
                padding: ${padding};
                padding-top: 0;
                overflow: auto;
              `}
              className={className}
            >
              <pre
                css={css`
                  padding: 0;
                  margin: 0;
                  overflow: initial;
                  float: left;
                  min-width: 100%;

                  text-align: left;
                  white-space: pre;
                  word-spacing: normal;
                  word-break: normal;
                  word-wrap: normal;

                  line-height: 1.5;
                  tab-size: 4;

                  hyphens: none;

                  &::selection,
                  &::-moz-selection {
                    background-color: ${colors.base02};
                  }

                  .highlight-line {
                    background-color: #024658;
                    display: block;
                    margin-right: -${padding};
                    margin-left: -${padding};
                    padding-left: 0.8rem;
                    border-left: 0.8rem solid #027e9e;
                  }
                `}
                className={preClassName}
                style={style}
              >
                {tokens.map((lineIn, i) => {
                  const { highlight, skip, line } = lineState(lineIn, i);
                  const lineProps = getLineProps({ line, key: i });
                  if (skip) {
                    return null;
                  }
                  if (highlight) {
                    lineProps.className = `${lineProps.className} highlight-line`;
                  }
                  return (
                    <div {...lineProps}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
                {children}
              </pre>
            </div>
          </>
        )}
      </Highlight>
    </div>
  );
};

export default CodeSnippet;
