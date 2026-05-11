# Setup Checklist - Email Automation

## Your Google Sheets ID
✅ `1hMiSS6roznpbbMGQ1FKphs1uM9k0ZFxwINHYjsQpi8Y`

## Step 1: Deploy Google Apps Script (5 minutes)

1. Go to [script.google.com](https://script.google.com)
2. Click **+ New Project**
3. Copy all code from `/webinar-app/google-apps-script.js`
4. Paste into the script editor (replace everything)
5. Click **Save** (Ctrl+S)
6. Click **Deploy** → **New deployment**
7. Select **Type**: Web app
8. Set:
   - Execute as: YOUR_EMAIL
   - Who has access: Anyone
9. Click **Deploy**
10. **COPY the Deployment URL** (it starts with `https://script.google.com/macros/s/...`)
11. ✅ Keep this URL safe - you need it for the next step

## Step 2: Update Your React Component (2 minutes)

1. Open `src/MlMasterclass.jsx`
2. Find this line (around line 610):
   ```javascript
   const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbyjatdhcJUjGsy29V9JqlxiP7C1vEHBhJHEzXmnmVvDMaUmq0TGkKj6f9gZmnPtvAXj/exec";
   ```
3. Replace it with:
   ```javascript
   const SHEET_ENDPOINT = "YOUR_DEPLOYMENT_URL_HERE";
   ```
4. Paste the URL from Step 1 (the deployment URL)
5. Save the file

## Step 3: Test It (2 minutes)

1. Start your dev server: `npm start`
2. Go to your form on localhost
3. Fill it out with a test email
4. Click "Confirm my seat"
5. Check:
   - ✅ Success message appears
   - ✅ Email received in your inbox
   - ✅ Data in Google Sheets

## Done! 🎉

Once you complete these steps, every form submission will:
- Save to Google Sheets
- Send an automated confirmation email
- Show success message to the user

---

## Need Help?

**Email not sending?**
- Check Google Apps Script logs: View → Logs
- Most common: Spreadsheet ID is wrong (but we already set it!)

**Data not saving?**
- Check the deployment URL is correct
- Verify it matches what's in the React code

**Still stuck?**
- Check the DEPLOYMENT_GUIDE.md for troubleshooting
