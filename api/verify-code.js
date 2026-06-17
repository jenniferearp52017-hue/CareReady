export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body || {};
  if (!code) {
    return res.status(400).json({ valid: false, error: "Missing code" });
  }

  const submitted = code.trim().toUpperCase();

  const OWNER_CODE = "JENNADMIN2026";
  if (submitted === OWNER_CODE) {
    return res.status(200).json({ valid: true, agencyName: "CareReady Admin" });
  }

  const validCodes = process.env.VALID_ACCESS_CODES || "";
  const entries = validCodes.split(",").map(e => e.trim()).filter(Boolean);

  for (const entry of entries) {
    const [c, ...nameParts] = entry.split(":");
    if (c && c.trim().toUpperCase() === submitted) {
      const agencyName = nameParts.join(":").trim() || "Agency";
      return res.status(200).json({ valid: true, agencyName });
    }
  }

  return res.status(200).json({ valid: false });
}
