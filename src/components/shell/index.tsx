import * as React from 'react';

import Command from './Command';
import Sh from './sh';

const Shell = () => {
  const [sh, _] = React.useState(Sh);
  const [previousCommands, setPreviousCommands] = React.useState<string[]>([]);
  const [input, setInput] = React.useState(``);

  const handleKeyPress = React.useCallback(
    (e: KeyboardEvent) => {
      switch (e.which) {
        case 8:
          return false;
        case 13:
          setPreviousCommands([...previousCommands, input]);
          setInput(``);
          break;
        default:
          setInput(input + String.fromCharCode(e.which));
      }
      return undefined;
    },
    [setPreviousCommands, input, setInput],
  );

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      switch (e.which) {
        case 8:
          if (input.length > 0) {
            setInput(input.substring(0, input.length - 1));
          }
          break;
        default:
          break;
      }
    },
    [input, setInput],
  );

  React.useEffect(() => {
    document.addEventListener(`keypress`, handleKeyPress);
    document.addEventListener(`keydown`, handleKeyDown);

    return () => {
      document.removeEventListener(`keypress`, handleKeyPress);
      document.removeEventListener(`keydown`, handleKeyDown);
    };
  }, [handleKeyPress, handleKeyDown]);

  React.useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [previousCommands]);

  return (
    <div>
      {previousCommands.map((c) => (
        <Command key={`${c}`} sh={sh} command={c} />
      ))}
      $ {input}
    </div>
  );
};

export default Shell;
