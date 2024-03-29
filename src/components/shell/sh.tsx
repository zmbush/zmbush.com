import { StaticImage } from 'gatsby-plugin-image';
import * as React from 'react';

const commands: { [key: string]: (...args: any[]) => React.ReactNode } = {
  echo: (...args: any[]) => args.join(` `),

  cat: () => `Meow!`,

  _10: () => [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, `Blastoff!`].join(`\n`),

  emacs: () => `I'd rather not...`,

  vim: () => `I would love to`,

  hello: () => `Hi!`,

  molly: () => `Let's stay happy forever`,

  love: () => <StaticImage src='./molly-and-me.jpg' alt='Molly and Me' />,

  bunnies: () => {
    const imgs = [
      `http://25.media.tumblr.com/797ca7857d59a583c48bd3bdf399587a/tumblr_mkbsuybwbx1s4n655o1_250.gif`,
      `http://25.media.tumblr.com/556ece8d2e8a37778a669fec46cfc048/tumblr_mk5wu4khsl1s2g4gpo1_500.gif`,
      `http://25.media.tumblr.com/ac4cba33c1911ee5bca6e1d6eccc8848/tumblr_mk03o8tA8I1s5fgmlo1_500.gif`,
      `http://25.media.tumblr.com/42be686f0a3d3d3ba1f79884941ae212/tumblr_mjjmwtfb0i1s23il0o1_250.gif`,
      `http://media.tumblr.com/c5c16cd17c48cdeb5ea946c6dec3ec4d/tumblr_inline_mjh6nnIzUU1qa3yy9.gif`,
      `http://25.media.tumblr.com/b34d516ad3c8b5cc60a4b1e0e829d3f3/tumblr_mjf5id4UDO1s2g4gpo1_500.gif`,
      `http://25.media.tumblr.com/d5e5d7f09078b318652400ac836c3a92/tumblr_mjf4umnVW91s2g4gpo1_500.gif`,
      `http://24.media.tumblr.com/d6555aee4cfe75dbad720cb754e09679/tumblr_mj64zt00qb1s5fgmlo1_500.gif`,
    ];
    const img = imgs[Math.floor(Math.random() * imgs.length)];
    return <img src={img} alt='bunny' />;
  },

  help: () => {
    const commandNames = Object.getOwnPropertyNames(commands).map((cmd) => {
      if (cmd[0] === `_`) {
        return cmd.slice(1);
      }
      return cmd;
    });
    commandNames.sort();
    return (
      <div>
        Available Commands:{` `}
        {commandNames.map((cmd) => (
          <span>{cmd} </span>
        ))}
      </div>
    );
  },
};

const Sh = {
  resultOf(command: string) {
    const [binary, ...args] = command.split(` `);
    if (typeof commands[binary] === `function`) {
      return commands[binary](...args);
    }
    if (typeof commands[`_${binary}`] === `function`) {
      return commands[`_${binary}`](...args);
    }
    if (binary === ``) {
      return ``;
    }
    return `${binary}: command not found`;
  },
};

export default Sh;
