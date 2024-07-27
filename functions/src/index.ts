import * as functions from "firebase-functions";

const webhookUrl = functions.config().discord.webhook_url;

export const sendDiscordAlert = functions.https.onRequest(
  async (req: functions.Request, res: functions.Response) => {
    const message = req.body.message;
    if (!message) {
      res.status(400).send("No message provided");
      return;
    }
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      res.status(200).send("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).send("Error sending message");
    }
  }
);
