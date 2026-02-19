declare module "*.svg" {
  const content: string;
  export default path;
}

declare module "*.webp" {
  const path: string;
  export default path;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export = classes;
}
