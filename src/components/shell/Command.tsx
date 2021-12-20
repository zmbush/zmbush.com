import * as React from 'react';

import Sh from './sh';

interface Props {
  sh: typeof Sh;
  command: string;
}

const Command = ({ sh, command }: Props) => {
  const [result, _] = React.useState(() => sh.resultOf(command));
  return (
    <div>
      $ {command}
      <br />
      <pre>{result}</pre>
    </div>
  );
};

export default Command;
