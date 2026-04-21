interface CodeBlockProps {
  code: string;
}

const escapeHtml = (text: string) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

const highlightCode = (code: string) => {
  const escaped = escapeHtml(code);

  const withStrings = escaped
    .replace(
      /&quot;([^&]|&amp;|&quot;)*?&quot;|'([^'\\]|\\.)*?'/g,
      `<span class="token token-string">$&</span>`
    )
    .replace(
      /(#.*)$/gm,
      `<span class="token token-comment">$1</span>`
    )
    .replace(
      /\b(def|return|for|while|if|in|else|elif|and|or|not|is|None|True|False|break|continue)\b/g,
      `<span class="token token-keyword">$1</span>`
    )
    .replace(
      /\b(len|get|range|sum|enumerate|float|dict)\b/g,
      `<span class="token token-builtin">$1</span>`
    )
    .replace(/\b\d+\b/g, `<span class="token token-number">$&</span>`);

  return withStrings;
};

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="code-block-shell">
      <code
        className="code-block-shell__code"
        dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
      />
    </pre>
  );
}
