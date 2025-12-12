/**
 * VCF download and sharing utilities
 */

import {
  IMAGE_FETCH_TIMEOUT_MS,
  LUCAS_BOT_CONTACT,
  VCF_FILENAME,
} from "./constants";
import { generateVCard, imageToBase64 } from "./generate-vcard";

/**
 * Downloads or shares a VCF file
 * - On mobile: attempts Web Share API first
 * - On desktop or fallback: triggers file download
 */
export async function downloadOrShareVCard(
  vcardContent: string,
  filename = VCF_FILENAME,
): Promise<void> {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Try Web Share API on mobile (better UX - opens native contact sheet)
  if (isMobile && navigator.share && navigator.canShare) {
    try {
      const file = new File([vcardContent], filename, {
        type: "text/vcard",
      });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Lucas AI Contact",
        });
        return;
      }
    } catch {
      // User cancelled or share failed - fall through to download
    }
  }

  // Standard download fallback
  const blob = new Blob([vcardContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Cleanup blob URL
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads/shares the Lucas AI bot contact card
 */
export async function downloadLucasContact(): Promise<void> {
  // Fetch and encode profile image (with timeout)
  const photoBase64 = await imageToBase64(
    LUCAS_BOT_CONTACT.photoPath,
    IMAGE_FETCH_TIMEOUT_MS,
  );

  const vcard = generateVCard({
    firstName: LUCAS_BOT_CONTACT.firstName,
    lastName: LUCAS_BOT_CONTACT.lastName,
    email: LUCAS_BOT_CONTACT.email,
    url: LUCAS_BOT_CONTACT.url,
    photoBase64: photoBase64 ?? undefined,
  });

  await downloadOrShareVCard(vcard, VCF_FILENAME);
}
