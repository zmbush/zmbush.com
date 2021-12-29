/* @jsx jsx */
import * as React from 'react';

import { jsx, css } from '../util/emotionReact';

interface Props {
  options: string[];
  typeSpeed?: number;
  lingerTime?: number;
}

const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

const Cursor = ({ v, typing }: { v: string; typing: boolean }) => {
  if (typing) {
    return <span>{v}</span>;
  }
  return (
    <div
      css={css`
        @keyframes blink {
          from,
          to {
            color: transparent;
          }
          50% {
            color: inherit;
          }
        }

        display: inline;
        animation: 1s blink step-end infinite;
      `}
    >
      {v}
    </div>
  );
};

const TypeOut = ({ options, typeSpeed = 50, lingerTime = 2000 }: Props) => {
  const data = React.useRef({
    running: false,
    currentText: options[0],
    selection: 0,
    deleting: false,
  });
  const [displayText, setDisplayText] = React.useState(options[0]);

  React.useEffect(() => {
    data.current.selection = 0;
  }, [options]);

  React.useEffect(() => {
    (async () => {
      if (data.current.running) {
        return;
      }
      data.current.running = true;
      if (!data.current.deleting && data.current.currentText === options[data.current.selection]) {
        await sleep(lingerTime);
        data.current.selection += 1;
        data.current.selection %= options.length;
        data.current.deleting = true;
      }
      if (data.current.deleting) {
        if (options[data.current.selection].startsWith(data.current.currentText)) {
          data.current.deleting = false;
        } else {
          await sleep(typeSpeed);
          data.current.currentText = data.current.currentText.slice(
            0,
            data.current.currentText.length - 1,
          );
        }
      }
      if (!data.current.deleting) {
        await sleep(typeSpeed);
        data.current.currentText = options[data.current.selection].slice(
          0,
          data.current.currentText.length + 1,
        );
      }
      data.current.running = false;
      setDisplayText(data.current.currentText);
    })();
  }, [displayText]);

  const completed = data.current.currentText === options[data.current.selection];
  return (
    <>
      {displayText}
      <Cursor v='_' typing={!completed} />
    </>
  );
};

export default TypeOut;
