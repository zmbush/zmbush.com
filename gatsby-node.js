require(`ts-node`).register({
  compilerOptions: {
    module: `commonjs`,
    target: `es2017`,
  },
});

exports.createPages = require(`./lib/createPages`).default;

exports.onCreateNode = require(`./lib/onCreateNode`).default;
