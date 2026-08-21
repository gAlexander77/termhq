/**
 * Does this visitor have to be asked before Google Analytics loads?
 *
 * The site is prerendered and served as static files, so there is no request to
 * read a country from — `Astro.request.headers` is empty at build time and a
 * Cloudflare `CF-IPCountry` header never reaches the page. The browser's own
 * IANA time zone is the one locality signal available client-side, and it costs
 * no request, no third party, and nothing tracked to find out.
 *
 * The rule is deliberately blunt: **any European zone gets asked.** That
 * over-asks a handful of non-EU countries filed under `Europe/` — a Swiss or
 * Serbian visitor sees a banner they are not owed — and it never under-asks,
 * which is the only direction in which a mistake matters. Everything ambiguous
 * is asked for the same reason.
 */

/** EU/EEA territories whose zone does not begin with `Europe/`. */
const EEA_ELSEWHERE = new Set([
  "Atlantic/Reykjavik", // Iceland (EEA)
  "Arctic/Longyearbyen", // Svalbard (Norway, EEA)
  "Asia/Nicosia", // Cyprus
  "Asia/Famagusta", // Cyprus
  "Atlantic/Canary", // Spain
  "Africa/Ceuta", // Spain
  "Atlantic/Madeira", // Portugal
  "Atlantic/Azores", // Portugal
  "America/Martinique", // France, outermost regions from here down
  "America/Guadeloupe",
  "America/Cayenne",
  "Indian/Reunion",
  "Indian/Mayotte",
]);

/**
 * A zone that names no place. Firefox's `resistFingerprinting` and the Tor
 * Browser report UTC for everyone, which is a deliberate refusal to say where
 * the visitor is — and someone who has hardened their browser against
 * fingerprinting is the last person to track on a guess.
 */
const PLACELESS = /^(UTC|GMT|Etc\/)/;

/** False for a string that names no real zone. */
function isRealZone(timeZone) {
  try {
    new Intl.DateTimeFormat("en", { timeZone });
    return true;
  } catch {
    return false; // RangeError — no such zone
  }
}

/**
 * @param {unknown} timeZone An IANA zone, e.g. "Europe/Berlin".
 * @returns {boolean} True when the banner must be shown before GA4 loads.
 */
export function needsConsent(timeZone) {
  if (typeof timeZone !== "string" || timeZone === "") return true;
  if (timeZone.startsWith("Europe/") || EEA_ELSEWHERE.has(timeZone)) return true;
  if (PLACELESS.test(timeZone)) return true;
  return !isRealZone(timeZone);
}

/** The same question, asked of the browser. Any failure reads as "ask". */
export function visitorNeedsConsent() {
  try {
    return needsConsent(Intl.DateTimeFormat().resolvedOptions().timeZone);
  } catch {
    return true;
  }
}
