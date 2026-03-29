const dedent = (code: string) => {
  const lines = code.split(`\n`);
  let minIndent: number | undefined;
  lines.forEach((l) => {
    const m = l.match(/^(\s*)\S+/);
    if (m) {
      const indent = m[1].length;
      if (!minIndent) {
        minIndent = indent;
      } else {
        minIndent = Math.min(minIndent, indent);
      }
    }
  });

  let result = code;
  if (minIndent) {
    result = lines.map((l) => (l[0] === ` ` ? l.slice(minIndent) : l)).join(`\n`);
  }

  return result.trim().replace(/\\n/g, `\n`);
};

export default dedent;
