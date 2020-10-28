function stripQuotes(str: string) {
  return str.replace(/['"]/g, "");
}

// I hate writing this and I really hate the fact that
// it will probably work well enough.
/**
 * Get all numeric cvar name/value pairs from a config file.
 * @param cfgFile Config file
 */
export default function parseCfgFile(
  cfgFile: string
): Array<{ cvar: string; value: number }> {
  const txt = cfgFile.replace(/\/\/.*$/g, "");
  const expressions = txt.split(/[;\n]/g);
  // Get all expressions with 2 arguments...
  // Then try to parse them as cvarname,value pairs.
  return expressions
    .filter((e) => !!e)
    .map((e) => e.split(/\s+/))
    .filter((cmd) => cmd.length === 2)
    .map(([cvar, value]) => ({
      cvar: stripQuotes(cvar),
      value: stripQuotes(value),
    }))
    .filter(({ value }) => /^[\d.]+$/.test(value))
    .map(({ cvar, value }) => ({ cvar, value: parseFloat(value) }))
    .filter(({ value }) => !isNaN(value));
}
