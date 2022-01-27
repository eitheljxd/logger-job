const express = require("express");
import * as ticketController from "../controllers/index";
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "pdm-logger",
    private_key_id: "a4afede48e5a0a4504a512f76af0f109b9c439f5",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCraXZuZCgmPWKW\npOOTwgiJUz3gZSqbyH7RQNtNUYfqg0lcFsPt1r8sdY6RaBkAJd0lezqYDmrAtGgP\nw7ti6Wzra/pVTmL/88DyUcY0xErXEw8f+otjUGn3gHpuoQu+xJhlMvuUCmZF5no8\nKUa1netGc+M78kihP41UtOC4lgXFJoRAyi3KYQQG/4EInIMRSluVBtlXWEOpZR9h\nqSTS6UiiVXg9oDQOq1bgMuiyVAe28PJa6VVTx7hxgbfv3+EtiKKNAHhEggBBEukT\nFkGUCgyM0vGLKK8KcqKetM3gQSaqX48+ibSmcXbGHndpTdZpDXvOJx3BN3B5ZshG\nwTtfc0KpAgMBAAECggEAFtaN23vHvP89GqeB1NwriVRzGunlE+184WzRQKDQyZul\naLogb8NxeZR4zYHU9ufp6kZcEl9gCiiJ8YkZdz507ycAqwtZyxK940Cm9mfYNYYK\nDq+HO9ET1VCjv11WCcb61lzvwmk3oto9m19qgY82sOPcOPlOg6wf11M5hQ55Wqt6\nDfuC8f2Cm2WWhq2mQjbDfclV5Vlt7FGyac/CiimuXwgiqgh5ay3Vl75jxfA7wacN\nC+HR52eICYoY0tZr8EwVuquMwCgfJuMhXOSx/JGdGI5UbOkjS5CiIhURfRIryFk2\na1TkZbekVWE6VWIeKJIUYROq/wiyWzIiFsQoMk41GwKBgQDrK6xSHWU6fTADPmf4\nDPKiLb55rRtv7j9TvZkhXebndeDksib8WnMWSCkRXV4AwAQC29TG5DPpkc1x7SQO\nqifXmwsWIScVtOwrlx09DTK5jc4VUYIbdNx56WkEDKDYa+dXUyKxgeVipMBuzte0\nJ8yYRcbWSOebGnnDDJ6ccb57awKBgQC6mBuKCicRTACe75NfviFZE+DHLTTPdT6+\nQIcXzRf7J8dp3URGi08Nw5JB4iqKMgCInxg3t2OMJ1u98pyB6VwwZcVqoR+WSEgY\nw+SbKOm8aLPsbRZYa2UobaCMsIwiXnmpbYVxSs5YetHVYGxJX89+OsFZVphp1yKJ\neAw0EgOzOwKBgQCOZLlIVyguDBMAQ88sMJrRfCUzA4/zbCzIBassuvDPAV8U2pIk\nhpfczACh1QjQJ3PGT1k8vHx6VqAw9Ue54WmScPx7f8Nsr0m48xzvFIi8NZKs8dd3\nzICbCKtfmk3h/SPsihgdpus/mUYzUebl3JtTMBy/LxGdpqBHa+K2E2Ek1QKBgFT3\nAkM/ED8ODpJQoRjNqL25EXdgnFWDG8jh9SHfX/YbTPBlsrs0oBCyZxzc8WXwEtIj\nL5HfTdL58QpzONTm//WBwf0l1Q5HZ5zvRl9op9YFDzivC6fDb1KTaLHnikf0IQ4H\nMuY9m+wqMPYqa+SVXhQqiPQ3PDulnLJgGZ50PX8VAoGAAhivZXGdABuUn3TV8WZD\nCyKb6alEkgFGw/zd8j+iGu81jH0nWbn2+KW8kuWY4+q5lbwbtOXoM8w6KyT/UL16\n2GR7phHY/nljVUJI/AWF+QNMZsmGiFTcS1r6zyPZFWeplK7HFu5v8nNylZbNzPZm\nhrOHZjOV0Po/QNblKABx/x8=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-g1aol@pdm-logger.iam.gserviceaccount.com",
    client_id: "112922366708952730892",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-g1aol%40pdm-logger.iam.gserviceaccount.com",
  }),
});

const routes = express.Router({
  mergeParams: true,
});

routes.get("/", async (req, res) => {
  const results = await ticketController.getAll();
  console.log("results", results);
  console.log("results.length", results.length);

  if (results.length > 0) {
    results.forEach((element) => {
      console.log("element", element);
      const message = {
        notification: {
          body: `You have a ticket that will start soon.`,
          title: `Start the ticket ${element.ti_code}`,
        },
        token: element.utf_token,
      };
      console.log("message", message);

      admin
        .messaging()
        .send(message)
        .then((response) => {
          // Response is a message ID string.
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
    });
  }
  console.log("results.end", true);
  return res.status(200).send(results);
});

module.exports = {
  routes,
};
