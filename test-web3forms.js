const WEB3FORMS_KEY = "908b36ba-c4b8-4c28-a053-1333a4e659a0";

const payload = {
  access_key: WEB3FORMS_KEY,
  subject: "New project inquiry from Automated Test — DIU Foundry",
  from_name: "DIU Foundry Website",
  replyto: "test@example.com",
  Name: "Automated Test User",
  Email: "test@example.com",
  Country: "Test Country",
  Organization: "Test Org",
  Role: "Tester",
  "Project Title": "Integration Test",
  "Project Description":
    "Testing the Web3Forms integration end-to-end to ensure fields map correctly.",
  Budget: "USD 15,000",
  Timeline: "1-3 months",
  "Additional Notes": "This is a test submission from the build validation script.",
  "Submission Time": new Date().toISOString(),
  botcheck: false,
};

async function test() {
  console.log("Sending payload to Web3Forms...");
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        Origin: "http://localhost:5173",
        Referer: "http://localhost:5173/forge",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response Body:", text);

    if (res.ok) {
      console.log("TEST SUCCESSFUL: Web3Forms accepted the payload.");
      process.exit(0);
    } else {
      console.error("TEST FAILED: Web3Forms rejected the payload.");
      process.exit(1);
    }
  } catch (err) {
    console.error("TEST FAILED: Network error", err);
    process.exit(1);
  }
}

test();
