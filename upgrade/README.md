# Upgrade T3 App

### Webhook test usage

Using the signature that Github sends in the header, you can test the webhook:

```bash
WEBHOOK_SIGNATURE=XXX npm run webhook:dev
```

This command will open [WebhookThing](https://webhookthing.com/) server from which you'll be able to run your webhook.
