/**
 * PeruServ — Interest Registration
 * Paste this into your Google Sheet's Apps Script editor (Extensions > Apps Script),
 * then deploy it as a Web App (Deploy > New deployment > Web app,
 * execute as "Me", access "Anyone"). Copy the web app URL into App.jsx
 * where it says APPS_SCRIPT_URL.
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers on first run
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Interested", "Email", "Language"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }

    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date().toLocaleString("en-SG"),
      data.interested ? "Yes" : "No",
      data.email || "",
      data.lang || "",
    ]);
  } catch (err) {
    // Log error without crashing so the response always returns ok
    console.error(err);
  }

  return ContentService.createTextOutput("ok");
}
