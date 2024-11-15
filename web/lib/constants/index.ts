export const DEFAULT_MATCHERS = {
  base64: /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+)/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  schoolEmail:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?!gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|aol\.com)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};
