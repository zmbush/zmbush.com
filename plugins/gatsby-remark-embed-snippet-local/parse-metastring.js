const YAML = require(`yaml`);

const parseMetaString = (metaString) => {
  try {
    return Object.fromEntries(
      Object.entries(YAML.parse(metaString)).map(([k, v]) => {
        const match = k.match(/([^:]+):(.+)/);
        if (match && v === null) {
          const [, a, b] = match;
          return [a, b];
        }
        return [k, v];
      }),
    );
  } catch (e) {
    return { raw: metaString };
  }
};

module.exports = parseMetaString;
