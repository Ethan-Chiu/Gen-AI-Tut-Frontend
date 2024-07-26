/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string
  readonly VITE_BACKEND_USER: string
  readonly VITE_BACKEND_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
