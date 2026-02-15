//１日あたりの幅
const DAY_WIDTH = 40;

//プロジェクトの基準日
const baseDate = new Date("2026-02-01");

//タスクデータ
const tasks = [
  { title: "JS復習", start: "2026-02-03", end: "2026-02-08" },
  { title: "修論修正", start: "2026-02-05", end: "2026-02-15" },
  { title: "ガント改善", start: "2026-02-12", end: "2026-02-18" },
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
const DAYS_TO_SHOW = 20;
const gantt = document.querySelector("#gantt");

for (let i = 0; i < DAYS_TO_SHOW; i++) {
  const line = document.createElement("div");
  line.style.position = "absolute";
  line.style.left = i * DAY_WIDTH + "px";
  line.style.top = "0";
  line.style.width = "1px";
  line.style.height = "100%";
  line.style.background = "#eee";
  gantt.appendChild(line);
}

tasks.forEach((task, index) => {
  const duration = getDays(task.start, task.end);
  const offset = getOffset(task.start);

  const div = document.createElement("div");
  div.className = "task";
  div.textContent = task.title;

  div.style.width = duration * DAY_WIDTH + "px";
  div.style.left = offset * DAY_WIDTH + "px";
  div.style.top = index * 50 + "px";

  gantt.appendChild(div);
});
