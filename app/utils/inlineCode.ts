// Audit text uses `backticks` for code. Escape everything else, then turn
// those into <code>, so the text can be rendered with v-html safely.
export function inlineCode(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}
