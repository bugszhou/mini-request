export default function isAbsoluteURL(url: string | undefined): boolean {
  return /^([a-z][a-z\d+-.]*:)?\/\//i.test(url || "");
}
