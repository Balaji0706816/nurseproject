export function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }
  
  export function domainLabel(d: string) {
    return d.charAt(0).toUpperCase() + d.slice(1);
  }
  