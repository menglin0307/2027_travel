# 2027 員工旅遊報名

沖繩員工旅遊活動頁面，表單資料由 Google Apps Script 寫入 Google 試算表 `2027_travel`。

## 部署

1. GitHub repository：[`2027_travel`](https://github.com/menglin0307/2027_travel)。只推送網站檔案，不加入 `spec/`。
2. 在 repository 的 **Settings → Pages** 選擇 `Deploy from a branch`、`main` 與 `/(root)`。
3. 建立新的 Google Apps Script 專案，貼入 `Code.gs` 並儲存。
4. 選擇 **Deploy → New deployment → Web app**，執行身分選自己，存取權選任何人，完成 Google 授權後部署。
5. 將 Web app URL 貼到 `app.js` 的 `SCRIPT_URL`，提交並推送變更。
6. Apps Script 第一次收到有效報名時會建立試算表，名稱為 `2027_travel`；電話欄會以純文字格式保存。

## 網站

GitHub Pages 網址：https://menglin0307.github.io/2027_travel/