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
 * - On iOS: uses direct download (opens native "Add to Contact" directly)
 * - On Android: attempts Web Share API (better UX)
 * - On desktop or fallback: triggers file download
 */
export async function downloadOrShareVCard(
  vcardContent: string,
  filename = VCF_FILENAME,
): Promise<void> {
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  // On Android, try Web Share API (opens native contact picker)
  // Skip on iOS - Web Share API shows share sheet first, but direct download
  // triggers Safari's native vCard handling which goes straight to "Add to Contact"
  if (isAndroid && navigator.share && navigator.canShare) {
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

  // Direct download - on iOS Safari this opens "Add to Contact" directly
  const blob = new Blob([vcardContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Cleanup blob URL after a short delay to ensure iOS processes the download
  if (isIOS) {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } else {
    URL.revokeObjectURL(url);
  }
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
