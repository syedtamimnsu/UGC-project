import * as Sentry from "@sentry/node";


Sentry.init({
  dsn: "https://464e0a0714135d7c0250f6112a7f68dc@o4511680001933312.ingest.de.sentry.io/4511680010059856",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
  sendDefaultPii: true,
});