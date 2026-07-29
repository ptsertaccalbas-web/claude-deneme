const SHEET_ID = "1rI94Lrzan--aqNyMB2WlL9W99bJFfnT-sUX7VcsxGNc";
const SHEET_NAME = "Waitlist";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Sheet bulunamadi: " + SHEET_NAME);

    const headers = ["Tarih", "Ad", "Soyad", "Telefon", "E-posta", "Firma", "Kaynak"];
    if (sheet.getLastRow() === 0) sheet.appendRow(headers);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name, data.surname, data.phone, data.email,
      data.company || "", data.source || "lumiai-website",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, msg: "LUMI AI Waitlist webhook aktif" }))
    .setMimeType(ContentService.MimeType.JSON);
}
