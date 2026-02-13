/// <reference types="vite/client" />

// YAML module declarations for vite-plugin-yaml
declare module '*.yaml' {
  const value: unknown;
  export default value;
}

declare module '*.yml' {
  const value: unknown;
  export default value;
}
