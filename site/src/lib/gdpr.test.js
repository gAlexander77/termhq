import { test } from "node:test";
import assert from "node:assert/strict";
import { needsConsent } from "./gdpr.js";

test("EU and UK zones are asked", () => {
  for (const tz of [
    "Europe/Berlin",
    "Europe/Paris",
    "Europe/Dublin",
    "Europe/London",
    "Europe/Warsaw",
    "Atlantic/Reykjavik",
    "Asia/Nicosia",
    "Atlantic/Canary",
    "Indian/Reunion",
  ]) {
    assert.equal(needsConsent(tz), true, tz);
  }
});

test("zones well outside the GDPR are not asked", () => {
  for (const tz of [
    "America/Chicago",
    "America/New_York",
    "America/Sao_Paulo",
    "Asia/Tokyo",
    "Asia/Kolkata",
    "Australia/Sydney",
    "Africa/Lagos",
    "Pacific/Auckland",
  ]) {
    assert.equal(needsConsent(tz), false, tz);
  }
});

// The direction a mistake is allowed to go: never track someone we cannot place.
test("a zone that names no place is asked rather than tracked", () => {
  for (const tz of [
    undefined,
    null,
    "",
    42,
    "Not/AZone", // no such zone
    "UTC", // what resistFingerprinting and the Tor Browser report for everyone
    "GMT",
    "Etc/UTC",
  ]) {
    assert.equal(needsConsent(tz), true, String(tz));
  }
});
