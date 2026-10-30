# 2027 員工旅遊報名

沖繩員工旅遊活動頁面，表單資料由 Google Apps Script 寫入 Google 試算表 `2026_旅遊報名表`。

## 部署

1. GitHub repository：[`2027_travel`](https://github.com/menglin0307/2027_travel)。只推送網站檔案，不加入 `spec/`。
2. 在 repository 的 **Settings → Pages** 選擇 `Deploy from a branch`、`main` 與 `/(root)`。
3. Apps Script 專案：[2027_travel](https://script.google.com/home/projects/1mmDVFhp3SLO_fClUSNz-T_yR4z3ggH014kVrgnH8bDp1LSE8QpujTxLu/edit)。
4. Web app：[開啟部署網址](https://script.google.com/macros/s/AKfycbxNFC3OBTDQMROx4Qe1IgAIBjfiRwRgRyColfeJUrlwrzI_1D3sPqUTQjZ56Iqeu_rBlg/exec)，執行身分為擁有者，存取權為所有人。
5. 表單資料會寫入試算表 `2026_旅遊報名表`；首次有效報名時建立，電話欄以純文字格式保存。

## 網站

GitHub Pages 網址：https://menglin0307.github.io/2027_travel/