/* Suspension Lab — detailed component diagrams (own drawings), numbered parts, labels in EN / GU / HI.
   Shown under the 3D model in the Diagram tab. */
'use strict';

const DG_LBL = {
  upper_mount: ['Upper mount', 'ઉપરનું માઉન્ટ', 'ऊपरी माउंट'],
  lower_mount: ['Lower mount (eye)', 'નીચેનું માઉન્ટ (આંખ)', 'निचला माउंट (आँख)'],
  rod: ['Piston rod', 'પિસ્ટન રૉડ', 'पिस्टन रॉड'],
  dust_tube: ['Dust tube (cover)', 'ડસ્ટ ટ્યુબ (કવર)', 'डस्ट ट्यूब (कवर)'],
  reservoir: ['Reservoir (outer) tube', 'રિઝર્વોયર (બહારની) ટ્યુબ', 'रिज़र्वॉयर (बाहरी) ट्यूब'],
  pressure_tube: ['Pressure tube (inner cylinder)', 'પ્રેશર ટ્યુબ (અંદરનો સિલિન્ડર)', 'प्रेशर ट्यूब (अंदर का सिलेंडर)'],
  seal: ['Rod seal and guide', 'રૉડ સીલ અને ગાઇડ', 'रॉड सील और गाइड'],
  oil: ['Shock oil', 'શૉક ઑઇલ', 'शॉक ऑयल'],
  gas: ['Nitrogen gas', 'નાઇટ્રોજન ગૅસ', 'नाइट्रोजन गैस'],
  piston: ['Piston with valves', 'વાલ્વવાળો પિસ્ટન', 'वाल्व वाला पिस्टन'],
  base_valve: ['Base (compression) valve', 'બેઝ (કૉમ્પ્રેશન) વાલ્વ', 'बेस (कंप्रेशन) वाल्व'],
  float_piston: ['Floating piston (divider)', 'ફ્લોટિંગ પિસ્ટન (પડદો)', 'फ्लोटिंग पिस्टन (पर्दा)'],
  hp_gas: ['High-pressure gas chamber', 'વધુ દબાણવાળો ગૅસ ચેમ્બર', 'ज़्यादा दबाव वाला गैस चैंबर'],
  rod_nut: ['Rod nut', 'રૉડ નટ', 'रॉड नट'],
  top_mount: ['Top mount (strut retainer)', 'ટોપ માઉન્ટ', 'टॉप माउंट'],
  bearing: ['Ball bearing', 'બૉલ બેરિંગ', 'बॉल बेयरिंग'],
  upper_seat: ['Upper spring seat and rubber isolator', 'ઉપરની સ્પ્રિંગ સીટ અને રબર', 'ऊपरी स्प्रिंग सीट और रबर'],
  bump: ['Rubber bumper (bump stop)', 'રબર બમ્પર (બમ્પ સ્ટોપ)', 'रबर बम्पर (बम्प स्टॉप)'],
  boot: ['Dust boot', 'ડસ્ટ બૂટ', 'डस्ट बूट'],
  coil: ['Coil spring', 'કોઇલ સ્પ્રિંગ', 'कॉइल स्प्रिंग'],
  lower_seat: ['Lower spring seat', 'નીચેની સ્પ્રિંગ સીટ', 'निचली स्प्रिंग सीट'],
  strut_body: ['Strut (shock absorber) body', 'સ્ટ્રટ (શૉક એબ્ઝોર્બર) બૉડી', 'स्ट्रट (शॉक एब्ज़ॉर्बर) बॉडी'],
  knuckle: ['Steering knuckle', 'સ્ટીયરિંગ નકલ', 'स्टीयरिंग नकल'],
  spindle: ['Spindle / wheel-bearing bore', 'સ્પિન્ડલ / વ્હીલ બેરિંગની જગ્યા', 'स्पिंडल / व्हील बेयरिंग की जगह'],
  arm: ['Control arm', 'કંટ્રોલ આર્મ', 'कंट्रोल आर्म'],
  bush: ['Control-arm rubber bush', 'કંટ્રોલ આર્મનું રબર બુશ', 'कंट्रोल आर्म का रबर बुश'],
  bolt: ['Pivot bolt, washer and nut', 'પિવોટ બોલ્ટ, વૉશર અને નટ', 'पिवट बोल्ट, वॉशर और नट'],
  bj: ['Ball joint', 'બૉલ જોઇન્ટ', 'बॉल जॉइंट'],
  bj_seal: ['Seal (rubber boot)', 'સીલ (રબર બૂટ)', 'सील (रबर बूट)'],
  bj_nut: ['Castle nut and split pin', 'કૅસલ નટ અને સ્પ્લિટ પિન', 'कैसल नट और स्प्लिट पिन'],
  outer_shell: ['Outer metal sleeve', 'બહારની ધાતુની સ્લીવ', 'बाहरी धातु स्लीव'],
  rubber: ['Rubber', 'રબર', 'रबर'],
  inner_shell: ['Inner metal sleeve', 'અંદરની ધાતુની સ્લીવ', 'अंदर की धातु स्लीव'],
  pivot: ['Pivot bolt', 'પિવોટ બોલ્ટ', 'पिवट बोल्ट'],
  housing: ['Housing (socket)', 'હાઉસિંગ (સૉકેટ)', 'हाउसिंग (सॉकेट)'],
  ball_stud: ['Ball stud (taper)', 'બૉલ સ્ટડ (ટેપર)', 'बॉल स्टड (टेपर)'],
  bj_bearing: ['Plastic bearing', 'પ્લાસ્ટિક બેરિંગ', 'प्लास्टिक बेयरिंग'],
  grease: ['Grease nipple', 'ગ્રીસ નિપલ', 'ग्रीस निपल'],
  wear: ['Wear happens here', 'અહીં ઘસારો થાય છે', 'यहाँ घिसाव होता है'],
  frame: ['Frame (body structure)', 'ફ્રેમ (બૉડીનું માળખું)', 'फ्रेम (बॉडी का ढाँचा)'],
  shock: ['Shock absorber', 'શૉક એબ્ઝોર્બર', 'शॉक एब्ज़ॉर्बर'],
  tyre: ['Tyre', 'ટાયર', 'टायर'],
  axle: ['Axle housing', 'એક્સલ હાઉસિંગ', 'एक्सल हाउसिंग'],
  diff: ['Differential', 'ડિફરન્શિયલ', 'डिफरेंशियल'],
  panhard: ['Center link (Panhard rod)', 'સેન્ટર લિંક (પેનહાર્ડ રૉડ)', 'सेंटर लिंक (पैनहार्ड रॉड)'],
  trailing: ['Trailing arm (goes forward)', 'ટ્રેલિંગ આર્મ (આગળ જાય છે)', 'ट्रेलिंग आर्म (आगे जाता है)'],
  arb: ['Stabilizer (anti-roll) bar', 'સ્ટેબિલાઇઝર (એન્ટી-રોલ) બાર', 'स्टेबलाइज़र (एंटी-रोल) बार'],
  strut_rod: ['Strut (tension) rod', 'સ્ટ્રટ રૉડ (ટેન્શન રૉડ)', 'स्ट्रट रॉड (टेंशन रॉड)'],
  rod_bush: ['Strut-rod rubber bushes', 'સ્ટ્રટ રૉડના રબર બુશ', 'स्ट्रट रॉड के रबर बुश'],
  frame_bracket: ['Frame bracket', 'ફ્રેમ બ્રેકેટ', 'फ्रेम ब्रैकेट'],
  wheel: ['Wheel', 'વ્હીલ', 'पहिया']
};

/* numbered marker: leader from badge (tx, ty) to the part (x, y) */
const DGM = (n, x, y, tx, ty) => `<g class="dg-m" data-n="${n}"><path class="dg-lead" d="M${tx} ${ty} L${x} ${y}"/><circle class="dg-dot" cx="${x}" cy="${y}" r="3"/><circle class="dg-badge" cx="${tx}" cy="${ty}" r="11"/><text class="dg-bt" x="${tx}" y="${ty + 4}">${n}</text></g>`;
/* side-view coil spring between y0 and y1, half-width w, n coils */
const DGZ = (x, y0, y1, w, n) => { let d = `M${x} ${y0}`; const s = (y1 - y0) / (n * 2); for (let i = 1; i < n * 2; i++) d += ` L${x + (i % 2 ? w : -w)} ${y0 + s * i}`; return d + ` L${x} ${y1}`; };

const DIAGRAMS = [
  {
    id: 'twin', anim: 'stroke',
    t: ['Twin-tube shock absorber — inside', 'ટ્વિન-ટ્યુબ શૉક એબ્ઝોર્બર — અંદરથી', 'ट्विन-ट्यूब शॉक एब्ज़ॉर्बर — अंदर से'],
    c: ['Compression: the rod goes in and pushes oil up through the piston valves and down through the base valve into the outer tube. Extension: the rod comes out and the oil flows back. Pushing oil through small holes slows the spring.',
      'કૉમ્પ્રેશન: રૉડ અંદર જાય છે અને ઑઇલને પિસ્ટનના વાલ્વમાંથી ઉપર અને બેઝ વાલ્વમાંથી નીચે બહારની ટ્યુબમાં ધકેલે છે. એક્સટેન્શન: રૉડ બહાર આવે છે અને ઑઇલ પાછું વહે છે. નાના છિદ્રોમાંથી ઑઇલ ધકેલાવાથી સ્પ્રિંગ ધીમી પડે છે.',
      'कंप्रेशन: रॉड अंदर जाता है और तेल को पिस्टन के वाल्व से ऊपर और बेस वाल्व से नीचे बाहरी ट्यूब में धकेलता है. एक्सटेंशन: रॉड बाहर आता है और तेल वापस बहता है. छोटे छेदों से तेल धकेलने से स्प्रिंग धीमी होती है.'],
    l: ['upper_mount', 'dust_tube', 'rod', 'seal', 'gas', 'reservoir', 'pressure_tube', 'oil', 'piston', 'base_valve', 'lower_mount'],
    svg: () => `<svg viewBox="0 0 300 480" class="dg-svg">
      <rect x="108" y="168" width="84" height="252" rx="6" class="dg-metal-o"/>
      <rect x="111" y="176" width="11" height="58" class="dg-gas"/><rect x="178" y="176" width="11" height="58" class="dg-gas"/>
      <rect x="111" y="234" width="11" height="182" class="dg-oil"/><rect x="178" y="234" width="11" height="182" class="dg-oil"/>
      <rect x="122" y="176" width="56" height="236" class="dg-oil2"/><rect x="122" y="176" width="56" height="236" class="dg-tube"/>
      <rect x="108" y="160" width="84" height="16" rx="3" class="dg-dark"/>
      <rect x="122" y="402" width="56" height="10" class="dg-brass"/>
      <path d="M108 420 h84 v6 q-42 18 -84 0 z" class="dg-metal"/><circle cx="150" cy="452" r="17" class="dg-ring"/>
      <g class="dg-flow-c"><path d="M138 336 V300 M134 306 l4 -8 4 8 M162 336 V300 M158 306 l4 -8 4 8" class="dg-arrow"/><path d="M150 396 V418 H118 V398 M114 404 l4 -7 4 7" class="dg-arrow"/></g>
      <g class="dg-flow-e"><path d="M138 296 V332 M134 326 l4 8 4 -8 M162 296 V332 M158 326 l4 8 4 -8" class="dg-arrow"/><path d="M118 398 V418 H150 V396 M146 402 l4 -7 4 7" class="dg-arrow"/></g>
      <g class="dg-move">
        <circle cx="150" cy="30" r="17" class="dg-ring"/>
        <rect x="144" y="46" width="12" height="268" class="dg-chrome"/>
        <path d="M110 58 h80 v148 M110 58 v148" class="dg-dust"/>
        <rect x="122" y="306" width="56" height="14" class="dg-brass"/><circle cx="134" cy="313" r="2.5" class="dg-hole"/><circle cx="150" cy="313" r="2.5" class="dg-hole"/><circle cx="166" cy="313" r="2.5" class="dg-hole"/>
      </g>
      ${DGM(1, 150, 22, 40, 26)}${DGM(2, 111, 110, 40, 104)}${DGM(3, 150, 250, 262, 250)}${DGM(4, 110, 168, 40, 166)}${DGM(5, 116, 205, 40, 212)}
      ${DGM(6, 186, 360, 262, 360)}${DGM(7, 124, 360, 40, 360)}${DGM(8, 170, 280, 262, 286)}${DGM(9, 176, 313, 262, 320)}${DGM(10, 176, 407, 262, 404)}${DGM(11, 150, 452, 40, 452)}
    </svg>`
  },
  {
    id: 'mono', anim: 'mono',
    t: ['Gas (monotube) shock absorber', 'ગૅસ (મોનોટ્યુબ) શૉક એબ્ઝોર્બર', 'गैस (मोनोट्यूब) शॉक एब्ज़ॉर्बर'],
    c: ['Only one tube. A floating piston keeps the oil apart from high-pressure nitrogen gas. The gas stops air bubbles (foaming) in the oil, so the shock works the same even on long rough roads.',
      'ફક્ત એક જ ટ્યુબ. ફ્લોટિંગ પિસ્ટન ઑઇલને વધુ દબાણવાળા નાઇટ્રોજન ગૅસથી અલગ રાખે છે. ગૅસને લીધે ઑઇલમાં હવાના પરપોટા (ફીણ) થતા નથી, તેથી લાંબા ખરાબ રસ્તે પણ શૉક સરખું કામ કરે છે.',
      'सिर्फ़ एक ट्यूब. फ्लोटिंग पिस्टन तेल को ज़्यादा दबाव वाली नाइट्रोजन गैस से अलग रखता है. गैस के कारण तेल में हवा के बुलबुले (झाग) नहीं बनते, इसलिए लंबे खराब रास्ते पर भी शॉक एक जैसा काम करता है.'],
    l: ['upper_mount', 'rod', 'seal', 'oil', 'piston', 'float_piston', 'hp_gas', 'lower_mount'],
    svg: () => `<svg viewBox="0 0 300 480" class="dg-svg">
      <rect x="114" y="156" width="72" height="190" class="dg-oil2"/>
      <g class="dg-gasbox"><rect x="114" y="346" width="72" height="72" class="dg-gas"/></g>
      <g class="dg-float"><rect x="116" y="336" width="68" height="10" rx="2" class="dg-dark"/></g>
      <rect x="112" y="152" width="76" height="268" rx="5" class="dg-metal-o"/>
      <rect x="112" y="144" width="76" height="14" rx="3" class="dg-dark"/>
      <path d="M112 420 h76 v6 q-38 16 -76 0 z" class="dg-metal"/><circle cx="150" cy="452" r="17" class="dg-ring"/>
      <g class="dg-move">
        <circle cx="150" cy="30" r="17" class="dg-ring"/>
        <rect x="144" y="46" width="12" height="214" class="dg-chrome"/>
        <rect x="116" y="252" width="68" height="14" class="dg-brass"/><circle cx="132" cy="259" r="2.5" class="dg-hole"/><circle cx="168" cy="259" r="2.5" class="dg-hole"/>
      </g>
      ${DGM(1, 150, 22, 40, 26)}${DGM(2, 150, 110, 262, 110)}${DGM(3, 188, 150, 262, 150)}${DGM(4, 126, 210, 40, 210)}
      ${DGM(5, 182, 259, 262, 262)}${DGM(6, 182, 341, 262, 340)}${DGM(7, 126, 384, 40, 384)}${DGM(8, 150, 452, 40, 452)}
    </svg>`
  },
  {
    id: 'strut', anim: 'explode',
    t: ['Strut assembly — all parts', 'સ્ટ્રટ એસેમ્બલી — બધા ભાગ', 'स्ट्रट असेंबली — सभी पार्ट'],
    c: ['A strut is a shock absorber, coil spring and top mount in one unit. It also does the job of an upper control arm. Never open it without a spring compressor.',
      'સ્ટ્રટ એટલે શૉક એબ્ઝોર્બર, કોઇલ સ્પ્રિંગ અને ટોપ માઉન્ટ એક જ યુનિટમાં. તે અપર કંટ્રોલ આર્મનું કામ પણ કરે છે. સ્પ્રિંગ કૉમ્પ્રેસર વગર ક્યારેય ન ખોલો.',
      'स्ट्रट यानी शॉक एब्ज़ॉर्बर, कॉइल स्प्रिंग और टॉप माउंट एक ही यूनिट में. यह अपर कंट्रोल आर्म का काम भी करता है. स्प्रिंग कंप्रेसर के बिना कभी न खोलें.'],
    l: ['rod_nut', 'top_mount', 'bearing', 'upper_seat', 'bump', 'boot', 'coil', 'lower_seat', 'strut_body', 'knuckle', 'spindle'],
    svg: () => `<svg viewBox="0 0 300 580" class="dg-svg">
      <g class="dg-ex" style="--k:-6"><path d="M141 18 h18 l4 7 -4 7 h-18 l-4 -7 z" class="dg-metal"/></g>
      <g class="dg-ex" style="--k:-5"><rect x="102" y="50" width="96" height="22" rx="9" class="dg-dark"/><rect x="118" y="40" width="5" height="12" class="dg-metal"/><rect x="177" y="40" width="5" height="12" class="dg-metal"/><rect x="146" y="40" width="8" height="10" class="dg-metal"/></g>
      <g class="dg-ex" style="--k:-4"><rect x="114" y="88" width="72" height="12" rx="5" class="dg-metal-o"/>${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${122 + i * 11.2}" cy="94" r="3.4" class="dg-ball"/>`).join('')}</g>
      <g class="dg-ex" style="--k:-3"><path d="M94 116 q56 18 112 0 v8 q-56 18 -112 0 z" class="dg-rubber"/></g>
      <g class="dg-ex" style="--k:-2"><path d="M138 146 h24 v6 h-3 v6 h3 v6 h-3 v6 h3 v6 h-24 v-6 h3 v-6 h-3 v-6 h3 v-6 h-3 z" class="dg-pu"/></g>
      <g class="dg-ex" style="--k:-1"><path d="M130 196 h40 ${[0, 1, 2, 3, 4, 5].map(() => 'l4 5 l-4 5').join(' ')} h-40 ${[0, 1, 2, 3, 4, 5].map(() => 'l-4 -5 l4 -5').join(' ')} z" class="dg-rubber"/></g>
      <g class="dg-ex" style="--k:0"><path d="${DGZ(150, 270, 396, 54, 7)}" class="dg-spring"/></g>
      <g class="dg-ex" style="--k:1">
        <rect x="146" y="390" width="8" height="40" class="dg-chrome"/>
        <path d="M94 412 q56 14 112 0 v6 q-56 14 -112 0 z" class="dg-metal"/>
        <rect x="128" y="428" width="44" height="104" rx="4" class="dg-blue"/>
      </g>
      <g class="dg-ex" style="--k:2"><path d="M168 488 h52 l14 24 -10 40 h-30 l-8 -22 h-18 z" class="dg-knuckle"/><circle cx="212" cy="520" r="11" class="dg-bore"/></g>
      ${DGM(1, 141, 25, 40, 25)}${DGM(2, 102, 62, 40, 62)}${DGM(3, 186, 94, 262, 94)}${DGM(4, 96, 120, 40, 120)}${DGM(5, 162, 160, 262, 158)}
      ${DGM(6, 130, 225, 40, 225)}${DGM(7, 204, 330, 262, 330)}${DGM(8, 96, 416, 40, 416)}${DGM(9, 128, 480, 40, 480)}${DGM(10, 230, 506, 268, 486)}${DGM(11, 212, 520, 268, 548)}
    </svg>`
  },
  {
    id: 'arm', anim: 'explode',
    t: ['Control arm — parts', 'કંટ્રોલ આર્મ — ભાગ', 'कंट्रोल आर्म — पार्ट'],
    c: ['Rubber bushes at the inner end let the arm swing up and down on the body. The ball joint at the outer end holds the knuckle and lets it move up-down and steer.',
      'અંદરના છેડે રબર બુશ હોય છે, જેથી આર્મ બૉડી પર ઉપર-નીચે ઝૂલી શકે. બહારના છેડે બૉલ જોઇન્ટ નકલને પકડે છે અને તેને ઉપર-નીચે થવા તથા સ્ટીયરિંગ ફરવા દે છે.',
      'अंदर वाले सिरे पर रबर बुश होते हैं, जिससे आर्म बॉडी पर ऊपर-नीचे झूल सके. बाहरी सिरे पर बॉल जॉइंट नकल को पकड़ता है और उसे ऊपर-नीचे होने तथा स्टीयरिंग घूमने देता है.'],
    l: ['arm', 'bush', 'bolt', 'bj', 'bj_seal', 'bj_nut', 'knuckle', 'spindle'],
    svg: () => `<svg viewBox="0 0 420 300" class="dg-svg">
      <path d="M70 70 L282 142 M70 222 L282 142" class="dg-armbar"/>
      <circle cx="70" cy="70" r="17" class="dg-arm"/><circle cx="70" cy="70" r="9" class="dg-bore"/>
      <circle cx="70" cy="222" r="17" class="dg-arm"/><circle cx="70" cy="222" r="9" class="dg-bore"/><circle cx="282" cy="142" r="16" class="dg-arm"/>
      <g class="dg-ex dg-exx" style="--k:-3"><rect x="22" y="60" width="18" height="20" rx="5" class="dg-pu2"/><rect x="22" y="212" width="18" height="20" rx="5" class="dg-pu2"/></g>
      <g class="dg-ex dg-exx" style="--k:-6"><path d="M-2 70 h-6 M-8 64 v12 M-2 70 h-16" class="dg-boltl"/><rect x="2" y="62" width="4" height="16" class="dg-metal"/><rect x="2" y="214" width="4" height="16" class="dg-metal"/><path d="M-2 222 h-16 M-8 216 v12" class="dg-boltl"/></g>
      <g class="dg-ex" style="--k:2"><circle cx="282" cy="176" r="12" class="dg-green"/><path d="M278 188 h8 l-1 18 h-6 z" class="dg-metal"/></g>
      <g class="dg-ex" style="--k:4"><path d="M270 214 q12 -8 24 0 l4 14 h-32 z" class="dg-rubber"/></g>
      <g class="dg-ex" style="--k:6"><path d="M275 244 h14 l3 6 -3 6 h-14 l-3 -6 z" class="dg-metal"/></g>
      <g class="dg-ex dg-exx" style="--k:3"><path d="M330 60 h40 l20 50 -10 120 h-26 l-10 -60 h-14 z" class="dg-knuckle"/><circle cx="366" cy="128" r="16" class="dg-bore"/></g>
      ${DGM(1, 176, 106, 176, 40)}${DGM(2, 31, 70, 31, 30)}${DGM(3, 4, 222, 10, 268)}${DGM(4, 282, 176, 236, 196)}${DGM(5, 282, 220, 236, 236)}${DGM(6, 282, 250, 236, 272)}${DGM(7, 350, 200, 400, 262)}${DGM(8, 366, 128, 404, 40)}
    </svg>`
  },
  {
    id: 'bush', anim: 'twist',
    t: ['Rubber bush — how it works', 'રબર બુશ — કેવી રીતે કામ કરે છે', 'रबर बुश — कैसे काम करता है'],
    c: ['The outer sleeve is pressed into the arm and the inner sleeve is clamped by the pivot bolt. When the arm swings, the rubber twists. No grease is needed and there is no metal-to-metal noise. Torn rubber gives knocking and wandering.',
      'બહારની સ્લીવ આર્મમાં પ્રેસ થાય છે અને અંદરની સ્લીવ પિવોટ બોલ્ટથી કસાય છે. આર્મ ઝૂલે ત્યારે રબર વળ ખાય છે. ગ્રીસની જરૂર નથી અને ધાતુ-ધાતુ ઘસાવાનો અવાજ નથી. રબર ફાટે તો ખટખટ અવાજ અને સ્ટીયરિંગ ડગમગે છે.',
      'बाहरी स्लीव आर्म में प्रेस होती है और अंदर की स्लीव पिवट बोल्ट से कसी जाती है. आर्म झूलने पर रबर मरोड़ खाता है. ग्रीस की ज़रूरत नहीं और धातु-धातु घिसने की आवाज़ नहीं. रबर फटे तो खटखट आवाज़ और स्टीयरिंग डगमगाता है.'],
    l: ['outer_shell', 'rubber', 'inner_shell', 'pivot'],
    svg: () => `<svg viewBox="0 0 380 240" class="dg-svg">
      <circle cx="110" cy="120" r="76" class="dg-metal"/><circle cx="110" cy="120" r="68" class="dg-rubber"/>
      <g class="dg-spokes">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<path d="M${110 + 28 * Math.cos(a * Math.PI / 180)} ${120 + 28 * Math.sin(a * Math.PI / 180)} L${110 + 66 * Math.cos(a * Math.PI / 180)} ${120 + 66 * Math.sin(a * Math.PI / 180)}" class="dg-spoke"/>`).join('')}</g>
      <g class="dg-inner"><circle cx="110" cy="120" r="26" class="dg-metal"/><circle cx="110" cy="120" r="14" class="dg-dark"/><path d="M110 106 V96" class="dg-mark"/></g>
      <rect x="236" y="44" width="110" height="16" class="dg-metal"/><rect x="236" y="180" width="110" height="16" class="dg-metal"/>
      <rect x="236" y="60" width="110" height="38" class="dg-rubber"/><rect x="236" y="142" width="110" height="38" class="dg-rubber"/>
      <rect x="230" y="98" width="122" height="14" class="dg-metal"/><rect x="230" y="128" width="122" height="14" class="dg-metal"/><rect x="222" y="112" width="138" height="16" class="dg-dark"/>
      <path d="M232 36 v8 h-8 v152 h8 v8" class="dg-metal-o"/>
      ${DGM(1, 110, 46, 40, 24)}${DGM(2, 160, 160, 196, 214)}${DGM(3, 128, 128, 196, 120)}${DGM(4, 110, 120, 40, 214)}
    </svg>`
  },
  {
    id: 'bj', anim: 'swing',
    t: ['Ball joint — inside', 'બૉલ જોઇન્ટ — અંદરથી', 'बॉल जॉइंट — अंदर से'],
    c: ['A ball in a socket, like a shoulder joint. It lets the knuckle move up and down and turn for steering. Grease and the rubber boot keep it alive. A torn boot lets dirt and water in; the joint then wears, knocks and can come apart.',
      'ખભાના સાંધા જેવો સૉકેટમાં બૉલ. તે નકલને ઉપર-નીચે થવા અને સ્ટીયરિંગ માટે ફરવા દે છે. ગ્રીસ અને રબર બૂટ તેને સાચવે છે. બૂટ ફાટે તો ધૂળ અને પાણી અંદર જાય છે; પછી જોઇન્ટ ઘસાય છે, ખટખટ અવાજ આવે છે અને છૂટો પણ પડી શકે છે.',
      'कंधे के जोड़ जैसा सॉकेट में बॉल. यह नकल को ऊपर-नीचे होने और स्टीयरिंग के लिए घूमने देता है. ग्रीस और रबर बूट इसे बचाते हैं. बूट फटे तो धूल और पानी अंदर जाता है; फिर जॉइंट घिसता है, खटखट आवाज़ आती है और अलग भी हो सकता है.'],
    l: ['housing', 'bj_bearing', 'ball_stud', 'grease', 'bj_seal', 'bj_nut', 'wear'],
    svg: () => `<svg viewBox="0 0 300 320" class="dg-svg">
      <rect x="146" y="28" width="8" height="16" class="dg-brass"/><path d="M142 26 h16 v4 h-16 z" class="dg-brass"/>
      <g class="dg-stud">
        <path d="M150 150 L160 236 h-20 z" class="dg-chrome"/>
        <path d="M141 240 h18 M141 248 h18 M141 256 h18" class="dg-thread"/>
        <path d="M138 262 h24 l4 8 -4 8 h-24 l-4 -8 z" class="dg-metal"/>
        <path d="M118 150 q32 50 64 0 l6 30 q-38 26 -76 0 z" class="dg-rubber"/>
        <circle cx="150" cy="110" r="34" class="dg-ball"/>
      </g>
      <path d="M108 66 q42 -26 84 0 v62 h-10 v-56 q-32 -18 -64 0 v56 h-10 z" class="dg-metal"/>
      <path d="M118 74 q32 -18 64 0 v10 q-32 -16 -64 0 z" class="dg-white"/>
      <path d="M124 86 q26 -16 52 0" class="dg-wearl"/>
      ${DGM(1, 108, 100, 40, 100)}${DGM(2, 182, 78, 262, 70)}${DGM(3, 155, 200, 262, 210)}${DGM(4, 150, 34, 70, 30)}${DGM(5, 120, 162, 40, 172)}${DGM(6, 162, 270, 262, 272)}${DGM(7, 150, 80, 262, 120)}
    </svg>`
  },
  {
    id: 'basic', anim: 'basic',
    t: ['Basic suspension — how the parts move', 'મૂળભૂત સસ્પેન્શન — ભાગ કેવી રીતે હલે છે', 'बुनियादी सस्पेंशन — पार्ट कैसे हिलते हैं'],
    c: ['The wheel goes up over a bump. The control arm swings on its rubber bush, the knuckle moves on the ball joint, the spring squeezes and the shock absorber slows the movement.',
      'ટેકરા પર વ્હીલ ઉપર જાય છે. કંટ્રોલ આર્મ રબર બુશ પર ઝૂલે છે, નકલ બૉલ જોઇન્ટ પર હલે છે, સ્પ્રિંગ દબાય છે અને શૉક એબ્ઝોર્બર હલનચલન ધીમું કરે છે.',
      'उभार पर पहिया ऊपर जाता है. कंट्रोल आर्म रबर बुश पर झूलता है, नकल बॉल जॉइंट पर हिलता है, स्प्रिंग दबती है और शॉक एब्ज़ॉर्बर हलचल धीमी करता है.'],
    l: ['frame', 'coil', 'shock', 'knuckle', 'arm', 'bush', 'bj', 'tyre'],
    svg: () => `<svg viewBox="0 0 380 320" class="dg-svg">
      <path d="M30 290 V230 H70 L150 30 H250 V48 H160 L84 240 H44 V290 z" class="dg-frame"/>
      <g class="dg-sprg"><path d="${DGZ(205, 48, 196, 26, 7)}" class="dg-spring"/><rect x="198" y="112" width="14" height="92" rx="3" class="dg-violet"/><rect x="202" y="48" width="6" height="70" class="dg-chrome"/></g>
      <g class="dg-armg"><path d="M74 236 L248 252" class="dg-armbar2"/><circle cx="74" cy="236" r="13" class="dg-bush"/><circle cx="74" cy="236" r="6" class="dg-dark"/></g>
      <g class="dg-wheelg">
        <path d="M244 252 L238 196 L222 196 L232 120 L250 120 L262 200 Z" class="dg-violet"/>
        <rect x="262" y="100" width="70" height="196" rx="18" class="dg-tyre"/><path d="M297 120 v14 M297 262 v14" class="dg-arrowr"/>
        <circle cx="248" cy="252" r="8" class="dg-metal"/>
      </g>
      ${DGM(1, 58, 200, 24, 160)}${DGM(2, 230, 90, 300, 40)}${DGM(3, 212, 160, 160, 176)}${DGM(4, 242, 170, 300, 74)}${DGM(5, 160, 244, 160, 296)}${DGM(6, 74, 236, 24, 214)}${DGM(7, 248, 252, 214, 296)}${DGM(8, 332, 200, 360, 160)}
    </svg>`
  },
  {
    id: 'axle', anim: '',
    t: ['Rigid axle with coil springs (rear)', 'કોઇલ સ્પ્રિંગવાળો રિજિડ એક્સલ (પાછળ)', 'कॉइल स्प्रिंग वाला रिजिड एक्सल (पीछे)'],
    c: ['Both wheels sit on one strong axle — used on pickups, vans and rear-wheel-drive cars. Coil springs carry the load, trailing arms hold the axle front-to-back, the center link (Panhard rod) holds it side-to-side and the stabilizer bar reduces body lean.',
      'બંને વ્હીલ એક જ મજબૂત એક્સલ પર — પિકઅપ, વાન અને રિયર-વ્હીલ ડ્રાઇવ ગાડીઓમાં. કોઇલ સ્પ્રિંગ વજન ઉપાડે છે, ટ્રેલિંગ આર્મ એક્સલને આગળ-પાછળ પકડે છે, સેન્ટર લિંક (પેનહાર્ડ રૉડ) તેને ડાબે-જમણે પકડે છે અને સ્ટેબિલાઇઝર બાર બૉડીનો ઝુકાવ ઘટાડે છે.',
      'दोनों पहिए एक ही मज़बूत एक्सल पर — पिकअप, वैन और रियर-व्हील ड्राइव गाड़ियों में. कॉइल स्प्रिंग वज़न उठाती है, ट्रेलिंग आर्म एक्सल को आगे-पीछे पकड़ते हैं, सेंटर लिंक (पैनहार्ड रॉड) उसे दाएँ-बाएँ पकड़ता है और स्टेबलाइज़र बार बॉडी का झुकाव कम करता है.'],
    l: ['frame', 'coil', 'shock', 'axle', 'diff', 'panhard', 'trailing', 'arb', 'wheel'],
    svg: () => `<svg viewBox="0 0 420 270" class="dg-svg">
      <rect x="40" y="34" width="340" height="16" rx="3" class="dg-frame"/>
      <path d="M60 182 H360" class="dg-axlebar"/><circle cx="210" cy="182" r="34" class="dg-metal"/><circle cx="210" cy="182" r="22" class="dg-metal-o"/>
      <rect x="14" y="120" width="40" height="126" rx="12" class="dg-tyre"/><rect x="366" y="120" width="40" height="126" rx="12" class="dg-tyre"/>
      <path d="${DGZ(118, 52, 170, 22, 7)}" class="dg-spring2"/><path d="${DGZ(302, 52, 170, 22, 7)}" class="dg-spring2"/>
      <path d="M78 50 L90 170" class="dg-shockl"/><path d="M342 50 L330 170" class="dg-shockl"/>
      <path d="M100 162 L326 60" class="dg-panhard"/><circle cx="100" cy="162" r="5" class="dg-dark"/><circle cx="326" cy="60" r="5" class="dg-dark"/>
      <circle cx="150" cy="198" r="8" class="dg-arm"/><circle cx="270" cy="198" r="8" class="dg-arm"/>
      <path d="M96 226 H324 M96 226 L86 196 M324 226 L334 196" class="dg-arbl"/>
      ${DGM(1, 300, 42, 300, 16)}${DGM(2, 118, 110, 40, 92)}${DGM(3, 84, 110, 40, 130)}${DGM(4, 250, 182, 260, 240)}${DGM(5, 210, 182, 210, 248)}${DGM(6, 213, 111, 160, 92)}${DGM(7, 150, 198, 140, 248)}${DGM(8, 120, 226, 60, 260)}${DGM(9, 386, 182, 404, 100)}
    </svg>`
  },
  {
    id: 'strutrod', anim: '',
    t: ['Strut (tension) rod — top view', 'સ્ટ્રટ રૉડ (ટેન્શન રૉડ) — ઉપરથી', 'स्ट्रट रॉड (टेंशन रॉड) — ऊपर से'],
    c: ['On some cars the lower arm is one straight link. The strut rod joins its outer end to the frame and stops the wheel moving forward and backward. Rubber bushes at the front let it flex a little over bumps.',
      'કેટલીક ગાડીઓમાં લોઅર આર્મ એક સીધી લિંક હોય છે. સ્ટ્રટ રૉડ તેના બહારના છેડાને ફ્રેમ સાથે જોડે છે અને વ્હીલને આગળ-પાછળ જતું અટકાવે છે. આગળના રબર બુશ ટેકરા પર તેને થોડું લવચીક રાખે છે.',
      'कुछ गाड़ियों में लोअर आर्म एक सीधी लिंक होती है. स्ट्रट रॉड उसके बाहरी सिरे को फ्रेम से जोड़ता है और पहिए को आगे-पीछे जाने से रोकता है. आगे के रबर बुश उभार पर इसे थोड़ा लचीला रखते हैं.'],
    l: ['frame_bracket', 'strut_rod', 'rod_bush', 'arm', 'bush', 'bj', 'tyre'],
    svg: () => `<svg viewBox="0 0 400 260" class="dg-svg">
      <rect x="40" y="14" width="26" height="236" class="dg-frame"/><rect x="66" y="40" width="44" height="12" class="dg-frame"/>
      <rect x="86" y="30" width="10" height="10" class="dg-rubber"/><rect x="86" y="52" width="10" height="10" class="dg-rubber"/>
      <path d="M91 46 L262 176" class="dg-strutrod"/>
      <path d="M66 176 H270" class="dg-armbar2"/><circle cx="72" cy="176" r="12" class="dg-bush"/><circle cx="270" cy="176" r="10" class="dg-green"/>
      <rect x="286" y="110" width="50" height="132" rx="10" class="dg-tyre"/>
      <path d="M370 150 V96 M362 108 l8 -12 8 12" class="dg-arrow2"/>
      ${DGM(1, 110, 46, 160, 22)}${DGM(2, 180, 108, 220, 80)}${DGM(3, 91, 34, 130, 90)}${DGM(4, 170, 176, 170, 222)}${DGM(5, 72, 176, 100, 230)}${DGM(6, 270, 176, 250, 230)}${DGM(7, 311, 190, 360, 236)}
    </svg>`
  }
];
const DG_TX = {
  title: ['Inside the parts — detailed diagrams', 'ભાગની અંદર — વિગતવાર આકૃતિઓ', 'पार्ट के अंदर — विस्तृत आकृतियाँ'],
  lede: ['Numbered drawings of each part. Moving drawings show how the part works.', 'દરેક ભાગની નંબરવાળી આકૃતિ. હલતી આકૃતિઓ બતાવે છે કે ભાગ કેવી રીતે કામ કરે છે.', 'हर पार्ट की नंबर वाली आकृति. चलती आकृतियाँ दिखाती हैं कि पार्ट कैसे काम करता है.'],
  comp: ['Compression — rod goes in', 'કૉમ્પ્રેશન — રૉડ અંદર જાય', 'कंप्रेशन — रॉड अंदर जाता है'],
  ext: ['Extension — rod comes out', 'એક્સટેન્શન — રૉડ બહાર આવે', 'एक्सटेंशन — रॉड बाहर आता है']
};
