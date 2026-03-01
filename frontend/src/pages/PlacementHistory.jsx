    import React, { useState, useEffect, useRef } from 'react';
    import { useNavigate } from 'react-router-dom';

    /* ─── Animated counter ─── */
    function Counter({ target, duration = 1800, prefix = '', suffix = '' }) {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const num = parseFloat(target);
        const run = (now) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(+(num * eased).toFixed(target.toString().includes('.') ? 2 : 0));
            if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
        }, { threshold: 0.3 });
        io.observe(el);
        return () => io.disconnect();
    }, [target, duration]);
    return <span ref={ref}>{prefix}{val}{suffix}</span>;
    }

    /* ─── Scroll reveal ─── */
    function useReveal(threshold = 0.1) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('vis'); io.disconnect(); }
        }, { threshold });
        io.observe(el); return () => io.disconnect();
    }, []);
    return ref;
    }

    /* ─── Typewriter ─── */
    function Typewriter({ text, delay = 0 }) {
    const [out, setOut] = useState('');
    const [go, setGo] = useState(false);
    useEffect(() => { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); }, [delay]);
    useEffect(() => {
        if (!go) return;
        let i = 0; setOut('');
        const iv = setInterval(() => { setOut(text.slice(0, ++i)); if (i >= text.length) clearInterval(iv); }, 48);
        return () => clearInterval(iv);
    }, [go, text]);
    return <>{out}<span className="tw-cur">|</span></>;
    }

    /* ─── Data ─── */
    const YEARS = [
    {
        year: '2025', batch: '2025 Graduating Batch',
        highlights: { companies: 757, offers: 4621, highest: 51.00, average: 8.50 },
        stats: [
        { label: 'Top Companies', value: '757', icon: '🏢' },
        { label: 'Job Offers', value: '4,621', icon: '📋' },
        { label: 'Highest CTC (LPA)', value: '51.00', icon: '₹' },
        { label: 'Average CTC (LPA)', value: '8.50', icon: '📈' },
        ],
        summary: [
        'Overall campus placement conversion was around 92.50%. Over 757 companies visited during KIIT\'s Campus Placements Program for around 5000 eligible students, and approximately 4621 offers were generated.',
        'KIIT School of Technology (KIOT): 3000+ job offers were made by 451 companies to date, with an average CTC of 8.50 LPA. 730+ students bagged multiple offers. Out of those, approximately 1500+ were "Dream Offers". The School recorded 85% placement conversion. The highest offers (336) was made by TCS, followed by Wipro (342).',
        'KIIT School of Management (KSOM): Around 161 companies visited for placements for MBA graduates, and in total around 401 offers were generated. The highest CTC of 20.00 LPA was offered by Edelweiss Technology. The average CTC was 7.25 LPA.',
        'KIIT School of Rural Management (KSRM): In total, 51 companies visited for the batch size of 152 students, and the highest package offered was 20.71 LPA by ETS.',
        ],
        ctcTable: [
        { sl: 1, company: 'TCS', offers: 343 },
        { sl: 2, company: 'Wipro Ltd.', offers: 342 },
        { sl: 3, company: 'LTIMindtree', offers: 242 },
        { sl: 4, company: 'Capgemini', offers: 217 },
        { sl: 5, company: 'Accenture', offers: 201 },
        { sl: 6, company: 'HighRadius', offers: 151 },
        ],
        topCtc: [
        { sl: 1, company: 'Microsoft', ctc: 51.00 },
        { sl: 2, company: 'Human Rezona', ctc: 44.52 },
        { sl: 3, company: 'Nike', ctc: 43.70 },
        { sl: 4, company: 'PayPal', ctc: 36.93 },
        { sl: 5, company: 'NVIDIA', ctc: 36.28 },
        { sl: 6, company: 'ITAGAKI Corporation (Zanshin)', ctc: 28.98 },
        { sl: 7, company: 'Jubilant Technologies', ctc: 27.00 },
        ],
    },
    {
        year: '2024', batch: '2024 Graduating Batch',
        highlights: { companies: 702, offers: 4280, highest: 48.50, average: 7.80 },
        stats: [
        { label: 'Top Companies', value: '702', icon: '🏢' },
        { label: 'Job Offers', value: '4,280', icon: '📋' },
        { label: 'Highest CTC (LPA)', value: '48.50', icon: '₹' },
        { label: 'Average CTC (LPA)', value: '7.80', icon: '📈' },
        ],
        summary: [
        'Over 702 companies participated in the placement program for the 2024 graduating batch, generating approximately 4280 job offers for eligible students.',
        'KIIT School of Technology maintained strong placement rates with companies like Amazon, Google, and Microsoft offering premium packages.',
        ],
        ctcTable: [
        { sl: 1, company: 'TCS', offers: 310 },
        { sl: 2, company: 'Wipro Ltd.', offers: 298 },
        { sl: 3, company: 'Infosys', offers: 224 },
        { sl: 4, company: 'Capgemini', offers: 198 },
        { sl: 5, company: 'Accenture', offers: 187 },
        { sl: 6, company: 'HighRadius', offers: 134 },
        ],
        topCtc: [
        { sl: 1, company: 'Google', ctc: 48.50 },
        { sl: 2, company: 'Amazon', ctc: 42.00 },
        { sl: 3, company: 'Microsoft', ctc: 40.50 },
        { sl: 4, company: 'Goldman Sachs', ctc: 34.00 },
        { sl: 5, company: 'Uber', ctc: 32.50 },
        ],
    },
    {
        year: '2023', batch: '2023 Graduating Batch',
        highlights: { companies: 650, offers: 3940, highest: 44.00, average: 7.20 },
        stats: [
        { label: 'Top Companies', value: '650', icon: '🏢' },
        { label: 'Job Offers', value: '3,940', icon: '📋' },
        { label: 'Highest CTC (LPA)', value: '44.00', icon: '₹' },
        { label: 'Average CTC (LPA)', value: '7.20', icon: '📈' },
        ],
        summary: [
        'The 2023 batch saw remarkable placement success with 650+ companies visiting the campus, resulting in nearly 3940 job offers.',
        'Tech giants dominated the placements scene with 85%+ conversion rate across engineering departments.',
        ],
        ctcTable: [
        { sl: 1, company: 'TCS', offers: 285 },
        { sl: 2, company: 'Wipro Ltd.', offers: 260 },
        { sl: 3, company: 'Infosys', offers: 198 },
        { sl: 4, company: 'Capgemini', offers: 175 },
        { sl: 5, company: 'HCL Technologies', offers: 162 },
        ],
        topCtc: [
        { sl: 1, company: 'Amazon', ctc: 44.00 },
        { sl: 2, company: 'Microsoft', ctc: 38.00 },
        { sl: 3, company: 'Samsung R&D', ctc: 30.00 },
        { sl: 4, company: 'Goldman Sachs', ctc: 28.50 },
        { sl: 5, company: 'Adobe', ctc: 26.00 },
        ],
    },
    ];

    function YearSection({ data, idx, companyListRef }) {
    const ref = useReveal(0.05);
    const isEven = idx % 2 === 0;

    return (
        <div ref={ref} className={`year-section reveal-${isEven ? 'left' : 'right'}`}
        style={{ animationDelay: `${idx * 80}ms` }}>

        {/* Year badge + header */}
        <div className="year-hdr">
            <div className="year-pill">{data.year}</div>
            <div className="year-hdr-text">
            <h2 className="year-title">Campus Placement {data.year}</h2>
            <div className="year-sub">{data.batch}</div>
            </div>
            <div className="year-divider-line" />
        </div>

        {/* Stat cards */}
        <div className="stat-row">
            {data.stats.map((s, i) => (
            <div key={i} className="stat-card" style={{ animationDelay: `${idx * 80 + i * 60}ms` }}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num">{s.value}</div>
                <div className="stat-lbl">{s.label}</div>
                <div className="stat-glow" />
            </div>
            ))}
        </div>

        {/* Summary bullets */}
        <div className="summary-block">
            <div className="summary-heading">Placement Highlights</div>
            <ul className="summary-list">
            {data.summary.map((s, i) => (
                <li key={i} className="summary-item" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="bullet-dot" />
                <span>{s}</span>
                </li>
            ))}
            </ul>
        </div>

        {/* Tables */}
        <div className="tables-row" ref={idx === 0 ? companyListRef : null}>
            {/* Top by offers */}
            <div className="tbl-wrap">
            <div className="tbl-title">
                <span className="tbl-dot" />
                Companies List (CTC 10 LPA Plus)
            </div>
            <table className="ptbl">
                <thead>
                <tr><th>Sl No</th><th>Company's Name ({data.year} GB)</th><th>Offers</th></tr>
                </thead>
                <tbody>
                {data.ctcTable.map((r, i) => (
                    <tr key={i} className="tbl-row" style={{ animationDelay: `${i * 50}ms` }}>
                    <td>{r.sl}</td><td>{r.company}</td>
                    <td><span className="offers-badge">{r.offers}</span></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/* Top CTC */}
            <div className="tbl-wrap">
            <div className="tbl-title">
                <span className="tbl-dot tbl-dot--gold" />
                Companies List (100+ Offers)
            </div>
            <table className="ptbl">
                <thead>
                <tr><th>Sl No</th><th>Company's Name ({data.year} GB)</th><th>CTC LPA</th></tr>
                </thead>
                <tbody>
                {data.topCtc.map((r, i) => (
                    <tr key={i} className="tbl-row" style={{ animationDelay: `${i * 50}ms` }}>
                    <td>{r.sl}</td><td>{r.company}</td>
                    <td>
                        <span className={`ctc-chip ${i === 0 ? 'ctc-chip--top' : ''}`}>
                        {r.ctc.toFixed(2)}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        </div>
    );
    }

    export default function PlacementHistory() {
    
    const companyListRef = useRef(null);
    const navigate = useNavigate();
    const [activeYear, setActiveYear] = useState('2025');
    const [mounted, setMounted] = useState(false);
    const heroRef = useReveal(0.1);

    const scrollToCompanyList = () => {
        companyListRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

    const filteredData = YEARS.filter(y => activeYear === 'all' || y.year === activeYear);

    return (<>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

        /* ── Root ── */
        .placement-root{
            font-family:'Source Serif 4','Georgia',serif;
            min-height:100vh;
            background:#eef1ee;
            background-image:radial-gradient(circle,#b4c8b4 1px,transparent 1px);
            background-size:24px 24px;
            animation:bgDrift 22s ease-in-out infinite alternate;
            color:#1a1a1a;
        }
        @keyframes bgDrift{0%{background-position:0 0}100%{background-position:12px 12px}}

        /* ══════ KEYFRAMES ══════ */
        @keyframes hdrIn{
            0%{opacity:0;transform:translateY(-120%) scaleY(.4)}
            68%{transform:translateY(3px) scaleY(1.04)}
            100%{opacity:1;transform:translateY(0) scaleY(1)}
        }
        @keyframes heroFade{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes revLeft{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes revRight{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes revUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes statIn{0%{opacity:0;transform:translateY(18px) scale(.92)}60%{transform:translateY(-4px) scale(1.02)}100%{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes tblRowIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes scan{0%{top:-10%}100%{top:110%}}
        @keyframes heartbeat{0%,100%{transform:scale(1)}16%{transform:scale(1.45)}32%{transform:scale(1)}48%{transform:scale(1.25)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes goldSweep{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes stampIn{0%{transform:scale(1.8) rotate(-12deg);opacity:0}62%{transform:scale(.9) rotate(2deg)}100%{transform:scale(1) rotate(0);opacity:1}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(31,170,89,0)}50%{box-shadow:0 0 0 8px rgba(31,170,89,.08)}}
        @keyframes lineGrow{from{width:0}to{width:100%}}
        @keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}

        /* Reveal helpers */
        .reveal-left{opacity:0;transform:translateX(-30px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);}
        .reveal-right{opacity:0;transform:translateX(30px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);}
        .reveal-left.vis,.reveal-right.vis{opacity:1;transform:translateX(0);}

        /* ══════ HEADER ══════ */
        .hdr{
            background:linear-gradient(135deg,#1a9e52 0%,#1FAA59 55%,#22c45e 100%);
            color:white;position:sticky;top:0;z-index:100;
            box-shadow:0 2px 20px rgba(31,170,89,.38);
            animation:hdrIn .72s cubic-bezier(.16,1,.3,1) both;
            transform-origin:top center;overflow:hidden;
        }
        .hdr::before{
            content:'';position:absolute;left:0;right:0;height:55px;
            background:linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,.07),rgba(255,255,255,0));
            animation:scan 6s linear infinite;pointer-events:none;
        }
        .hdr::after{
            content:'';position:absolute;inset:0;
            background:repeating-linear-gradient(60deg,rgba(255,255,255,.03) 0,rgba(255,255,255,.03) 1px,transparent 1px,transparent 18px);
            pointer-events:none;
        }
        .hdr-strip{
            background:rgba(0,0,0,.18);padding:5px 36px;
            font-size:10.5px;letter-spacing:2px;text-transform:uppercase;
            color:rgba(255,255,255,.72);border-bottom:1px solid rgba(255,255,255,.12);
            position:relative;z-index:1;
            display:flex;align-items:center;justify-content:space-between;
            font-family:'JetBrains Mono',monospace;
        }
        .strip-dot{width:6px;height:6px;border-radius:50%;background:#7dff9a;display:inline-block;margin-right:6px;animation:heartbeat 2.8s ease-in-out infinite;}
        .hdr-main{
            max-width:1200px;margin:0 auto;padding:0 36px;
            display:flex;align-items:center;justify-content:space-between;
            height:62px;position:relative;z-index:1;
        }
        .hdr-brand{display:flex;align-items:center;gap:14px;cursor:default;text-decoration:none;color:inherit;}
        .hdr-seal{
            width:46px;height:46px;
            background:rgba(255,255,255,.18);border:2px solid rgba(255,255,255,.5);
            border-radius:50%;display:flex;align-items:center;justify-content:center;
            font-family:'Lora',serif;font-size:20px;font-weight:600;
            transition:transform .6s cubic-bezier(.16,1,.3,1),background .3s;
            transform-style:preserve-3d;position:relative;
        }
        .hdr-seal::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:1px dashed rgba(255,255,255,.35);transition:transform .6s cubic-bezier(.16,1,.3,1);}
        .hdr-brand:hover .hdr-seal{transform:rotateY(28deg) rotateX(-8deg) scale(1.08);background:rgba(255,255,255,.3);}
        .hdr-brand:hover .hdr-seal::after{transform:rotate(30deg);}
        .hdr-title{font-family:'Lora',serif;font-size:17px;font-weight:600;line-height:1.2;}
        .hdr-title::after{content:'';position:absolute;bottom:-2px;left:0;height:1.5px;width:0;background:rgba(255,255,255,.65);transition:width .55s cubic-bezier(.16,1,.3,1);}
        .hdr-title-wrap{position:relative;display:inline-block;}
        .hdr-brand:hover .hdr-title-wrap::after{width:100%;}
        .hdr-title-wrap::after{content:'';position:absolute;bottom:-2px;left:0;height:1.5px;width:0;background:rgba(255,255,255,.65);transition:width .55s cubic-bezier(.16,1,.3,1);}
        .hdr-sub{font-size:10px;color:rgba(255,255,255,.68);letter-spacing:1.2px;text-transform:uppercase;margin-top:2px;}
        .tw-cur{display:inline-block;animation:blink .7s step-end infinite;color:rgba(255,255,255,.7);}
        .hdr-nav{display:flex;align-items:center;gap:8px;}
        .nav-link{
            background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);
            border-radius:6px;padding:6px 14px;color:white;font-size:12px;font-weight:500;
            cursor:pointer;transition:background .25s,transform .2s;font-family:inherit;letter-spacing:.3px;
        }
        .nav-link:hover{background:rgba(255,255,255,.24);transform:translateY(-1px);}
        .nav-link.active{background:rgba(255,255,255,.3);border-color:rgba(255,255,255,.5);}

        /* ══════ HERO ══════ */
        .hero{
            max-width:1200px;margin:0 auto;padding:52px 36px 36px;
            text-align:center;
            opacity:0;transform:translateY(28px);
            transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);
        }
        .hero.vis{opacity:1;transform:translateY(0);}
        .hero-eyebrow{
            display:inline-block;
            font-family:'JetBrains Mono',monospace;
            font-size:11px;letter-spacing:2.5px;text-transform:uppercase;
            color:#1FAA59;background:#e8f8ee;border:1px solid #b8ddc8;
            padding:5px 16px;border-radius:20px;margin-bottom:20px;
        }
        .hero-title{
            font-family:'Lora',serif;
            font-size:clamp(32px,5vw,52px);font-weight:700;
            color:#1a2a1a;line-height:1.15;margin-bottom:14px;
        }
        .hero-title span{color:#1FAA59;}
        .hero-desc{
            font-size:16px;color:#5a6a5a;line-height:1.7;
            max-width:580px;margin:0 auto 36px;
            font-style:italic;
        }

        /* Aggregate stat bar */
        .agg-bar{
            display:flex;align-items:center;justify-content:center;gap:0;
            background:white;border-radius:14px;
            border:1px solid #d8e8d8;
            box-shadow:0 2px 12px rgba(31,170,89,.1),0 8px 28px rgba(0,0,0,.06);
            overflow:hidden;margin-bottom:36px;
            animation:statIn .7s cubic-bezier(.16,1,.3,1) .3s both;
        }
        .agg-item{
            flex:1;padding:20px 16px;text-align:center;
            position:relative;border-right:1px solid #e8f0e8;
            transition:background .3s;
        }
        .agg-item:last-child{border-right:none;}
        .agg-item:hover{background:#f4fbf6;}
        .agg-num{
            font-family:'Lora',serif;font-size:28px;font-weight:700;
            color:#1FAA59;line-height:1;margin-bottom:5px;
        }
        .agg-lbl{font-size:11px;color:#8a9a8a;letter-spacing:.5px;text-transform:uppercase;font-family:'JetBrains Mono',monospace;}

        /* Year filter tabs */
        .year-tabs{
            display:flex;align-items:center;justify-content:center;gap:8px;
            margin-bottom:40px;
            animation:statIn .6s cubic-bezier(.16,1,.3,1) .4s both;
        }
        .ytab{
            font-family:'Lora',serif;font-size:14px;font-weight:600;
            padding:9px 22px;border-radius:8px;cursor:pointer;
            border:1.5px solid #c8d8c8;background:white;color:#556;
            transition:all .28s cubic-bezier(.16,1,.3,1);
        }
        .ytab:hover{border-color:#1FAA59;color:#1FAA59;transform:translateY(-2px);box-shadow:0 4px 12px rgba(31,170,89,.14);}
        .ytab.act{background:#1FAA59;color:white;border-color:#1FAA59;box-shadow:0 4px 14px rgba(31,170,89,.32);}

        /* ══════ MAIN CONTENT ══════ */
        .main{max-width:1200px;margin:0 auto;padding:0 36px 60px;}

        /* Year section */
        .year-section{
            margin-bottom:56px;
            background:white;border-radius:16px;
            border:1px solid #d8e4d8;
            box-shadow:0 1px 4px rgba(0,0,0,.05),0 8px 28px rgba(0,0,0,.07);
            overflow:hidden;
        }
        .year-section:hover{box-shadow:0 2px 8px rgba(0,0,0,.07),0 14px 40px rgba(0,0,0,.1);}

        /* Year header */
        .year-hdr{
            background:linear-gradient(108deg,#f2faf4,#e8f6ec);
            border-bottom:1px solid #c8e0cc;
            padding:22px 28px;
            display:flex;align-items:center;gap:16px;
            position:relative;overflow:hidden;
        }
        .year-hdr::after{
            content:'';position:absolute;top:0;left:-100%;width:50%;height:100%;
            background:linear-gradient(90deg,transparent,rgba(255,255,255,.45),transparent);
            transition:left .7s ease;pointer-events:none;
        }
        .year-hdr:hover::after{left:160%;}
        .year-pill{
            font-family:'Lora',serif;font-size:22px;font-weight:700;
            color:white;background:#1FAA59;
            border-radius:10px;padding:8px 18px;
            box-shadow:0 3px 12px rgba(31,170,89,.32);
            flex-shrink:0;
            animation:stampIn .5s cubic-bezier(.16,1,.3,1) both;
        }
        .year-hdr-text{flex:1;}
        .year-title{font-family:'Lora',serif;font-size:20px;font-weight:600;color:#1a1a1a;margin-bottom:2px;}
        .year-sub{font-size:12px;color:#8a9898;letter-spacing:.6px;text-transform:uppercase;font-family:'JetBrains Mono',monospace;}
        .year-divider-line{
            width:4px;height:0;background:#1FAA59;border-radius:2px;align-self:stretch;
            animation:lineGrow 1s cubic-bezier(.16,1,.3,1) .3s forwards;
            flex-shrink:0;
        }

        /* Stat cards */
        .stat-row{
            display:grid;grid-template-columns:repeat(4,1fr);gap:0;
            border-bottom:1px solid #e8f0e8;
        }
        .stat-card{
            padding:24px 20px;text-align:center;
            border-right:1px solid #e8f0e8;
            position:relative;overflow:hidden;
            animation:statIn .6s cubic-bezier(.16,1,.3,1) both;
            transition:background .3s;cursor:default;
        }
        .stat-card:last-child{border-right:none;}
        .stat-card:hover{background:#f8fdf8;}
        .stat-card:hover .stat-glow{opacity:1;}
        .stat-glow{
            position:absolute;inset:0;
            background:radial-gradient(circle at center,rgba(31,170,89,.06) 0%,transparent 70%);
            opacity:0;transition:opacity .4s;pointer-events:none;
        }
        .stat-icon{font-size:22px;margin-bottom:8px;display:block;animation:floatUp 3s ease-in-out infinite;}
        .stat-num{
            font-family:'Lora',serif;font-size:26px;font-weight:700;
            color:#1FAA59;line-height:1;margin-bottom:5px;
        }
        .stat-lbl{font-size:11px;color:#7a8a7a;letter-spacing:.6px;text-transform:uppercase;font-family:'JetBrains Mono',monospace;}

        /* Summary */
        .summary-block{padding:24px 28px;border-bottom:1px solid #e8f0e8;}
        .summary-heading{
            font-family:'Lora',serif;font-size:14px;font-weight:600;
            color:#1a1a1a;margin-bottom:14px;
            display:flex;align-items:center;gap:10px;
            letter-spacing:.3px;
        }
        .summary-heading::before{content:'';display:block;width:3px;height:16px;background:#1FAA59;border-radius:2px;}
        .summary-list{list-style:none;display:flex;flex-direction:column;gap:10px;}
        .summary-item{
            display:flex;align-items:flex-start;gap:10px;
            font-size:13.5px;line-height:1.65;color:#445;
            opacity:0;animation:tblRowIn .5s cubic-bezier(.16,1,.3,1) forwards;
        }
        .summary-item.vis-child{opacity:1;}
        .bullet-dot{
            width:7px;height:7px;border-radius:50%;background:#1FAA59;
            flex-shrink:0;margin-top:7px;
        }

        /* Tables area */
        .tables-row{
            display:grid;grid-template-columns:1fr 1fr;gap:0;
        }
        .tbl-wrap{padding:20px 24px;border-right:1px solid #e8f0e8;}
        .tbl-wrap:last-child{border-right:none;}
        .tbl-title{
            font-family:'Lora',serif;font-size:13.5px;font-weight:600;color:#1a1a1a;
            margin-bottom:12px;display:flex;align-items:center;gap:8px;
        }
        .tbl-dot{width:8px;height:8px;border-radius:50%;background:#1FAA59;flex-shrink:0;}
        .tbl-dot--gold{background:linear-gradient(135deg,#d4a820,#b8860b);}
        .ptbl{width:100%;border-collapse:collapse;font-size:13px;}
        .ptbl thead tr{background:linear-gradient(108deg,#f2faf4,#eaf6ed);border-bottom:1.5px solid #c8e0cc;}
        .ptbl th{
            padding:9px 12px;text-align:left;
            font-size:10.5px;font-weight:700;color:#5a7a5a;letter-spacing:.8px;text-transform:uppercase;
            font-family:'JetBrains Mono',monospace;
        }
        .tbl-row{
            border-bottom:1px solid #f0f6f0;
            transition:background .22s;
            opacity:0;animation:tblRowIn .4s cubic-bezier(.16,1,.3,1) forwards;
        }
        .tbl-row:hover{background:#f6fbf7;}
        .tbl-row:last-child{border-bottom:none;}
        .ptbl td{padding:10px 12px;color:#334;vertical-align:middle;}
        .ptbl td:first-child{color:#9aaa9a;font-family:'JetBrains Mono',monospace;font-size:12px;}

        /* Badges */
        .offers-badge{
            display:inline-block;background:#e8f4ec;color:#1a7a44;
            border:1px solid #b8d8c4;border-radius:5px;
            padding:2px 9px;font-size:12px;font-weight:600;
            font-family:'JetBrains Mono',monospace;
        }
        .ctc-chip{
            display:inline-block;background:#f0f6f0;color:#334;
            border:1px solid #d4e4d4;border-radius:5px;
            padding:3px 10px;font-size:12.5px;font-weight:600;
            font-family:'Lora',serif;
            transition:all .25s;
        }
        .ctc-chip--top{
            background:linear-gradient(90deg,#b8860b,#d4a820,#c8941a,#b8860b);
            background-size:200% auto;color:transparent;
            -webkit-background-clip:text;background-clip:text;
            border-color:rgba(212,168,32,.3);background-color:#fffbf0;
            font-size:13px;
            animation:goldSweep 3.5s linear infinite;
        }
        .tbl-row:hover .ctc-chip{background:#e8f4ec;border-color:#a8ccb4;color:#1a6a3a;}

        /* ══════ FOOTER ══════ */
        .footer{
            background:linear-gradient(135deg,#1a2a1a,#1a3a22);
            color:rgba(255,255,255,.7);
            padding:32px 36px;text-align:center;
            font-size:12px;letter-spacing:.5px;
            font-family:'JetBrains Mono',monospace;
        }
        .footer strong{color:#4ecb78;}

        /* ── Responsive ── */
        @media(max-width:768px){
            .stat-row{grid-template-columns:1fr 1fr;}
            .tables-row{grid-template-columns:1fr;}
            .tbl-wrap{border-right:none;border-bottom:1px solid #e8f0e8;}
            .agg-bar{flex-wrap:wrap;}
            .agg-item{border-right:none;border-bottom:1px solid #e8f0e8;min-width:50%;}
            .hdr-main{padding:0 16px;}
            .hero,.main{padding-left:16px;padding-right:16px;}
        }
        `}</style>

        <div className="placement-root">

        {/* ── HEADER ── */}
        <header className="hdr">
            <div className="hdr-strip">
            <span>
                <span className="strip-dot" />
                Kalinga Institute of Industrial Technology · Bhubaneswar, Odisha
            </span>
            <span>CDC Portal · Placement Records</span>
            </div>
            <div className="hdr-main">
            <div className="hdr-brand">
                <div className="hdr-seal">K</div>
                <div>
                <div className="hdr-title-wrap">
                    <div className="hdr-title">
                    {mounted ? <Typewriter text="Career Development Centre" delay={250} /> : 'Career Development Centre'}
                    </div>
                </div>
                <div className="hdr-sub">Internship &amp; Placement Administration</div>
                </div>
            </div>
            <div className="hdr-nav">
                <button className="nav-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button className="nav-link active" onClick={scrollToCompanyList}>Placement History</button>
                <button className="nav-link">Add Listing</button>
            </div>
            </div>
        </header>

        {/* ── HERO ── */}
        <div className="hero" ref={heroRef}>
            <div className="hero-eyebrow">Official Placement Records</div>
            <h1 className="hero-title">
            Placement <span>2025</span>
            <br />Graduating Batch
            </h1>
            <p className="hero-desc">
            Comprehensive data on campus recruitments, offers, and compensation
            across all graduating batches at KIIT University.
            </p>

            {/* Aggregate bar */}
            <div className="agg-bar">
            <div className="agg-item">
                <div className="agg-num"><Counter target="757" duration={1800} /></div>
                <div className="agg-lbl">Top Companies</div>
            </div>
            <div className="agg-item">
                <div className="agg-num"><Counter target="4621" duration={1600} /></div>
                <div className="agg-lbl">Total Offers</div>
            </div>
            <div className="agg-item">
                <div className="agg-num"><Counter target="51.00" duration={1400} prefix="₹" suffix=" LPA" /></div>
                <div className="agg-lbl">Highest CTC</div>
            </div>
            <div className="agg-item">
                <div className="agg-num"><Counter target="92.5" duration={1200} suffix="%" /></div>
                <div className="agg-lbl">Placement Rate</div>
            </div>
            </div>

            {/* Year filter */}
            <div className="year-tabs">
            {['all', ...YEARS.map(y => y.year)].map(y => (
                <button key={y} className={`ytab${activeYear === y ? ' act' : ''}`}
                onClick={() => setActiveYear(y)}>
                {y === 'all' ? 'All Years' : `Batch ${y}`}
                </button>
            ))}
            </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="main">
            {filteredData.map((data, idx) => (
                <YearSection
                    key={data.year}
                    data={data}
                    idx={idx}
                    companyListRef={idx === 0 ? companyListRef : null}
                />
            ))}
        </div>

        {/* ── FOOTER ── */}
        <div className="footer">
            <p>© 2025 <strong>KIIT University</strong> · Career Development Centre · All placement data is official and verified.</p>
            <p style={{ marginTop: 6, opacity: .6 }}>For queries contact: cdc@kiit.ac.in</p>
        </div>

        </div>
    </>);
    }