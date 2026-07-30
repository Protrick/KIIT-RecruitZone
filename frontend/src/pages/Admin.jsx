import React, { useState, useEffect, useRef } from 'react';
import { Plus, Save, X, AlertCircle, MapPin, FileText, Upload, Briefcase, GraduationCap, Building2, Clock, Lock } from 'lucide-react';
import axios from 'axios';

/* ─── Animated counter ─── */
function Counter({ value }) {
  const [n, setN] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const from = prev.current, to = value;
    prev.current = value;
    if (from === to) return;
    const t0 = performance.now();
    const run = (now) => {
      const p = Math.min((now - t0) / 550, 1);
      setN(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [value]);
  return <>{n}</>;
}

/* ─── Typewriter ─── */
function Typewriter({ text, delay = 0 }) {
  const [out, setOut] = useState('');
  const [live, setLive] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLive(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!live) return;
    let i = 0; setOut('');
    const iv = setInterval(() => { setOut(text.slice(0, ++i)); if (i >= text.length) clearInterval(iv); }, 50);
    return () => clearInterval(iv);
  }, [live, text]);
  return <>{out}<span className="cursor">|</span></>;
}

/* ─── Scroll-reveal hook ─── */
function useReveal(threshold = 0.06) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, []);
  return ref;
}

const CATS = ['Developer', 'Sales', 'Ops', 'Marketing', 'Analytics', 'Product', 'Design'];
const EMPTY = {
  listingType: 'Job',
  companyName: '', jobTitle: '', locationType: 'On-Campus',
  ctcAmount: '', ctcPeriod: '/m', stipendAmount: '', stipendPeriod: '/ month',
  skills: '', description: '', category: 'Developer', type: 'Full Time',
  verified: true, daysLeft: '', pdfFile: null, pdfFileName: ''
};

export default function AdminPanel() {
  const [form, setForm]           = useState(EMPTY);
  const [cards, setCards]         = useState([]);
  const [errs, setErrs]           = useState({});
  const [toast, setToast]         = useState(false);
  const [prog, setProg]           = useState(null);
  const [busy, setBusy]           = useState(false);
  const [exitId, setExitId]       = useState(null);
  const [mounted, setMounted]     = useState(false);
  const [activeSection, setActive]= useState(null);
  const [adminToken, setAdminToken] = useState("");

  const formRef    = useReveal();
  const sideRef    = useReveal();

  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const autoLoginAndFetch = async () => {
      // 1. Authenticate in the background
      try {
        const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
          email: "admin@kiit.ac.in",
          password: "adminpassword"
        });
        if (loginRes.data && loginRes.data.token) {
          setAdminToken(loginRes.data.token);
        }
      } catch (loginErr) {
        console.error("Auto admin login failed:", loginErr);
      }

      // 2. Load listings
      try {
        const [jobsRes, internshipsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/jobs"),
          axios.get("http://localhost:5000/api/jobs/internships")
        ]);

        const mappedJobs = jobsRes.data.map(j => ({
          id: j._id,
          listingType: "Job",
          companyName: j.company,
          jobTitle: j.title,
          locationType: j.location,
          ctc: `₹${j.salary.toLocaleString()}/annum`,
          stipend: "N/A",
          stipendPeriod: "",
          skills: j.skillsRequired || [],
          description: j.description || "No description provided.",
          category: "Developer",
          type: "Full Time",
          verified: true,
          postedDate: new Date(j.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          daysLeft: Math.max(0, Math.ceil((new Date(j.deadline) - new Date()) / (1000 * 60 * 60 * 24)))
        }));

        const mappedInternships = internshipsRes.data.map(i => ({
          id: i._id,
          listingType: "Internship",
          companyName: i.company,
          jobTitle: i.title,
          locationType: i.location,
          ctc: "N/A",
          stipend: `₹${i.stipend.toLocaleString()}`,
          stipendPeriod: "/ month",
          skills: i.skillsRequired || [],
          description: i.description || "No description provided.",
          category: "Developer",
          type: "Internship",
          verified: true,
          postedDate: new Date(i.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          daysLeft: Math.max(0, Math.ceil((new Date(i.deadline) - new Date()) / (1000 * 60 * 60 * 24)))
        }));

        setCards([...mappedJobs, ...mappedInternships]);
      } catch (err) {
        console.error("Error loading admin listings:", err);
      }
    };
    autoLoginAndFetch();
  }, []);

  const set = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errs[name]) setErrs(p => ({ ...p, [name]: '' }));
  };

  const onPDF = (e) => {
    const f = e.target.files[0]; if (!f) return;
    if (f.type !== 'application/pdf') { setErrs(p => ({ ...p, pdfFile: 'Only PDF allowed' })); return; }
    if (f.size > 50 * 1024 * 1024)   { setErrs(p => ({ ...p, pdfFile: 'Max 50 MB' })); return; }
    setErrs(p => ({ ...p, pdfFile: '' }));
    const r = new FileReader();
    r.onloadstart = () => setProg(0);
    r.onprogress  = ev => ev.lengthComputable && setProg(ev.loaded / ev.total * 100);
    r.onload      = ev => { setForm(p => ({ ...p, pdfFile: ev.target.result, pdfFileName: f.name })); setProg(null); };
    r.onerror     = () => { setErrs(p => ({ ...p, pdfFile: 'Read error' })); setProg(null); };
    r.readAsDataURL(f);
  };

  const rmPDF = () => { setForm(p => ({ ...p, pdfFile: null, pdfFileName: '' })); setErrs(p => ({ ...p, pdfFile: '' })); };

  const validate = () => {
    const e = {};
    if (!form.companyName.trim())               e.companyName   = 'Required';
    if (!form.jobTitle.trim())                  e.jobTitle      = 'Required';
    if (form.listingType === "Job" && (!form.ctcAmount || form.ctcAmount < 0))  e.ctcAmount     = 'Required';
    if (form.listingType === "Internship" && (!form.stipendAmount || form.stipendAmount < 0)) e.stipendAmount = 'Required';
    if (!form.skills.trim())                    e.skills        = 'Required';
    if (!form.description.trim())               e.description   = 'Required';
    if (!form.daysLeft || form.daysLeft < 1)    e.daysLeft      = 'Min 1 day';
    setErrs(e); return !Object.keys(e).length;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setBusy(true);
    try {
      const skillsArray = form.skills.split(',').map(s => s.trim()).filter(Boolean);
      const isJob = form.listingType === "Job";
      const headers = { Authorization: `Bearer ${adminToken}` };

      if (isJob) {
        const payload = {
          title: form.jobTitle,
          company: form.companyName,
          location: form.locationType,
          salary: Number(form.ctcAmount),
          experienceRequired: "0-2 years",
          skillsRequired: skillsArray,
          applyUrl: "https://careers.kiit.ac.in",
          deadline: new Date(Date.now() + Number(form.daysLeft) * 24 * 60 * 60 * 1000)
        };
        const res = await axios.post("http://localhost:5000/api/jobs", payload, { headers });
        const newCard = {
          id: res.data._id,
          listingType: "Job",
          companyName: res.data.company,
          jobTitle: res.data.title,
          locationType: res.data.location,
          ctc: `₹${res.data.salary.toLocaleString()}/annum`,
          stipend: "N/A",
          stipendPeriod: "",
          skills: res.data.skillsRequired || [],
          description: form.description,
          category: form.category,
          type: form.type,
          verified: form.verified,
          postedDate: new Date(res.data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          daysLeft: parseInt(form.daysLeft),
          pdfFile: form.pdfFile,
          pdfFileName: form.pdfFileName
        };
        setCards(p => [newCard, ...p]);
      } else {
        const payload = {
          title: form.jobTitle,
          company: form.companyName,
          location: form.locationType,
          stipend: Number(form.stipendAmount),
          duration: "3-6 Months",
          skillsRequired: skillsArray,
          applyUrl: "https://careers.kiit.ac.in",
          deadline: new Date(Date.now() + Number(form.daysLeft) * 24 * 60 * 60 * 1000)
        };
        const res = await axios.post("http://localhost:5000/api/jobs/internships", payload, { headers });
        const newCard = {
          id: res.data._id,
          listingType: "Internship",
          companyName: res.data.company,
          jobTitle: res.data.title,
          locationType: res.data.location,
          ctc: "N/A",
          stipend: `₹${res.data.stipend.toLocaleString()}`,
          stipendPeriod: "/ month",
          skills: res.data.skillsRequired || [],
          description: form.description,
          category: form.category,
          type: form.type,
          verified: form.verified,
          postedDate: new Date(res.data.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          daysLeft: parseInt(form.daysLeft),
          pdfFile: form.pdfFile,
          pdfFileName: form.pdfFileName
        };
        setCards(p => [newCard, ...p]);
      }
      setForm(EMPTY);
      setToast(true);
      setTimeout(() => setToast(false), 3500);
    } catch (error) {
      console.error("Error creating listing:", error);
      alert(error.response?.data?.message || "Failed to publish listing to the server.");
    } finally {
      setBusy(false);
    }
  };

  const del = async (id) => {
    const cardToDelete = cards.find(c => c.id === id);
    if (!cardToDelete) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete the listing for "${cardToDelete.jobTitle}"?`);
    if (!confirmDelete) return;

    try {
      const headers = { Authorization: `Bearer ${adminToken}` };
      const isJob = cardToDelete.listingType === "Job";
      if (isJob) {
        await axios.delete(`http://localhost:5000/api/jobs/${id}`, { headers });
      } else {
        await axios.delete(`http://localhost:5000/api/jobs/internships/${id}`, { headers });
      }
      setExitId(id);
      setTimeout(() => {
        setCards(p => p.filter(c => c.id !== id));
        setExitId(null);
      }, 420);
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert(error.response?.data?.message || "Failed to delete the listing.");
    }
  };

  const fd = n => ({ animationDelay: mounted ? n * 70 + 'ms' : '9999ms' });

  const LBL = { display: 'block', marginBottom: '6px', fontWeight: '600', fontSize: '11px', color: '#637074', letterSpacing: '0.9px', textTransform: 'uppercase' };
  const ERR = { color: '#dc2626', fontSize: '11px', marginTop: '4px' };

  return (<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:wght@500;600&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

      /* ── Root / dot-grid bg ── */
      .root{
        font-family:'Inter',-apple-system,sans-serif;
        min-height:100vh;
        background:#eef1ee;
        background-image:radial-gradient(circle,#b4c8b4 1px,transparent 1px);
        background-size:24px 24px;
        animation:bgDrift 20s ease-in-out infinite alternate;
      }
      @keyframes bgDrift{0%{background-position:0 0}100%{background-position:12px 12px}}

      /* ══════════ KEYFRAMES ══════════ */
      @keyframes hdrIn{
        0%{opacity:0;transform:translateY(-110%) scaleY(.45)}
        65%{transform:translateY(3px) scaleY(1.04)}
        100%{opacity:1;transform:translateY(0) scaleY(1)}
      }
      @keyframes pageUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideIn{from{opacity:0;transform:translateX(42px)}to{opacity:1;transform:translateX(0)}}
      @keyframes fieldIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @keyframes cardIn{
        0%{opacity:0;transform:translateY(-20px) scale(.95) rotate(-.3deg)}
        62%{transform:translateY(5px) scale(1.007) rotate(.12deg)}
        100%{opacity:1;transform:translateY(0) scale(1) rotate(0)}
      }
      @keyframes cardOut{to{opacity:0;transform:translateX(38px) scale(.93);max-height:0;padding:0;margin:0;overflow:hidden}}
      @keyframes inkBlot{0%{opacity:0;transform:scale(.8) translateY(-10px);filter:blur(6px)}100%{opacity:1;transform:scale(1) translateY(0);filter:blur(0)}}
      @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      @keyframes heartbeat{0%,100%{transform:scale(1)}16%{transform:scale(1.45)}32%{transform:scale(1)}48%{transform:scale(1.25)}}
      @keyframes drift{0%,100%{transform:translateY(0) rotate(0)}36%{transform:translateY(-9px) rotate(-3deg)}66%{transform:translateY(-4px) rotate(2deg)}}
      @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
      @keyframes stampIn{0%{transform:scale(1.8) rotate(-14deg);opacity:0;filter:blur(4px)}62%{transform:scale(.88) rotate(2deg)}100%{transform:scale(1) rotate(0);opacity:1}}
      @keyframes goldSweep{0%{background-position:-200% center}100%{background-position:200% center}}
      @keyframes btnPulse{0%,100%{box-shadow:0 4px 14px rgba(31,170,89,.28)}50%{box-shadow:0 4px 28px rgba(31,170,89,.54)}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      @keyframes scan{0%{top:-8%}100%{top:110%}}
      @keyframes lineDraw{from{width:0;opacity:0}to{width:100%;opacity:1}}
      @keyframes ripple{from{transform:translate(-50%,-50%) scale(0);opacity:.4}to{transform:translate(-50%,-50%) scale(2.8);opacity:0}}
      @keyframes focusRing{0%{box-shadow:0 0 0 0 rgba(31,170,89,.4)}100%{box-shadow:0 0 0 7px rgba(31,170,89,0)}}
      @keyframes uploadBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
      @keyframes gloss{from{transform:translateX(-100%)}to{transform:translateX(250%)}}
      @keyframes checkDraw{from{stroke-dashoffset:50}to{stroke-dashoffset:0}}
      @keyframes statPop{0%{transform:scale(1)}35%{transform:scale(1.35)}100%{transform:scale(1)}}
      @keyframes sectionReveal{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}

      /* ══════════ HEADER ══════════ */
      .hdr{
        background:linear-gradient(135deg,#1a9e52 0%,#1FAA59 60%,#22c45e 100%);
        color:white;padding:0;
        position:sticky;top:0;z-index:100;
        box-shadow:0 2px 20px rgba(31,170,89,.38);
        animation:hdrIn .7s cubic-bezier(.16,1,.3,1) both;
        transform-origin:top center;overflow:hidden;
      }
      /* Scan-line shimmer */
      .hdr::before{
        content:'';position:absolute;left:0;right:0;height:55px;
        background:linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,.07),rgba(255,255,255,0));
        animation:scan 6s linear infinite;pointer-events:none;z-index:0;
      }
      /* Diagonal pattern */
      .hdr::after{
        content:'';position:absolute;inset:0;
        background:repeating-linear-gradient(
          60deg,rgba(255,255,255,.03) 0px,rgba(255,255,255,.03) 1px,
          transparent 1px,transparent 18px
        );
        pointer-events:none;z-index:0;
      }

      /* Top strip: institution name */
      .hdr-strip{
        background:rgba(0,0,0,.18);
        padding:5px 36px;
        font-size:10.5px;letter-spacing:2px;text-transform:uppercase;
        color:rgba(255,255,255,.72);border-bottom:1px solid rgba(255,255,255,.12);
        position:relative;z-index:1;
        display:flex;align-items:center;justify-content:space-between;
      }
      .hdr-strip-right{display:flex;align-items:center;gap:6px;}

      /* Main header row */
      .hdr-main{
        max-width:1380px;margin:0 auto;padding:0 36px;
        display:flex;align-items:center;justify-content:space-between;
        height:62px;position:relative;z-index:1;
      }
      .hdr-brand{display:flex;align-items:center;gap:14px;cursor:default;}
      .hdr-seal{
        width:46px;height:46px;
        background:rgba(255,255,255,.18);border:2px solid rgba(255,255,255,.5);
        border-radius:50%;/* circle seal */
        display:flex;align-items:center;justify-content:center;
        font-family:'Lora',serif;font-size:20px;font-weight:600;
        transition:transform .6s cubic-bezier(.16,1,.3,1),background .3s;
        transform-style:preserve-3d;position:relative;
      }
      .hdr-seal::after{
        content:'';position:absolute;inset:-4px;border-radius:50%;
        border:1px dashed rgba(255,255,255,.35);
        transition:transform .6s cubic-bezier(.16,1,.3,1);
      }
      .hdr-brand:hover .hdr-seal{transform:rotateY(28deg) rotateX(-8deg) scale(1.08);background:rgba(255,255,255,.3);}
      .hdr-brand:hover .hdr-seal::after{transform:rotate(30deg);}
      .hdr-text{display:flex;flex-direction:column;}
      .hdr-title{
        font-family:'Lora',serif;font-size:18px;font-weight:600;
        position:relative;display:inline-block;line-height:1.2;
      }
      .hdr-title::after{
        content:'';position:absolute;bottom:-2px;left:0;height:1.5px;width:0;
        background:rgba(255,255,255,.65);transition:width .55s cubic-bezier(.16,1,.3,1);
      }
      .hdr-brand:hover .hdr-title::after{width:100%;}
      .hdr-sub{font-size:10px;color:rgba(255,255,255,.68);letter-spacing:1.2px;text-transform:uppercase;margin-top:2px;}
      .cursor{display:inline-block;animation:blink .7s step-end infinite;color:rgba(255,255,255,.7);}

      /* Stats pill */
      .hdr-pill{
        display:flex;align-items:center;gap:18px;
      }
      .stat-pill{
        background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);
        border-radius:8px;padding:8px 16px;font-size:13px;font-weight:500;
        display:flex;align-items:center;gap:8px;
        transition:background .3s,transform .3s;
      }
      .stat-pill:hover{background:rgba(255,255,255,.24);transform:translateY(-1px);}
      .stat-dot{width:7px;height:7px;border-radius:50%;background:#fff;animation:heartbeat 2.8s ease-in-out infinite;}
      .stat-num{font-family:'Lora',serif;font-size:16px;font-weight:600;}

      /* ══════════ TOAST ══════════ */
      .toast{
        position:fixed;top:82px;right:28px;z-index:999;
        background:#1FAA59;color:white;
        padding:14px 22px;border-radius:12px;
        font-size:14px;font-weight:500;
        display:flex;align-items:center;gap:10px;
        box-shadow:0 10px 34px rgba(31,170,89,.44);
        animation:inkBlot .48s cubic-bezier(.16,1,.3,1) both;
        border-left:4px solid rgba(255,255,255,.6);
      }
      .toast-svg{width:20px;height:20px;flex-shrink:0;}
      .toast-svg circle,.toast-svg path{stroke-dasharray:50;stroke-dashoffset:50;}
      .toast-svg circle{animation:checkDraw .4s ease .05s forwards;}
      .toast-svg path{animation:checkDraw .4s ease .3s forwards;}

      /* ══════════ LAYOUT ══════════ */
      .layout{
        max-width:1380px;margin:0 auto;padding:28px 36px;
        display:flex;gap:24px;align-items:flex-start;
        animation:pageUp .6s cubic-bezier(.16,1,.3,1) .2s both;
      }

      /* ══════════ FORM SHELL ══════════ */
      .fshell{
        flex:1;min-width:0;
        opacity:0;transform:translateY(18px);
        transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1);
      }
      .fshell.visible{opacity:1;transform:translateY(0);}

      /* Section card — each form section is its own card */
      .sec-card{
        background:white;border-radius:12px;
        border:1px solid #dce6dc;
        box-shadow:0 1px 3px rgba(0,0,0,.05),0 4px 14px rgba(0,0,0,.06);
        margin-bottom:16px;overflow:hidden;
        transition:box-shadow .4s ease;
      }
      .sec-card:hover{box-shadow:0 2px 6px rgba(0,0,0,.07),0 10px 28px rgba(0,0,0,.09);}
      .sec-head{
        display:flex;align-items:center;gap:12px;
        padding:16px 22px;
        background:linear-gradient(108deg,#f4fbf5,#eaf6ed);
        border-bottom:1px solid #cce2d0;
        cursor:pointer;user-select:none;
        position:relative;overflow:hidden;
      }
      /* Gloss sweep on section header hover */
      .sec-head::after{
        content:'';position:absolute;top:0;left:-100%;width:50%;height:100%;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);
        transition:left .65s ease;pointer-events:none;
      }
      .sec-head:hover::after{left:155%;}
      .sec-icon{
        width:34px;height:34px;border-radius:8px;background:#1FAA59;
        display:flex;align-items:center;justify-content:center;flex-shrink:0;
        box-shadow:0 2px 8px rgba(31,170,89,.3);
        transition:transform .5s cubic-bezier(.16,1,.3,1),box-shadow .3s;
      }
      .sec-head:hover .sec-icon{transform:rotate(90deg) scale(1.06);box-shadow:0 4px 16px rgba(31,170,89,.48);}
      .sec-label{font-family:'Lora',serif;font-size:15px;font-weight:600;color:#1a1a1a;}
      .sec-sublabel{font-size:11px;color:#9aabb0;margin-top:1px;}
      .sec-body{padding:22px;}
      .sec-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
      .full{grid-column:1/-1;}

      /* ── Submit card ── */
      .submit-card{
        background:linear-gradient(135deg,#1a9e52,#1FAA59);
        border-radius:12px;padding:20px 22px;
        display:flex;align-items:center;justify-content:space-between;gap:16px;
        box-shadow:0 4px 18px rgba(31,170,89,.3);
        animation:btnPulse 3s ease-in-out infinite;
        transition:transform .3s cubic-bezier(.16,1,.3,1),animation 0s;
        cursor:pointer;
      }
      .submit-card:hover{transform:translateY(-2px);animation:none;box-shadow:0 8px 28px rgba(31,170,89,.44);}
      .submit-text{color:white;}
      .submit-text h3{font-family:'Lora',serif;font-size:16px;font-weight:600;margin-bottom:2px;}
      .submit-text p{font-size:12px;color:rgba(255,255,255,.75);}
      .btn-sub{
        background:rgba(255,255,255,.2);color:white;border:1.5px solid rgba(255,255,255,.5);
        border-radius:9px;padding:11px 24px;
        font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;
        display:flex;align-items:center;gap:8px;white-space:nowrap;
        position:relative;overflow:hidden;
        transition:background .25s,transform .25s;
      }
      .btn-sub::after{
        content:'';position:absolute;inset:0;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
        transform:translateX(-100%);transition:transform .5s ease;
      }
      .btn-sub:hover{background:rgba(255,255,255,.3);transform:scale(1.03);}
      .btn-sub:hover::after{transform:translateX(100%);}
      .btn-sub:active{transform:scale(.97);}
      .spinner{width:16px;height:16px;border:2px solid rgba(255,255,255,.4);border-top-color:white;border-radius:50%;animation:spin .65s linear infinite;}

      /* ── Field animations ── */
      .fg{opacity:0;animation:fieldIn .5s cubic-bezier(.16,1,.3,1) forwards;}

      /* ── Inputs ── */
      .inp,.sel,.ta{
        width:100%;padding:10px 13px;
        border:1.5px solid #cdd8cd;border-radius:8px;
        font-size:14px;font-family:inherit;color:#1a1a1a;
        background:#f7fbf7;outline:none;
        transition:border-color .32s ease,box-shadow .32s ease,background .28s ease,transform .22s cubic-bezier(.16,1,.3,1);
        -webkit-appearance:none;appearance:none;
      }
      .inp:focus,.sel:focus,.ta:focus{
        border-color:#1FAA59;background:#fff;
        box-shadow:0 0 0 4px rgba(31,170,89,.1),0 1px 4px rgba(31,170,89,.14);
        transform:translateY(-1px);
        animation:focusRing .4s ease forwards;
      }
      .inp.e,.sel.e,.ta.e{border-color:#dc2626;background:#fff8f8;animation:shake .36s ease;}
      .ta{resize:vertical;min-height:100px;line-height:1.65;}

      /* Select wrapper */
      .sw{position:relative;}
      .sw::after{
        content:'';position:absolute;right:13px;top:50%;transform:translateY(-50%);
        border-left:4px solid transparent;border-right:4px solid transparent;
        border-top:5px solid #7a8a8a;pointer-events:none;
        transition:transform .28s ease;
      }
      .sw:focus-within::after{transform:translateY(-50%) rotate(180deg);}
      .sw .sel{padding-right:34px;}

      /* Inline row */
      .irow{
        display:flex;border:1.5px solid #cdd8cd;border-radius:8px;
        overflow:hidden;background:#f7fbf7;
        transition:border-color .32s ease,box-shadow .32s ease,background .28s ease,transform .22s cubic-bezier(.16,1,.3,1);
      }
      .irow:focus-within{
        border-color:#1FAA59;background:#fff;
        box-shadow:0 0 0 4px rgba(31,170,89,.1),0 1px 4px rgba(31,170,89,.14);
        transform:translateY(-1px);
      }
      .irow.e{border-color:#dc2626;background:#fff8f8;animation:shake .36s ease;}
      .irow input,.irow select{border:none;border-radius:0;outline:none;background:transparent;font-family:inherit;font-size:14px;color:#1a1a1a;}
      .irow input{flex:1;padding:10px 13px;}
      .irow select{padding:10px;border-left:1px solid #cdd8cd;color:#556;}

      /* ── Upload zone ── */
      .upzone{
        display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;
        padding:26px;border:2px dashed #bbccbb;border-radius:10px;
        background:#f5fbf5;cursor:pointer;text-align:center;
        transition:border-color .32s ease,background .28s ease,transform .32s cubic-bezier(.16,1,.3,1),box-shadow .32s ease;
      }
      .upzone:hover{border-color:#1FAA59;background:#ebf7ee;transform:translateY(-4px);box-shadow:0 8px 22px rgba(31,170,89,.14);}
      .upzone:hover .upico{animation:uploadBounce .55s ease infinite;}
      .upzone.e{border-color:#dc2626;}
      .filechip{
        display:flex;align-items:center;justify-content:space-between;
        padding:12px 15px;border:1.5px solid #1FAA59;border-radius:8px;background:#eef9f2;
        animation:fieldIn .32s cubic-bezier(.16,1,.3,1) both;
      }

      /* Progress */
      .prog{width:100%;height:6px;background:#dde8dd;border-radius:3px;overflow:hidden;margin-top:12px;}
      .prog-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#1FAA59,#34c96e,#1FAA59);background-size:200% 100%;animation:shimmer 1.4s linear infinite;transition:width .3s ease;}

      /* Checkbox */
      .chk{
        display:flex;align-items:center;gap:11px;
        padding:13px 16px;background:#f5fbf5;border:1.5px solid #c4e0c8;border-radius:9px;cursor:pointer;
        transition:border-color .28s,background .28s,transform .3s cubic-bezier(.16,1,.3,1),box-shadow .28s;
      }
      .chk:hover{border-color:#1FAA59;background:#ebf7ee;transform:translateY(-2px);box-shadow:0 4px 14px rgba(31,170,89,.12);}
      .chk input{width:17px;height:17px;accent-color:#1FAA59;cursor:pointer;}

      /* ══════════ SIDEBAR ══════════ */
      .sidebar{
        width:374px;flex-shrink:0;
        position:sticky;top:88px;
        animation:slideIn .72s cubic-bezier(.16,1,.3,1) .28s both;
      }
      .scard{
        background:white;border-radius:14px;
        border:1px solid #dce6dc;
        box-shadow:0 1px 4px rgba(0,0,0,.05),0 8px 24px rgba(0,0,0,.07);
        overflow:hidden;
        opacity:0;transform:translateY(14px);
        transition:opacity .55s cubic-bezier(.16,1,.3,1),transform .55s cubic-bezier(.16,1,.3,1);
      }
      .scard.visible{opacity:1;transform:translateY(0);}
      .shdr{
        background:linear-gradient(108deg,#f4fbf5,#eaf6ed);
        border-bottom:1px solid #c8e2cc;padding:16px 20px;
        display:flex;align-items:center;justify-content:space-between;
      }
      .stitle{font-family:'Lora',serif;font-size:16px;font-weight:600;color:#1a1a1a;}
      .sbadge{
        background:#1FAA59;color:white;
        border-radius:20px;padding:3px 12px;font-size:12px;font-weight:600;
        transition:transform .35s cubic-bezier(.16,1,.3,1);
      }

      /* Job list */
      .jlist{padding:14px;display:flex;flex-direction:column;gap:14px;max-height:calc(100vh - 200px);overflow-y:auto;padding-right:8px;scroll-behavior:smooth;}
      .jlist::-webkit-scrollbar{width:3px;}
      .jlist::-webkit-scrollbar-thumb{background:#a4c8b0;border-radius:4px;}

      /* Job card */
      .jcard{
        border:1.5px solid #e4e8e4;border-radius:12px;background:#fff;
        position:relative;overflow:hidden;
        transition:box-shadow .4s cubic-bezier(.16,1,.3,1),border-color .4s ease,transform .4s cubic-bezier(.16,1,.3,1);
        animation:cardIn .55s cubic-bezier(.16,1,.3,1) both;
      }
      .jcard:hover{box-shadow:0 8px 26px rgba(31,170,89,.12);border-color:#94ccaa;transform:translateY(-4px);}
      /* Annotation bar */
      .jcard::before{content:'';position:absolute;left:0;top:18px;bottom:18px;width:3px;background:#1FAA59;border-radius:0 2px 2px 0;transform:scaleY(0);transform-origin:center;transition:transform .4s cubic-bezier(.16,1,.3,1);}
      .jcard:hover::before{transform:scaleY(1);}
      .jcard.out{animation:cardOut .42s cubic-bezier(.16,1,.3,1) forwards !important;}

      /* Card inner padding */
      .jcard-inner{padding:16px;}

      /* Card category ribbon */
      .cat-ribbon{
        position:absolute;top:0;right:0;
        background:#1FAA59;color:white;
        font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;
        padding:4px 10px 4px 14px;
        clip-path:polygon(8% 0,100% 0,100% 100%,0 100%);
        border-radius:0 12px 0 0;
      }

      /* Apply button */
      .btn-apply{
        width:100%;padding:10px;background:#0d6e3a;color:white;
        border:none;border-radius:8px;font-size:14px;font-weight:600;
        cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;
        font-family:inherit;position:relative;overflow:hidden;
        transition:background .3s ease,transform .35s cubic-bezier(.16,1,.3,1),letter-spacing .3s ease;letter-spacing:0;
      }
      .btn-apply::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);transform:translateX(-100%);transition:transform .5s ease;}
      .btn-apply:hover{background:#095c2f;transform:translateY(-2px);letter-spacing:.4px;}
      .btn-apply:hover::after{transform:translateX(100%);}

      /* Card action buttons */
      .btn-del{background:#fee;border:none;border-radius:6px;padding:5px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s,transform .35s cubic-bezier(.16,1,.3,1);}
      .btn-del:hover{background:#fdd;transform:scale(1.2) rotate(12deg);}
      .btn-rem{padding:5px 10px;background:#fee;border:none;border-radius:6px;cursor:pointer;font-size:11.5px;color:#dc2626;font-weight:600;display:flex;align-items:center;gap:4px;transition:background .2s,transform .2s;font-family:inherit;}
      .btn-rem:hover{background:#fdd;transform:scale(1.04);}

      /* Tags */
      .stag{
        padding:4px 10px;background:#eef4ee;border-radius:5px;
        font-size:11.5px;color:#4a5e4a;display:inline-block;border:1px solid #d0e4d0;
        transition:background .3s,color .3s,border-color .3s,transform .35s cubic-bezier(.16,1,.3,1),box-shadow .3s;cursor:default;
      }
      .stag:hover{background:#d4f0dc;color:#1FAA59;border-color:#9ccaaa;transform:translateY(-3px) scale(1.05);box-shadow:0 4px 10px rgba(31,170,89,.14);}
      .ctcbadge{padding:3px 10px;background:#d4f0dc;color:#1FAA59;border-radius:5px;font-size:12px;font-weight:600;border:1px solid #9ccaaa;}
      .typebadge{padding:2px 8px;background:#f4f4f4;color:#667;border-radius:4px;font-size:11px;border:1px solid #e4e4e4;}

      /* Verified gold badge */
      .vbadge{
        font-size:10px;font-weight:700;
        background:linear-gradient(90deg,#b8860b,#d4a820,#c8941a,#b8860b);
        background-size:200% auto;
        -webkit-background-clip:text;background-clip:text;color:transparent;
        border-radius:4px;padding:2px 7px;border:1px solid rgba(212,168,32,.28);background-color:#fffbf0;
        animation:stampIn .5s cubic-bezier(.16,1,.3,1) both,goldSweep 3.5s linear .6s infinite;
        display:inline-flex;align-items:center;gap:3px;letter-spacing:.3px;
      }

      /* Empty */
      .empty{text-align:center;padding:48px 24px;}
      .empty-ico{animation:drift 4.5s ease-in-out infinite;display:block;margin:0 auto 16px;}
    `}</style>

    <div className="root">

      {/* ── HEADER ── */}
      <header className="hdr">
        <div className="hdr-strip">
          <span>Kalinga Institute of Industrial Technology · Bhubaneswar, Odisha</span>
          <div className="hdr-strip-right">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7dff9a', display: 'inline-block' }} />
            <span>Portal Active</span>
          </div>
        </div>
        <div className="hdr-main">
          <div className="hdr-brand">
            <div className="hdr-seal">K</div>
            <div className="hdr-text">
              <div className="hdr-title">
                {mounted ? <Typewriter text="Career Development Centre" delay={250} /> : 'Career Development Centre'}
              </div>
              <div className="hdr-sub">Internship &amp; Placement Administration</div>
            </div>
          </div>
          <div className="hdr-pill">
            <div className="stat-pill">
              <div className="stat-dot" />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,.8)' }}>Active Listings</span>
              <span className="stat-num"><Counter value={cards.length} /></span>
            </div>
          </div>
        </div>
      </header>

      {/* ── TOAST ── */}
      {toast && (
        <div className="toast">
          <svg className="toast-svg" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,.65)" strokeWidth="2" />
            <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Internship listing published successfully!
        </div>
      )}

      <div className="layout">

        {/* ══════════ FORM ══════════ */}
        <div className="fshell" ref={formRef}>
          <form onSubmit={submit}>

            {/* ── Section 1: Company & Role ── */}
            <div className="sec-card">
              <div className="sec-head">
                <div className="sec-icon"><Building2 size={17} color="white" /></div>
                <div>
                  <div className="sec-label">Company &amp; Role</div>
                  <div className="sec-sublabel">Basic information about the company and position</div>
                </div>
              </div>
              <div className="sec-body">
                <div className="sec-grid">

                  <div className="fg" style={fd(0)}>
                    <label style={LBL}>Listing Type *</label>
                    <div className="sw"><select className="sel" name="listingType" value={form.listingType} onChange={set}>
                      <option value="Job">Job Posting</option>
                      <option value="Internship">Internship Posting</option>
                    </select></div>
                  </div>

                  <div className="fg" style={fd(1)}>
                    <label style={LBL}>Company Name *</label>
                    <input className={'inp' + (errs.companyName ? ' e' : '')} type="text" name="companyName"
                      value={form.companyName} onChange={set} placeholder="e.g. Infosys Technologies" />
                    {errs.companyName && <div style={ERR}>⚠ {errs.companyName}</div>}
                  </div>

                  <div className="fg" style={fd(2)}>
                    <label style={LBL}>Job Title *</label>
                    <input className={'inp' + (errs.jobTitle ? ' e' : '')} type="text" name="jobTitle"
                      value={form.jobTitle} onChange={set} placeholder="e.g. Software Development Intern" />
                    {errs.jobTitle && <div style={ERR}>⚠ {errs.jobTitle}</div>}
                  </div>

                  <div className="fg" style={fd(3)}>
                    <label style={LBL}>Category</label>
                    <div className="sw"><select className="sel" name="category" value={form.category} onChange={set}>
                      {CATS.map(c => <option key={c}>{c}</option>)}
                    </select></div>
                  </div>

                  <div className="fg" style={fd(4)}>
                    <label style={LBL}>Location Type</label>
                    <div className="sw"><select className="sel" name="locationType" value={form.locationType} onChange={set}>
                      <option>On-Campus</option><option>Remote</option><option>Hybrid</option><option>On-site</option>
                    </select></div>
                  </div>

                  <div className="fg" style={fd(5)}>
                    <label style={LBL}>Internship Type</label>
                    <div className="sw"><select className="sel" name="type" value={form.type} onChange={set}>
                      <option>Full Time</option><option>Part Time</option>
                    </select></div>
                  </div>

                  <div className="fg" style={fd(6)}>
                    <label style={LBL}>Days Left to Apply *</label>
                    <input className={'inp' + (errs.daysLeft ? ' e' : '')} type="number" name="daysLeft"
                      value={form.daysLeft} onChange={set} placeholder="e.g. 21" min="1" />
                    {errs.daysLeft && <div style={ERR}>⚠ {errs.daysLeft}</div>}
                  </div>

                </div>
              </div>
            </div>

            {/* ── Section 2: Compensation ── */}
            <div className="sec-card">
              <div className="sec-head">
                <div className="sec-icon"><Briefcase size={17} color="white" /></div>
                <div>
                  <div className="sec-label">Compensation</div>
                  <div className="sec-sublabel">CTC package and stipend details</div>
                </div>
              </div>
              <div className="sec-body">
                <div className="sec-grid">

                  <div className="fg" style={fd(1)}>
                    <label style={LBL}>CTC Amount (₹) *</label>
                    <div className={'irow' + (errs.ctcAmount ? ' e' : '')}>
                      <input type="number" name="ctcAmount" value={form.ctcAmount} onChange={set} placeholder="e.g. 800000" min="0" />
                      <select name="ctcPeriod" value={form.ctcPeriod} onChange={set}>
                        <option value="/m">/month</option><option value="/year">/year</option><option value="/annum">/annum</option>
                      </select>
                    </div>
                    {errs.ctcAmount && <div style={ERR}>⚠ {errs.ctcAmount}</div>}
                  </div>

                  <div className="fg" style={fd(2)}>
                    <label style={LBL}>Stipend Amount (₹) *</label>
                    <div className={'irow' + (errs.stipendAmount ? ' e' : '')}>
                      <input type="number" name="stipendAmount" value={form.stipendAmount} onChange={set} placeholder="e.g. 15000" min="0" />
                      <select name="stipendPeriod" value={form.stipendPeriod} onChange={set}>
                        <option>/ month</option><option>/ year</option><option>/ week</option>
                      </select>
                    </div>
                    {errs.stipendAmount && <div style={ERR}>⚠ {errs.stipendAmount}</div>}
                  </div>

                </div>
              </div>
            </div>

            {/* ── Section 3: Details ── */}
            <div className="sec-card">
              <div className="sec-head">
                <div className="sec-icon"><GraduationCap size={17} color="white" /></div>
                <div>
                  <div className="sec-label">Listing Details</div>
                  <div className="sec-sublabel">Skills, description and attached documents</div>
                </div>
              </div>
              <div className="sec-body">
                <div className="sec-grid">

                  <div className="fg full" style={fd(1)}>
                    <label style={LBL}>Skills / Technologies *</label>
                    <input className={'inp' + (errs.skills ? ' e' : '')} type="text" name="skills"
                      value={form.skills} onChange={set} placeholder="React, Node.js, MongoDB, REST APIs, Git" />
                    {errs.skills
                      ? <div style={ERR}>⚠ {errs.skills}</div>
                      : <div style={{ fontSize: 11, color: '#9aabb0', marginTop: 5 }}>Comma-separated — e.g. React, Node.js, SQL</div>}
                  </div>

                  <div className="fg full" style={fd(2)}>
                    <label style={LBL}>Job Description *</label>
                    <textarea className={'ta' + (errs.description ? ' e' : '')} name="description"
                      value={form.description} onChange={set} rows={5}
                      placeholder="Describe the role, key responsibilities, eligibility criteria and any specific requirements..." />
                    {errs.description && <div style={ERR}>⚠ {errs.description}</div>}
                  </div>

                  {/* PDF Upload */}
                  <div className="fg full" style={fd(3)}>
                    <label style={LBL}>
                      Job Description PDF &nbsp;
                      <span style={{ fontWeight: 400, color: '#b0bec5', fontSize: 10, textTransform: 'none', letterSpacing: 0 }}>(Optional)</span>
                    </label>
                    {!form.pdfFile ? (<>
                      <label htmlFor="pdf-up" className={'upzone' + (errs.pdfFile ? ' e' : '')}>
                        <span className="upico"><Upload size={28} color="#1FAA59" /></span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#334', marginBottom: 3 }}>Click to upload PDF</div>
                          <div style={{ fontSize: 12, color: '#999' }}>Maximum file size: 50 MB</div>
                        </div>
                      </label>
                      <input id="pdf-up" type="file" accept="application/pdf" onChange={onPDF} style={{ display: 'none' }} />
                      {prog !== null && <div className="prog"><div className="prog-fill" style={{ width: prog + '%' }} /></div>}
                    </>) : (
                      <div className="filechip">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                          <FileText size={20} color="#1FAA59" style={{ flexShrink: 0 }} />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#334', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.pdfFileName}</div>
                            <div style={{ fontSize: 11, color: '#888' }}>{form.pdfFile ? (form.pdfFile.length / 1024 / 1024 * 0.75).toFixed(2) + ' MB' : ''}</div>
                          </div>
                        </div>
                        <button type="button" className="btn-rem" onClick={rmPDF}><X size={12} /> Remove</button>
                      </div>
                    )}
                    {errs.pdfFile && <div style={ERR}>⚠ {errs.pdfFile}</div>}
                  </div>

                  {/* Verified */}
                  <div className="fg full" style={fd(4)}>
                    <label htmlFor="verified" className="chk">
                      <input type="checkbox" name="verified" id="verified" checked={form.verified} onChange={set} />
                      <span style={{ fontWeight: 600, fontSize: 14, color: '#334', cursor: 'pointer' }}>Mark as Verified Company</span>
                    </label>
                  </div>

                </div>
              </div>
            </div>

            {/* ── Submit card ── */}
            <div className="submit-card" onClick={submit}>
              <div className="submit-text">
                <h3>Ready to publish this listing?</h3>
                <p>The {form.listingType.toLowerCase()} will appear in the portal immediately after submission.</p>
              </div>
              <button type="submit" className="btn-sub" disabled={busy} onClick={e => e.stopPropagation()}>
                {busy ? <><div className="spinner" /> Publishing…</> : <><Save size={16} /> Add {form.listingType}</>}
              </button>
            </div>

          </form>
        </div>

        {/* ══════════ SIDEBAR ══════════ */}
        <div className="sidebar">
          <div className="scard" ref={sideRef}>
            <div className="shdr">
              <span className="stitle">Recent Additions</span>
              <span className="sbadge"><Counter value={cards.length} /></span>
            </div>

            {cards.length === 0 ? (
              <div className="empty">
                <AlertCircle size={50} color="#d0d8d0" className="empty-ico" />
                <p style={{ fontSize: 14, color: '#bbb', fontWeight: 500, marginBottom: 6 }}>No listings published yet</p>
                <p style={{ fontSize: 12, color: '#ccc' }}>Complete the form on the left to add your first internship.</p>
              </div>
            ) : (
              <div className="jlist">
                {cards.map((c, i) => (
                  <div key={c.id} className={'jcard' + (exitId === c.id ? ' out' : '')}
                    style={{ animationDelay: (i === 0 ? 0 : Math.min(i * 45, 200)) + 'ms' }}>

                    {/* Category ribbon */}
                    <div className="cat-ribbon">{c.category}</div>

                    <div className="jcard-inner">
                      {/* Actions */}
                      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 5, alignItems: 'center' }}>
                        <button className="btn-del" onClick={() => del(c.id)} title="Remove">
                          <X size={14} color="#dc2626" />
                        </button>
                        <span style={{ color: '#ccc', fontSize: 18, cursor: 'pointer', lineHeight: 1, display: 'inline-block', transition: 'color .3s,transform .4s cubic-bezier(.16,1,.3,1)' }}
                          onMouseOver={e => { e.target.style.color = '#e74c3c'; e.target.style.transform = 'scale(1.3) rotate(10deg)'; }}
                          onMouseOut={e => { e.target.style.color = '#ccc'; e.target.style.transform = 'scale(1) rotate(0)'; }}>♡</span>
                      </div>

                      {/* Company + verified */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6, paddingRight: 60 }}>
                        <span style={{ fontSize: 11.5, color: '#7a8a8a', fontWeight: 500 }}>{c.companyName}</span>
                        {c.verified && <span className="vbadge">✦ Verified</span>}
                      </div>

                      {/* Job title */}
                      <h4 style={{ fontFamily: "'Lora',serif", fontSize: 15.5, fontWeight: 600, color: '#1a1a1a', margin: '0 0 10px', lineHeight: 1.35, paddingRight: 24 }}>
                        {c.jobTitle}
                      </h4>

                      {/* Meta row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: '#778' }}>
                          <MapPin size={12} /><span>{c.locationType}</span>
                        </div>
                        {c.listingType === "Job" && <span className="ctcbadge">{c.ctc}</span>}
                        <span className="typebadge">{c.type}</span>
                      </div>

                      {/* Stipend or CTC */}
                      {c.listingType === "Internship" && (
                        <div style={{ fontSize: 15.5, fontWeight: 700, color: '#1a1a1a', marginBottom: 10 }}>
                          {c.stipend} <span style={{ fontSize: 12.5, fontWeight: 400, color: '#8a9898' }}>{c.stipendPeriod}</span>
                        </div>
                      )}

                      {/* Skills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 11 }}>
                        {c.skills.slice(0, 4).map((s, idx) => <span key={idx} className="stag">{s}</span>)}
                        {c.skills.length > 4 && <span className="stag">+{c.skills.length - 4}</span>}
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: 13, color: '#667', lineHeight: 1.62, margin: '0 0 11px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {c.description}
                      </p>

                      {/* PDF */}
                      {c.pdfFile && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 11px', background: '#fff8ec', borderRadius: 6, marginBottom: 11, fontSize: 12, color: '#c47c10', fontWeight: 500, border: '1px solid #ffe0a0' }}>
                          <FileText size={12} /><span>{c.pdfFileName}</span>
                        </div>
                      )}

                      {/* Footer */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
                        <span style={{ fontSize: 10.5, color: '#c8c8c8' }}>{c.postedDate}</span>
                        <span style={{ fontSize: 10.5, color: '#778', background: '#edf4ed', padding: '3px 9px', borderRadius: 5, fontWeight: 500, border: '1px solid #d0e4d0' }}>
                          {c.daysLeft}d left
                        </span>
                      </div>

                      <button className="btn-apply">Apply Now →</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  </>);
}