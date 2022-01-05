require(`ts-node`).register({
  compilerOptions: {
    module: `commonjs`,
    target: `es2017`,
  },
});

exports.onCreateNode = require(`./util/onCreateNode`).default;
