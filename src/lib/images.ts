export function heroSrcSet(base: string): string {
  return `${base}-sm.webp 720w, ${base}-md.webp 1280w, ${base}-lg.webp 1920w`;
}

export function backgroundSrcSet(base: string): string {
  return `${base}-sm.webp 480w, ${base}-md.webp 1280w, ${base}-lg.webp 1920w`;
}

export function responsiveSrc(base: string): string {
  return `${base}-md.webp`;
}
