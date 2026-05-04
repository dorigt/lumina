/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional invite phrase (build-time). See `.env.example` and README. */
  readonly VITE_INVITE_CODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
