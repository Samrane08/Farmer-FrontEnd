import SHA256 from "crypto-js/sha256";

export function generateDeviceFingerprint(): string {
  const screenData =
    typeof window !== "undefined" && window.screen
      ? `${window.screen.width}x${window.screen.height}`
      : "unknown";

  const navigatorData = [
    navigator.userAgent,
    navigator.platform,
    navigator.language,
    screenData,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency ?? "unknown"
  ].join("||");

  return SHA256(navigatorData).toString();
}
