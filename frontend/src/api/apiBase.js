const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const configuredBase = trimTrailingSlash(
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE
);

function resolveHostBase() {
  if (!configuredBase) return '';

  if (!import.meta.env.DEV && typeof window !== 'undefined') {
    try {
      const configuredOrigin = new URL(configuredBase).origin;
      const currentOrigin = window.location.origin;

      // In production static hosting, keep API same-origin and rely on /api rewrite.
      if (configuredOrigin !== currentOrigin) {
        console.warn(
          `Ignoring cross-origin API base (${configuredBase}) in production. Using same-origin /api.`
        );
        return '';
      }
    } catch {
      console.warn(
        `Invalid API base value (${configuredBase}). Using same-origin /api.`
      );
      return '';
    }
  }

  return configuredBase;
}

const hostBase = resolveHostBase();

export const API_BASE = hostBase ? `${hostBase}/api` : '/api';

export function buildApiUrl(path) {
  const normalizedPath = String(path || '').startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${normalizedPath}`;
}
