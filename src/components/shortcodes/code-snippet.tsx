/* @jsx jsx */
import rangeParser from 'parse-numeric-range';
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
  Prism as RPrism,
} from 'prism-react-renderer';
import Prism from 'prismjs';

import { jsx, css } from '../../util/emotionReact';

(typeof global !== `undefined` ? global : window).Prism = Prism;

require(`prismjs/components/prism-rust`);
require(`prismjs/components/prism-c`);
require(`prismjs/components/prism-glsl`);
require(`prismjs/components/prism-markup-templating`);
require(`prismjs/components/prism-handlebars`);

// Create a closure that determines if we have
// to highlight the given index
const calculateLinesToHighlight = (meta: string) => {
  const RE = /{([\d,-]+)}/;
  if (RE.test(meta)) {
    const strlineNumbers = RE.exec(meta)![1];
    const lineNumbers = rangeParser(strlineNumbers);
    return (index: number) => lineNumbers.includes(index + 1);
  }
  return () => false;
};

interface Props {
  codeString: string;
  language: Language;
  metastring: string;
}

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

const CodeSnippet = ({ codeString, language, metastring }: Props) => {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={codeString}
      language={language}
      Prism={Prism as any as typeof RPrism}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div
          css={css`
            background-color: ${colors.base03};
            border-radius: 0.3em;
            margin: 0.4em 0;
            padding: 0.8em;
            overflow: auto;
          `}
        >
          <pre
            css={css`
              padding: 0;
              margin: 0;
              overflow: initial;
              float: left;
              min-width: 100%;

              color: ${colors.base1};
              font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
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
                margin-right: -1em;
                margin-left: -1em;
                padding-right: 1em;
                padding-left: 0.75em;
                border-left: 0.25em solid #027e9e;
              }
            `}
            className={className}
            style={style}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              if (shouldHighlightLine(i)) {
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
          </pre>
        </div>
      )}
    </Highlight>
  );
};

export default CodeSnippet;
