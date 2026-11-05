/** Placeholder hook for an image CDN; returns the URL unchanged. */
export function optimizeImage(url: string): string {
  return url
}

export function imageSrcSet(url: string, widths: number[] = [400, 800, 1200]): string {
  return widths.map((w) => `${optimizeImage(url)} ${w}w`).join(', ')
}
