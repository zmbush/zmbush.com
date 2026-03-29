import rangeParser from 'parse-numeric-range';

// Create a closure that determines if we have
// to highlight the given index
const calculateLinesToHighlight = (highlightParam: unknown | undefined) => {
  if (highlightParam && typeof highlightParam === `string`) {
    const RE = /[\d,-]+/;
    if (RE.test(highlightParam)) {
      const lineNumbers = rangeParser(highlightParam);
      return (index: number) => lineNumbers.includes(index + 1);
    }
  }
  return () => false;
};

// The token that prism-react-renderer uses
export type Token = {
  types: string[];
  content: string;
  empty?: boolean;
};

export const lastCommentToken = (line: Token[]) => {
  for (let i = line.length - 1; i >= 0; i -= 1) {
    if (line[i].content !== `` && line[i].types.includes(`comment`)) {
      return line[i];
    }
  }
  return null;
};

const lineStateManager = (highlightSpec: unknown | undefined) => {
  const shouldHighlightLine = calculateLinesToHighlight(highlightSpec);
  let highlightNextLine = false;
  let highlightStarted = false;
  let hideNextLine = false;
  let hideLines = false;
  let hideThisLine = (_: number) => false;
  let highlightThisLine = (_: number) => false;

  const lineState = (
    lineIn: Token[],
    i: number,
  ): { skip: boolean; highlight: boolean; line: Token[] } => {
    let line = lineIn;
    let highlight =
      shouldHighlightLine(i) || highlightThisLine(i) || highlightNextLine || highlightStarted;
    highlightNextLine = false;
    const commentToken = lastCommentToken(line);
    let skip = false;
    if (commentToken) {
      const c = commentToken.content;
      if (c.includes(`hide-line`)) {
        skip = true;
      }
      if (c.includes(`hide-next-line`)) {
        hideNextLine = true;
        skip = true;
      }
      if (c.includes(`hide-start`)) {
        hideLines = true;
        skip = true;
      }
      if (c.includes(`hide-end`)) {
        hideLines = false;
        skip = true;
      }
      {
        const m = c.match(/hide-range{([\d-,]+)}/);
        if (m) {
          const lineNumbers = rangeParser(m[1]);
          hideThisLine = (l: number) => lineNumbers.includes(l - i);
          skip = true;
        }
      }

      if (c.includes(`highlight-next-line`)) {
        highlightNextLine = true;
        skip = true;
      }
      if (c.includes(`highlight-start`)) {
        highlightStarted = true;
        skip = true;
      }
      if (c.includes(`highlight-end`)) {
        highlightStarted = false;
        skip = true;
      }
      if (c.includes(`highlight-line`)) {
        line = line.filter((l) => l !== commentToken);
        highlight = true;
      }

      {
        const m = c.match(/highlight-range{([\d-,]+)}/);
        if (m) {
          const lineNumbers = rangeParser(m[1]);
          highlightThisLine = (l: number) => lineNumbers.includes(l - i);
          skip = true;
        }
      }
    }
    if (hideNextLine || hideLines || hideThisLine(i)) {
      hideNextLine = false;
      skip = true;
    }
    return { highlight, skip, line };
  };

  return lineState;
};

export default lineStateManager;
