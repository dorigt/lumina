/**
 * Rebrand here: name, tagline, and PWA colors flow from this file into the app and `vite.config.ts`.
 * localStorage key stays stable so existing check-ins are not reset when you rename.
 */
export const APP_NAME = 'Lumina'
export const APP_SHORT_NAME = 'Lumina'
export const APP_TAGLINE = 'Light on your habits, day by day.'

export const APP_DESCRIPTION_PWA = `${APP_NAME}: build gentle consistency with daily and monthly goals — stored on your device.`

/** Browser / manifest theme (soft violet mist). */
export const THEME_COLOR_HEX = '#f5f3ff'
export const PWA_BACKGROUND_HEX = '#faf8ff'

/** Do not change lightly — existing users’ data is under this key. */
export const LOCAL_STORAGE_KEY = 'sproutly-v1'
