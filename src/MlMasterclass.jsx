import React, { useState, useRef } from "react";

/**
 * <MlMasterclass />
 *
 * Drop-in React component — no external CSS needed.
 * Loads Google Fonts + injects scoped styles on mount.
 *
 * Usage:
 *   import MlMasterclass from "./MlMasterclass";
 *   export default function App() { return <MlMasterclass />; }
 */

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap";

const STYLES = `
:root{
  --primary:#2D1F5C;--secondary:#080927;--text-purple:#7022AA;
  --accent:#8508E0;--accent-light:#A855F7;--ink:#FFFFFF;
  --ink-soft:#E5DAFF;--ink-mid:#B8A5DD;--ink-dim:#7E6BA8;--ink-muted:#4A3D6E;
  --line:rgba(180,150,240,.10);--line-mid:rgba(180,150,240,.18);--line-strong:rgba(180,150,240,.30);
  --bg-0:#04041A;--bg-1:#080927;--bg-2:#0A0B30;
  --tile:rgba(15,10,46,.6);--tile-hover:rgba(20,14,60,.8);--green:#22E5A8;
}
html,body,#root{margin:0;padding:0;background:#04041A;min-height:100%;}
html,body{scrollbar-width:none;-ms-overflow-style:none;}
html::-webkit-scrollbar,body::-webkit-scrollbar{width:0;height:0;display:none;}
.mlmc *{margin:0;padding:0;box-sizing:border-box;}
.mlmc::-webkit-scrollbar{width:0;height:0;display:none;}
.mlmc{background:var(--bg-0);font-family:'Geist',sans-serif;color:var(--ink-soft);
  font-feature-settings:"ss01","cv11";overflow-x:hidden;line-height:1.5;-webkit-font-smoothing:antialiased;
  min-height:100vh;position:relative;scrollbar-width:none;-ms-overflow-style:none;}
.mlmc a{color:inherit;text-decoration:none;}
.mlmc img{max-width:100%;display:block;}
.mlmc button{cursor:pointer;font-family:inherit;border:none;background:none;color:inherit;}
.mlmc .container{max-width:1320px;margin:0 auto;padding:0 28px;}

.mlmc .global-bg{position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    radial-gradient(1000px 700px at 80% -10%, rgba(133,8,224,.18), transparent 55%),
    radial-gradient(800px 600px at 0% 50%, rgba(45,31,92,.35), transparent 60%),
    radial-gradient(900px 700px at 100% 100%, rgba(112,34,170,.15), transparent 60%);}
.mlmc .global-grid{position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(180,150,240,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(180,150,240,.04) 1px, transparent 1px);
  background-size:64px 64px;
  -webkit-mask-image:radial-gradient(ellipse at 50% 0%, black 30%, transparent 80%);
  mask-image:radial-gradient(ellipse at 50% 0%, black 30%, transparent 80%);}

.mlmc .nav{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:100;
  width:calc(100% - 56px);max-width:1280px;padding:10px 14px 10px 18px;border-radius:14px;
  backdrop-filter:blur(20px);background:rgba(8,9,39,.55);border:1px solid var(--line-mid);
  box-shadow:0 12px 40px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:space-between;}
.mlmc .brand{display:flex;align-items:center;gap:10px;}
.mlmc .brand .mark{width:30px;height:30px;border-radius:8px;
  background:conic-gradient(from 180deg at 50% 50%, #8508E0, #C9B6FF, #2D1F5C, #8508E0);
  display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#FFF;
  box-shadow:0 0 16px rgba(133,8,224,.5),inset 0 0 0 1px rgba(255,255,255,.15);position:relative;}
.mlmc .brand .mark::after{content:"";position:absolute;inset:2px;border-radius:6px;
  background:linear-gradient(135deg,#8508E0,#2D1F5C);}
.mlmc .brand .mark span{position:relative;z-index:1;}
.mlmc .brand .name{font-weight:600;font-size:14px;color:var(--ink);letter-spacing:-.01em;}
.mlmc .brand .name span{color:var(--ink-dim);font-weight:400;margin-left:6px;}
.mlmc .nav-links{display:flex;align-items:center;gap:6px;}
.mlmc .nav-link{padding:8px 14px;border-radius:8px;font-size:13px;color:var(--ink-mid);font-weight:500;transition:all .15s;}
.mlmc .nav-link:hover{color:var(--ink);background:var(--line);}
.mlmc .nav-cta{padding:9px 16px;border-radius:9px;
  background:linear-gradient(180deg,rgba(133,8,224,.95),rgba(112,34,170,.95));
  color:#FFF;font-size:13px;font-weight:600;
  box-shadow:0 1px 0 rgba(255,255,255,.18) inset, 0 8px 20px rgba(133,8,224,.35);
  display:inline-flex;align-items:center;gap:6px;transition:transform .15s;}
.mlmc .nav-cta:hover{transform:translateY(-1px);}

.mlmc .poster{position:relative;z-index:5;padding:104px 0 24px;}
.mlmc .poster-frame{position:relative;width:100%;aspect-ratio:1200/675;
  border-radius:22px;overflow:hidden;
  background:#04041A;line-height:0;font-size:0;}
.mlmc .poster-iframe{position:absolute;top:0;left:0;width:1200px;height:675px;border:0;
  transform-origin:top left;}

.mlmc .hero{position:relative;padding:40px 0 80px;}
.mlmc .hero-inner{position:relative;z-index:5;}
.mlmc .status-strip{display:inline-flex;align-items:center;gap:0;padding:5px;border-radius:999px;
  background:rgba(8,9,39,.7);border:1px solid var(--line-mid);margin-bottom:36px;backdrop-filter:blur(12px);
  max-width:100%;flex-wrap:wrap;}
.mlmc .status-strip .pill{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;
  font-family:'Geist Mono',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--ink-mid);font-weight:500;}
.mlmc .status-strip .pill.live{background:rgba(34,229,168,.12);color:#7CF0CB;}
.mlmc .status-strip .pill .dot{width:6px;height:6px;border-radius:50%;background:var(--green);
  box-shadow:0 0 0 0 rgba(34,229,168,.7);animation:livePulse 1.8s infinite;}
@keyframes livePulse{
  0%{box-shadow:0 0 0 0 rgba(34,229,168,.7);}
  70%{box-shadow:0 0 0 8px rgba(34,229,168,0);}}
.mlmc .status-strip .arrow{color:var(--ink-muted);padding:0 4px;}

.mlmc .bento{display:grid;grid-template-columns:1.4fr 1fr;grid-template-rows:auto auto;gap:14px;}
.mlmc .b-hero{grid-column:1;grid-row:1/3;padding:48px 44px 44px;border-radius:24px;
  background:
    radial-gradient(700px 500px at 90% 0%, rgba(133,8,224,.22), transparent 55%),
    linear-gradient(180deg,rgba(15,10,46,.85),rgba(8,9,39,.95));
  border:1px solid var(--line-mid);position:relative;overflow:hidden;}
.mlmc .b-hero::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(180,150,240,.45),transparent);}
.mlmc .b-form{grid-column:2;grid-row:1/3;padding:32px;border-radius:24px;
  background:linear-gradient(180deg, rgba(20,14,60,.85), rgba(8,9,39,.95));
  border:1px solid var(--line-mid);backdrop-filter:blur(20px);
  box-shadow:0 30px 80px rgba(0,0,0,.4);position:relative;overflow:hidden;}

.mlmc h1.hero-h1{font-family:'Geist',sans-serif;font-weight:600;font-size:60px;line-height:1.02;
  letter-spacing:-.035em;color:var(--ink);margin-bottom:24px;}
.mlmc h1.hero-h1 .highlight{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;
  background:linear-gradient(110deg,#FFFFFF 0%,#C9B6FF 50%,#8508E0 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.02em;}
.mlmc h1.hero-h1 .stack{display:block;color:var(--ink-mid);font-weight:500;}
.mlmc .hero-sub{font-size:17px;line-height:1.55;color:var(--ink-mid);max-width:540px;margin-bottom:32px;font-weight:400;}
.mlmc .hero-sub b{color:var(--ink);font-weight:600;}

.mlmc .meta-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0;
  border:1px solid var(--line-mid);border-radius:14px;background:rgba(4,4,26,.4);overflow:hidden;}
.mlmc .meta-row .cell{padding:16px 18px;display:flex;flex-direction:column;gap:4px;position:relative;}
.mlmc .meta-row .cell + .cell{border-left:1px solid var(--line);}
.mlmc .meta-row .k{font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--ink-dim);font-weight:500;}
.mlmc .meta-row .v{font-family:'Geist',sans-serif;font-weight:600;font-size:18px;color:var(--ink);
  letter-spacing:-.01em;line-height:1.2;}
.mlmc .meta-row .v small{font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--ink-dim);font-weight:500;display:block;margin-top:3px;}

.mlmc .ui-mock{margin-top:32px;padding:14px 16px;border-radius:12px;background:rgba(4,4,26,.7);
  border:1px solid var(--line-mid);font-family:'Geist Mono',monospace;font-size:12px;
  color:var(--ink-mid);display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.mlmc .ui-mock .prompt{color:var(--accent-light);font-weight:600;}
.mlmc .ui-mock .text{color:var(--ink-soft);}
.mlmc .ui-mock .cursor{width:8px;height:14px;background:var(--accent-light);
  animation:blink 1s infinite;display:inline-block;margin-left:2px;}
@keyframes blink{50%{opacity:0;}}

.mlmc .f-head{margin-bottom:22px;}
.mlmc .f-tag{display:inline-flex;align-items:center;gap:8px;
  font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;
  color:var(--green);font-weight:500;margin-bottom:14px;padding:5px 10px;border-radius:6px;
  background:rgba(34,229,168,.08);border:1px solid rgba(34,229,168,.25);}
.mlmc .f-tag .dot{width:5px;height:5px;border-radius:50%;background:var(--green);box-shadow:0 0 8px var(--green);}
.mlmc .f-title{font-family:'Geist',sans-serif;font-weight:600;font-size:24px;color:var(--ink);
  letter-spacing:-.02em;line-height:1.15;margin-bottom:8px;}
.mlmc .f-title em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#C9B6FF;}
.mlmc .f-sub{font-size:13px;color:var(--ink-dim);}
.mlmc .field{margin-bottom:12px;}
.mlmc .field label{display:block;font-family:'Geist Mono',monospace;font-size:9px;
  letter-spacing:.22em;text-transform:uppercase;color:var(--ink-dim);font-weight:500;margin-bottom:6px;}
.mlmc .field input, .mlmc .field select{width:100%;padding:12px 14px;border-radius:10px;
  background:rgba(4,4,26,.6);border:1px solid var(--line-mid);color:var(--ink);
  font-family:'Geist',sans-serif;font-size:14px;font-weight:400;transition:all .15s;outline:none;}
.mlmc .field input:focus, .mlmc .field select:focus{border-color:rgba(133,8,224,.6);
  background:rgba(4,4,26,.9);box-shadow:0 0 0 3px rgba(133,8,224,.12);}
.mlmc .field input::placeholder{color:var(--ink-muted);}
.mlmc .field select{appearance:none;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='%237E6BA8' stroke-width='1.5' stroke-linecap='round'/></svg>");
  background-repeat:no-repeat;background-position:right 14px center;padding-right:36px;cursor:pointer;}

.mlmc .submit-btn{width:100%;margin-top:6px;padding:14px;border-radius:11px;
  background:linear-gradient(180deg,#8508E0 0%,#7022AA 100%);color:#FFFFFF;
  font-family:'Geist',sans-serif;font-weight:600;font-size:14px;letter-spacing:-.005em;
  display:flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 1px 0 rgba(255,255,255,.18) inset, 0 -1px 0 rgba(0,0,0,.2) inset, 0 12px 28px rgba(133,8,224,.4);
  position:relative;overflow:hidden;transition:transform .12s;}
.mlmc .submit-btn:hover{transform:translateY(-1px);}
.mlmc .submit-btn:disabled{cursor:not-allowed;opacity:.7;transform:none;}
.mlmc .f-msg{margin-top:12px;padding:10px 12px;border-radius:9px;
  font-family:'Geist Mono',monospace;font-size:11px;letter-spacing:.04em;line-height:1.45;}
.mlmc .f-msg.ok{background:rgba(34,229,168,.10);border:1px solid rgba(34,229,168,.35);color:#A8F2D6;}
.mlmc .f-msg.err{background:rgba(229,34,72,.10);border:1px solid rgba(229,34,72,.35);color:#F2A8B6;}
.mlmc .submit-btn::after{content:"";position:absolute;top:0;left:-60%;width:35%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
  transform:skewX(-20deg);animation:shine 3.5s infinite;}
@keyframes shine{0%{left:-60%;}55%,100%{left:130%;}}
.mlmc .submit-btn svg{width:14px;height:14px;}
.mlmc .f-foot{margin-top:14px;padding-top:14px;border-top:1px solid var(--line);
  display:flex;align-items:center;gap:8px;
  font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--ink-dim);font-weight:500;}
.mlmc .f-foot svg{width:11px;height:11px;color:var(--green);}

.mlmc .section{padding:96px 0;position:relative;z-index:5;}
.mlmc .s-head{display:flex;align-items:flex-end;justify-content:space-between;
  margin-bottom:48px;gap:40px;flex-wrap:wrap;}
.mlmc .s-tag{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:7px;
  background:rgba(133,8,224,.10);border:1px solid rgba(133,8,224,.3);
  font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;
  color:#C9B6FF;font-weight:500;margin-bottom:18px;}
.mlmc .s-tag .square{width:6px;height:6px;background:var(--accent);}
.mlmc .s-title{font-family:'Geist',sans-serif;font-weight:600;font-size:48px;line-height:1.05;
  letter-spacing:-.03em;color:var(--ink);max-width:720px;}
.mlmc .s-title em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;
  background:linear-gradient(110deg,#FFFFFF 0%,#C9B6FF 50%,#8508E0 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;}
.mlmc .s-sub{font-size:16px;line-height:1.6;color:var(--ink-mid);max-width:420px;}

.mlmc .problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.mlmc .problem-card{padding:32px;border-radius:20px;
  background:linear-gradient(180deg,var(--tile),rgba(8,9,39,.95));
  border:1px solid var(--line-mid);position:relative;overflow:hidden;}
.mlmc .problem-card.broken{background:linear-gradient(180deg,rgba(20,14,40,.6),rgba(8,9,39,.95));}
.mlmc .problem-card.fixed{
  background:
    radial-gradient(400px 300px at 100% 0%, rgba(133,8,224,.18), transparent 60%),
    linear-gradient(180deg,rgba(20,14,60,.7),rgba(8,9,39,.95));
  border-color:rgba(133,8,224,.3);}
.mlmc .pc-tag{display:inline-flex;align-items:center;gap:8px;
  font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;
  font-weight:500;margin-bottom:24px;padding:5px 10px;border-radius:6px;}
.mlmc .problem-card.broken .pc-tag{color:#FF7A9C;background:rgba(255,122,156,.08);
  border:1px solid rgba(255,122,156,.2);}
.mlmc .problem-card.fixed .pc-tag{color:var(--green);background:rgba(34,229,168,.08);
  border:1px solid rgba(34,229,168,.25);}
.mlmc .pc-tag .dot{width:5px;height:5px;border-radius:50%;background:currentColor;}
.mlmc .pc-h{font-family:'Geist',sans-serif;font-weight:600;font-size:24px;color:var(--ink);
  letter-spacing:-.02em;line-height:1.2;margin-bottom:18px;}
.mlmc .pc-h em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#C9B6FF;}
.mlmc .pc-desc{font-size:14px;color:var(--ink-mid);line-height:1.55;margin-bottom:6px;}

.mlmc .term{margin-top:18px;padding:16px;border-radius:12px;background:#04041A;
  border:1px solid var(--line-mid);font-family:'Geist Mono',monospace;font-size:12px;line-height:1.7;}
.mlmc .term .head{display:flex;align-items:center;gap:6px;padding-bottom:10px;
  margin-bottom:10px;border-bottom:1px solid var(--line);}
.mlmc .term .head .dot{width:9px;height:9px;border-radius:50%;}
.mlmc .term .head .d1{background:#FF5F57;}.mlmc .term .head .d2{background:#FEBC2E;}.mlmc .term .head .d3{background:#28C840;}
.mlmc .term .head .file{margin-left:8px;color:var(--ink-dim);font-size:11px;letter-spacing:.05em;}
.mlmc .term .row{display:block;color:var(--ink-mid);word-break:break-word;}
.mlmc .term .row .c1{color:var(--ink-muted);user-select:none;margin-right:14px;}
.mlmc .term .row .err{color:#FF7A9C;}
.mlmc .term .row .ok{color:var(--green);}
.mlmc .term .row .key{color:var(--accent-light);}
.mlmc .term .row .hl{background:linear-gradient(180deg,transparent 55%,rgba(133,8,224,.45) 55%);
  color:var(--ink);padding:0 2px;border-radius:2px;}

.mlmc .module-bento{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:14px;}
.mlmc .mod{padding:28px;border-radius:20px;
  background:linear-gradient(180deg,var(--tile),rgba(8,9,39,.95));
  border:1px solid var(--line-mid);position:relative;overflow:hidden;transition:all .25s;}
.mlmc .mod:hover{border-color:rgba(133,8,224,.4);transform:translateY(-2px);}
.mlmc .mod.span2{grid-column:span 2;}
.mlmc .mod-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
.mlmc .mod-num{display:inline-flex;align-items:center;gap:8px;padding:5px 10px;border-radius:6px;
  background:rgba(133,8,224,.12);border:1px solid rgba(133,8,224,.3);
  font-family:'Geist Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;
  color:#C9B6FF;font-weight:600;}
.mlmc .mod-num .dot{width:5px;height:5px;background:var(--accent);border-radius:50%;}
.mlmc .mod-time{font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--ink-dim);font-weight:500;}
.mlmc .mod h3{font-family:'Geist',sans-serif;font-weight:600;font-size:22px;color:var(--ink);
  letter-spacing:-.02em;line-height:1.2;margin-bottom:10px;}
.mlmc .mod h3 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#C9B6FF;}
.mlmc .mod .desc{font-size:14px;color:var(--ink-mid);line-height:1.55;margin-bottom:18px;}
.mlmc .mod-list{list-style:none;display:flex;flex-direction:column;gap:8px;
  padding-top:16px;border-top:1px solid var(--line);}
.mlmc .mod-list li{font-size:13px;color:var(--ink-soft);
  display:flex;align-items:flex-start;gap:8px;line-height:1.45;}
.mlmc .mod-list li svg{width:13px;height:13px;color:var(--accent-light);flex-shrink:0;margin-top:2px;}

.mlmc .mock-progress{margin-top:16px;padding:14px;border-radius:11px;
  background:rgba(4,4,26,.6);border:1px solid var(--line-mid);}
.mlmc .mock-progress .row{display:flex;align-items:center;justify-content:space-between;
  padding:8px 0;font-family:'Geist Mono',monospace;font-size:11px;color:var(--ink-mid);}
.mlmc .mock-progress .row + .row{border-top:1px solid var(--line);}
.mlmc .mock-progress .row .l{display:flex;align-items:center;gap:8px;}
.mlmc .mock-progress .row .l .ic{width:14px;height:14px;border-radius:4px;
  background:rgba(34,229,168,.15);border:1px solid rgba(34,229,168,.4);
  display:flex;align-items:center;justify-content:center;color:var(--green);font-size:9px;}
.mlmc .mock-progress .row .l .ic.todo{background:rgba(180,150,240,.06);
  border-color:var(--line-mid);color:var(--ink-dim);}
.mlmc .mock-progress .row .bar{width:120px;height:4px;border-radius:2px;
  background:var(--line-mid);overflow:hidden;}
.mlmc .mock-progress .row .bar i{display:block;height:100%;
  background:linear-gradient(90deg,var(--accent),var(--accent-light));}

.mlmc .outcomes-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.mlmc .out-card{padding:26px;border-radius:18px;
  background:linear-gradient(180deg,var(--tile),rgba(8,9,39,.95));
  border:1px solid var(--line-mid);position:relative;overflow:hidden;transition:all .25s;}
.mlmc .out-card:hover{border-color:rgba(133,8,224,.4);transform:translateY(-2px);}
.mlmc .out-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,rgba(133,8,224,.25),rgba(168,85,247,.15));
  border:1px solid rgba(133,8,224,.35);color:#E5DAFF;margin-bottom:18px;}
.mlmc .out-icon svg{width:18px;height:18px;}
.mlmc .out-card h4{font-family:'Geist',sans-serif;font-weight:600;font-size:17px;color:var(--ink);
  letter-spacing:-.015em;line-height:1.25;margin-bottom:8px;}
.mlmc .out-card h4 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#C9B6FF;}
.mlmc .out-card p{font-size:13.5px;color:var(--ink-mid);line-height:1.55;}

.mlmc .mentor-shell{padding:48px;border-radius:24px;
  background:
    radial-gradient(700px 500px at 90% 50%, rgba(133,8,224,.18), transparent 55%),
    linear-gradient(180deg,rgba(20,14,60,.6),rgba(8,9,39,.95));
  border:1px solid var(--line-mid);position:relative;overflow:hidden;}
.mlmc .mentor-grid{display:grid;grid-template-columns:.7fr 1.3fr;gap:48px;align-items:center;}
.mlmc .mentor-photo{aspect-ratio:4/5;width:100%;border-radius:18px;
  background:linear-gradient(135deg, #2D1F5C 0%, #04041A 100%);
  border:1px solid rgba(133,8,224,.35);position:relative;overflow:hidden;
  box-shadow:0 30px 60px rgba(0,0,0,.5);}
.mlmc .mentor-photo .mentor-img{position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;object-position:50% 22%;display:block;}
.mlmc .mentor-photo .badges{position:absolute;top:18px;left:18px;right:18px;
  display:flex;justify-content:space-between;gap:8px;}
.mlmc .mentor-photo .b{padding:6px 10px;border-radius:7px;
  background:rgba(4,4,26,.85);backdrop-filter:blur(10px);
  border:1px solid var(--line-mid);
  font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--ink-soft);font-weight:500;
  display:flex;align-items:center;gap:6px;}
.mlmc .mentor-photo .b .dot{width:5px;height:5px;border-radius:50%;background:var(--green);
  box-shadow:0 0 8px var(--green);}
.mlmc .mentor-photo .credit{position:absolute;bottom:18px;left:18px;right:18px;
  padding:14px 16px;border-radius:11px;
  background:rgba(4,4,26,.85);backdrop-filter:blur(14px);border:1px solid var(--line-mid);}
.mlmc .mentor-photo .credit .role{font-family:'Geist Mono',monospace;font-size:10px;
  letter-spacing:.2em;text-transform:uppercase;color:var(--ink-dim);font-weight:500;}
.mlmc .mentor-photo .credit .nm{font-family:'Geist',sans-serif;font-weight:600;font-size:18px;
  color:var(--ink);letter-spacing:-.015em;margin-top:2px;}

.mlmc .mentor-info .label{display:inline-flex;align-items:center;gap:8px;padding:5px 10px;border-radius:6px;
  background:rgba(133,8,224,.10);border:1px solid rgba(133,8,224,.3);
  font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.22em;text-transform:uppercase;
  color:#C9B6FF;font-weight:500;margin-bottom:18px;}
.mlmc .mentor-info h2{font-family:'Geist',sans-serif;font-weight:600;font-size:44px;color:var(--ink);
  letter-spacing:-.025em;line-height:1.05;margin-bottom:6px;}
.mlmc .mentor-info h2 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#C9B6FF;}
.mlmc .mentor-info .role{font-size:16px;color:var(--ink-mid);margin-bottom:24px;font-weight:400;}
.mlmc .mentor-info .bio{font-size:15px;line-height:1.65;color:var(--ink-soft);margin-bottom:14px;}
.mlmc .mentor-info .bio em{font-family:'Instrument Serif',serif;font-style:italic;color:#C9B6FF;}

.mlmc .mentor-stats{margin-top:28px;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;
  background:var(--line);border:1px solid var(--line-mid);border-radius:14px;overflow:hidden;}
.mlmc .mentor-stats .s{padding:18px 20px;background:rgba(4,4,26,.5);}
.mlmc .mentor-stats .num{font-family:'Geist',sans-serif;font-weight:600;font-size:24px;
  color:var(--ink);letter-spacing:-.02em;margin-bottom:4px;}
.mlmc .mentor-stats .num em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:#C9B6FF;}
.mlmc .mentor-stats .lbl{font-family:'Geist Mono',monospace;font-size:9px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--ink-dim);font-weight:500;line-height:1.4;}

.mlmc .faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.mlmc .faq-item{padding:24px 26px;border-radius:16px;
  background:linear-gradient(180deg,var(--tile),rgba(8,9,39,.95));
  border:1px solid var(--line-mid);transition:all .2s;}
.mlmc .faq-item:hover{border-color:rgba(133,8,224,.35);}
.mlmc .faq-item .q{display:flex;align-items:flex-start;gap:12px;
  font-family:'Geist',sans-serif;font-weight:600;font-size:16px;color:var(--ink);
  letter-spacing:-.015em;line-height:1.3;margin-bottom:10px;}
.mlmc .faq-item .q-mark{flex-shrink:0;width:22px;height:22px;border-radius:6px;
  background:rgba(133,8,224,.18);border:1px solid rgba(133,8,224,.4);
  display:flex;align-items:center;justify-content:center;
  font-family:'Geist Mono',monospace;font-size:11px;color:#C9B6FF;font-weight:600;}
.mlmc .faq-item .a{font-size:14px;color:var(--ink-mid);line-height:1.6;padding-left:34px;}

.mlmc .cta-banner{position:relative;z-index:5;padding:0 0 96px;}
.mlmc .cta-shell{padding:56px 48px;border-radius:24px;text-align:center;
  background:
    radial-gradient(700px 400px at 50% 0%, rgba(133,8,224,.3), transparent 60%),
    linear-gradient(180deg, #14093A 0%, #04041A 100%);
  border:1px solid rgba(133,8,224,.3);
  box-shadow:0 30px 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.06);
  position:relative;overflow:hidden;}
.mlmc .cta-shell::before{content:"";position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(180,150,240,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(180,150,240,.05) 1px, transparent 1px);
  background-size:40px 40px;
  -webkit-mask-image:radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%);
  mask-image:radial-gradient(ellipse at 50% 50%, black 30%, transparent 75%);
  pointer-events:none;}
.mlmc .cta-shell > *{position:relative;z-index:1;}
.mlmc .cta-shell .small{display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;
  background:rgba(8,9,39,.7);border:1px solid var(--line-mid);
  font-family:'Geist Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;
  color:var(--ink-soft);font-weight:500;margin-bottom:20px;}
.mlmc .cta-shell .small .dot{width:6px;height:6px;border-radius:50%;background:var(--green);
  box-shadow:0 0 8px var(--green);animation:livePulse 1.8s infinite;}
.mlmc .cta-shell h2{font-family:'Geist',sans-serif;font-weight:600;font-size:48px;color:var(--ink);
  letter-spacing:-.03em;line-height:1.05;margin-bottom:14px;}
.mlmc .cta-shell h2 em{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;
  background:linear-gradient(110deg,#FFFFFF 0%,#C9B6FF 50%,#8508E0 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;}
.mlmc .cta-shell p{font-size:16px;color:var(--ink-mid);max-width:520px;margin:0 auto 28px;line-height:1.55;}
.mlmc .cta-shell .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 26px;border-radius:11px;
  background:linear-gradient(180deg,#8508E0 0%,#7022AA 100%);color:#FFF;
  font-family:'Geist',sans-serif;font-weight:600;font-size:14px;letter-spacing:-.005em;
  box-shadow:0 1px 0 rgba(255,255,255,.18) inset, 0 -1px 0 rgba(0,0,0,.2) inset, 0 12px 28px rgba(133,8,224,.4);
  transition:transform .12s;}
.mlmc .cta-shell .btn:hover{transform:translateY(-1px);}
.mlmc .cta-shell .btn svg{width:14px;height:14px;}

.mlmc footer.foot{padding:32px 0;border-top:1px solid var(--line);background:var(--bg-1);position:relative;z-index:5;}
.mlmc .f-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;}
.mlmc .f-legal{font-family:'Geist Mono',monospace;font-size:10px;letter-spacing:.18em;
  text-transform:uppercase;color:var(--ink-dim);font-weight:500;}
.mlmc .f-links{display:flex;gap:20px;}
.mlmc .f-links a{font-size:12px;color:var(--ink-mid);transition:color .15s;}
.mlmc .f-links a:hover{color:var(--ink);}

/* ── Tablet ≤1080px ───────────────────────────────────── */
@media (max-width:1080px){
  .mlmc .container{padding:0 22px;}
  .mlmc .bento{grid-template-columns:1fr;}
  .mlmc .b-hero, .mlmc .b-form{grid-column:1;grid-row:auto;}
  .mlmc .problem-grid{grid-template-columns:1fr;}
  .mlmc .mentor-grid{grid-template-columns:1fr;gap:32px;}
  .mlmc .outcomes-grid{grid-template-columns:1fr 1fr;}
  .mlmc .faq-grid{grid-template-columns:1fr;}
  .mlmc h1.hero-h1{font-size:44px;}
  .mlmc .s-title{font-size:36px;}
  .mlmc .cta-shell h2{font-size:38px;}
  .mlmc .cta-shell{padding:44px 28px;}
  .mlmc .nav-links{display:none;}
  .mlmc .mentor-shell{padding:32px;}
  .mlmc .b-hero{padding:36px 30px 32px;}
  .mlmc .section{padding:80px 0;}
  .mlmc .mentor-info h2{font-size:38px;}
  .mlmc .mentor-photo{aspect-ratio:4/5;max-width:380px;width:100%;margin:0 auto;max-height:none;}
}
/* ── Tablet portrait / large phone ≤768px ─────────────── */
@media (max-width:768px){
  .mlmc .container{padding:0 18px;}
  .mlmc .nav{top:10px;width:calc(100% - 20px);padding:8px 10px 8px 14px;}
  .mlmc .nav-cta{padding:8px 12px;font-size:12px;}
  .mlmc .module-bento{grid-template-columns:1fr;}
  .mlmc .poster{padding:90px 0 14px;}
  .mlmc .poster-frame{border-radius:18px;}
  .mlmc h1.hero-h1{font-size:34px;}
  .mlmc .hero-sub{font-size:15px;margin-bottom:26px;}
  .mlmc .s-title{font-size:30px;}
  .mlmc .s-head{margin-bottom:32px;gap:24px;}
  .mlmc .s-sub{font-size:14.5px;}
  .mlmc .meta-row{grid-template-columns:1fr;}
  .mlmc .meta-row .cell + .cell{border-left:none;border-top:1px solid var(--line);}
  .mlmc .b-hero{padding:28px 22px;}
  .mlmc .b-form{padding:24px 22px;}
  .mlmc .problem-card{padding:22px;}
  .mlmc .out-card, .mlmc .mod, .mlmc .faq-item{padding:22px;}
  .mlmc .mentor-shell{padding:22px;}
  .mlmc .mentor-photo{max-width:340px;border-radius:16px;}
  .mlmc .mentor-photo .badges{top:14px;left:14px;right:14px;}
  .mlmc .mentor-photo .credit{bottom:14px;left:14px;right:14px;padding:11px 13px;border-radius:9px;}
  .mlmc .mentor-photo .credit .nm{font-size:16px;}
  .mlmc .mentor-info h2{font-size:32px;}
  .mlmc .mentor-info .bio{font-size:14px;}
  .mlmc .cta-shell{padding:36px 20px;}
  .mlmc .cta-shell h2{font-size:28px;}
  .mlmc .cta-shell p{font-size:14px;}
  .mlmc .term{font-size:11px;line-height:1.6;padding:14px;}
  .mlmc .pc-h{font-size:21px;}
  .mlmc .mod h3{font-size:20px;}
  .mlmc .ui-mock{font-size:11px;}
  .mlmc .section{padding:64px 0;}
  .mlmc .f-inner{flex-direction:column;text-align:center;}
}
/* ── Phone ≤480px ─────────────────────────────────────── */
@media (max-width:480px){
  .mlmc .container{padding:0 14px;}
  .mlmc .nav{padding:7px 8px 7px 12px;border-radius:12px;}
  .mlmc .brand .name span{display:none;}
  .mlmc .nav-cta{font-size:11px;padding:7px 10px;letter-spacing:-.005em;gap:4px;}
  .mlmc .poster{padding:78px 0 10px;}
  .mlmc .poster-frame{border-radius:14px;}
  .mlmc h1.hero-h1{font-size:28px;}
  .mlmc .hero-sub{font-size:14px;}
  .mlmc .s-title{font-size:24px;}
  .mlmc .cta-shell h2{font-size:22px;}
  .mlmc .outcomes-grid{grid-template-columns:1fr;}
  .mlmc .mentor-stats{grid-template-columns:1fr;}
  .mlmc .section{padding:52px 0;}
  .mlmc .b-hero{padding:24px 18px;}
  .mlmc .b-form{padding:20px 18px;}
  .mlmc .problem-card, .mlmc .out-card, .mlmc .mod, .mlmc .faq-item{padding:18px;}
  .mlmc .mentor-shell{padding:18px;}
  .mlmc .pc-h, .mlmc .mod h3{font-size:19px;}
  .mlmc .term{font-size:10.5px;padding:12px;line-height:1.55;}
  .mlmc .ui-mock{font-size:10.5px;}
  .mlmc .meta-row .v{font-size:16px;}
  .mlmc .submit-btn{padding:13px;font-size:13px;}
  .mlmc .mentor-photo{max-width:300px;border-radius:14px;}
  .mlmc .mentor-photo .b{padding:5px 8px;font-size:9px;letter-spacing:.16em;}
  .mlmc .mentor-photo .credit{padding:10px 12px;}
  .mlmc .mentor-photo .credit .role{font-size:9px;letter-spacing:.18em;}
  .mlmc .mentor-photo .credit .nm{font-size:15px;}
  .mlmc .mentor-info h2{font-size:28px;}
  .mlmc .faq-item .q{font-size:15px;}
  .mlmc .faq-item .a{font-size:13.5px;padding-left:0;}
  .mlmc .out-card h4{font-size:16px;}
  .mlmc .pc-desc, .mlmc .mod .desc{font-size:13.5px;}
  .mlmc .cta-shell .btn{padding:12px 22px;font-size:13px;}
}
`;

const SECTIONS = ["curriculum", "outcomes", "mentor", "faq", "register"];

function scrollToSection(id, behavior = "smooth") {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior, block: "start" });
}

function NavAnchor({ to, className, children }) {
  const handle = (e) => {
    e.preventDefault();
    scrollToSection(to);
    if (window.location.pathname !== `/${to}`) {
      window.history.pushState({}, "", `/${to}`);
    }
  };
  return (
    <a href={`/${to}`} onClick={handle} className={className}>
      {children}
    </a>
  );
}

const ArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Check = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const Shield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MODULES = [
  {
    num: "Module 01", time: "~ 25 min",
    title: <>The <em>Algorithm Map</em></>,
    desc: "A clear mental model of every algorithm interviewers actually probe — supervised, unsupervised, ensembles. When to reach for which, and why.",
    progress: [
      { done: true, text: "Linear & logistic regression — what they really probe", pct: 100 },
      { done: true, text: "Trees, random forests, gradient boosting — when each wins", pct: 100 },
      { done: false, text: "Clustering & dim. reduction — usually under-prepared", pct: 35 },
    ],
  },
  {
    num: "Module 02", time: "~ 30 min",
    title: <><em>Concept</em> Clarity</>,
    desc: "The fundamentals that separate \"I memorised it\" from \"I understand it.\" Where most candidates lose the round in 5 minutes.",
    list: [
      "Bias-variance — beyond the textbook diagram",
      "Regularisation & cross-validation traps",
      "Picking the right metric — accuracy is rarely it",
    ],
  },
  {
    num: "Module 03", time: "~ 35 min",
    title: <>Interview <em>Guidance & Walkthrough</em></>,
    desc: "A live, behind-the-scenes walk-through of a real ML interview — staged the way panels actually run them. We rebuild a candidate's answer in real time, point out the exact moments interviewers form their verdict, and show you the small phrasing shifts that move you from \"rejected\" to \"advance to next round.\"",
    list: [
      "Live mock-interview teardown — what \"good\" actually sounds like",
      "Handling \"I don't know\" without losing the room",
      "Negotiating the question — when (and how) to push back",
    ],
  },
  {
    num: "Module 04", time: "~ 30 min",
    title: <>The <em>Playbook</em></>,
    desc: "Meta-skills nobody teaches you. How to think out loud, what hiring managers really score you on.",
    list: [
      "The 4-step framework for any ML question",
      "Red flags interviewers note in 30 seconds",
      "Live Q&A — bring your interview horror stories",
    ],
  },
];

const OUTCOMES = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: <>The <em>4-step</em> answer framework</>,
    desc: "A printable checklist you mentally run before any ML question — frame, baseline, model, evaluate. Never freeze on \"where do I start?\" again.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M7 14l4-4 4 4 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: <>The <em>concept</em> cheat-sheet</>,
    desc: "Bias-variance, regularisation, metrics, validation — the seven concepts that surface in 80% of rounds, distilled into one reference page.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: <>The <em>narration</em> patterns</>,
    desc: "Sample phrasings for thinking out loud — the verbal cues that signal seniority and make panels lean in instead of move on.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: <>The <em>30-day</em> prep map</>,
    desc: "A week-by-week plan for what to revise, what to drill, and what to skip — calibrated for whatever stage you're at right now.",
  },
];

const FAQ = [
  { q: "Is this for beginners or experienced folks?", a: "Both — but optimised for anyone within 12 months of an ML interview. If you've never written a model, you'll get more from a foundations course first." },
  { q: "Will I get a recording?", a: "No recordings — this is a live-only masterclass. Showing up is the point. What you will get: the complete cheat-sheet pack delivered within 24 hours, so you can revise the frameworks long after the session ends." },
  { q: "How is this different from a YouTube playlist?", a: "YouTube teaches you concepts. This teaches you the meta — what panels are scoring, the phrasing that lands, the framings that don't. It's pattern, not theory." },
  { q: "Is there a fee?", a: "The inaugural cohort is free for the first wave of registrants. Future cohorts will be paid — lock your seat now." },
  { q: "Will my specific interview question be addressed?", a: "The last 30 minutes is live Q&A. Bring real questions you've been asked or are dreading — Vinit walks through them on the call." },
  { q: "What if I can't make it live?", a: "Try to make it. The Q&A is where most attendees get their breakthrough. You'll get the cheat-sheet pack either way, but it's a companion — not a replacement." },
];

// Deployed Google Apps Script endpoint for form submissions + email automation
// Update this with your Google Apps Script deployment URL from script.google.com
const SHEET_ENDPOINT = "https://your-railway-app.up.railway.app/api/register";

export default function MlMasterclass() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "" });
  const [status, setStatus] = useState("idle");
  const posterFrameRef = useRef(null);
  const posterIframeRef = useRef(null);

  React.useEffect(() => {
    const frame = posterFrameRef.current;
    const iframe = posterIframeRef.current;
    if (!frame || !iframe) return;
    const scalePoster = () => {
      const scale = frame.clientWidth / 1200;
      iframe.style.transform = `scale(${scale})`;
    };
    scalePoster();
    window.addEventListener("resize", scalePoster);
    iframe.addEventListener("load", scalePoster);
    return () => {
      window.removeEventListener("resize", scalePoster);
      iframe.removeEventListener("load", scalePoster);
    };
  }, []);

  React.useEffect(() => {
    if (!document.getElementById("mlmc-fonts")) {
      const link = document.createElement("link");
      link.id = "mlmc-fonts";
      link.rel = "stylesheet";
      link.href = FONTS_HREF;
      document.head.appendChild(link);
    }
    if (!document.getElementById("mlmc-styles")) {
      const style = document.createElement("style");
      style.id = "mlmc-styles";
      style.textContent = STYLES;
      document.head.appendChild(style);
    }
  }, []);

  React.useEffect(() => {
    const syncFromPath = (behavior) => {
      const path = window.location.pathname.replace(/^\//, "");
      if (SECTIONS.includes(path)) {
        requestAnimationFrame(() => scrollToSection(path, behavior));
      } else if (behavior === "smooth") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    syncFromPath("auto");
    const onPop = () => syncFromPath("smooth");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const body = new URLSearchParams({
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        timestamp: new Date().toISOString(),
        source: "ml-masterclass-cohort-01",
      });
      await fetch(SHEET_ENDPOINT, {
        method: "POST",
        body,
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", role: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="mlmc">
      <div className="global-bg"></div>
      <div className="global-grid"></div>

      {/* NAV */}
      <nav className="nav">
        <div className="brand">
          <div className="mark"><span>M</span></div>
          <div className="name"><b>Masterclass</b></div>
        </div>
        <div className="nav-links">
          <NavAnchor to="curriculum" className="nav-link">Curriculum</NavAnchor>
          <NavAnchor to="outcomes" className="nav-link">Outcomes</NavAnchor>
          <NavAnchor to="mentor" className="nav-link">Mentor</NavAnchor>
          <NavAnchor to="faq" className="nav-link">FAQ</NavAnchor>
          <NavAnchor to="register" className="nav-cta">Reserve seat <ArrowRight width="11" height="11" /></NavAnchor>
        </div>
      </nav>

      {/* POSTER */}
      <section className="poster">
        <div className="container">
          <div className="poster-frame" ref={posterFrameRef}>
            <iframe
              src="/ml_interview_prep_REFINED.html"
              className="poster-iframe"
              ref={posterIframeRef}
              title="ML Interview Masterclass · 16 May poster"
              loading="eager"
              scrolling="no"
            />
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="status-strip">
            <div className="pill live"><span className="dot"></span>v1.0 · Inaugural cohort</div>
            <div className="arrow">→</div>
            <div className="pill">Live · 16 May, 7 PM IST</div>
          </div>

          <div className="bento">
            <div className="b-hero">
              <h1 className="hero-h1">
                The operating system for<br />
                <span className="highlight">ML interviews.</span>
                <span className="stack">Built by someone who runs them.</span>
              </h1>
              <p className="hero-sub">
                Stop studying ML like a syllabus. <b>Start studying it like a hiring manager.</b> A 2-hour live masterclass distilling the patterns, frameworks and case-studies that decide every ML interview.
              </p>

              <div className="meta-row">
                <div className="cell"><div className="k">Date</div><div className="v">16 May<small>Friday</small></div></div>
                <div className="cell"><div className="k">Time</div><div className="v">7 — 9 PM<small>IST · 2 hours</small></div></div>
                <div className="cell"><div className="k">Platform</div><div className="v">Live<small>Zoom · Q&A included</small></div></div>
              </div>

              <div className="ui-mock">
                <span className="prompt">⸺ ml-prep</span>
                <span className="text">analyzing question_pattern.json — extracting framework</span>
                <span className="cursor"></span>
              </div>
            </div>

            <form className="b-form" id="register" onSubmit={onSubmit}>
              <div className="f-head">
                <div className="f-tag"><span className="dot"></span>Seats filling · cohort 01</div>
                <div className="f-title">Reserve your <em>spot.</em></div>
                <div className="f-sub">30 seconds. Zoom link sent to your email instantly.</div>
              </div>

              <div className="field"><label>Full name</label>
                <input type="text" name="name" value={form.name} onChange={onChange} placeholder="Your name" required />
              </div>
              <div className="field"><label>Email address</label>
                <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@university.edu" required />
              </div>
              <div className="field"><label>WhatsApp number</label>
                <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+91 98XXX XXXXX" required />
              </div>
              <div className="field"><label>You are a —</label>
                <select name="role" value={form.role} onChange={onChange} required>
                  <option value="">Select one</option>
                  <option>3rd year engineering student</option>
                  <option>4th / final year student</option>
                  <option>Recent graduate, job hunting</option>
                  <option>Working professional, switching to ML</option>
                  <option>Other</option>
                </select>
              </div>

              <button className="submit-btn" type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Reserving…" : (<>Confirm my seat <ArrowRight /></>)}
              </button>

              {status === "success" && (
                <div className="f-msg ok">Seat reserved. We'll email the Zoom link before 16 May.</div>
              )}
              {status === "error" && (
                <div className="f-msg err">Couldn't save right now — please try again or DM us on WhatsApp.</div>
              )}

              <div className="f-foot"><Shield />Encrypted · No spam · Used only for session access</div>
            </form>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section">
        <div className="container">
          <div className="s-head">
            <div>
              <div className="s-tag"><span className="square"></span>The diagnosis</div>
              <h2 className="s-title">Why most ML prep <em>fails</em> the interview test.</h2>
            </div>
            <p className="s-sub">The problem isn't lack of effort. It's that the prep is built for the wrong battle. Here's what usually happens — and what changes when you flip the lens.</p>
          </div>

          <div className="problem-grid">
            <div className="problem-card broken">
              <div className="pc-tag"><span className="dot"></span>Status: stuck</div>
              <div className="pc-h">Studying ML <em>like a syllabus.</em></div>
              <p className="pc-desc">Memorising algorithm definitions you can't apply under pressure. Treating every concept as equally important. Zero exposure to how questions actually get framed.</p>
              <div className="term">
                <div className="head"><div className="dot d1"></div><div className="dot d2"></div><div className="dot d3"></div><div className="file">interview-attempt.log</div></div>
                <span className="row"><span className="c1">01</span><span className="key">Q:</span> "Walk me through how you'd approach this churn prediction problem."</span>
                <span className="row"><span className="c1">02</span><span className="key">You:</span> "Umm... I'd use logistic regression?"</span>
                <span className="row"><span className="c1">03</span><span className="err">// answer too narrow. interviewer waiting for framing.</span></span>
                <span className="row"><span className="c1">04</span><span className="err">✗ Round terminated.</span></span>
              </div>
            </div>

            <div className="problem-card fixed">
              <div className="pc-tag"><span className="dot"></span>Status: shipping</div>
              <div className="pc-h">Studying ML <em>like a hiring manager.</em></div>
              <p className="pc-desc">Learn the 7 algorithm families that 80% of ML rounds orbit around. Understand why bias-variance and regularisation are non-negotiable. Walk out with a checklist for any question.</p>
              <div className="term">
                <div className="head"><div className="dot d1"></div><div className="dot d2"></div><div className="dot d3"></div><div className="file">interview-attempt.log</div></div>
                <span className="row"><span className="c1">01</span><span className="key">Q:</span> "Walk me through how you'd approach this churn prediction problem."</span>
                <span className="row"><span className="c1">02</span><span className="key">You:</span> "Let me first frame the problem — <span className="hl">what is my data says after EDA</span>?"</span>
                <span className="row"><span className="c1">03</span><span className="ok">// good. interviewer leans forward.</span></span>
                <span className="row"><span className="c1">04</span><span className="ok">✓ Offer extended.</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="section" id="curriculum">
        <div className="container">
          <div className="s-head">
            <div>
              <div className="s-tag"><span className="square"></span>The 2 hours, mapped</div>
              <h2 className="s-title">Four modules. Zero <em>filler.</em></h2>
            </div>
            <p className="s-sub">Each module engineered around the questions that actually surface in ML rounds — at startups, product companies and FAANG-tier panels.</p>
          </div>

          <div className="module-bento">
            {MODULES.map((m, i) => (
              <div key={i} className={`mod${m.span ? " span2" : ""}`}>
                <div className="mod-head">
                  <div className="mod-num"><span className="dot"></span>{m.num}</div>
                  <div className="mod-time">{m.time}</div>
                </div>
                <h3>{m.title}</h3>
                <div className="desc">{m.desc}</div>
                {m.progress && (
                  <div className="mock-progress">
                    {m.progress.map((p, j) => (
                      <div className="row" key={j}>
                        <div className="l">
                          <div className={`ic${p.done ? "" : " todo"}`}>{p.done ? "✓" : "○"}</div>
                          {p.text}
                        </div>
                        <div className="bar"><i style={{ width: `${p.pct}%` }}></i></div>
                      </div>
                    ))}
                  </div>
                )}
                {m.list && (
                  <ul className="mod-list">
                    {m.list.map((li, j) => (
                      <li key={j}><Check />{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="section" id="outcomes">
        <div className="container">
          <div className="s-head">
            <div>
              <div className="s-tag"><span className="square"></span>What you walk away with</div>
              <h2 className="s-title">Tangible takeaways. <em>Not vibes.</em></h2>
            </div>
            <p className="s-sub">Two hours, four artifacts you'll keep using long after the session ends — engineered to plug straight into your next round.</p>
          </div>

          <div className="outcomes-grid">
            {OUTCOMES.map((o, i) => (
              <div className="out-card" key={i}>
                <div className="out-icon">{o.icon}</div>
                <h4>{o.title}</h4>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTOR */}
      <section className="section" id="mentor">
        <div className="container">
          <div className="mentor-shell">
            <div className="mentor-grid">
              <div className="mentor-photo">
                <img src="/IMG_6764.JPEG" alt="Vinit Sharma — Senior Data Scientist" className="mentor-img" />
                <div className="badges"><div className="b"><span className="dot"></span>Hosting · 16 May</div></div>
                <div className="credit"><div className="role">Senior Data Scientist</div><div className="nm">Vinit Sharma</div></div>
              </div>

              <div className="mentor-info">
                <h2>Vinit <em>Sharma</em></h2>
                <div className="role">Senior Data Scientist</div>
                <p className="bio">Vinit has spent the last several years building ML systems in production — and just as importantly, he's been on the <em>other side of the table.</em> He's interviewed candidates for ML roles, watched brilliant engineers fumble basic framing, and seen mediocre profiles win offers because they understood how to talk about their thinking.</p>
                <p className="bio">This masterclass distills exactly what he wishes every candidate walked into the room knowing — without the textbook detours.</p>

                <div className="mentor-stats">
                  <div className="s"><div className="num">Sr. <em>DS</em></div><div className="lbl">Currently leading<br />ML projects</div></div>
                  <div className="s"><div className="num"><em>Both</em> sides</div><div className="lbl">Of the<br />interview table</div></div>
                  <div className="s"><div className="num"><em>2</em> hrs</div><div className="lbl">To compress<br />years of pattern</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="s-head">
            <div>
              <div className="s-tag"><span className="square"></span>Quick answers</div>
              <h2 className="s-title">Things people <em>ask</em> before signing up.</h2>
            </div>
            <p className="s-sub">If your question isn't here, ping us on the registration confirmation — we read every reply.</p>
          </div>

          <div className="faq-grid">
            {FAQ.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="q"><div className="q-mark">?</div>{f.q}</div>
                <div className="a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-shell">
            <div className="small"><span className="dot"></span>Cohort 01 · Closing soon</div>
            <h2>Two hours that change<br />how you walk into <em>every ML round.</em></h2>
            <p>Free for the inaugural cohort. Live Q&A. Recording included. The seat is yours if you claim it now.</p>
            <NavAnchor to="register" className="btn">Reserve my seat <ArrowRight /></NavAnchor>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="container f-inner">
          <div className="f-legal">© 2026 Masterclass · ML Track · v1.0</div>
          <div className="f-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
