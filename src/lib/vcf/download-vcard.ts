/**
 * VCF download utilities
 *
 * Uses server-side VCF generation for optimal iOS Safari experience.
 * When the browser navigates to /api/contact/vcf, iOS Safari recognizes
 * the text/vcard content type and opens the contact preview directly,
 * without showing the share sheet or going through downloads.
 */

/**
 * Server endpoint that serves the Lucas AI contact vCard
 */
const VCF_ENDPOINT = "/api/contact/vcf";

/**
 * Downloads the Lucas AI contact card
 *
 * Navigates to the server endpoint which returns a properly formatted
 * VCF file with correct headers. This approach:
 * - Opens contact preview directly on iOS Safari (no share sheet)
 * - Works consistently across all platforms
 * - Includes the correct filename via Content-Disposition header
 */
export function downloadLucasContact(): void {
  window.location.href = VCF_ENDPOINT;
}
