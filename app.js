const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxNFC3OBTDQMROx4Qe1IgAIBjfiRwRgRyColfeJUrlwrzI_1D3sPqUTQjZ56Iqeu_rBlg/exec";

const form = document.querySelector("#signup-form");
const status = document.querySelector("#form-status");
const submitFrame = document.querySelector('iframe[name="submit-frame"]');
let waitingForResponse = false;

submitFrame.addEventListener("load", () => {
  if (!waitingForResponse) return;
  waitingForResponse = false;
  form.querySelector('button[type="submit"]').disabled = false;
  status.textContent = "報名資料已送出，謝謝！";
  status.dataset.state = "success";
  form.reset();
  form.elements.participants.value = "1";
});

form.addEventListener("submit", (event) => {
  if (!SCRIPT_URL) {
    event.preventDefault();
    status.textContent = "報名系統尚未完成部署，請稍後再試。";
    status.dataset.state = "error";
    return;
  }

  event.preventDefault();
  status.textContent = "正在送出…";
  status.dataset.state = "pending";
  form.querySelector('button[type="submit"]').disabled = true;

  const payload = new FormData(form);
  const postForm = document.createElement("form");
  postForm.method = "post";
  postForm.action = SCRIPT_URL;
  postForm.target = "submit-frame";
  for (const [name, value] of payload.entries()) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    postForm.append(input);
  }
  waitingForResponse = true;
  document.body.append(postForm);
  postForm.submit();
  postForm.remove();
});