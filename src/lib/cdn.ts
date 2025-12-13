const WIDTHS = [640, 768, 1024, 1280, 1536] as const;

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "::1"]);

function shouldUseNetlifyImages(): boolean {
  if (import.meta.env.DEV) {
    return false;
  }

  if (typeof window !== "undefined") {
    return !LOCAL_HOSTNAMES.has(window.location.hostname);
  }

  return true;
}

export function cdn(path: string, width: number): string {
  if (!shouldUseNetlifyImages()) {
    return path;
  }

  return `/.netlify/images?url=${encodeURIComponent(path)}&w=${width}`;
}

export function srcset(
  path: string,
  widths: readonly number[] = WIDTHS,
): string | undefined {
  if (!shouldUseNetlifyImages()) {
    return undefined;
  }

  return widths.map((w) => `${cdn(path, w)} ${w}w`).join(", ");
}
