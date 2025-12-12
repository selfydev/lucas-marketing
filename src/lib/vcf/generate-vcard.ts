/**
 * VCF (vCard 3.0) generation utilities
 *
 * @see https://tools.ietf.org/html/rfc2426
 */

export interface VCardContact {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  url?: string;
  photoBase64?: string;
}

/**
 * Generates a vCard 3.0 formatted string from contact data
 */
export function generateVCard(contact: VCardContact): string {
  const fullName = contact.lastName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.firstName;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${fullName}`,
    `N:${contact.lastName};${contact.firstName};;;`,
  ];

  if (contact.phone) {
    lines.push(`TEL;TYPE=CELL:${contact.phone}`);
  }

  if (contact.email) {
    lines.push(`EMAIL:${contact.email}`);
  }

  if (contact.url) {
    lines.push(`URL:${contact.url}`);
  }

  if (contact.photoBase64) {
    lines.push(`PHOTO;ENCODING=b;TYPE=PNG:${contact.photoBase64}`);
  }

  lines.push("END:VCARD");

  // vCard spec requires CRLF line endings
  return lines.join("\r\n");
}

/**
 * Fetches an image and converts it to base64
 * Returns null if fetch fails or times out
 */
export async function imageToBase64(
  imagePath: string,
  timeoutMs: number,
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(imagePath, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        // Extract base64 portion after "data:image/png;base64,"
        const base64 = dataUrl.split(",")[1];
        resolve(base64 ?? null);
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}
