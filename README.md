# Suspension Lab

Interactive **3D car suspension tear-down simulator** for ITI and automobile students — in **English, ગુજરાતી and हिन्दी**. Runs in any browser, no install, works offline.

Open `index.html` directly, or the single-file version `dist/suspension-lab.html`.

## Systems

MacPherson strut · Double wishbone · Multi-link (5-link) · Twist-beam axle · Leaf-spring live axle (pickup / truck) · Adaptive air suspension

## Features

| Section | What you can do |
|---|---|
| **Tear-down bench** | Realistic 3D model inside a see-through car / pickup body. Drive animation (wheels turn, road moves, bumps). Step-by-step workshop procedure with torque values and safety warnings — parts come off as you go. Exploded view, cut-section view (inside the shock absorber, bushes, ball joints, bearing, tyre), isolate a part, full screen. Tap any part to highlight it and see its name with a simple explanation. **▶ How it works** animated lesson with captions for every system. |
| **Diagram** | Exploded diagram with every part named (side callouts with leader lines on large screens, numbers + parts list on phones). |
| **Theory** | Simple illustrated lessons with moving pictures: what a suspension does, main parts, springs, shock absorbers, independent vs rigid axles, wheel alignment, body roll and anti-roll bar, faults & symptoms, workshop safety. |
| **Compare** | Ratings of all six systems for comfort, handling, load, packaging, cost and simplicity. |

Torque values and specifications are typical training figures — always follow the manufacturer's workshop manual for a specific vehicle.

## Files

- `index.html`, `css/susp.css` – page and styles (light & dark themes)
- `js/vendor/three.min.js` – Three.js r149 (MIT licence, see `js/vendor/three.LICENSE`)
- `js/parts-data.js` – part library
- `js/i18n.js` – English / Gujarati / Hindi text, procedures and lessons
- `js/geom.js`, `js/systems.js`, `js/kinmath.js` – 3D models, systems and their movement
- `js/bench.js` – 3D viewer, tear-down, labels and animation
- `js/theory.js` – theory lessons and animated diagrams
- `js/app.js` – user interface
- `build-single.sh` – rebuilds `dist/suspension-lab.html`
