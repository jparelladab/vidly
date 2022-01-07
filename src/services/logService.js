// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";




const logInit = () => {
    // Sentry.init({
    //     dsn: "https://68784132280845f58fe2ad8b2fb08e53@o1109076.ingest.sentry.io/6137237",
    //     integrations: [new Integrations.BrowserTracing()],
      
    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0,
    //   });
}

const log = (exc) => {
    console.log(exc)
    // Sentry.captureException(exc);
}

export default {logInit, log};