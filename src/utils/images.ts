export function optimizeImage(url: string, _options?: { width?: number; height?: number }): string {
  return url
}

export function imageSrcSet(url: string, widths: number[] = [400, 800, 1200]): string {
  return widths.map(w => `${optimizeImage(url, { width: w })} ${w}w`).join(', ')
}