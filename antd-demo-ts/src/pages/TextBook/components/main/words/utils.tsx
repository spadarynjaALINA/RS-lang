declare global {
  interface Window {
    words: string[];
  }
}

export function addWords(data: string): void {
  console.log(data);
  window.words.push(data);
  console.log(window.words);
}
