<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LIFE OS</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#080808;--surface:#0f0f0f;--surface2:#161616;--surface3:#1e1e1e;
  --border:#1a1a1a;--border2:#262626;
  --text:#e8e8e8;--text2:#777;--text3:#333;
  --accent:#fff;
  --green:#22c55e;--red:#ef4444;--yellow:#eab308;
  --blue:#3b82f6;--purple:#a855f7;--orange:#f97316;--cyan:#06b6d4;
  --r:12px;--rs:8px;
}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:'DM Mono',monospace;overflow-x:hidden;}
#app{display:flex;min-height:100vh;}
#sidebar{
  width:210px;background:var(--surface);border-right:1px solid var(--border);
  position:fixed;top:0;left:0;bottom:0;z-index:200;
  display:flex;flex-direction:column;transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);
}
#overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:199;}
@media(max-width:700px){
  #sidebar{transform:translateX(-100%);}
  #sidebar.open{transform:translateX(0);}
  #overlay.open{display:block;}
  #main{margin-left:0!important;}
  #menu-btn{display:flex!important;}
}
.brand{padding:22px 18px 16px;border-bottom:1px solid var(--border);}
.brand-name{font-family:'Syne',sans-serif;font-weight:800;font-size:17px;color:#fff;letter-spacing:-0.5px;}
.brand-sub{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--text3);margin-top:3px;}
.nav{flex:1;padding:12px 8px;display:flex;flex-direction:column;gap:2px;}
.nav-item{
  display:flex;align-items:center;gap:10px;
  padding:10px 12px;border-radius:var(--rs);
  cursor:pointer;transition:all 0.15s;
  font-size:12px;color:var(--text2);border:1px solid transparent;
}
.nav-item:hover{background:var(--surface2);color:var(--text);}
.nav-item.active{background:var(--surface3);color:#fff;border-color:var(--border2);}
.nav-icon{font-size:15px;width:20px;text-align:center;}
.nav-badge{
  margin-left:auto;font-size:9px;
  background:var(--surface3);border:1px solid var(--border2);
  padding:2px 6px;border-radius:20px;color:var(--text2);
}
.sidebar-footer{padding:14px 8px;border-top:1px solid var(--border);}
.date-chip{background:var(--surface2);border:1px solid var(--border2);border-radius:var(--rs);padding:10px 12px;font-size:10px;color:var(--text2);line-height:1.7;}
.date-chip .day{font-family:'Syne',sans-serif;font-weight:700;font-size:22px;color:#fff;line-height:1;}
#main{margin-left:210px;padding:28px 32px;min-height:100vh;}
@media(max-width:900px){#main{padding:20px 16px;}}
#menu-btn{display:none;position:fixed;top:14px;left:14px;z-index:300;background:var(--surface);border:1px solid var(--border2);border-radius:var(--rs);width:38px;height:38px;align-items:center;justify-content:center;cursor:pointer;font-size:16px;}
.section{display:none;}
.section.active{display:block;}
.page-header{margin-bottom:24px;}
.page-title{font-family:'Syne',sans-serif;font-weight:800;font-size:24px;letter-spacing:-1px;color:#fff;}
.page-sub{font-size:11px;color:var(--text2);margin-top:4px;}
.ph-row{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:24px;}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:18px;margin-bottom:14px;}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.card-title{font-family:'Syne',sans-serif;font-weight:700;font-size:14px;color:#fff;}
.card-sub{font-size:10px;color:var(--text2);margin-top:2px;}
.input{background:var(--surface2);border:1px solid var(--border2);border-radius:var(--rs);padding:10px 14px;font-family:'DM Mono',monospace;font-size:12px;color:#fff;outline:none;width:100%;transition:border-color 0.2s;}
.input:focus{box-shadow:0 0 0 2px rgba(255,255,255,0.04);}
.input::placeholder{color:var(--text3);}
select.input option{background:#1a1a1a;}
.row{display:flex;gap:10px;flex-wrap:wrap;}
.col{flex:1;min-width:110px;}
.btn{background:transparent;border:1px solid var(--border2);border-radius:var(--rs);padding:9px 18px;font-family:'DM Mono',monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--text2);cursor:pointer;transition:all 0.15s;white-space:nowrap;}
.btn:hover{background:var(--surface2);color:#fff;}
.btn-primary{background:#fff;color:#000;border-color:#fff;}
.btn-primary:hover{background:#e8e8e8;}
.btn-danger{border-color:rgba(239,68,68,0.3);color:var(--red);}
.btn-danger:hover{background:rgba(239,68,68,0.08);}
.btn-sm{padding:6px 14px;font-size:10px;}
.btn-icon{background:var(--surface2);border:1px solid var(--border2);border-radius:var(--rs);width:30px;height:30px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;transition:all 0.15s;color:var(--text2);}
.btn-icon:hover{background:var(--surface3);color:#fff;}
.check-item{display:flex;align-items:center;gap:12px;padding:11px 14px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);margin-bottom:8px;transition:all 0.15s;cursor:pointer;}
.check-item:hover{border-color:var(--border2);}
.check-item.done{opacity:0.4;}
.check-item.done .ci-label{text-decoration:line-through;}
.checkbox{width:20px;height:20px;border-radius:6px;border:1.5px solid var(--border2);background:transparent;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all 0.15s;font-size:11px;}
.check-item.done .checkbox{background:#fff;border-color:#fff;color:#000;}
.ci-info{flex:1;min-width:0;}
.ci-label{font-size:12px;color:var(--text);}
.ci-meta{font-size:10px;color:var(--text2);margin-top:2px;}
.ci-actions{display:flex;gap:6px;opacity:0;transition:opacity 0.15s;}
.check-item:hover .ci-actions{opacity:1;}
.tag{display:inline-flex;align-items:center;padding:3px 8px;border-radius:20px;font-size:10px;border:1px solid transparent;}
.tag-green{background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.2);color:var(--green);}
.tag-red{background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.2);color:var(--red);}
.tag-yellow{background:rgba(234,179,8,0.08);border-color:rgba(234,179,8,0.2);color:var(--yellow);}
.tag-blue{background:rgba(59,130,246,0.08);border-color:rgba(59,130,246,0.2);color:var(--blue);}
.tag-purple{background:rgba(168,85,247,0.08);border-color:rgba(168,85,247,0.2);color:var(--purple);}
.tag-orange{background:rgba(249,115,22,0.08);border-color:rgba(249,115,22,0.2);color:var(--orange);}
.progress-wrap{background:var(--surface3);border-radius:20px;height:6px;overflow:hidden;}
.progress-bar{height:100%;border-radius:20px;transition:width 0.4s;}
.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:10px;margin-bottom:14px;}
.stat-box{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:14px;text-align:center;}
.stat-val{font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:#fff;line-height:1;}
.stat-lbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--text2);margin-top:4px;}
.streak-row{display:flex;gap:4px;flex-wrap:wrap;}
.streak-dot{width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9px;color:var(--text3);border:1px solid var(--border);background:var(--surface2);transition:all 0.2s;}
.streak-dot.done{background:var(--green);border-color:var(--green);color:#000;}
.streak-dot.today{border-color:var(--text2);color:var(--text2);}
.water-grid{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0;}
.water-cup{width:38px;height:48px;border-radius:0 0 8px 8px;border:1.5px solid var(--border2);background:var(--surface3);cursor:pointer;transition:all 0.2s;position:relative;overflow:hidden;}
.water-cup.filled{border-color:rgba(59,130,246,0.5);}
.water-fill{width:100%;position:absolute;bottom:0;background:rgba(59,130,246,0.55);transition:height 0.3s;height:0;}
.water-cup.filled .water-fill{height:100%;}
.modal-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.82);z-index:500;align-items:center;justify-content:center;backdrop-filter:blur(4px);}
.modal-bg.open{display:flex;}
.modal{background:var(--surface);border:1px solid var(--border2);border-radius:var(--r);padding:24px;width:90%;max-width:420px;max-height:90vh;overflow-y:auto;}
.modal-title{font-family:'Syne',sans-serif;font-weight:700;font-size:16px;color:#fff;margin-bottom:18px;}
.form-group{margin-bottom:14px;}
.form-label{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--text2);margin-bottom:6px;display:block;}
.modal-actions{display:flex;gap:8px;margin-top:20px;justify-content:flex-end;}
.empty{text-align:center;padding:36px 20px;color:var(--text3);font-size:12px;}
.empty-icon{font-size:30px;margin-bottom:10px;}
#toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(80px);background:var(--surface3);border:1px solid var(--border2);border-radius:var(--rs);padding:10px 20px;font-size:12px;color:#fff;z-index:1000;transition:transform 0.3s;white-space:nowrap;box-shadow:0 8px 30px rgba(0,0,0,0.5);}
#toast.show{transform:translateX(-50%) translateY(0);}
.tabs{display:flex;gap:3px;background:var(--surface2);border-radius:var(--rs);padding:4px;margin-bottom:18px;flex-wrap:wrap;}
.tab{flex:1;padding:7px 4px;border-radius:6px;font-size:11px;text-align:center;cursor:pointer;color:var(--text2);transition:all 0.15s;white-space:nowrap;}
.tab.active{background:var(--surface3);color:#fff;}
.habit-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px 18px;margin-bottom:10px;}
.habit-header{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
.habit-icon{font-size:20px;}
.habit-name{font-family:'Syne',sans-serif;font-weight:700;font-size:14px;color:#fff;}
.habit-streak-label{font-size:10px;color:var(--text2);}
.habit-check-btn{margin-left:auto;width:36px;height:36px;border-radius:10px;border:1.5px solid var(--border2);background:var(--surface2);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;}
.habit-check-btn.done{background:var(--green);border-color:var(--green);}
.exercise-row{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);margin-bottom:8px;}
.ex-check{width:22px;height:22px;border-radius:6px;border:1.5px solid var(--border2);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:12px;flex-shrink:0;transition:all 0.15s;}
.ex-check.done{background:#fff;border-color:#fff;color:#000;}
.ex-name{flex:1;font-size:12px;}
.ex-meta{font-size:10px;color:var(--text2);}
.ex-del{opacity:0;transition:opacity 0.15s;background:none;border:none;color:var(--red);cursor:pointer;font-size:16px;line-height:1;}
.exercise-row:hover .ex-del{opacity:1;}
.goal-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:18px;margin-bottom:10px;}
.goal-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;}
.goal-name{font-family:'Syne',sans-serif;font-weight:700;font-size:14px;color:#fff;}
.goal-pct{font-family:'Syne',sans-serif;font-weight:800;font-size:22px;}
.goal-actions{display:flex;gap:6px;margin-top:12px;flex-wrap:wrap;}
.goal-step-btn{background:var(--surface2);border:1px solid var(--border2);border-radius:var(--rs);padding:6px 14px;font-size:11px;cursor:pointer;color:var(--text);transition:all 0.15s;font-family:'DM Mono',monospace;}
.goal-step-btn:hover{background:var(--surface3);}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px;}
</style>
</head>
<body>
<div id="app">
<div id="sidebar">
  <div class="brand">
    <div class="brand-name">LIFE OS</div>
    <div class="brand-sub">Your daily system</div>
  </div>
  <nav class="nav" id="nav">
    <div class="nav-item active" data-sec="dashboard"><span class="nav-icon">⚡</span>Dashboard</div>
    <div class="nav-item" data-sec="routine"><span class="nav-icon">📅</span>Routine<span class="nav-badge" id="routine-badge">0/0</span></div>
    <div class="nav-item" data-sec="workout"><span class="nav-icon">💪</span>Workout<span class="nav-badge" id="workout-badge">0/0</span></div>
    <div class="nav-item" data-sec="habits"><span class="nav-icon">✅</span>Habits<span class="nav-badge" id="habits-badge">0/0</span></div>
    <div class="nav-item" data-sec="goals"><span class="nav-icon">🧠</span>Goals</div>
    <div class="nav-item" data-sec="diet"><span class="nav-icon">🥗</span>Diet & Water</div>
    <div class="nav-item" data-sec="sleep"><span class="nav-icon">😴</span>Sleep</div>
  </nav>
  <div class="sidebar-footer">
    <div class="date-chip">
      <div class="day" id="sb-day"></div>
      <div id="sb-dow"></div>
      <div id="sb-month" style="color:var(--text3)"></div>
    </div>
  </div>
</div>
<div id="overlay"></div>
<div id="menu-btn">☰</div>
<div id="main">

<!-- DASHBOARD -->
<div class="section active" id="sec-dashboard">
  <div class="page-header">
    <div class="page-title" id="dash-greeting">Good morning 👋</div>
    <div class="page-sub" id="dash-date"></div>
  </div>
  <div class="stat-grid" id="dash-stats"></div>
  <div class="card">
    <div class="card-header">
      <div><div class="card-title">Today's Progress</div><div class="card-sub">All tasks combined</div></div>
      <span id="dash-overall-pct" class="tag tag-green">0%</span>
    </div>
    <div class="progress-wrap" style="height:8px;"><div class="progress-bar" id="dash-overall-bar" style="width:0%;background:#fff;"></div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
    <div class="card" id="dash-routine-preview"></div>
    <div class="card" id="dash-habit-preview"></div>
  </div>
  <div class="card" id="dash-workout-preview"></div>
</div>

<!-- ROUTINE -->
<div class="section" id="sec-routine">
  <div class="ph-row">
    <div><div class="page-title">Daily Routine</div><div class="page-sub">Check off tasks as you go</div></div>
    <button class="btn btn-primary btn-sm" onclick="openModal('routine-modal')">+ Add Task</button>
  </div>
  <div class="tabs">
    <div class="tab active" data-rtab="morning">🌅 Morning</div>
    <div class="tab" data-rtab="afternoon">☀️ Afternoon</div>
    <div class="tab" data-rtab="evening">🌙 Evening</div>
  </div>
  <div id="routine-list"></div>
  <div class="card" style="margin-top:4px;">
    <div class="card-header" style="margin-bottom:10px;">
      <div class="card-title">Completion</div>
      <span id="routine-pct-label" class="tag tag-green">0%</span>
    </div>
    <div class="progress-wrap"><div class="progress-bar" id="routine-progress" style="width:0%;background:var(--green);"></div></div>
  </div>
</div>

<!-- WORKOUT -->
<div class="section" id="sec-workout">
  <div class="ph-row">
    <div><div class="page-title">Workout</div><div class="page-sub">Track sets, reps & progress</div></div>
    <button class="btn btn-primary btn-sm" onclick="openModal('workout-modal')">+ Add Exercise</button>
  </div>
  <div class="tabs">
    <div class="tab active" data-wtab="today">Today</div>
    <div class="tab" data-wtab="push">Push</div>
    <div class="tab" data-wtab="pull">Pull</div>
    <div class="tab" data-wtab="legs">Legs</div>
    <div class="tab" data-wtab="cardio">Cardio</div>
  </div>
  <div id="workout-list"></div>
  <div class="card"><div class="card-header" style="margin-bottom:4px;"><div class="card-title">Session Stats</div></div><div class="stat-grid" style="margin-bottom:0;" id="workout-stats"></div></div>
</div>

<!-- HABITS -->
<div class="section" id="sec-habits">
  <div class="ph-row">
    <div><div class="page-title">Habit Tracker</div><div class="page-sub">Build streaks, one day at a time</div></div>
    <button class="btn btn-primary btn-sm" onclick="openModal('habit-modal')">+ New Habit</button>
  </div>
  <div id="habits-list"></div>
</div>

<!-- GOALS -->
<div class="section" id="sec-goals">
  <div class="ph-row">
    <div><div class="page-title">Goals</div><div class="page-sub">Track your self-improvement targets</div></div>
    <button class="btn btn-primary btn-sm" onclick="openModal('goal-modal')">+ New Goal</button>
  </div>
  <div id="goals-list"></div>
</div>

<!-- DIET -->
<div class="section" id="sec-diet">
  <div class="page-header"><div class="page-title">Diet & Water</div><div class="page-sub">Track nutrition and hydration</div></div>
  <div class="card">
    <div class="card-header">
      <div><div class="card-title">💧 Water Intake</div><div class="card-sub" id="water-sub">0 / 8 glasses</div></div>
      <div style="display:flex;gap:6px;">
        <div class="btn-icon" onclick="addWater(-1)">−</div>
        <div class="btn-icon" onclick="addWater(1)">+</div>
      </div>
    </div>
    <div class="water-grid" id="water-cups"></div>
    <div class="progress-wrap"><div class="progress-bar" id="water-bar" style="width:0%;background:var(--blue);"></div></div>
  </div>
  <div class="card">
    <div class="card-header"><div class="card-title">🥗 Meals Today</div><button class="btn btn-sm" onclick="openModal('meal-modal')">+ Log Meal</button></div>
    <div id="meal-list"></div>
  </div>
  <div class="card"><div class="card-header"><div class="card-title">Macros</div></div><div class="stat-grid" id="macro-stats"></div></div>
</div>

<!-- SLEEP -->
<div class="section" id="sec-sleep">
  <div class="page-header"><div class="page-title">Sleep Tracker</div><div class="page-sub">Log sleep for better recovery</div></div>
  <div class="card">
    <div class="card-header"><div class="card-title">Log Sleep</div></div>
    <div class="row" style="margin-bottom:14px;">
      <div class="col"><label class="form-label">Bedtime</label><input type="time" class="input" id="sleep-start" value="22:30"></div>
      <div class="col"><label class="form-label">Wake Up</label><input type="time" class="input" id="sleep-end" value="06:30"></div>
    </div>
    <div class="form-group">
      <label class="form-label">Quality</label>
      <select class="input" id="sleep-quality">
        <option value="5">😴 Amazing</option><option value="4">😊 Good</option>
        <option value="3" selected>😐 Okay</option><option value="2">😕 Poor</option><option value="1">😣 Terrible</option>
      </select>
    </div>
    <button class="btn btn-primary" onclick="logSleep()" style="width:100%;margin-top:4px;">Log Sleep</button>
  </div>
  <div class="card"><div class="card-header"><div class="card-title">History</div></div><div id="sleep-history"></div></div>
  <div class="card"><div class="card-header"><div class="card-title">Averages</div></div><div class="stat-grid" id="sleep-avg-stats"></div></div>
</div>

</div><!-- /main -->
</div><!-- /app -->

<!-- MODALS -->
<div class="modal-bg" id="routine-modal">
  <div class="modal">
    <div class="modal-title">Add Routine Task</div>
    <div class="form-group"><label class="form-label">Task Name</label><input class="input" id="r-name" placeholder="e.g. Morning walk, Meditate..."></div>
    <div class="row">
      <div class="col form-group"><label class="form-label">Time</label><input type="time" class="input" id="r-time" value="07:00"></div>
      <div class="col form-group"><label class="form-label">Period</label><select class="input" id="r-period"><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Category</label><select class="input" id="r-cat"><option value="health">Health</option><option value="work">Work</option><option value="fitness">Fitness</option><option value="mindfulness">Mindfulness</option><option value="learning">Learning</option><option value="other">Other</option></select></div>
    <div class="modal-actions"><button class="btn" onclick="closeModal('routine-modal')">Cancel</button><button class="btn btn-primary" onclick="addRoutineTask()">Add Task</button></div>
  </div>
</div>

<div class="modal-bg" id="workout-modal">
  <div class="modal">
    <div class="modal-title">Add Exercise</div>
    <div class="form-group"><label class="form-label">Exercise Name</label><input class="input" id="w-name" placeholder="e.g. Push-ups, Squats..."></div>
    <div class="row">
      <div class="col form-group"><label class="form-label">Sets</label><input type="number" class="input" id="w-sets" value="3" min="1"></div>
      <div class="col form-group"><label class="form-label">Reps / Duration</label><input class="input" id="w-reps" placeholder="e.g. 12 or 30s"></div>
    </div>
    <div class="row">
      <div class="col form-group"><label class="form-label">Category</label><select class="input" id="w-cat"><option value="today">Today</option><option value="push">Push</option><option value="pull">Pull</option><option value="legs">Legs</option><option value="cardio">Cardio</option></select></div>
      <div class="col form-group"><label class="form-label">Weight (optional)</label><input class="input" id="w-weight" placeholder="e.g. 20kg"></div>
    </div>
    <div class="modal-actions"><button class="btn" onclick="closeModal('workout-modal')">Cancel</button><button class="btn btn-primary" onclick="addExercise()">Add</button></div>
  </div>
</div>

<div class="modal-bg" id="habit-modal">
  <div class="modal">
    <div class="modal-title">New Habit</div>
    <div class="form-group"><label class="form-label">Habit Name</label><input class="input" id="h-name" placeholder="e.g. Read 30 mins, No junk food..."></div>
    <div class="row">
      <div class="col form-group"><label class="form-label">Emoji</label><input class="input" id="h-icon" placeholder="📚" maxlength="2"></div>
      <div class="col form-group"><label class="form-label">Category</label><select class="input" id="h-cat"><option value="health">Health</option><option value="fitness">Fitness</option><option value="learning">Learning</option><option value="mindfulness">Mindfulness</option><option value="productivity">Productivity</option></select></div>
    </div>
    <div class="modal-actions"><button class="btn" onclick="closeModal('habit-modal')">Cancel</button><button class="btn btn-primary" onclick="addHabit()">Create</button></div>
  </div>
</div>

<div class="modal-bg" id="goal-modal">
  <div class="modal">
    <div class="modal-title">New Goal</div>
    <div class="form-group"><label class="form-label">Goal Name</label><input class="input" id="g-name" placeholder="e.g. Run 5km, Read 10 books..."></div>
    <div class="row">
      <div class="col form-group"><label class="form-label">Target</label><input type="number" class="input" id="g-target" value="100" min="1"></div>
      <div class="col form-group"><label class="form-label">Unit</label><input class="input" id="g-unit" placeholder="km, pages, days..."></div>
    </div>
    <div class="row">
      <div class="col form-group"><label class="form-label">Step per update</label><input type="number" class="input" id="g-step" value="1" min="1"></div>
      <div class="col form-group"><label class="form-label">Deadline</label><input type="date" class="input" id="g-deadline"></div>
    </div>
    <div class="modal-actions"><button class="btn" onclick="closeModal('goal-modal')">Cancel</button><button class="btn btn-primary" onclick="addGoal()">Add Goal</button></div>
  </div>
</div>

<div class="modal-bg" id="meal-modal">
  <div class="modal">
    <div class="modal-title">Log Meal</div>
    <div class="form-group"><label class="form-label">Food</label><input class="input" id="m-name" placeholder="e.g. Oats, Dal rice, Chicken..."></div>
    <div class="form-group"><label class="form-label">Meal</label><select class="input" id="m-time"><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></select></div>
    <div class="row">
      <div class="col form-group"><label class="form-label">Calories</label><input type="number" class="input" id="m-cal" placeholder="0" min="0"></div>
      <div class="col form-group"><label class="form-label">Protein (g)</label><input type="number" class="input" id="m-protein" placeholder="0" min="0"></div>
    </div>
    <div class="row">
      <div class="col form-group"><label class="form-label">Carbs (g)</label><input type="number" class="input" id="m-carbs" placeholder="0" min="0"></div>
      <div class="col form-group"><label class="form-label">Fat (g)</label><input type="number" class="input" id="m-fat" placeholder="0" min="0"></div>
    </div>
    <div class="modal-actions"><button class="btn" onclick="closeModal('meal-modal')">Cancel</button><button class="btn btn-primary" onclick="addMeal()">Log</button></div>
  </div>
</div>

<div id="toast"></div>

<script>
const TODAY=new Date().toISOString().split('T')[0];
function load(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}}
function save(k,v){localStorage.setItem(k,JSON.stringify(v));}

let D={
  routine:load('lo_routine',[]),
  workout:load('lo_workout',[]),
  habits:load('lo_habits',[]),
  goals:load('lo_goals',[]),
  meals:load('lo_meals',[]).filter(m=>m.date===TODAY),
  water:load('lo_water',{date:'',count:0}),
  sleep:load('lo_sleep',[]),
  rc:load('lo_rc_'+TODAY,{}),
  wc:load('lo_wc_'+TODAY,{}),
};
if(D.water.date!==TODAY) D.water={date:TODAY,count:0};

function saveAll(){
  save('lo_routine',D.routine);save('lo_workout',D.workout);save('lo_habits',D.habits);
  save('lo_goals',D.goals);save('lo_meals',D.meals);save('lo_water',D.water);
  save('lo_sleep',D.sleep);save('lo_rc_'+TODAY,D.rc);save('lo_wc_'+TODAY,D.wc);
}

// NAV
let curSec='dashboard',curRTab='morning',curWTab='today';
document.querySelectorAll('.nav-item').forEach(el=>{
  el.addEventListener('click',()=>{navigateTo(el.dataset.sec);closeSidebar();});
});
function navigateTo(s){
  curSec=s;
  document.querySelectorAll('.nav-item').forEach(e=>e.classList.toggle('active',e.dataset.sec===s));
  document.querySelectorAll('.section').forEach(e=>e.classList.toggle('active',e.id==='sec-'+s));
  renderAll();
}
document.querySelectorAll('[data-rtab]').forEach(t=>{
  t.addEventListener('click',()=>{curRTab=t.dataset.rtab;document.querySelectorAll('[data-rtab]').forEach(x=>x.classList.toggle('active',x.dataset.rtab===curRTab));renderRoutine();});
});
document.querySelectorAll('[data-wtab]').forEach(t=>{
  t.addEventListener('click',()=>{curWTab=t.dataset.wtab;document.querySelectorAll('[data-wtab]').forEach(x=>x.classList.toggle('active',x.dataset.wtab===curWTab));renderWorkout();});
});
document.getElementById('menu-btn').addEventListener('click',()=>{document.getElementById('sidebar').classList.toggle('open');document.getElementById('overlay').classList.toggle('open');});
document.getElementById('overlay').addEventListener('click',closeSidebar);
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('overlay').classList.remove('open');}

// MODALS
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-bg').forEach(m=>{m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');});});

// TOAST
let tt;
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2200);}

// DATE
function initDate(){
  const now=new Date();
  const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('sb-day').textContent=now.getDate();
  document.getElementById('sb-dow').textContent=days[now.getDay()];
  document.getElementById('sb-month').textContent=months[now.getMonth()]+' '+now.getFullYear();
}
initDate();

const catCol={health:'green',work:'blue',fitness:'orange',mindfulness:'purple',learning:'yellow',other:'',cardio:'cyan',productivity:'cyan'};

// ROUTINE
function addRoutineTask(){
  const name=document.getElementById('r-name').value.trim();
  if(!name){toast('Enter a task name!');return;}
  D.routine.push({id:Date.now(),name,time:document.getElementById('r-time').value,period:document.getElementById('r-period').value,cat:document.getElementById('r-cat').value});
  saveAll();renderRoutine();renderDashboard();closeModal('routine-modal');document.getElementById('r-name').value='';toast('✅ Task added!');
}
function toggleRoutineTask(id){D.rc[id]=!D.rc[id];saveAll();renderRoutine();renderDashboard();updateBadges();}
function deleteRoutineTask(id){D.routine=D.routine.filter(r=>r.id!==id);delete D.rc[id];saveAll();renderRoutine();renderDashboard();updateBadges();toast('Removed');}
function renderRoutine(){
  const list=D.routine.filter(r=>r.period===curRTab);
  const el=document.getElementById('routine-list');
  el.innerHTML=list.length?list.map(r=>{
    const done=!!D.rc[r.id];const cc=catCol[r.cat]||'blue';
    return `<div class="check-item ${done?'done':''}" onclick="toggleRoutineTask(${r.id})">
      <div class="checkbox">${done?'✓':''}</div>
      <div class="ci-info">
        <div class="ci-label">${r.name}</div>
        <div class="ci-meta">${r.time}&nbsp;·&nbsp;<span class="tag tag-${cc}" style="padding:1px 6px;font-size:9px;">${r.cat}</span></div>
      </div>
      <div class="ci-actions"><button class="btn-icon" style="color:var(--red)" onclick="event.stopPropagation();deleteRoutineTask(${r.id})">×</button></div>
    </div>`;
  }).join(''):`<div class="empty"><div class="empty-icon">📋</div>No ${curRTab} tasks yet</div>`;
  const tot=D.routine.length,dn=Object.values(D.rc).filter(Boolean).length;
  const pct=tot?Math.round(dn/tot*100):0;
  document.getElementById('routine-progress').style.width=pct+'%';
  document.getElementById('routine-pct-label').textContent=pct+'%';
  document.getElementById('routine-pct-label').className='tag tag-'+(pct>=80?'green':pct>=40?'yellow':'red');
  updateBadges();
}

// WORKOUT
function addExercise(){
  const name=document.getElementById('w-name').value.trim();
  if(!name){toast('Enter exercise name!');return;}
  D.workout.push({id:Date.now(),name,sets:document.getElementById('w-sets').value,reps:document.getElementById('w-reps').value||'—',cat:document.getElementById('w-cat').value,weight:document.getElementById('w-weight').value||''});
  saveAll();renderWorkout();renderDashboard();closeModal('workout-modal');
  ['w-name','w-reps','w-weight'].forEach(i=>document.getElementById(i).value='');
  toast('💪 Exercise added!');
}
function toggleExercise(id){D.wc[id]=!D.wc[id];saveAll();renderWorkout();renderDashboard();updateBadges();}
function deleteExercise(id){D.workout=D.workout.filter(w=>w.id!==id);delete D.wc[id];saveAll();renderWorkout();renderDashboard();updateBadges();toast('Removed');}
function renderWorkout(){
  const list=D.workout.filter(w=>w.cat===curWTab);
  const el=document.getElementById('workout-list');
  el.innerHTML=list.length?list.map(w=>{
    const done=!!D.wc[w.id];
    return `<div class="exercise-row">
      <div class="ex-check ${done?'done':''}" onclick="toggleExercise(${w.id})">${done?'✓':''}</div>
      <div class="ci-info">
        <div class="ex-name" style="${done?'text-decoration:line-through;opacity:0.45':''}">${w.name}</div>
        <div class="ex-meta">${w.sets} sets × ${w.reps}${w.weight?' · '+w.weight:''}</div>
      </div>
      <button class="ex-del" onclick="deleteExercise(${w.id})">×</button>
    </div>`;
  }).join(''):`<div class="empty"><div class="empty-icon">💪</div>No exercises here yet</div>`;
  const tot=D.workout.length,dn=Object.values(D.wc).filter(Boolean).length;
  const ts=D.workout.reduce((a,w)=>a+parseInt(w.sets||0),0);
  document.getElementById('workout-stats').innerHTML=`
    <div class="stat-box"><div class="stat-val" style="color:var(--orange)">${tot}</div><div class="stat-lbl">Exercises</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--green)">${dn}</div><div class="stat-lbl">Done</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--blue)">${ts}</div><div class="stat-lbl">Total Sets</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--purple)">${tot?Math.round(dn/tot*100):0}%</div><div class="stat-lbl">Complete</div></div>`;
  updateBadges();
}

// HABITS
function addHabit(){
  const name=document.getElementById('h-name').value.trim();
  if(!name){toast('Enter habit name!');return;}
  D.habits.push({id:Date.now(),name,icon:document.getElementById('h-icon').value||'✅',cat:document.getElementById('h-cat').value,streak:0,best:0,history:{}});
  saveAll();renderHabits();renderDashboard();closeModal('habit-modal');
  document.getElementById('h-name').value='';document.getElementById('h-icon').value='';
  toast('🔥 Habit created!');
}
function toggleHabit(id){
  const h=D.habits.find(h=>h.id===id);if(!h)return;
  if(h.history[TODAY]){h.history[TODAY]=false;h.streak=Math.max(0,h.streak-1);}
  else{h.history[TODAY]=true;h.streak++;h.best=Math.max(h.best,h.streak);if(h.streak>0&&h.streak%7===0)toast(`🔥 ${h.streak} day streak on "${h.name}"!`);}
  saveAll();renderHabits();renderDashboard();updateBadges();
}
function deleteHabit(id){
  if(!confirm('Delete this habit?'))return;
  D.habits=D.habits.filter(h=>h.id!==id);saveAll();renderHabits();renderDashboard();updateBadges();toast('Habit removed');
}
function renderHabits(){
  const el=document.getElementById('habits-list');
  if(!D.habits.length){el.innerHTML=`<div class="empty"><div class="empty-icon">✅</div>No habits yet. Start your first one!</div>`;return;}
  el.innerHTML=D.habits.map(h=>{
    const done=!!h.history[TODAY];
    const dots=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);const ds=d.toISOString().split('T')[0];const id=ds===TODAY;const isd=!!h.history[ds];return `<div class="streak-dot ${isd?'done':''} ${id&&!isd?'today':''}">${id?'·':isd?'✓':''}</div>`;}).join('');
    return `<div class="habit-card">
      <div class="habit-header">
        <div class="habit-icon">${h.icon}</div>
        <div><div class="habit-name">${h.name}</div><div class="habit-streak-label">🔥 ${h.streak} day streak · Best: ${h.best}</div></div>
        <div class="habit-check-btn ${done?'done':''}" onclick="toggleHabit(${h.id})">${done?'✓':'○'}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div class="streak-row">${dots}</div>
        <button class="btn btn-danger btn-sm" onclick="deleteHabit(${h.id})" style="opacity:0.6;">Remove</button>
      </div>
    </div>`;
  }).join('');
  updateBadges();
}

// GOALS
function addGoal(){
  const name=document.getElementById('g-name').value.trim();
  if(!name){toast('Enter goal name!');return;}
  D.goals.push({id:Date.now(),name,target:parseInt(document.getElementById('g-target').value)||100,current:0,unit:document.getElementById('g-unit').value||'%',step:parseInt(document.getElementById('g-step').value)||1,deadline:document.getElementById('g-deadline').value||''});
  saveAll();renderGoals();closeModal('goal-modal');
  document.getElementById('g-name').value='';document.getElementById('g-unit').value='';document.getElementById('g-deadline').value='';
  toast('🧠 Goal set!');
}
function updateGoal(id,delta){
  const g=D.goals.find(g=>g.id===id);if(!g)return;
  g.current=Math.max(0,Math.min(g.target,g.current+delta*g.step));
  if(g.current>=g.target)toast(`🎉 Goal "${g.name}" completed!`);
  saveAll();renderGoals();
}
function deleteGoal(id){D.goals=D.goals.filter(g=>g.id!==id);saveAll();renderGoals();toast('Goal removed');}
function renderGoals(){
  const el=document.getElementById('goals-list');
  if(!D.goals.length){el.innerHTML=`<div class="empty"><div class="empty-icon">🎯</div>No goals yet. Set your first one!</div>`;return;}
  el.innerHTML=D.goals.map(g=>{
    const pct=Math.round(g.current/g.target*100);
    const col=pct>=100?'green':pct>=60?'blue':pct>=30?'yellow':'red';
    const dl=g.deadline?Math.ceil((new Date(g.deadline)-new Date())/(864e5)):'';
    return `<div class="goal-card">
      <div class="goal-top">
        <div><div class="goal-name">${g.name}</div><div style="font-size:10px;color:var(--text2);margin-top:3px;">${g.current} / ${g.target} ${g.unit}${dl!==''?` · ${dl>0?dl+' days left':'⚠ Overdue'}`:''}</div></div>
        <div class="goal-pct" style="color:var(--${col})">${pct}%</div>
      </div>
      <div class="progress-wrap" style="margin-bottom:4px;"><div class="progress-bar" style="width:${pct}%;background:var(--${col});"></div></div>
      <div class="goal-actions">
        <button class="goal-step-btn" onclick="updateGoal(${g.id},1)">+ ${g.step} ${g.unit}</button>
        <button class="goal-step-btn" onclick="updateGoal(${g.id},-1)" style="color:var(--text2);">− ${g.step}</button>
        <button class="btn btn-danger btn-sm" onclick="deleteGoal(${g.id})" style="margin-left:auto;">Remove</button>
      </div>
    </div>`;
  }).join('');
}

// WATER
function addWater(d){D.water.count=Math.max(0,Math.min(8,D.water.count+d));D.water.date=TODAY;saveAll();renderWater();if(D.water.count===8)toast('💧 Hydration goal reached!');}
function renderWater(){
  const c=D.water.count;
  document.getElementById('water-cups').innerHTML=Array.from({length:8},(_,i)=>`<div class="water-cup ${i<c?'filled':''}" onclick="addWater(${i<c?-1:1})"><div class="water-fill"></div></div>`).join('');
  document.getElementById('water-sub').textContent=`${c} / 8 glasses`;
  document.getElementById('water-bar').style.width=(c/8*100)+'%';
}

// MEALS
function addMeal(){
  const name=document.getElementById('m-name').value.trim();
  if(!name){toast('Enter food name!');return;}
  D.meals.push({id:Date.now(),name,date:TODAY,time:document.getElementById('m-time').value,cal:parseInt(document.getElementById('m-cal').value)||0,protein:parseInt(document.getElementById('m-protein').value)||0,carbs:parseInt(document.getElementById('m-carbs').value)||0,fat:parseInt(document.getElementById('m-fat').value)||0});
  saveAll();renderMeals();closeModal('meal-modal');
  ['m-name','m-cal','m-protein','m-carbs','m-fat'].forEach(i=>document.getElementById(i).value='');
  toast('🥗 Meal logged!');
}
function deleteMeal(id){D.meals=D.meals.filter(m=>m.id!==id);saveAll();renderMeals();}
const mealIcons={Breakfast:'🌅',Lunch:'☀️',Dinner:'🌙',Snack:'🍎'};
function renderMeals(){
  const el=document.getElementById('meal-list');
  const meals=D.meals.filter(m=>m.date===TODAY);
  el.innerHTML=meals.length?meals.map(m=>`<div class="check-item" style="cursor:default;">
    <div style="font-size:20px">${mealIcons[m.time]||'🍽️'}</div>
    <div class="ci-info"><div class="ci-label">${m.name}</div><div class="ci-meta">${m.time} · ${m.cal} kcal · P:${m.protein}g C:${m.carbs}g F:${m.fat}g</div></div>
    <div class="ci-actions"><button class="btn-icon" style="color:var(--red)" onclick="deleteMeal(${m.id})">×</button></div>
  </div>`).join(''):`<div class="empty" style="padding:20px"><div class="empty-icon">🍽️</div>Nothing logged today</div>`;
  const t=meals.reduce((a,m)=>({cal:a.cal+m.cal,protein:a.protein+m.protein,carbs:a.carbs+m.carbs,fat:a.fat+m.fat}),{cal:0,protein:0,carbs:0,fat:0});
  document.getElementById('macro-stats').innerHTML=`
    <div class="stat-box"><div class="stat-val" style="color:var(--yellow)">${t.cal}</div><div class="stat-lbl">Calories</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--blue)">${t.protein}g</div><div class="stat-lbl">Protein</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--orange)">${t.carbs}g</div><div class="stat-lbl">Carbs</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--purple)">${t.fat}g</div><div class="stat-lbl">Fat</div></div>`;
}

// SLEEP
function logSleep(){
  const s=document.getElementById('sleep-start').value,e=document.getElementById('sleep-end').value;
  if(!s||!e){toast('Enter sleep times!');return;}
  const [sh,sm]=s.split(':').map(Number),[eh,em]=e.split(':').map(Number);
  let mins=(eh*60+em)-(sh*60+sm);if(mins<0)mins+=1440;
  const hrs=parseFloat((mins/60).toFixed(1));
  D.sleep.unshift({id:Date.now(),date:TODAY,start:s,end:e,hrs,quality:parseInt(document.getElementById('sleep-quality').value)});
  if(D.sleep.length>30)D.sleep=D.sleep.slice(0,30);
  saveAll();renderSleep();toast(`😴 Logged ${hrs}h sleep!`);
}
function deleteSleep(id){D.sleep=D.sleep.filter(s=>s.id!==id);saveAll();renderSleep();}
const qLabel=['','😣 Terrible','😕 Poor','😐 Okay','😊 Good','😴 Amazing'];
function renderSleep(){
  const el=document.getElementById('sleep-history');
  el.innerHTML=D.sleep.length?D.sleep.slice(0,7).map(s=>`<div class="check-item" style="cursor:default;margin-bottom:8px;">
    <div style="font-size:22px">🌙</div>
    <div class="ci-info"><div class="ci-label">${s.hrs}h · ${qLabel[s.quality]}</div><div class="ci-meta">${s.start} → ${s.end} · ${s.date}</div></div>
    <div class="ci-actions"><span class="tag tag-${s.hrs>=8?'green':s.hrs>=6?'yellow':'red'}">${s.hrs}h</span><button class="btn-icon" style="color:var(--red)" onclick="deleteSleep(${s.id})">×</button></div>
  </div>`).join(''):`<div class="empty" style="padding:20px"><div class="empty-icon">🌙</div>No sleep logged yet</div>`;
  const avg=D.sleep.length?D.sleep.reduce((a,s)=>({hrs:a.hrs+s.hrs,q:a.q+s.quality}),{hrs:0,q:0}):{hrs:0,q:0};
  const ah=D.sleep.length?(avg.hrs/D.sleep.length).toFixed(1):0;
  const aq=D.sleep.length?(avg.q/D.sleep.length).toFixed(1):0;
  document.getElementById('sleep-avg-stats').innerHTML=`
    <div class="stat-box"><div class="stat-val" style="color:var(--blue)">${ah}h</div><div class="stat-lbl">Avg Sleep</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--purple)">${aq}/5</div><div class="stat-lbl">Avg Quality</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--green)">${D.sleep.length}</div><div class="stat-lbl">Nights</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--yellow)">${D.sleep.length?Math.max(...D.sleep.map(s=>s.hrs)).toFixed(1):0}h</div><div class="stat-lbl">Best Night</div></div>`;
}

// DASHBOARD
function renderDashboard(){
  const now=new Date(),hr=now.getHours();
  document.getElementById('dash-greeting').textContent=hr<12?'Good morning 👋':hr<17?'Good afternoon 👋':'Good evening 👋';
  document.getElementById('dash-date').textContent=now.toDateString();
  const rTot=D.routine.length,rDn=Object.values(D.rc).filter(Boolean).length;
  const wTot=D.workout.length,wDn=Object.values(D.wc).filter(Boolean).length;
  const hTot=D.habits.length,hDn=D.habits.filter(h=>!!h.history[TODAY]).length;
  const tot=rTot+wTot+hTot,dn=rDn+wDn+hDn;
  const ov=tot?Math.round(dn/tot*100):0;
  document.getElementById('dash-stats').innerHTML=`
    <div class="stat-box"><div class="stat-val" style="color:var(--green)">${rDn}/${rTot}</div><div class="stat-lbl">Routine</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--orange)">${wDn}/${wTot}</div><div class="stat-lbl">Workout</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--purple)">${hDn}/${hTot}</div><div class="stat-lbl">Habits</div></div>
    <div class="stat-box"><div class="stat-val" style="color:var(--blue)">${D.water.count}/8</div><div class="stat-lbl">Water</div></div>`;
  document.getElementById('dash-overall-pct').textContent=ov+'%';
  document.getElementById('dash-overall-bar').style.width=ov+'%';
  // Routine preview
  const rp=document.getElementById('dash-routine-preview');
  rp.innerHTML=`<div class="card-header" style="margin-bottom:10px;"><div class="card-title">📅 Routine</div><span class="tag tag-green">${rDn}/${rTot}</span></div>`+
    (D.routine.slice(0,4).length?D.routine.slice(0,4).map(r=>{const dn=!!D.rc[r.id];return`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:11px;"><div style="width:14px;height:14px;border-radius:4px;border:1px solid var(--border2);background:${dn?'#fff':'transparent'};display:flex;align-items:center;justify-content:center;font-size:9px;color:#000;">${dn?'✓':''}</div><span style="${dn?'text-decoration:line-through;opacity:0.4':''}">${r.name}</span></div>`;}).join(''):`<div style="color:var(--text3);font-size:11px;padding:8px 0">No tasks yet</div>`);
  // Habit preview
  const hp=document.getElementById('dash-habit-preview');
  hp.innerHTML=`<div class="card-header" style="margin-bottom:10px;"><div class="card-title">✅ Habits</div><span class="tag tag-purple">${hDn}/${hTot}</span></div>`+
    (D.habits.slice(0,4).length?D.habits.slice(0,4).map(h=>{const dn=!!h.history[TODAY];return`<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:11px;"><span>${h.icon}</span><span style="flex:1;${dn?'text-decoration:line-through;opacity:0.4':''}">${h.name}</span><span style="color:var(--text2);font-size:10px;">🔥${h.streak}</span></div>`;}).join(''):`<div style="color:var(--text3);font-size:11px;padding:8px 0">No habits yet</div>`);
  // Workout preview
  const wp=document.getElementById('dash-workout-preview');
  wp.innerHTML=`<div class="card-header" style="margin-bottom:10px;"><div class="card-title">💪 Workout</div><span class="tag tag-orange">${wDn}/${wTot}</span></div>`+
    (D.workout.slice(0,5).length?`<div style="display:flex;flex-wrap:wrap;gap:6px;">`+D.workout.slice(0,5).map(w=>{const dn=!!D.wc[w.id];return`<div style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:5px 10px;font-size:10px;${dn?'opacity:0.35;text-decoration:line-through':''}">${w.name} ${w.sets}×${w.reps}</div>`;}).join('')+`</div>`:`<div style="color:var(--text3);font-size:11px">No workout logged</div>`);
}

// BADGES
function updateBadges(){
  const rDn=Object.values(D.rc).filter(Boolean).length;
  const wDn=Object.values(D.wc).filter(Boolean).length;
  const hDn=D.habits.filter(h=>!!h.history[TODAY]).length;
  document.getElementById('routine-badge').textContent=`${rDn}/${D.routine.length}`;
  document.getElementById('workout-badge').textContent=`${wDn}/${D.workout.length}`;
  document.getElementById('habits-badge').textContent=`${hDn}/${D.habits.length}`;
}

function renderAll(){renderDashboard();renderRoutine();renderWorkout();renderHabits();renderGoals();renderWater();renderMeals();renderSleep();updateBadges();}

// SEED DEFAULT DATA
if(!D.routine.length){
  D.routine=[
    {id:1,name:'Wake up & stretch',time:'06:30',period:'morning',cat:'health'},
    {id:2,name:'Morning walk / jog',time:'07:00',period:'morning',cat:'fitness'},
    {id:3,name:'Healthy breakfast',time:'08:00',period:'morning',cat:'health'},
    {id:4,name:'Study / deep work',time:'10:00',period:'afternoon',cat:'work'},
    {id:5,name:'Lunch',time:'13:00',period:'afternoon',cat:'health'},
    {id:6,name:'Evening workout',time:'18:00',period:'evening',cat:'fitness'},
    {id:7,name:'Read 30 mins',time:'21:00',period:'evening',cat:'learning'},
    {id:8,name:'Sleep by 11pm',time:'23:00',period:'evening',cat:'health'},
  ];
}
if(!D.habits.length){
  D.habits=[
    {id:1,name:'No junk food',icon:'🥗',cat:'health',streak:0,best:0,history:{}},
    {id:2,name:'Exercise 30 mins',icon:'💪',cat:'fitness',streak:0,best:0,history:{}},
    {id:3,name:'Read 30 mins',icon:'📚',cat:'learning',streak:0,best:0,history:{}},
    {id:4,name:'Meditate / breathe',icon:'🧘',cat:'mindfulness',streak:0,best:0,history:{}},
  ];
}
if(!D.workout.length){
  D.workout=[
    {id:1,name:'Push-ups',sets:'3',reps:'20',cat:'push',weight:''},
    {id:2,name:'Pull-ups',sets:'3',reps:'10',cat:'pull',weight:''},
    {id:3,name:'Squats',sets:'4',reps:'15',cat:'legs',weight:''},
    {id:4,name:'Plank',sets:'3',reps:'60s',cat:'today',weight:''},
  ];
}
if(!D.goals.length){
  D.goals=[
    {id:1,name:'Run 5km without stopping',target:5,current:0,unit:'km',step:0.5,deadline:''},
    {id:2,name:'Read 12 books this year',target:12,current:0,unit:'books',step:1,deadline:''},
  ];
}
saveAll();
renderAll();
</script>
</body>
</html>
