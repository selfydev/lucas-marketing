/**
 * Server route to serve Lucas AI contact vCard
 *
 * This endpoint returns a properly formatted VCF file with correct headers,
 * allowing iOS Safari to open the contact preview directly without
 * going through the share sheet or downloads folder.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createFileRoute } from "@tanstack/react-router";

const LUCAS_CONTACT = {
  firstName: "Lucas",
  lastName: "\u{1F393}", // graduation cap emoji
  email: "lucas@meetlucas.ai",
  url: "https://meetlucas.ai",
} as const;

/**
 * Generates a vCard 3.0 formatted string
 */
function generateVCard(contact: {
  firstName: string;
  lastName: string;
  email?: string;
  url?: string;
  photoBase64?: string;
}): string {
  const fullName = contact.lastName
    ? `${contact.firstName} ${contact.lastName}`
    : contact.firstName;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${fullName}`,
    `N:${contact.lastName};${contact.firstName};;;`,
  ];

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
 * Reads image file and converts to base64
 */
async function getImageBase64(): Promise<string | null> {
  try {
    // In production, public assets are served from dist/public
    // In development, they're in the public folder
    const publicDir =
      process.env.NODE_ENV === "production"
        ? join(process.cwd(), "dist", "public")
        : join(process.cwd(), "public");

    const imagePath = join(publicDir, "assets", "lucas-contact-avatar3.png");
    const imageBuffer = await readFile(imagePath);
    return imageBuffer.toString("base64");
  } catch (error) {
    console.error("Failed to read contact avatar:", error);
    return null;
  }
}

export const Route = createFileRoute("/api/contact/vcf")({
  server: {
    handlers: {
      GET: async () => {
        const photoBase64 = await getImageBase64();

        const vcard = generateVCard({
          ...LUCAS_CONTACT,
          photoBase64: photoBase64 ?? undefined,
        });

        return new Response(vcard, {
          headers: {
            "Content-Type": "text/vcard; charset=utf-8",
            "Content-Disposition": 'attachment; filename="lucas.vcf"',
            "Cache-Control": "public, max-age=86400", // Cache for 24 hours
          },
        });
      },
    },
  },
});
