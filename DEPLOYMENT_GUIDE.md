# Google Apps Script Deployment Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "ML Masterclass Registrations"
3. Copy the **Spreadsheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - The ID is the long string between `/d/` and `/edit`

## Step 2: Set Up Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click **+ New Project**
3. Copy the entire code from `google-apps-script.js`
4. Paste it into the script editor
5. Replace `YOUR_SPREADSHEET_ID` with the ID from Step 1

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Select **Type**: Web app
3. Set the following:
   - **Execute as**: Your Google account
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the deployment URL (it will look like: `https://script.google.com/macros/s/AKfycbyz...../exec`)

## Step 4: Update Your React Form

Replace the `SHEET_ENDPOINT` in `MlMasterclass.jsx`:

```javascript
const SHEET_ENDPOINT = "YOUR_NEW_DEPLOYMENT_URL";
```

## Step 5: Test

1. Fill out the form on your website
2. Check:
   - ✅ Data appears in Google Sheets
   - ✅ Confirmation email is sent to the user's email
   - ✅ Success message displays on the form

## What Happens Now

When someone registers:
1. ✅ Their data is saved to Google Sheets
2. ✅ They automatically receive a confirmation email
3. ✅ You can track all registrations in one place

## Important Notes

- The script uses Google's built-in Gmail service (no additional credentials needed)
- Emails are sent from your Google account (appears as "UpskillAura" in the recipient's inbox)
- Google Apps Script has rate limits (100 emails/day per user), but you can request higher limits
- Always test with your own email first before going live

## Troubleshooting

If emails don't send:
1. Check the Apps Script execution logs (View → Logs)
2. Ensure the Google Sheets ID is correct
3. Verify your Google account has email access enabled
4. Check spam folder for test emails

## Need Help?

If you encounter issues, check the Google Apps Script logs for error messages. Most common issues are:
- Incorrect Spreadsheet ID
- Insufficient permissions on the Google Sheet
- Google account email access disabled
