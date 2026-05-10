type ValidateProps = {
  html: string;

  css: string;

  js: string;

  checks: string[];
};

export function validateCode({
  html,
  css,
  js,
  checks,
}: ValidateProps) {
  const combined = `
    ${html}
    ${css}
    ${js}
  `.toLowerCase();

  return checks.every((check) =>
    combined.includes(
      check.toLowerCase()
    )
  );
}