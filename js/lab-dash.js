/* Suspension Lab — engineering dashboard: quarter-car ride simulator (2-DOF, live), frequency response,
   body roll & anti-roll bar, wheel-alignment explorer, damper dyno. Text in English / Gujarati / Hindi. */
'use strict';

const LX = (a) => (Array.isArray(a) ? (LANG === 'gu' ? a[1] : LANG === 'hi' ? a[2] : a[0]) : a);
const LXesc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const cssv = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const fmtN = (v, d) => (Number.isFinite(v) ? v.toFixed(d) : '—');

/* ── per-corner typical values for each system (training figures) ── */
const QC_PRESET = {
  macpherson: { ms: 330, mu: 42, k: 24000, c: 1900, kt: 200000, trav: 0.08, load: 120, M: 1250, t: 1.50, h: 0.53, hr: 0.07 },
  wishbone:   { ms: 400, mu: 48, k: 32000, c: 2600, kt: 230000, trav: 0.09, load: 140, M: 1750, t: 1.58, h: 0.62, hr: 0.10 },
  multilink:  { ms: 330, mu: 46, k: 30000, c: 2400, kt: 220000, trav: 0.09, load: 140, M: 1550, t: 1.56, h: 0.52, hr: 0.12 },
  twistbeam:  { ms: 250, mu: 36, k: 21000, c: 1600, kt: 200000, trav: 0.09, load: 140, M: 1150, t: 1.47, h: 0.52, hr: 0.20 },
  leaf:       { ms: 420, mu: 85, k: 72000, c: 3600, kt: 360000, trav: 0.10, load: 500, M: 1900, t: 1.62, h: 0.75, hr: 0.45 },
  air:        { ms: 520, mu: 58, k: 30000, c: 2900, kt: 240000, trav: 0.10, load: 160, M: 2100, t: 1.64, h: 0.58, hr: 0.10 }
};
const T_D = {
  title: ['Engineering dashboard', 'એન્જિનિયરિંગ ડેશબોર્ડ', 'इंजीनियरिंग डैशबोर्ड'],
  lede: ['Live physics of the selected system. Change spring, damper, load, tyre pressure and road — and watch comfort, grip and travel change in real time. Values are per wheel corner.',
    'પસંદ કરેલી સિસ્ટમનું લાઇવ ફિઝિક્સ. સ્પ્રિંગ, ડેમ્પર, લોડ, ટાયર પ્રેશર અને રોડ બદલો — આરામ, ગ્રિપ અને ટ્રાવેલ તરત બદલાતા જુઓ. આંકડા એક વ્હીલ-કોર્નરના છે.',
    'चुने गए सिस्टम की लाइव फिज़िक्स. स्प्रिंग, डैम्पर, लोड, टायर प्रेशर और रोड बदलें — आराम, ग्रिप और ट्रैवल तुरंत बदलते देखें. आँकड़े एक व्हील-कॉर्नर के हैं.'],
  qc: ['Quarter-car ride simulator', 'ક્વાર્ટર-કાર રાઇડ સિમ્યુલેટર', 'क्वार्टर-कार राइड सिम्युलेटर'],
  qcSub: ['2-DOF model: sprung mass (body) + unsprung mass (wheel, hub, brake) + spring k + damper c + tyre kt. Solved live (RK4, 1 ms step).',
    '2-DOF મોડેલ: સ્પ્રંગ માસ (બોડી) + અનસ્પ્રંગ માસ (વ્હીલ, હબ, બ્રેક) + સ્પ્રિંગ k + ડેમ્પર c + ટાયર kt. લાઇવ ગણતરી (RK4, 1 ms).',
    '2-DOF मॉडल: स्प्रंग मास (बॉडी) + अनस्प्रंग मास (व्हील, हब, ब्रेक) + स्प्रिंग k + डैम्पर c + टायर kt. लाइव गणना (RK4, 1 ms).'],
  road: ['Road', 'રોડ', 'रोड'], speed: ['Speed', 'ઝડપ', 'गति'], load: ['Payload', 'લોડ', 'लोड'], k: ['Spring rate k', 'સ્પ્રિંગ રેટ k', 'स्प्रिंग रेट k'],
  c: ['Damping c', 'ડેમ્પિંગ c', 'डैम्पिंग c'], health: ['Damper health', 'ડેમ્પરની હાલત', 'डैम्पर की हालत'], tp: ['Tyre pressure', 'ટાયર પ્રેશર', 'टायर प्रेशर'], mu: ['Unsprung mass', 'અનસ્પ્રંગ માસ', 'अनस्प्रंग मास'],
  roads: [['hump', ['Speed breaker', 'સ્પીડ બ્રેકર', 'स्पीड ब्रेकर']], ['pothole', ['Pothole', 'ખાડો', 'गड्ढा']], ['isoB', ['Good road (ISO B)', 'સારો રોડ (ISO B)', 'अच्छी सड़क (ISO B)']], ['isoD', ['Rough road (ISO D)', 'ખરાબ રોડ (ISO D)', 'खराब सड़क (ISO D)']], ['wash', ['Washboard', 'વોશબોર્ડ (લહેરિયાં)', 'वॉशबोर्ड (लहरें)']]],
  play: ['▶ Run', '▶ ચલાવો', '▶ चलाएँ'], pause: ['❚❚ Pause', '❚❚ થોભો', '❚❚ रोकें'], reset: ['⟲ Preset', '⟲ પ્રીસેટ', '⟲ प्रीसेट'], saveA: ['Save as reference', 'સંદર્ભ તરીકે સાચવો', 'संदर्भ के रूप में सहेजें'],
  fn: ['Body natural freq.', 'બોડી નેચરલ ફ્રિક્વન્સી', 'बॉडी नेचुरल फ्रीक्वेंसी'], fw: ['Wheel-hop freq.', 'વ્હીલ-હોપ ફ્રિક્વન્સી', 'व्हील-हॉप फ्रीक्वेंसी'], zeta: ['Damping ratio ζ', 'ડેમ્પિંગ રેશિયો ζ', 'डैम्पिंग रेशियो ζ'],
  arms: ['Body accel. RMS', 'બોડી એક્સિલરેશન RMS', 'बॉडी एक्सेलरेशन RMS'], dtl: ['Tyre-load variation', 'ટાયર-લોડ ફેરફાર', 'टायर-लोड बदलाव'], trv: ['Travel used', 'વપરાયેલ ટ્રાવેલ', 'इस्तेमाल ट्रैवल'], sag: ['Static sag', 'સ્ટેટિક સૅગ', 'स्टैटिक सैग'],
  comfort: ['Comfort (ISO 2631)', 'આરામ (ISO 2631)', 'आराम (ISO 2631)'], grip: ['Grip', 'ગ્રિપ', 'ग्रिप'],
  chA: ['Body acceleration (m/s²)', 'બોડી એક્સિલરેશન (m/s²)', 'बॉडी एक्सेलरेशन (m/s²)'], chT: ['Suspension travel (mm)', 'સસ્પેન્શન ટ્રાવેલ (mm)', 'सस्पेंशन ट्रैवल (mm)'], chF: ['Tyre load (% of static)', 'ટાયર લોડ (સ્ટેટિકના %)', 'टायर लोड (स्टैटिक का %)'],
  frf: ['Frequency response — how much road movement reaches the body', 'ફ્રિક્વન્સી રિસ્પોન્સ — રોડની કેટલી હલચલ બોડી સુધી પહોંચે', 'फ्रीक्वेंसी रिस्पॉन्स — सड़क की कितनी हलचल बॉडी तक पहुँचती है'],
  frfCap: ['Two peaks: body bounce (≈ 1–1.5 Hz) and wheel hop (≈ 10–15 Hz). Between them the suspension isolates (curve below 1). More damping lowers the peaks but transmits more at high frequency — the classic comfort/grip compromise.',
    'બે શિખર: બોડી બાઉન્સ (≈ 1–1.5 Hz) અને વ્હીલ હોપ (≈ 10–15 Hz). વચ્ચે સસ્પેન્શન ઝટકા રોકે (વક્ર 1 થી નીચે). વધુ ડેમ્પિંગ શિખર ઘટાડે પણ ઊંચી ફ્રિક્વન્સીએ વધુ ઝટકા પહોંચાડે — આરામ અને ગ્રિપ વચ્ચેનું સમાધાન.',
    'दो शिखर: बॉडी बाउंस (≈ 1–1.5 Hz) और व्हील हॉप (≈ 10–15 Hz). बीच में सस्पेंशन झटके रोकता है (वक्र 1 से नीचे). ज़्यादा डैम्पिंग शिखर घटाती है पर ऊँची फ्रीक्वेंसी पर ज़्यादा झटके पहुँचाती है — आराम और ग्रिप का समझौता.'],
  body: ['Body |zs/zr|', 'બોડી |zs/zr|', 'बॉडी |zs/zr|'], tyre: ['Tyre load |Ft/kt·zr|', 'ટાયર લોડ |Ft/kt·zr|', 'टायर लोड |Ft/kt·zr|'], ref: ['reference', 'સંદર્ભ', 'संदर्भ'],
  roll: ['Body roll & anti-roll bar', 'બોડી રોલ અને એન્ટી-રોલ બાર', 'बॉडी रोल और एंटी-रोल बार'],
  rollSub: ['Steady cornering, rear view. Roll moment = M·ay·(h − hRC); resisted by the springs and the anti-roll bar.', 'સ્થિર વળાંક, પાછળથી દૃશ્ય. રોલ મોમેન્ટ = M·ay·(h − hRC); સ્પ્રિંગ અને એન્ટી-રોલ બાર તેને રોકે.', 'स्थिर मोड़, पीछे से दृश्य. रोल मोमेंट = M·ay·(h − hRC); स्प्रिंग और एंटी-रोल बार इसे रोकते हैं.'],
  ay: ['Lateral acceleration', 'લેટરલ એક્સિલરેશન', 'लेटरल एक्सेलरेशन'], arb: ['Anti-roll bar stiffness', 'એન્ટી-રોલ બાર સ્ટિફનેસ', 'एंटी-रोल बार स्टिफनेस'], hcg: ['CG height', 'CG ઊંચાઈ', 'CG ऊँचाई'], hrc: ['Roll-centre height', 'રોલ-સેન્ટર ઊંચાઈ', 'रोल-सेंटर ऊँचाई'],
  rollAng: ['Roll angle', 'રોલ ખૂણો', 'रोल कोण'], rollGrad: ['Roll gradient', 'રોલ ગ્રેડિયન્ટ', 'रोल ग्रेडिएंट'], ltr: ['Load transfer', 'લોડ ટ્રાન્સફર', 'लोड ट्रांसफर'], inner: ['Inner wheels load', 'અંદરના વ્હીલનો લોડ', 'अंदर के पहियों का लोड'],
  lift: ['⚠ Inner wheels lifting — rollover risk!', '⚠ અંદરના વ્હીલ ઊંચકાય છે — ઊંધી પડવાનું જોખમ!', '⚠ अंदर के पहिये उठ रहे हैं — पलटने का खतरा!'],
  al: ['Wheel alignment explorer', 'વ્હીલ એલાઇનમેન્ટ એક્સપ્લોરર', 'व्हील अलाइनमेंट एक्सप्लोरर'],
  alSub: ['Set camber, caster and toe — see the tyre wear pattern, steering feel and pull. Green band = typical spec.', 'કેમ્બર, કેસ્ટર અને ટો બદલો — ટાયર ઘસારો, સ્ટીયરિંગ અનુભવ અને ખેંચાણ જુઓ. લીલો પટ્ટો = સામાન્ય સ્પેક.', 'कैम्बर, कैस्टर और टो बदलें — टायर घिसाव, स्टीयरिंग अनुभव और खिंचाव देखें. हरा पट्टा = सामान्य स्पेक.'],
  camber: ['Camber', 'કેમ્બર', 'कैम्बर'], caster: ['Caster', 'કેસ્ટર', 'कैस्टर'], toe: ['Total toe', 'કુલ ટો', 'कुल टो'], xcast: ['Left–right caster difference', 'ડાબે–જમણે કેસ્ટર ફરક', 'बाएँ–दाएँ कैस्टर अंतर'],
  dyno: ['Damper dyno — force vs velocity', 'ડેમ્પર ડાયનો — બળ vs વેગ', 'डैम्पर डायनो — बल vs वेग'],
  dynoSub: ['A damper turns motion into heat. Rebound (extension) is stiffer than bump (compression), and valves open at high speed (digressive). A worn damper loses force mainly at low speed — exactly where body control is needed.',
    'ડેમ્પર ગતિને ગરમીમાં ફેરવે. રીબાઉન્ડ (ખૂલવું) બમ્પ (દબાવું) કરતાં કડક હોય, અને ઊંચી ઝડપે વાલ્વ ખૂલે (ડિગ્રેસિવ). ઘસાયેલો ડેમ્પર ધીમી ઝડપે જ બળ ગુમાવે — જ્યાં બોડી કંટ્રોલ જોઈએ.',
    'डैम्पर गति को गर्मी में बदलता है. रिबाउंड (खुलना) बम्प (दबना) से सख़्त होता है, और तेज़ गति पर वाल्व खुलते हैं (डिग्रेसिव). घिसा डैम्पर धीमी गति पर ही बल खोता है — जहाँ बॉडी कंट्रोल चाहिए.'],
  newD: ['new damper', 'નવો ડેમ્પર', 'नया डैम्पर'], curD: ['your damper', 'તમારો ડેમ્પર', 'आपका डैम्पर'], reb: ['rebound', 'રીબાઉન્ડ', 'रिबाउंड'], bump: ['bump', 'બમ્પ', 'बम्प'], vel: ['piston velocity (m/s)', 'પિસ્ટન વેગ (m/s)', 'पिस्टन वेग (m/s)'], frc: ['force (N)', 'બળ (N)', 'बल (N)']
};
const ISO_BANDS = [[0.315, ['not uncomfortable', 'આરામદાયક', 'आरामदायक'], 'ok'], [0.63, ['a little uncomfortable', 'થોડું અસુવિધાજનક', 'थोड़ा असुविधाजनक'], 'ok'], [1.0, ['fairly uncomfortable', 'ઠીક-ઠીક અસુવિધાજનક', 'काफ़ी असुविधाजनक'], 'warn'], [1.6, ['uncomfortable', 'અસુવિધાજનક', 'असुविधाजनक'], 'warn'], [2.5, ['very uncomfortable', 'ખૂબ અસુવિધાજનક', 'बहुत असुविधाजनक'], 'bad'], [1e9, ['extremely uncomfortable', 'અત્યંત અસુવિધાજનક', 'अत्यंत असुविधाजनक'], 'bad']];

const Dash = (() => {
  const $ = (s) => document.querySelector(s);
  const g = 9.81;
  const S = { sys: 'macpherson', run: true, road: 'hump', v: 30, load: 0.3, k: 1, c: 1, health: 1, tp: 2.3, muF: 1, ref: null, built: false,
    ay: 0.5, arb: 25000, hcg: 1, hrc: 1, camber: -0.8, caster: 4.5, toe: 1.0, xcast: 0, dynoH: 1 };
  let P = null;          // current physical parameters
  const sim = { x: 0, zs: 0, vs: 0, zu: 0, vu: 0, t: 0, hist: [], acc: 0 };
  const HN = 600;        // history points (every 10 ms = 6 s)
  let roadPh = null;

  /* ── road profiles (height in m at distance x) ── */
  function makeRandom(Gd0, seed) {
    let s = seed; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
    const comps = []; const n0 = 0.1, N = 70, nmin = 0.02, nmax = 6;
    for (let i = 0; i < N; i++) {
      const n = nmin * Math.pow(nmax / nmin, (i + 0.5) / N); const dn = n * Math.log(nmax / nmin) / N;
      const G = Gd0 * Math.pow(n / n0, -2); comps.push([Math.sqrt(2 * G * dn), 2 * Math.PI * n, rnd() * 2 * Math.PI]);
    }
    return (x) => { let z = 0; for (const c of comps) z += c[0] * Math.sin(c[1] * x + c[2]); return z; };
  }
  const RND = { isoB: makeRandom(64e-6, 7), isoD: makeRandom(1024e-6, 11) };
  function road(x) {
    switch (S.road) {
      case 'hump': { const L = 3.7, H = 0.075, per = 45, u = ((x % per) + per) % per - 8; return u > 0 && u < L ? H * Math.sin(Math.PI * u / L) ** 2 : 0; }
      case 'pothole': { const L = 0.7, D = 0.06, per = 30, u = ((x % per) + per) % per - 6; return u > 0 && u < L ? -D * Math.sin(Math.PI * u / L) ** 0.6 : 0; }
      case 'wash': return 0.012 * Math.sin(2 * Math.PI * x / 0.9);
      default: return RND[S.road](x);
    }
  }

  /* ── parameters from the preset and the sliders ── */
  function params() {
    const p = QC_PRESET[S.sys] || QC_PRESET.macpherson;
    const loadKg = p.load * S.load;
    let k = p.k * S.k;
    if (S.sys === 'air') k = k * (p.ms + loadKg) / p.ms;      // air spring stiffens with pressure (self-levelling)
    if (S.sys === 'leaf') k = k * (1 + 0.6 * S.load);          // progressive leaves / helper leaf
    const ms = p.ms + loadKg, mu = p.mu * S.muF, c = p.c * S.c * S.health, kt = p.kt * Math.max(0.55, S.tp / 2.3);
    P = { ms, mu, k, c, kt, trav: p.trav, base: p, loadKg };
    P.fn = Math.sqrt(k / ms) / (2 * Math.PI);
    P.fw = Math.sqrt((k + kt) / mu) / (2 * Math.PI);
    P.zeta = c / (2 * Math.sqrt(k * ms));
    P.sag = S.sys === 'air' ? (p.ms * g / (p.k * S.k)) : ms * g / k;
    return P;
  }
  // damper force: bump softer than rebound, digressive above 0.15 m/s
  function damp(v, c) { const a = Math.abs(v), knee = 0.15; const f = a < knee ? a : knee + (a - knee) * 0.45; const asym = v > 0 ? 1.3 : 0.7; /* rebound (extension) stiffer than bump */ return Math.sign(v) * c * f * asym; }

  /* ── 2-DOF equations, z measured from static equilibrium; v = relative velocity zu−zs sign convention: travel = zs − zu ── */
  function deriv(st, x) {
    const zr = road(x); const rel = st.zs - st.zu, vrel = st.vs - st.vu;
    let fs = -P.k * rel - damp(vrel, P.c);
    const lim = P.trav; if (rel < -lim) fs += 40 * P.k * (-lim - rel); if (rel > lim * 1.1) fs -= 40 * P.k * (rel - lim * 1.1);   // bump stop / rebound stop
    const defl = zr - st.zu + P.mu * g / P.kt + P.ms * g / P.kt;   // tyre compression incl. static
    const ft = Math.max(0, P.kt * defl) - (P.ms + P.mu) * g;          // dynamic tyre force about static
    return { dzs: st.vs, dvs: fs / P.ms, dzu: st.vu, dvu: (-fs + ft) / P.mu, ft: ft + (P.ms + P.mu) * g };
  }
  function step(dt) {
    const v = S.v / 3.6; const s0 = { zs: sim.zs, vs: sim.vs, zu: sim.zu, vu: sim.vu };
    const add = (a, d, h) => ({ zs: a.zs + d.dzs * h, vs: a.vs + d.dvs * h, zu: a.zu + d.dzu * h, vu: a.vu + d.dvu * h });
    const k1 = deriv(s0, sim.x), k2 = deriv(add(s0, k1, dt / 2), sim.x + v * dt / 2), k3 = deriv(add(s0, k2, dt / 2), sim.x + v * dt / 2), k4 = deriv(add(s0, k3, dt), sim.x + v * dt);
    sim.zs += dt / 6 * (k1.dzs + 2 * k2.dzs + 2 * k3.dzs + k4.dzs); sim.vs += dt / 6 * (k1.dvs + 2 * k2.dvs + 2 * k3.dvs + k4.dvs);
    sim.zu += dt / 6 * (k1.dzu + 2 * k2.dzu + 2 * k3.dzu + k4.dzu); sim.vu += dt / 6 * (k1.dvu + 2 * k2.dvu + 2 * k3.dvu + k4.dvu);
    sim.x += v * dt; sim.t += dt; sim.acc = k1.dvs; sim.ft = k1.ft;
  }
  function resetSim() { sim.x = 0; sim.zs = sim.vs = sim.zu = sim.vu = 0; sim.t = 0; sim.hist = []; }

  /* ── analytic frequency response of the linear model ── */
  function frf(p, f) {
    const w = 2 * Math.PI * f; const cr = p.c * 1.0;   // linearised (mean of bump/rebound)
    // complex helpers [re, im]
    const A = [p.k - w * w * p.ms, w * cr], B = [p.k, w * cr], C = [p.k + p.kt - w * w * p.mu, w * cr];
    const mul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], div = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
    const det = sub(mul(A, C), mul(B, B));
    const zs = div(mul(B, [p.kt, 0]), det), zu = div(mul(A, [p.kt, 0]), det);
    const ab = (z) => Math.hypot(z[0], z[1]);
    return { body: ab(zs), tyre: ab([1 - zu[0], -zu[1]]) };
  }

  /* ── HTML ── */
  const sl = (id, lab, min, max, stp, val, out) => `<label class="dx-sl"><span>${lab}</span><input type="range" id="${id}" min="${min}" max="${max}" step="${stp}" value="${val}"><output id="${id}O">${out}</output></label>`;
  function build() {
    const v = $('#view-dash'); if (!v) return;
    v.innerHTML = `<div class="view-head"><div><h1>${LX(T_D.title)}</h1><p class="lede">${LX(T_D.lede)}</p></div><div class="dx-sys" id="dxSys"></div></div>
    <div class="dx-grid">
      <section class="panel dx-card dx-qc"><header><h2>${LX(T_D.qc)}</h2><p>${LX(T_D.qcSub)}</p></header>
        <div class="dx-qcrow">
          <div class="dx-anim"><canvas id="dxAnim" width="420" height="460"></canvas>
            <div class="dx-btns"><button class="btn accent" id="dxRun"></button><button class="btn" id="dxPre">${LX(T_D.reset)}</button><button class="btn ghost" id="dxRef">${LX(T_D.saveA)}</button></div></div>
          <div class="dx-ctl">
            <div class="dx-roads" id="dxRoad">${T_D.roads.map(([k, n]) => `<button class="chip" data-road="${k}" aria-pressed="${k === S.road}">${LX(n)}</button>`).join('')}</div>
            ${sl('dxV', LX(T_D.speed), 5, 120, 1, S.v, S.v + ' km/h')}
            ${sl('dxLoad', LX(T_D.load), 0, 1, 0.05, S.load, '')}
            ${sl('dxK', LX(T_D.k), 0.5, 2, 0.05, S.k, '')}
            ${sl('dxC', LX(T_D.c), 0.3, 2.5, 0.05, S.c, '')}
            ${sl('dxH', LX(T_D.health), 0.15, 1, 0.05, S.health, '')}
            ${sl('dxTp', LX(T_D.tp), 1.4, 3.2, 0.1, S.tp, '')}
            ${sl('dxMu', LX(T_D.mu), 0.7, 1.6, 0.05, S.muF, '')}
            <div class="dx-kpis" id="dxKpi"></div>
          </div>
        </div>
        <div class="dx-charts"><figure><figcaption>${LX(T_D.chA)}</figcaption><canvas id="dxCA" width="600" height="150"></canvas></figure>
          <figure><figcaption>${LX(T_D.chT)}</figcaption><canvas id="dxCT" width="600" height="150"></canvas></figure>
          <figure><figcaption>${LX(T_D.chF)}</figcaption><canvas id="dxCF" width="600" height="150"></canvas></figure></div>
        <figure class="dx-frf"><figcaption>${LX(T_D.frf)}</figcaption><canvas id="dxFrf" width="1100" height="300"></canvas><p class="dx-cap">${LX(T_D.frfCap)}</p></figure>
      </section>
      <section class="panel dx-card"><header><h2>${LX(T_D.roll)}</h2><p>${LX(T_D.rollSub)}</p></header>
        <canvas id="dxRoll" width="560" height="300"></canvas>
        ${sl('dxAy', LX(T_D.ay), 0, 1.0, 0.02, S.ay, '')}${sl('dxArb', LX(T_D.arb), 0, 80000, 1000, S.arb, '')}${sl('dxHcg', LX(T_D.hcg), 0.7, 1.5, 0.02, S.hcg, '')}${sl('dxHrc', LX(T_D.hrc), 0, 2, 0.05, S.hrc, '')}
        <div class="dx-kpis" id="dxRollK"></div>
      </section>
      <section class="panel dx-card"><header><h2>${LX(T_D.al)}</h2><p>${LX(T_D.alSub)}</p></header>
        <canvas id="dxAl" width="560" height="300"></canvas>
        ${sl('dxCam', LX(T_D.camber), -3, 3, 0.1, S.camber, '')}${sl('dxCas', LX(T_D.caster), 0, 10, 0.1, S.caster, '')}${sl('dxToe', LX(T_D.toe), -6, 6, 0.1, S.toe, '')}${sl('dxXc', LX(T_D.xcast), -2, 2, 0.1, S.xcast, '')}
        <div class="dx-verdict" id="dxAlV"></div>
      </section>
      <section class="panel dx-card"><header><h2>${LX(T_D.dyno)}</h2><p>${LX(T_D.dynoSub)}</p></header>
        <canvas id="dxDyno" width="560" height="300"></canvas>
        ${sl('dxDh', LX(T_D.health), 0.15, 1, 0.05, S.dynoH, '')}
        <div class="dx-kpis" id="dxDynoK"></div>
      </section>
    </div>`;
    $('#dxSys').innerHTML = (typeof SYSTEMS !== 'undefined' ? SYSTEMS : []).map((s) => `<button class="chip" data-sys="${s.id}" aria-pressed="${s.id === S.sys}">${LXesc(window.sysNameFor ? window.sysNameFor(s) : s.name)}</button>`).join('');
    bind(); S.built = true; params(); updOut(); drawStatic();
  }
  function bind() {
    const on = (id, key, fn) => { const el = $('#' + id); el.addEventListener('input', () => { S[key] = +el.value; params(); updOut(); drawStatic(); if (fn) fn(); }); };
    on('dxV', 'v'); on('dxLoad', 'load'); on('dxK', 'k'); on('dxC', 'c'); on('dxH', 'health'); on('dxTp', 'tp'); on('dxMu', 'muF');
    on('dxAy', 'ay'); on('dxArb', 'arb'); on('dxHcg', 'hcg'); on('dxHrc', 'hrc'); on('dxCam', 'camber'); on('dxCas', 'caster'); on('dxToe', 'toe'); on('dxXc', 'xcast'); on('dxDh', 'dynoH');
    $('#dxRoad').addEventListener('click', (e) => { const b = e.target.closest('[data-road]'); if (!b) return; S.road = b.dataset.road; $('#dxRoad').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x === b)); resetSim(); });
    $('#dxSys').addEventListener('click', (e) => { const b = e.target.closest('[data-sys]'); if (!b) return; setSys(b.dataset.sys, true); if (window.SuspLab) window.SuspLab.setSystem(b.dataset.sys); });
    $('#dxRun').addEventListener('click', () => { S.run = !S.run; updOut(); });
    $('#dxPre').addEventListener('click', () => { Object.assign(S, { k: 1, c: 1, health: 1, tp: 2.3, muF: 1, load: 0.3 }); syncSliders(); params(); resetSim(); updOut(); drawStatic(); });
    $('#dxRef').addEventListener('click', () => { S.ref = Object.assign({}, P); drawStatic(); });
  }
  function syncSliders() { [['dxK', 'k'], ['dxC', 'c'], ['dxH', 'health'], ['dxTp', 'tp'], ['dxMu', 'muF'], ['dxLoad', 'load']].forEach(([id, k]) => { const el = $('#' + id); if (el) el.value = S[k]; }); }
  function setSys(id, keepUI) { if (!QC_PRESET[id]) return; S.sys = id; S.ref = null; resetSim(); params(); if (S.built) { $('#dxSys').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', x.dataset.sys === id)); updOut(); drawStatic(); } }

  function updOut() {
    if (!S.built) return; const p = P, b = p.base;
    const set = (id, t) => { const el = $('#' + id + 'O'); if (el) el.textContent = t; };
    set('dxV', S.v + ' km/h'); set('dxLoad', Math.round(p.loadKg) + ' kg'); set('dxK', (p.k / 1000).toFixed(1) + ' N/mm'); set('dxC', Math.round(p.c) + ' N·s/m');
    set('dxH', Math.round(S.health * 100) + ' %'); set('dxTp', S.tp.toFixed(1) + ' bar'); set('dxMu', Math.round(p.mu) + ' kg');
    set('dxAy', S.ay.toFixed(2) + ' g'); set('dxArb', (S.arb / 1000).toFixed(0) + ' kN·m/rad'); set('dxHcg', (b.h * S.hcg * 1000).toFixed(0) + ' mm'); set('dxHrc', (b.hr * S.hrc * 1000).toFixed(0) + ' mm');
    set('dxCam', S.camber.toFixed(1) + '°'); set('dxCas', S.caster.toFixed(1) + '°'); set('dxToe', (S.toe > 0 ? '+' : '') + S.toe.toFixed(1) + ' mm'); set('dxXc', (S.xcast > 0 ? '+' : '') + S.xcast.toFixed(1) + '°'); set('dxDh', Math.round(S.dynoH * 100) + ' %');
    $('#dxRun').textContent = S.run ? LX(T_D.pause) : LX(T_D.play);
  }

  /* ── KPIs from the last 6 s ── */
  function kpis() {
    const p = P, h = sim.hist; let sa = 0, sf = 0, sf2 = 0, mt = 0, n = h.length, lift = false;
    for (const r of h) { sa += r.a * r.a; sf += r.f; sf2 += r.f * r.f; mt = Math.max(mt, Math.abs(r.t)); if (r.f < 1) lift = true; }
    const arms = n ? Math.sqrt(sa / n) : 0, fst = (p.ms + p.mu) * g, mean = n ? sf / n : fst, sd = n ? Math.sqrt(Math.max(0, sf2 / n - mean * mean)) : 0, dtl = sd / fst;
    const band = ISO_BANDS.find((b) => arms < b[0]);
    const zc = p.zeta < 0.2 ? 'bad' : p.zeta < 0.25 ? 'warn' : p.zeta > 0.6 ? 'warn' : 'ok';
    const gc = dtl < 0.15 ? 'ok' : dtl < 0.3 ? 'warn' : 'bad';
    const tc = mt / p.trav < 0.7 ? 'ok' : mt / p.trav < 0.95 ? 'warn' : 'bad';
    const tile = (lab, val, cls, sub) => `<div class="dx-kpi ${cls || ''}"><small>${lab}</small><b>${val}</b>${sub ? `<em>${sub}</em>` : ''}</div>`;
    $('#dxKpi').innerHTML = tile(LX(T_D.fn), fmtN(p.fn, 2) + ' Hz', p.fn > 1.8 ? 'warn' : 'ok') + tile(LX(T_D.fw), fmtN(p.fw, 1) + ' Hz') + tile(LX(T_D.zeta), fmtN(p.zeta, 2), zc, p.zeta < 0.2 ? LX(['under-damped', 'ઓછું ડેમ્પિંગ', 'कम डैम्पिंग']) : p.zeta > 0.6 ? LX(['over-damped', 'વધુ ડેમ્પિંગ', 'ज़्यादा डैम्पिंग']) : 'OK') +
      tile(LX(T_D.comfort), fmtN(arms, 2) + ' m/s²', band[2], LX(band[1])) + tile(LX(T_D.grip) + ' (DTL)', fmtN(dtl * 100, 0) + ' %', gc, lift ? LX(['⚠ wheel leaves the road!', '⚠ વ્હીલ રોડ છોડે છે!', '⚠ पहिया सड़क छोड़ रहा है!']) : '') +
      tile(LX(T_D.trv), fmtN(mt * 1000, 0) + ' / ' + Math.round(p.trav * 1000) + ' mm', tc, mt > p.trav ? LX(['bump-stop hit', 'બમ્પ-સ્ટોપ અથડાયું', 'बम्प-स्टॉप टकराया']) : '') + tile(LX(T_D.sag), fmtN(p.sag * 1000, 0) + ' mm', S.sys === 'air' ? 'ok' : '', S.sys === 'air' ? LX(['self-levelling', 'સેલ્ફ-લેવલિંગ', 'सेल्फ-लेवलिंग']) : '');
  }

  /* ── drawing ── */
  function cx(id) { const c = $('#' + id); return c ? [c, c.getContext('2d')] : [null, null]; }
  function col() { return { ink: cssv('--ink') || '#13202c', ink2: cssv('--ink-2') || '#566575', line: cssv('--line') || '#cfd7df', acc: cssv('--accent') || '#d97400', sig: cssv('--signal') || '#0a7db4', ok: cssv('--ok'), bad: cssv('--bad'), warn: cssv('--warn'), s3: cssv('--s3'), panel: cssv('--panel') || '#fff' }; }
  function spring(x, y0, y1, w, n, ctx) { ctx.beginPath(); ctx.moveTo(x, y0); const L = y1 - y0; for (let i = 1; i < n * 2; i++) ctx.lineTo(x + (i % 2 ? w : -w), y0 + L * i / (n * 2)); ctx.lineTo(x, y1); ctx.stroke(); }
  function drawAnim() {
    const [c, x] = cx('dxAnim'); if (!c) return; const C = col(), W = c.width, H = c.height, p = P;
    x.clearRect(0, 0, W, H); const scale = 900;   // px per m (exaggeration of motion ×)
    const yRoad = 400, v = S.v / 3.6;
    // road
    x.fillStyle = C.line; x.beginPath(); x.moveTo(0, H);
    for (let i = 0; i <= W; i += 3) { const xx = sim.x + (i - 150) / 60; x.lineTo(i, yRoad - road(xx) * scale); }
    x.lineTo(W, H); x.closePath(); x.fill();
    x.strokeStyle = C.ink2; x.lineWidth = 2; x.beginPath(); for (let i = 0; i <= W; i += 3) { const xx = sim.x + (i - 150) / 60; const yy = yRoad - road(xx) * scale; i ? x.lineTo(i, yy) : x.moveTo(i, yy); } x.stroke();
    const wx = 150, zr = road(sim.x), zu = sim.zu, zs = sim.zs;
    const wy = yRoad - 52 - zu * scale, by = 170 - zs * scale;
    // tyre / wheel
    const sq = Math.max(0, (zr - zu) * scale * 0.25);
    x.fillStyle = '#1b1d20'; x.beginPath(); x.ellipse(wx, wy, 50, 50 - sq, 0, 0, 2 * Math.PI); x.fill();
    x.fillStyle = '#8b939b'; x.beginPath(); x.arc(wx, wy, 26, 0, 2 * Math.PI); x.fill();
    const ang = -sim.x / 0.32; x.strokeStyle = '#444'; x.lineWidth = 3; for (let i = 0; i < 5; i++) { const a = ang + i * 2 * Math.PI / 5; x.beginPath(); x.moveTo(wx, wy); x.lineTo(wx + Math.cos(a) * 24, wy + Math.sin(a) * 24); x.stroke(); }
    // unsprung mass block (hub/knuckle) + labels
    x.fillStyle = C.s3 || '#7a4fd6'; x.fillRect(wx - 30, wy - 70, 60, 22);
    // spring + damper
    const top = by + 46, bot = wy - 70; x.strokeStyle = '#c81e1e'; x.lineWidth = 4; spring(wx - 22, top, bot, 14, 6, x);
    x.strokeStyle = C.sig; x.lineWidth = 10; x.beginPath(); x.moveTo(wx + 24, bot); x.lineTo(wx + 24, (top + bot) / 2 + 8); x.stroke();
    x.lineWidth = 4; x.beginPath(); x.moveTo(wx + 24, top); x.lineTo(wx + 24, (top + bot) / 2 - 10); x.stroke();
    // body
    x.fillStyle = C.acc; x.beginPath(); x.roundRect ? x.roundRect(wx - 110, by - 10, 220, 56, 12) : x.rect(wx - 110, by - 10, 220, 56); x.fill();
    x.fillStyle = C.panel; x.font = '700 15px ' + (cssv('--f-mono') || 'monospace'); x.textAlign = 'center';
    x.fillText('ms ' + Math.round(p.ms) + ' kg', wx, by + 24);
    // force arrow on tyre
    const fpct = (sim.ft || 0) / ((p.ms + p.mu) * g);
    x.fillStyle = fpct < 0.05 ? C.bad : C.ok; x.fillRect(wx - 6, yRoad + 6, 12, Math.min(48, 30 * fpct));
    // gauges on the right
    x.textAlign = 'left'; x.fillStyle = C.ink; x.font = '600 14px ' + (cssv('--f-mono') || 'monospace');
    const lines = [['zr', (zr * 1000).toFixed(0) + ' mm'], ['zu', (zu * 1000).toFixed(0) + ' mm'], ['zs', (zs * 1000).toFixed(0) + ' mm'], ['a', (sim.acc || 0).toFixed(2) + ' m/s²'], ['Fz', Math.round(fpct * 100) + ' %'], ['v', S.v + ' km/h']];
    lines.forEach((l, i) => { x.fillStyle = C.ink2; x.fillText(l[0], 290, 40 + i * 26); x.fillStyle = C.ink; x.fillText(l[1], 320, 40 + i * 26); });
    x.fillStyle = C.ink2; x.font = '600 12px ' + (cssv('--f-body') || 'sans-serif'); x.fillText('k ' + (p.k / 1000).toFixed(1) + ' N/mm', 300, 230); x.fillText('c ' + Math.round(p.c) + ' N·s/m', 300, 250); x.fillText('kt ' + Math.round(p.kt / 1000) + ' N/mm', 300, 270); x.fillText('mu ' + Math.round(p.mu) + ' kg', 300, 290);
    x.fillText(LX(['motion ×1 (to scale)', 'હલનચલન ×1 (માપસર)', 'गति ×1 (माप अनुसार)']), 290, 320);
  }
  function strip(id, key, unit, lo, hi, color) {
    const [c, x] = cx(id); if (!c) return; const C = col(), W = c.width, H = c.height, h = sim.hist;
    x.clearRect(0, 0, W, H); x.strokeStyle = C.line; x.lineWidth = 1;
    for (let i = 0; i <= 4; i++) { const y = H * i / 4; x.beginPath(); x.moveTo(0, y); x.lineTo(W, y); x.stroke(); }
    const Y = (v) => H - (v - lo) / (hi - lo) * H; x.strokeStyle = C.ink2; x.setLineDash([5, 5]); x.beginPath(); x.moveTo(0, Y(key === 'f' ? 100 : 0)); x.lineTo(W, Y(key === 'f' ? 100 : 0)); x.stroke(); x.setLineDash([]);
    x.strokeStyle = color; x.lineWidth = 2.2; x.beginPath();
    h.forEach((r, i) => { let v = key === 'a' ? r.a : key === 't' ? r.t * 1000 : r.f / ((P.ms + P.mu) * g) * 100; const xx = W - (h.length - 1 - i) * W / HN, yy = Y(Math.max(lo, Math.min(hi, v))); i ? x.lineTo(xx, yy) : x.moveTo(xx, yy); }); x.stroke();
    x.fillStyle = C.ink2; x.font = '600 11px monospace'; x.fillText(hi + unit, 4, 12); x.fillText(lo + unit, 4, H - 4);
    if (key === 't') { x.strokeStyle = C.bad; x.setLineDash([3, 4]); [P.trav * 1000, -P.trav * 1000].forEach((v) => { x.beginPath(); x.moveTo(0, Y(v)); x.lineTo(W, Y(v)); x.stroke(); }); x.setLineDash([]); }
  }
  function drawFrf() {
    const [c, x] = cx('dxFrf'); if (!c) return; const C = col(), W = c.width, H = c.height, L = 54, B = 34, T = 16, R = 16;
    x.clearRect(0, 0, W, H); const f0 = 0.5, f1 = 30, X = (f) => L + (W - L - R) * Math.log(f / f0) / Math.log(f1 / f0), ymax = 3.5, Y = (v) => H - B - (H - B - T) * Math.min(v, ymax) / ymax;
    x.strokeStyle = C.line; x.lineWidth = 1; x.fillStyle = C.ink2; x.font = '600 12px monospace';
    [0.5, 1, 2, 5, 10, 20, 30].forEach((f) => { x.beginPath(); x.moveTo(X(f), T); x.lineTo(X(f), H - B); x.stroke(); x.fillText(f + ' Hz', X(f) - 14, H - 12); });
    [0, 1, 2, 3].forEach((v) => { x.beginPath(); x.moveTo(L, Y(v)); x.lineTo(W - R, Y(v)); x.stroke(); x.fillText(String(v), L - 18, Y(v) + 4); });
    x.strokeStyle = C.ink2; x.setLineDash([4, 4]); x.beginPath(); x.moveTo(L, Y(1)); x.lineTo(W - R, Y(1)); x.stroke(); x.setLineDash([]);
    const curve = (p, key, color, dash, wd) => { x.strokeStyle = color; x.lineWidth = wd || 3; x.setLineDash(dash || []); x.beginPath(); for (let i = 0; i <= 300; i++) { const f = f0 * Math.pow(f1 / f0, i / 300); const r = frf(p, f)[key]; i ? x.lineTo(X(f), Y(r)) : x.moveTo(X(f), Y(r)); } x.stroke(); x.setLineDash([]); };
    if (S.ref) { curve(S.ref, 'body', C.ink2, [8, 6], 2); curve(S.ref, 'tyre', C.ink2, [2, 5], 2); }
    curve(P, 'tyre', C.sig, null, 2.5); curve(P, 'body', C.acc, null, 3.5);
    // current excitation frequency marker (road wavelength)
    const lam = S.road === 'wash' ? 0.9 : S.road === 'hump' ? 3.7 * 2 : S.road === 'pothole' ? 1.4 : 0; if (lam) { const fe = S.v / 3.6 / lam; if (fe > f0 && fe < f1) { x.strokeStyle = C.bad; x.lineWidth = 2; x.beginPath(); x.moveTo(X(fe), T); x.lineTo(X(fe), H - B); x.stroke(); x.fillStyle = C.bad; x.fillText(LX(['road input', 'રોડ ઇનપુટ', 'रोड इनपुट']) + ' ' + fe.toFixed(1) + ' Hz', Math.min(W - 190, X(fe) + 6), H - B - 10); } }
    x.font = '700 13px sans-serif'; x.fillStyle = C.acc; x.fillText('━ ' + LX(T_D.body), L + 10, T + 14); x.fillStyle = C.sig; x.fillText('━ ' + LX(T_D.tyre), L + 170, T + 14); if (S.ref) { x.fillStyle = C.ink2; x.fillText('┅ ' + LX(T_D.ref), L + 380, T + 14); }
  }
  function drawRoll() {
    const [c, x] = cx('dxRoll'); if (!c) return; const C = col(), W = c.width, H = c.height, b = P.base;
    const M = b.M + P.loadKg * 2, t = b.t, h = b.h * S.hcg, hr = b.hr * S.hrc, ay = S.ay * g;
    const Kspr = 2 * (P.k * (t / 2) * (t / 2)) * 2;             // both axles, wheel rate ≈ spring rate per corner
    const Ktot = Kspr + S.arb, arm = Math.max(0.01, h - hr);
    const denom = Ktot - M * g * arm; const phi = denom > 0 ? M * ay * arm / denom : Infinity;
    const grad = denom > 0 ? (M * g * arm / denom) * 180 / Math.PI : Infinity;
    const dF = M * ay * h / t; const inner = M * g / 2 - dF; const innerPct = inner / (M * g / 2) * 100;
    x.clearRect(0, 0, W, H); const cxp = W / 2, gy = H - 40, s = 150;
    x.strokeStyle = C.ink2; x.lineWidth = 2; x.beginPath(); x.moveTo(20, gy); x.lineTo(W - 20, gy); x.stroke();
    const tw = t / 2 * s;
    // wheels
    // body rotated about the roll centre (drawn first, the tyres stay in front)
    const rcY = gy - hr * s, ang = Math.min(Number.isFinite(phi) ? phi : 0.35, 0.35), wr = Math.round(0.32 * s);
    x.save(); x.translate(cxp, rcY); x.rotate(ang);
    const bw = tw + 12, bb = -(wr + 6 - hr * s), bt = -(2 * h * s - wr + 26);
    x.fillStyle = C.acc; x.globalAlpha = 0.92; x.beginPath();
    x.moveTo(-bw, bb); x.lineTo(-bw, bt + 46); x.lineTo(-bw * 0.62, bt); x.lineTo(bw * 0.62, bt); x.lineTo(bw, bt + 46); x.lineTo(bw, bb); x.closePath(); x.fill(); x.globalAlpha = 1;
    x.fillStyle = 'rgba(255,255,255,.55)'; x.fillRect(-bw * 0.55, bt + 8, bw * 1.1, 34);
    x.fillStyle = C.panel; x.beginPath(); x.arc(0, -(h - hr) * s, 7, 0, 2 * Math.PI); x.fill(); x.fillStyle = C.ink; x.font = '700 12px monospace'; x.fillText('CG', 10, -(h - hr) * s + 4);
    x.restore();
    x.fillStyle = '#1b1d20'; [-1, 1].forEach((sd) => { x.beginPath(); x.roundRect ? x.roundRect(cxp + sd * tw - 18, gy - 2 * wr, 36, 2 * wr, 8) : x.rect(cxp + sd * tw - 18, gy - 2 * wr, 36, 2 * wr); x.fill(); });
    x.fillStyle = C.sig; x.beginPath(); x.arc(cxp, rcY, 6, 0, 2 * Math.PI); x.fill(); x.fillStyle = C.ink2; x.font = '700 12px monospace'; x.fillText('RC', cxp + 9, rcY + 4);
    // arrows: lateral force and wheel loads
    x.strokeStyle = C.bad; x.fillStyle = C.bad; x.lineWidth = 3; const ax = cxp - 30, ayy = gy - h * s - 10, al = 30 + S.ay * 110;
    x.beginPath(); x.moveTo(ax, ayy); x.lineTo(ax - al, ayy); x.stroke(); x.beginPath(); x.moveTo(ax - al - 10, ayy); x.lineTo(ax - al, ayy - 6); x.lineTo(ax - al, ayy + 6); x.fill();
    x.font = '700 12px sans-serif'; x.fillText('m·ay', ax - al - 6, ayy - 10);
    const outer = M * g / 2 + dF; [[-1, outer], [1, inner]].forEach(([sd, F]) => { const len = Math.max(0, F) / (M * g / 2) * 40; x.fillStyle = F <= 0 ? C.bad : C.ok; x.fillRect(cxp + sd * tw - 6, gy + 4, 12, Math.min(36, len * 0.6)); });
    const tile = (lab, val, cls) => `<div class="dx-kpi ${cls || ''}"><small>${lab}</small><b>${val}</b></div>`;
    $('#dxRollK').innerHTML = tile(LX(T_D.rollAng), Number.isFinite(phi) ? (phi * 180 / Math.PI).toFixed(1) + '°' : '∞', phi * 180 / Math.PI > 5 ? 'bad' : phi * 180 / Math.PI > 3.5 ? 'warn' : 'ok') + tile(LX(T_D.rollGrad), Number.isFinite(grad) ? grad.toFixed(1) + ' °/g' : '∞', grad > 6 ? 'warn' : 'ok') +
      tile(LX(T_D.ltr), (dF / 1000).toFixed(1) + ' kN') + tile(LX(T_D.inner), Math.max(0, innerPct).toFixed(0) + ' %', innerPct < 5 ? 'bad' : innerPct < 30 ? 'warn' : 'ok') + (innerPct < 5 ? `<div class="dx-kpi bad wide"><b>${LX(T_D.lift)}</b></div>` : '');
  }
  function drawAl() {
    const [c, x] = cx('dxAl'); if (!c) return; const C = col(), W = c.width, H = c.height;
    x.clearRect(0, 0, W, H);
    // front view of a wheel (camber) at left, top view (toe) centre, side view (caster) right
    const panel = (px, title) => { x.fillStyle = C.ink2; x.font = '700 13px sans-serif'; x.textAlign = 'center'; x.fillText(title, px, 18); };
    // camber
    panel(95, LX(T_D.camber)); x.save(); x.translate(95, 170); x.rotate(-S.camber * Math.PI / 180 * 3); x.fillStyle = '#1b1d20'; x.fillRect(-22, -70, 44, 140); x.fillStyle = '#8b939b'; x.fillRect(-6, -40, 12, 80); x.restore();
    x.strokeStyle = C.ink2; x.setLineDash([4, 4]); x.beginPath(); x.moveTo(95, 80); x.lineTo(95, 260); x.stroke(); x.setLineDash([]);
    // toe (top view of both wheels)
    panel(280, LX(T_D.toe)); const ta = S.toe / 6 * 0.25;
    [[-1], [1]].forEach(([sd]) => { x.save(); x.translate(280 + sd * 55, 150); x.rotate(-sd * ta); x.fillStyle = '#1b1d20'; x.fillRect(-14, -45, 28, 90); x.restore(); });
    x.fillStyle = C.ink2; x.font = '600 11px sans-serif'; x.fillText('▲ ' + LX(['front', 'આગળ', 'आगे']), 280, 230);
    // caster (side view)
    panel(465, LX(T_D.caster)); x.strokeStyle = '#1b1d20'; x.lineWidth = 4; x.beginPath(); x.arc(465, 190, 55, 0, 2 * Math.PI); x.stroke();
    const ca = S.caster * Math.PI / 180 * 2.5; x.strokeStyle = C.sig; x.lineWidth = 5; x.beginPath(); x.moveTo(465 - Math.sin(ca) * 110, 190 - Math.cos(ca) * 110); x.lineTo(465 + Math.sin(ca) * 70, 190 + Math.cos(ca) * 70); x.stroke();
    x.strokeStyle = C.ink2; x.setLineDash([4, 4]); x.lineWidth = 1.5; x.beginPath(); x.moveTo(465, 70); x.lineTo(465, 260); x.stroke(); x.setLineDash([]);
    // tyre wear strip at the bottom
    const wear = [0, 0, 0, 0, 0]; if (S.camber < -1.5) { wear[0] += (-1.5 - S.camber) * 0.6; } if (S.camber > 0.5) { wear[4] += (S.camber - 0.5) * 0.6; }
    if (S.toe > 2.5) { wear[4] += (S.toe - 2.5) * 0.25; wear[3] += (S.toe - 2.5) * 0.15; } if (S.toe < -1) { wear[0] += (-1 - S.toe) * 0.25; wear[1] += (-1 - S.toe) * 0.15; }
    x.textAlign = 'left'; x.fillStyle = C.ink2; x.font = '600 11px sans-serif'; x.fillText(LX(['tyre tread wear (inner → outer)', 'ટાયર ઘસારો (અંદર → બહાર)', 'टायर घिसाव (अंदर → बाहर)']), 20, 282);
    wear.forEach((w, i) => { const v = Math.min(1, w); x.fillStyle = `rgb(${Math.round(60 + 190 * v)},${Math.round(160 - 120 * v)},${Math.round(80 - 40 * v)})`; x.fillRect(250 + i * 58, 270, 54, 16); });
    // verdict
    const spec = { camber: [-1.3, -0.3], caster: [3.5, 6.0], toe: [0, 2.0] }; const inS = (k) => S[k] >= spec[k][0] && S[k] <= spec[k][1];
    const msgs = [];
    if (S.camber < -1.5) msgs.push(['bad', LX(['Too much negative camber → inner-edge wear.', 'વધુ નેગેટિવ કેમ્બર → અંદરની કિનારી ઘસાય.', 'ज़्यादा नेगेटिव कैम्बर → अंदर का किनारा घिसे.'])]);
    if (S.camber > 0.5) msgs.push(['bad', LX(['Positive camber → outer-edge wear.', 'પોઝિટિવ કેમ્બર → બહારની કિનારી ઘસાય.', 'पॉज़िटिव कैम्बर → बाहर का किनारा घिसे.'])]);
    if (S.toe > 2.5) msgs.push(['bad', LX(['Too much toe-in → feathered tread, outer shoulders scrub.', 'વધુ ટો-ઇન → પીંછા જેવો ઘસારો, બહારની ધાર ઘસાય.', 'ज़्यादा टो-इन → पंख जैसा घिसाव, बाहरी किनारा घिसे.'])]);
    if (S.toe < -1) msgs.push(['bad', LX(['Toe-out → inner shoulders scrub, car feels nervous/wanders.', 'ટો-આઉટ → અંદરની ધાર ઘસાય, ગાડી ડગમગે.', 'टो-आउट → अंदर का किनारा घिसे, गाड़ी डगमगाए.'])]);
    if (S.caster < 2) msgs.push(['warn', LX(['Low caster → light steering, poor self-centring and straight-line stability.', 'ઓછું કેસ્ટર → હળવું સ્ટીયરિંગ, પોતાની મેળે સીધું ન થાય.', 'कम कैस्टर → हल्का स्टीयरिंग, अपने आप सीधा न हो.'])]);
    if (S.caster > 7) msgs.push(['warn', LX(['High caster → very stable but heavy steering.', 'વધુ કેસ્ટર → ખૂબ સ્થિર પણ ભારે સ્ટીયરિંગ.', 'ज़्यादा कैस्टर → बहुत स्थिर पर भारी स्टीयरिंग.'])]);
    if (Math.abs(S.xcast) > 0.5) msgs.push(['bad', LX(['Caster differs side to side → car pulls to the side with LESS caster (' + (S.xcast > 0 ? 'right' : 'left') + ').', 'બંને બાજુ કેસ્ટર અલગ → ગાડી ઓછા કેસ્ટરવાળી બાજુ ખેંચાય (' + (S.xcast > 0 ? 'જમણે' : 'ડાબે') + ').', 'दोनों ओर कैस्टर अलग → गाड़ी कम कैस्टर वाली ओर खिंचे (' + (S.xcast > 0 ? 'दाएँ' : 'बाएँ') + ').'])]);
    if (!msgs.length) msgs.push(['ok', LX(['All angles inside spec — even tread wear, straight running, good self-centring.', 'બધા ખૂણા સ્પેકમાં — સરખો ઘસારો, સીધી ચાલ, સારું સેલ્ફ-સેન્ટરિંગ.', 'सभी कोण स्पेक में — एकसमान घिसाव, सीधी चाल, अच्छा सेल्फ-सेंटरिंग.'])]);
    $('#dxAlV').innerHTML = ['camber', 'caster', 'toe'].map((k) => `<span class="dx-pill ${inS(k) ? 'ok' : 'bad'}">${LX(T_D[k])}: ${inS(k) ? '✓' : '✗'} <small>${spec[k][0]}…${spec[k][1]}${k === 'toe' ? ' mm' : '°'}</small></span>`).join('') + msgs.map((m) => `<p class="dx-msg ${m[0]}">${m[1]}</p>`).join('');
  }
  function drawDyno() {
    const [c, x] = cx('dxDyno'); if (!c) return; const C = col(), W = c.width, H = c.height, L = 56, B = 34, T = 16, R = 12;
    const cN = (QC_PRESET[S.sys] || QC_PRESET.macpherson).c * 1.0; const vmax = 1.0, fmax = cN * 0.9;
    const X = (v) => L + (W - L - R) * (v + vmax) / (2 * vmax), Y = (f) => T + (H - B - T) * (1 - (f + fmax) / (2 * fmax));
    x.clearRect(0, 0, W, H); x.strokeStyle = C.line; x.lineWidth = 1; x.fillStyle = C.ink2; x.font = '600 11px monospace';
    [-1, -0.5, 0, 0.5, 1].forEach((v) => { x.beginPath(); x.moveTo(X(v), T); x.lineTo(X(v), H - B); x.stroke(); x.fillText(v.toFixed(1), X(v) - 10, H - 18); });
    [-1, -0.5, 0, 0.5, 1].forEach((k) => { const f = k * fmax; x.beginPath(); x.moveTo(L, Y(f)); x.lineTo(W - R, Y(f)); x.stroke(); x.fillText(Math.round(f), 4, Y(f) + 4); });
    const worn = (v, h) => { const lowLoss = 1 - (1 - h) * 1.0, highLoss = 1 - (1 - h) * 0.45; const a = Math.abs(v); const w = a < 0.15 ? lowLoss : lowLoss + (highLoss - lowLoss) * Math.min(1, (a - 0.15) / 0.5); return w; };
    const curve = (h, color, dash) => { x.strokeStyle = color; x.lineWidth = 3; x.setLineDash(dash || []); x.beginPath(); for (let i = 0; i <= 200; i++) { const v = -vmax + 2 * vmax * i / 200; const f = damp(v, cN) * worn(v, h); i ? x.lineTo(X(v), Y(f)) : x.moveTo(X(v), Y(f)); } x.stroke(); x.setLineDash([]); };
    curve(1, C.ink2, [7, 5]); curve(S.dynoH, C.acc);
    x.fillStyle = C.ink2; x.font = '700 12px sans-serif'; x.fillText(LX(T_D.reb) + ' →', X(0.45), Y(fmax * 0.8)); x.fillText('← ' + LX(T_D.bump), X(-0.9), Y(-fmax * 0.55));
    x.fillText(LX(T_D.vel), W / 2 - 60, H - 2); x.save(); x.translate(12, H / 2 + 30); x.rotate(-Math.PI / 2); x.fillText(LX(T_D.frc), 0, 0); x.restore();
    x.fillStyle = C.acc; x.fillText('━ ' + LX(T_D.curD), L + 8, T + 14); x.fillStyle = C.ink2; x.fillText('┅ ' + LX(T_D.newD), L + 140, T + 14);
    const f02 = damp(0.2, cN) * worn(0.2, S.dynoH), f02n = damp(0.2, cN);
    const tile = (lab, val, cls) => `<div class="dx-kpi ${cls || ''}"><small>${lab}</small><b>${val}</b></div>`;
    $('#dxDynoK').innerHTML = tile(LX(['Rebound force @ 0.2 m/s', 'રીબાઉન્ડ બળ @ 0.2 m/s', 'रिबाउंड बल @ 0.2 m/s']), Math.round(f02) + ' N', f02 / f02n < 0.6 ? 'bad' : f02 / f02n < 0.8 ? 'warn' : 'ok') + tile(LX(['vs new', 'નવા સામે', 'नए की तुलना']), Math.round(f02 / f02n * 100) + ' %', f02 / f02n < 0.6 ? 'bad' : 'ok') + tile(LX(['Rebound : bump', 'રીબાઉન્ડ : બમ્પ', 'रिबाउंड : बम्प']), '1.9 : 1');
  }
  function drawStatic() { if (!S.built) return; drawFrf(); drawRoll(); drawAl(); drawDyno(); kpis(); if (!S.run) drawLive(); }
  function drawLive() { drawAnim(); const C = col(); strip('dxCA', 'a', ' ', -6, 6, C.acc); strip('dxCT', 't', '', -120, 120, C.sig); strip('dxCF', 'f', '%', 0, 220, C.ok || '#188a48'); }

  /* ── loop (only while the dashboard is on screen) ── */
  let last = 0, acc10 = 0, visible = false, kt = 0;
  function loop(now) {
    if (!visible) return;
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now;
    if (S.run) {
      const n = Math.round(dt / 0.001);
      for (let i = 0; i < n; i++) { step(0.001); acc10 += 0.001; if (acc10 >= 0.01) { acc10 = 0; sim.hist.push({ a: sim.acc, t: sim.zs - sim.zu, f: sim.ft }); if (sim.hist.length > HN) sim.hist.shift(); } }
      drawLive(); if ((kt += dt) > 0.25) { kt = 0; kpis(); }
    }
    requestAnimationFrame(loop);
  }
  function show(on) { visible = on; if (on) { if (!S.built) build(); last = 0; requestAnimationFrame(loop); drawStatic(); } }
  function render() { const was = S.built; S.built = false; if (was || visible) { build(); } }
  return { show, render, setSys, S, sim, params };
})();
window.Dash = Dash;
