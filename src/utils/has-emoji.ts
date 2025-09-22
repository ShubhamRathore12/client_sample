export function hasEmoji(text: string) {
  try {
    window.btoa(text);
    return false;
  } catch (error) {
    return true;
  }
}
