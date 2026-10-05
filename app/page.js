"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✏️ EDIT ALL TEXT HERE
const T = {
  am: { cls:"am", tap:"ለመክፈት ይንኩ", kick:"የምረቃ ግብዣ", grads:"ተመራቂዎች",
    n1:"ሴናፍ ጌታቸው", n2:"ቶቲ ጌታቸው", u1:"ዩናይትድ ስቴትስ ኢንተርናሽናል ዩኒቨርሲቲ-አፍሪካ (USIU-A)", u2:"አዲስ አበባ ሳይንስና ቴክኖሎጂ ዩኒቨርሲቲ (AASTU)",
    msg:"በታላቅ ምስጋናና ደስታ፣ የልጆቻችንን ምረቃ ለማክበር በሚደረገው የምሳ ግብዣ ላይ እንዲገኙልን በአክብሮት እንጋብዛለን። እግዚአብሔርን አመስግነን ደስታችንን ከእርስዎ ጋር ለመካፈል እንወዳለን።",
    hosts:"አክባሪ ጋባዦች", h:"ዶ/ር ጽጌረዳ አበበ እና ብ/ጄ ጌታቸው ሺፈራው", date:"ቀን", d:"ጥቅምት 8 ቀን 2019 ዓ.ም", d2:"October 18, 2026",
    loc:"ቦታ", l:"ቂርቆስ፣ አርባ ምንጭ አሳ ሬስቶራንት አካባቢ፣ አዲስ አበባ", bye:"እንደሚመጡ ተስፋ እናደርጋለን!" },
  en: { cls:"", tap:"Tap to open", kick:"Graduation Invitation", grads:"The Graduates",
    n1:"Senaf Getachew", n2:"Toti Getachew", u1:"United States International University-Africa (USIU-A)", u2:"Addis Ababa Science and Technology University (AASTU)",
    msg:"With hearts full of gratitude and joy, we warmly invite you to a lunch celebration in honor of our children's graduation. Join us as we thank God and share this milestone together.",
    hosts:"Hosted by", h:"Dr. Tsigereda Abebe & Br. Gen. Getachew Shiferaw", date:"Date", d:"October 18, 2026", d2:"ጥቅምት 8 ቀን 2019 ዓ.ም",
    loc:"Location", l:"Kirkos, around Arba Minch Asa Restaurant, Addis Ababa", bye:"We hope to see you there!" },
  om: { cls:"", tap:"Banuuf tuqi", kick:"Affeerraa Eebbifamaa", grads:"Eebbifamtoota",
    n1:"Senaf Getachew", n2:"Toti Getachew", u1:"United States International University-Africa (USIU-A)", u2:"Addis Ababa Science and Technology University (AASTU)",
    msg:"Gammachuu fi galateeffannaadhaan guutamnee, eebbifamuu ijoollee keenyaa kabajuuf laaqana keenya irratti akka argamtan kabajaan isin affeerra. Waaqayyoof galateeffannee gammachuu keenya isin waliin hirmaannee jirra.",
    hosts:"Affeertotni", h:"Dr. Tsigereda Abebe fi Br. Gen. Getachew Shiferaw", date:"Guyyaa", d:"Onkoloolessa 18, 2026", d2:"ጥቅምት 8 ቀን 2019 ዓ.ም",
    loc:"Iddoo", l:"Kirkos, naannoo Mana Nyaataa Albaa Arba Minch, Finfinnee", bye:"Isin argachuuf abdii qabna!" },
};


const FILM = ["img_6207","img_6209","img_6241","img_6210","img_6236","img_6244","img_6239","img_6237"];
const L = { // chips + countdown wording
  am: { cls:"የ2026 ተመራቂዎች", n1:"ሴናፍ", n2:"ቶቲ", go:n=>`${n} ቀናት ይቀራሉ`, now:"ዛሬ ነው! 🎓" },
  en: { cls:"Class of 2026", n1:"Senaf", n2:"Toti", go:n=>`${n} days to go`, now:"It's today! 🎓" },
  om: { cls:"Ergamtoota 2026", n1:"Senaf", n2:"Toti", go:n=>`Guyyaan ${n} hafe`, now:"Har'a ti! 🎓" },
};
const rnd = (i, m) => ((i * 9301 + 49297) % 233280) / 233280 * m; // stable pseudo-random

function Cap({ size = 60 }) {
  return (<svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M32 10 2 24l30 14 30-14L32 10Z" fill="#9b1b3f"/><path d="M14 31v13c0 5 8 9 18 9s18-4 18-9V31L32 41 14 31Z" fill="#6e1030"/>
    <path d="M58 26v18" stroke="#b88a44" strokeWidth="2.5"/><circle cx="58" cy="46" r="3" fill="#b88a44"/></svg>);
}
function Seal() {
  return (<svg className="badge" viewBox="0 0 200 200"><defs><path id="c" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0"/></defs>
    <circle cx="100" cy="100" r="96" fill="none" stroke="#b88a44" strokeDasharray="2 5"/>
    <circle cx="100" cy="100" r="58" fill="#fbf4ec" stroke="#9b1b3f" strokeWidth="2"/>
    <text fontSize="13" letterSpacing="3.5" fill="#9b1b3f" fontFamily="serif"><textPath href="#c">GRADUATION · CLASS OF 2026 · S&amp;T · SENAF &amp; TOTI ·</textPath></text>
    <g transform="translate(76 74) scale(.75)"><Cap size={64}/></g>
    <text x="100" y="132" textAnchor="middle" fontSize="18" fill="#9b1b3f" fontFamily="serif">2026</text></svg>);
}
function Ambient() { // film loop + floating caps + confetti + sparkles, all behind content
  const strip = (rev) => (<div className={"strip" + (rev ? " rev" : "")}>
    {[...(rev ? [...FILM].reverse() : FILM), ...(rev ? [...FILM].reverse() : FILM)].map((f, i) =>
      <i key={i} style={{ backgroundImage:`url(/images/film/${f}.jpg)` }} />)}</div>);
  return (<div className="ambient" aria-hidden>
    <Bursts />
    <div className="film">{strip(false)}{strip(true)}{strip(false)}</div>
    {Array.from({length:7}).map((_,i)=>(<span key={"c"+i} className="fcap" style={{left:`${rnd(i+1,92)}%`,animationDelay:`${-rnd(i+3,20)}s`,animationDuration:`${18+rnd(i+5,14)}s`,scale:`${.6+rnd(i+2,.9)}`}}><Cap size={54}/></span>))}
    {Array.from({length:34}).map((_,i)=>(<b key={"f"+i} className="conf" style={{left:`${rnd(i+11,100)}%`,background:["#9b1b3f","#b88a44","#d9798f","#e8c98e"][i%4],animationDelay:`${-rnd(i+7,14)}s`,animationDuration:`${9+rnd(i+4,9)}s`}}/>))}
    {Array.from({length:22}).map((_,i)=>(<em key={"s"+i} className="spark" style={{left:`${rnd(i+21,100)}%`,top:`${rnd(i+9,100)}%`,animationDelay:`${-rnd(i+2,5)}s`}}>✦</em>))}
  </div>);
}

function Ic({ n }) { // vintage line icons
  const P = {
    cal:<><rect x="8" y="12" width="48" height="44" rx="3"/><path d="M8 24h48M20 6v12M44 6v12M20 34h6M30 34h6M40 34h6M20 44h6M30 44h6"/><path d="M32 8l1.5 3 3 .4-2.2 2 .6 3-2.9-1.6-2.9 1.6.6-3-2.2-2 3-.4z" strokeWidth="1"/></>,
    pin:<><path d="M32 58C20 42 14 34 14 25a18 18 0 0 1 36 0c0 9-6 17-18 33Z"/><circle cx="32" cy="25" r="7"/><path d="M12 60h40" strokeDasharray="3 4"/></>,
    host:<><circle cx="32" cy="30" r="12"/><path d="M32 38c-5-4-8-7-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 3-3 6-8 10ZM10 20c-3 10 0 22 10 32M54 20c3 10 0 22-10 32M16 54l6-3M48 54l-6-3"/></>,
    msg:<><rect x="6" y="14" width="52" height="38" rx="3"/><path d="M6 16l26 22 26-22M6 50l18-18M58 50L40 32"/></>,
    cap:<><path d="M32 12 4 26l28 13 28-13-28-14Z"/><path d="M16 34v12c0 4 7 8 16 8s16-4 16-8V34M58 28v16"/><circle cx="58" cy="47" r="2.5"/></>,
  };
  return (<svg className="ic" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{P[n]}</svg>);
}
function Bursts() { // fireworks + tossed caps
  return (<>{[[18,22],[78,16],[60,48]].map(([x,y],b)=>(<div key={b} className="burst" style={{left:`${x}%`,top:`${y}%`,animationDelay:`${b*2.3}s`}}>
    {Array.from({length:12}).map((_,i)=>(<u key={i} style={{"--a":`${i*30}deg`}}/>))}</div>))}
    {Array.from({length:5}).map((_,i)=>(<span key={i} className="toss" style={{left:`${12+i*18}%`,animationDelay:`${i*1.6}s`}}><Cap size={46}/></span>))}</>);
}

function Gallery() { // auto-sliding looping photo film (images from /public/images/film)
  const row = [...FILM, ...FILM];
  return (<div className="gal"><div className="track">
    {row.map((f, i) => <i key={i} style={{ backgroundImage:`url(/images/film/${f}.jpg)`, rotate: i % 2 ? "2deg" : "-2deg" }} />)}</div></div>);
}
function useDays() {
  const [d, setD] = useState(null);
  useEffect(() => { const f = () => setD(Math.ceil((new Date("2026-10-18T12:00:00+03:00") - Date.now()) / 864e5)); f(); const t = setInterval(f, 36e5); return () => clearInterval(t); }, []);
  return d;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("am");
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);
  const t = T[lang]; const l = L[lang]; const days = useDays();

  const openLetter = () => {           // first touch/click starts music
    setOpen(true);
    audio.current?.play().then(() => setPlaying(true)).catch(() => {});
  };
  const toggle = () => {
    if (!audio.current) return;
    if (playing) { audio.current.pause(); setPlaying(false); }
    else { audio.current.play(); setPlaying(true); }
  };
  const fade = { initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true}, transition:{duration:.9} };

  return (
    <>
      {/* 🎵 Put your file at /public/music.mp3 */}
      <audio ref={audio} src="/music.mp3" loop preload="auto" />
      <AnimatePresence>
        {!open && (
          <motion.div className="env-wrap" onClick={openLetter} exit={{ opacity:0, scale:1.15 }} transition={{ duration:.9 }}>
            <motion.div className="env" initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }}>
              <div className="body" />
              <div className="flap" />
              <motion.div className="seal" animate={{ scale:[1,1.08,1] }} transition={{ repeat:Infinity, duration:2 }}>S&amp;T</motion.div>
              <div className="hint">{t.tap}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <main className={t.cls}>
          <Ambient />
          <div className="lang">
            {[["am","አማርኛ"],["en","English"],["om","Afaan Oromoo"]].map(([k,n]) => (
              <button key={k} className={lang===k?"on":""} onClick={()=>setLang(k)}>{n}</button>))}
          </div>
          <button className="snd" onClick={toggle} aria-label="Toggle music">{playing ? "♪" : "✕"}</button>

          <section className="hero2">
            <div className="photos"><div style={{backgroundImage:"url(/images/senaf.jpg)"}} /><div style={{backgroundImage:"url(/images/toti.jpg)"}} /></div>
            <motion.div className="htxt" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1.2,delay:.3}}>
              <p className="kicker">{t.kick} · 2026</p>
              <h1 className="hn">{t.n1}</h1>
              <p className="uni"><Ic n="cap"/>{t.u1}</p>
              <div className="amp2">&amp;</div>
              <h1 className="hn">{t.n2}</h1>
              <p className="uni"><Ic n="cap"/>{t.u2}</p>
              <p className="kicker" style={{marginTop:18}}>{t.n1} &amp; {t.n2}</p>
              <div className="chips"><span className="chip on">{l.cls}</span>
                {days !== null && <span className="chip">{days > 0 ? l.go(days) : l.now}</span>}</div>
            </motion.div>
            <Seal />
          </section>

          <section className="sec">
            <motion.div {...fade}>
              <Ic n="cap"/><p className="lab">{t.grads}</p><div className="orn" />
              <div className="grads">
                <div><h3>{t.n1}</h3><p>{t.u1}</p></div>
                <div><h3>{t.n2}</h3><p>{t.u2}</p></div>
              </div>
            <Gallery />
            </motion.div>
          </section>

          <section className="sec" style={{paddingTop:0}}>
            <motion.div {...fade}><Ic n="msg"/></motion.div>
            <motion.p className="msg" {...fade}>{t.msg}</motion.p>
            <div className="orn" />
            <motion.div className="card" {...fade}><Ic n="host"/><p className="lab">{t.hosts}</p><h2>{t.h}</h2></motion.div>
            <motion.div className="card" {...fade}><Ic n="cal"/><p className="lab">{t.date}</p><h2>{t.d}</h2><p>{t.d2}</p></motion.div>
            <motion.div className="card" {...fade}><Ic n="pin"/><p className="lab">{t.loc}</p><h2>{t.l}</h2></motion.div>
            <motion.h2 style={{marginTop:60}} {...fade}>{t.bye}</motion.h2>
          </section>
        </main>
      )}
    </>
  );
}
