import { env } from "@/env.mjs";
import { generateAllMissingDiffs } from "@/lib/generateAllMissingDiffs";
import { type NextApiHandler } from "next";
import crypto from "node:crypto";
import { z } from "zod";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const signature =
    "sha256=" +
    crypto
      .createHmac("sha256", env.WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");

  // Authenticate webhook
  if (req.headers["x-hub-signature-256"] !== signature) {
    return res.status(401).json({ success: false });
  }

  const eventSchema = z.object({
    action: z.enum(["published", "created", "released"]),
    release: z.object({ name: z.string() }),
  });

  const event = eventSchema.safeParse(req.body);

  if (!event.success) {
    return res.status(400).json({ success: false });
  }

  if (event.data.action !== "released") {
    //Ignore other events, we will just use the "released" event
    return res.status(200).json({ success: true });
  }

  res.status(200).json({
    success: true,
  });

  console.log(
    `Detected new release: ${event.data.release.name}. Generating diffs...`
  );

  try {
    await generateAllMissingDiffs()
    console.log("Done!");
  } catch (error) {
    console.error(error);
  }
};

export default handler;
