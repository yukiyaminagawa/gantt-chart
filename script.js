//１日あたりの幅
const DAY_WIDTH = 40;

//プロジェクトの基準日
const baseDate = new Date("2026-03-01");

//タスクデータ
const tasks = [
  { title: "JS復習", start: "2026-03-03", end: "2026-03-08" },
  { title: "修論修正", start: "2026-03-05", end: "2026-03-15" },
  { title: "ガント改善", start: "2026-03-12", end: "2026-03-18" },
];

//日数計算関数
function getDays(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  return (e.getTime() - s.getTime()) / 86400000;
}

//開始日から基準日までの日数
function getOffset(start) {
  const s = new Date(start);
  return (s - baseDate) / 86400000;
}
const DAYS_TO_SHOW = 30;
const gantt = document.querySelector("#gantt");

function render() {
  gantt.innerHTML = "";
  gantt.style.width = DAYS_TO_SHOW * DAY_WIDTH + "px";

  //１日ごとの線を追加
  gantt.style.width = DAYS_TO_SHOW * DAY_WIDTH + "px";
  for (let i = 0; i < DAYS_TO_SHOW; i++) {
    //縦線
    const line = document.createElement("div");
    line.style.position = "absolute";
    line.style.left = i * DAY_WIDTH + "px";
    line.style.top = "0";
    line.style.width = "1px";
    line.style.height = "100%";
    line.style.background = "#eee";
    gantt.appendChild(line);

    //ラベル追加
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);

    const label = document.createElement("div");
    label.textContent = date.getMonth() + 1 + "/" + date.getDate();

    label.style.position = "absolute";
    label.style.left = i * DAY_WIDTH + "px";
    label.style.top = "0px";
    label.style.width = DAY_WIDTH + "px";
    label.style.textAlign = "center";
    label.style.fontSize = "12px";

    gantt.appendChild(label);
  }

  //タスクの追加
  tasks.forEach((task, index) => {
    const duration = getDays(task.start, task.end);
    const offset = getOffset(task.start);

    const div = document.createElement("div");
    div.className = "task";
    div.textContent = task.title;

    div.style.width = duration * DAY_WIDTH + "px";
    div.style.left = offset * DAY_WIDTH + "px";
    div.style.top = 30 + index * 50 + "px";

    gantt.appendChild(div);
  });

  //今日ラインを作成する
  const today = new Date();
  //今日と基準日の差（日数）
  const diff = Math.floor((today - baseDate) / 86400000);

  const todayBox = document.createElement("div");
  todayBox.style.position = "absolute";
  todayBox.style.left = diff * DAY_WIDTH + "px";
  todayBox.style.top = "0";
  todayBox.style.width = DAY_WIDTH + "px";
  todayBox.style.height = gantt.clientHeight + "px";
  todayBox.style.border = "2px solid red";
  todayBox.style.boxSizing = "border-box";
  todayBox.style.pointerEvents = "none";
  todayBox.style.background = "rgba(255,80,80,0.08)";

  gantt.appendChild(todayBox);
}

const saved = localStorage.getItem("tasks");
if (saved) {
  tasks.length = 0;
  tasks.push(...JSON.parse(saved));
}
render();

const titleInput = document.querySelector("#titleInput");
const startInput = document.querySelector("#startInput");
const endInput = document.querySelector("#endInput");
const addBtn = document.querySelector("#addBtn");

addBtn.addEventListener("click", () => {
  const newTask = {
    title: titleInput.value,
    start: startInput.value,
    end: endInput.value,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();

  titleInput.value = "";
  startInput.value = "";
  endInput.value = "";

  console.log(localStorage.getItem("tasks"));
});
