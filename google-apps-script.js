function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const p = e.parameter || {};

    // Append form data to sheet
    sheet.appendRow([
      new Date(),
      p.name || "",
      p.email || "",
      p.phone || "",
      p.role || "",
      p.source || "",
      p.timestamp || "",
    ]);

    // Send confirmation email to the user
    sendConfirmationEmail(p.name, p.email);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    Logger.log("Error: " + String(err));
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function sendConfirmationEmail(name, email) {
  Logger.log("sendConfirmationEmail called with: name=" + name + ", email=" + email);

  if (!email || !name) {
    Logger.log("Email or name is missing!");
    return;
  }

  const subject = "Seat Confirmed — ML Interview Prep Masterclass · 16 May";

  const body = `Dear ${name},

Thank you for registering for the ML Interview Prep Masterclass.

Here are your session details:

📅 Date: Saturday, 16 May 2026
🕖 Time: 7:00 – 9:00 PM IST

The meeting link and platform details will be shared 24 hours before the session. Keep an eye on your inbox.

Note: This is a live-only session. All registered attendees will receive the ML Interview Prep cheat-sheet pack within 24 hours of the session.

Join our community for session reminders, prep resources and all latest updates:

👉 https://chat.whatsapp.com/GsDV0SmB3NjAS4KV5gVKng

See you on 16 May.

Team UpskillAura`;

  try {
    Logger.log("Attempting to send email...");
    MailApp.sendEmail(email, subject, body);
    Logger.log("✓ Email sent successfully to: " + email);
  } catch (err) {
    Logger.log("✗ FAILED to send email to " + email);
    Logger.log("Error details: " + String(err));
  }
}

function doGet() {
  return ContentService.createTextOutput("ML Masterclass form endpoint is live.");
}
