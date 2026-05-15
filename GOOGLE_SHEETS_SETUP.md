# Football Camp Registration - Google Sheets Integration

## Setup Instructions

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Football Camp Registrations"
4. Add the following headers in row 1:
   - Timestamp
   - First Name
   - Last Name
   - Email
   - Phone
   - Age
   - Position
   - Experience
   - Emergency Contact
   - Emergency Phone

### 2. Create Google Apps Script
1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste the following:

**Note**: This updated script includes CORS headers to allow requests from your React app.

```javascript
function doPost(e) {
  try {
    // Open the spreadsheet by ID (replace with your actual spreadsheet ID)
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();

    // Get the data from the POST request
    const data = JSON.parse(e.postData.contents);

    // Add timestamp
    const timestamp = new Date();

    // Prepare the row data
    const rowData = [
      timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.age,
      data.position,
      data.experience,
      data.emergencyContact,
      data.emergencyPhone
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Registration submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');

  } catch (error) {
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
```

### 3. Replace the Spreadsheet ID
1. In the script, replace `YOUR_SPREADSHEET_ID_HERE` with your actual Google Sheet ID
2. You can find the ID in the URL of your Google Sheet: `https://docs.google.com/spreadsheets/d/YOUR_ID_HERE/edit`

### 4. Deploy the Web App
1. Click **Save** in the Apps Script editor
2. Click **Deploy → New deployment**
3. Select type **Web app**
4. Set **Execute as**: Me
5. Set **Who has access**: Anyone
6. Click **Deploy**
7. **Important**: Copy the **new Web app URL** that appears (it will be different from previous deployments)
8. If you already have a deployment, click **Deploy → Manage deployments** and create a **New deployment** to get the updated CORS-enabled URL

### 5. Update Environment Variables
1. In your React project, open the `.env` file
2. Replace `YOUR_SCRIPT_ID` in the `VITE_GOOGLE_SCRIPT_URL` with the deployment URL you copied

### 6. Test the Integration
1. Run your React app: `npm run dev`
2. Fill out and submit the form
3. Check your Google Sheet to see if the data was added

## Security Note
This setup allows anyone to submit data to your Google Sheet. For production use, consider adding authentication or CAPTCHA to prevent spam submissions.