const SHEET_NAME = "2026_旅遊報名表";
const HEADERS = ["姓名", "Email", "單位", "電話", "職稱", "參加人數", "報名時間"];

function doPost(event) {
  const data = event && event.parameter ? event.parameter : {};
  if (data.website) return output_("已收到");

  const name = clean_(data.name, 80);
  const email = clean_(data.email, 160);
  const phone = clean_(data.phone, 30);
  if (!name || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return output_("資料格式不正確，請返回表單檢查。");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const row = sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, HEADERS.length).setNumberFormat("@");
    sheet.getRange(row, 1, 1, HEADERS.length).setValues([[
      name,
      email,
      clean_(data.department, 100),
      phone,
      clean_(data.title, 100),
      clean_(data.participants, 3) || "1",
      new Date().toISOString()
    ]]);
  } finally {
    lock.releaseLock();
  }

  return output_("報名完成，謝謝！");
}

function getSheet_() {
  const properties = PropertiesService.getScriptProperties();
  const savedId = properties.getProperty("SIGNUP_SHEET_ID");
  let spreadsheet = savedId ? SpreadsheetApp.openById(savedId) : null;

  if (!spreadsheet || spreadsheet.getName() !== SHEET_NAME) {
    spreadsheet = SpreadsheetApp.create(SHEET_NAME);
    properties.setProperty("SIGNUP_SHEET_ID", spreadsheet.getId());
  }

  let sheet = spreadsheet.getSheets()[0];
  sheet.setName("報名資料");
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  sheet.getRange("D:D").setNumberFormat("@");
  return sheet;
}

function clean_(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function output_(message) {
  return ContentService.createTextOutput(message).setMimeType(ContentService.MimeType.TEXT);
}