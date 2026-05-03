/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  /** Optional invite phrase (see `.env.example`). */
  readonly VITE_INVITE_CODE?: string
}

interface ImportMetaEnv {
  /** Optional invite phrase (build-time). See `.env.example` and README. */
  readonly VITE_INVITE_CODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
