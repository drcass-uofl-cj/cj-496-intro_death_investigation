/* =====================================================================
   ART — the drawings, as inline SVG so the game needs no image files.
   Drawn in the style of a forensic scene sketch: 1 px = 1 cm.
   Colors come from CSS variables in style.css so both themes work.
   ===================================================================== */

const ART = {};

/* ---------- Floor plan of 418 Alder Lane (scene phase) ---------- */
ART.floorplan = function () {
  return `
  <svg class="sketch" viewBox="0 0 900 530" role="img" aria-label="Floor plan sketch of 418 Alder Lane. Tap the numbered markers to examine items.">
    <defs>
      <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" class="hatch-line"/>
      </pattern>
    </defs>

    <!-- porch (outside, street side) -->
    <rect x="560" y="18" width="200" height="42" class="porch"/>
    <text x="580" y="44" class="lbl">FRONT PORCH</text>

    <!-- exterior walls -->
    <rect x="40" y="60" width="820" height="440" class="wall-outer"/>

    <!-- interior walls -->
    <line x1="460" y1="60" x2="460" y2="200" class="wall"/>
    <line x1="460" y1="250" x2="460" y2="500" class="wall"/>
    <line x1="460" y1="300" x2="860" y2="300" class="wall"/>
    <line x1="460" y1="340" x2="560" y2="340" class="wall"/>
    <line x1="600" y1="340" x2="660" y2="340" class="wall"/>
    <line x1="700" y1="340" x2="860" y2="340" class="wall"/>
    <line x1="620" y1="340" x2="620" y2="500" class="wall"/>

    <!-- doors: gaps drawn as swings -->
    <line x1="40" y1="200" x2="40" y2="260" class="door-gap"/>
    <path d="M40 200 A60 60 0 0 1 100 260" class="swing"/>
    <line x1="570" y1="60" x2="630" y2="60" class="door-gap"/>
    <path d="M570 60 A60 60 0 0 0 630 120" class="swing"/>
    <line x1="460" y1="200" x2="460" y2="250" class="door-gap"/>

    <!-- room labels -->
    <text x="135" y="196" class="room">KITCHEN / DINING</text>
    <text x="640" y="250" class="room">LIVING ROOM</text>
    <text x="660" y="324" class="room small">HALL</text>
    <text x="540" y="492" class="room small">BATH</text>
    <text x="745" y="492" class="room small">BEDROOM</text>

    <!-- kitchen fixtures -->
    <rect x="42" y="62" width="248" height="50" class="fixture"/>
    <rect x="230" y="112" width="60" height="116" class="fixture"/>
    <rect x="72" y="70" width="48" height="34" rx="6" class="fixture-line"/>
    <circle cx="190" cy="87" r="10" class="fixture-line"/><circle cx="216" cy="87" r="10" class="fixture-line"/>
    <rect x="390" y="62" width="68" height="64" class="fixture"/>
    <text x="398" y="100" class="lbl">REF</text>
    <text x="86" y="128" class="lbl">SINK</text>
    <text x="236" y="176" class="lbl" transform="rotate(-90 256 170)">PENINSULA</text>

    <!-- table and chairs -->
    <rect x="330" y="395" width="120" height="85" class="furn"/>
    <rect x="345" y="380" width="26" height="14" class="furn"/>
    <rect x="410" y="380" width="26" height="14" class="furn"/>
    <rect x="452" y="425" width="6" height="26" class="furn"/>
    <circle cx="400" cy="430" r="13" class="item"/>
    <rect x="360" y="440" width="30" height="22" class="item" transform="rotate(-8 375 451)"/>
    <rect x="334" y="436" width="18" height="12" class="item"/>

    <!-- overturned chair -->
    <g transform="rotate(-25 300 372)">
      <rect x="286" y="362" width="28" height="20" class="furn"/>
      <line x1="286" y1="362" x2="276" y2="352" class="leg"/>
      <line x1="314" y1="362" x2="324" y2="352" class="leg"/>
      <rect x="284" y="382" width="32" height="7" class="furn"/>
    </g>

    <!-- decedent, prone: drawn as a sketch outline -->
    <g class="decedent" transform="translate(250 258) rotate(8)">
      <line x1="0" y1="80" x2="-9" y2="166" class="limb"/>
      <line x1="0" y1="80" x2="9" y2="166" class="limb"/>
      <line x1="16" y1="22" x2="44" y2="34" class="limb"/>
      <rect x="-21" y="14" width="42" height="72" rx="14" class="torso"/>
      <circle cx="0" cy="0" r="13" class="head"/>
      <line x1="-30" y1="-8" x2="30" y2="-8" class="dim"/>
    </g>
    <!-- nitro bottle -->
    <rect x="293" y="294" width="12" height="7" rx="2" class="item" transform="rotate(30 299 297)"/>
    <circle cx="288" cy="308" r="2" class="item"/><circle cx="296" cy="311" r="2" class="item"/><circle cx="283" cy="302" r="2" class="item"/>

    <!-- dimension line from peninsula corner to head (measurement) -->
    <line x1="230" y1="228" x2="244" y2="246" class="dim"/>
    <text x="168" y="262" class="dimtxt">31 cm</text>

    <!-- living room -->
    <rect x="836" y="130" width="18" height="80" class="furn"/>
    <rect x="700" y="140" width="56" height="60" rx="10" class="furn"/>
    <rect x="520" y="80" width="40" height="150" rx="8" class="furn"/>

    <!-- bath -->
    <rect x="470" y="350" width="140" height="44" rx="10" class="fixture-line"/>
    <ellipse cx="590" cy="460" rx="14" ry="18" class="fixture-line"/>

    <!-- bedroom -->
    <rect x="700" y="372" width="130" height="110" class="furn"/>
    <rect x="708" y="378" width="114" height="22" class="fixture-line"/>

    <!-- north arrow + scale bar -->
    <g transform="translate(70 30)">
      <path d="M0 18 L8 -2 L16 18 L8 12 Z" class="north"/>
      <text x="22" y="16" class="lbl">N</text>
    </g>
    <g transform="translate(120 520)">
      <rect x="0" y="-8" width="50" height="6" class="scale-a"/><rect x="50" y="-8" width="50" height="6" class="scale-b"/>
      <text x="108" y="-1" class="lbl">1 m</text>
    </g>
    <text x="300" y="520" class="lbl">LCME-26-01147 · SKETCH NOT TO EXACT SCALE</text>

    <g id="hotspots"></g>
  </svg>`;
};

/* ---------- Site plan (perimeter phase) ---------- */
ART.siteplan = function () {
  return `
  <svg class="sketch siteplan" viewBox="0 0 900 570" role="img" aria-label="Site plan of 418 Alder Lane. Tap each area to assign it.">
    <g id="zones">
      <path data-zone="back" class="zone" fill-rule="evenodd"
        d="M120 20 H780 V300 H120 Z M250 90 H650 V300 H250 Z"/>
      <rect data-zone="house" class="zone" x="250" y="90" width="400" height="210"/>
      <rect data-zone="porch" class="zone" x="410" y="300" width="120" height="36"/>
      <path data-zone="yard" class="zone" fill-rule="evenodd"
        d="M120 300 H780 V420 H120 Z M410 300 H530 V336 H410 Z"/>
      <rect data-zone="street" class="zone" x="0" y="420" width="900" height="80"/>
      <rect data-zone="neighbor" class="zone" x="380" y="500" width="150" height="70"/>
    </g>
    <!-- static drawing over zones -->
    <line x1="120" y1="20" x2="120" y2="420" class="fence"/>
    <line x1="780" y1="20" x2="780" y2="420" class="fence"/>
    <line x1="120" y1="20" x2="780" y2="20" class="fence"/>
    <rect x="250" y="90" width="400" height="210" class="wall-outer nofill"/>
    <rect x="640" y="300" width="100" height="120" class="drive"/>
    <line x1="0" y1="440" x2="900" y2="440" class="curb"/>
    <line x1="0" y1="470" x2="900" y2="470" class="lane"/>
    <rect x="60" y="430" width="70" height="30" rx="6" class="car"/>
    <rect x="150" y="430" width="70" height="30" rx="6" class="car"/>
    <rect x="250" y="430" width="90" height="32" rx="6" class="car"/>
    <line x1="455" y1="336" x2="455" y2="440" class="walk"/>

    <text x="410" y="200" class="room">418 ALDER LANE</text>
    <text x="300" y="60" class="lbl">BACK YARD</text>
    <text x="40" y="160" class="lbl" transform="rotate(-90 60 160)">ALLEY</text>
    <text x="418" y="324" class="lbl">PORCH</text>
    <text x="160" y="380" class="lbl">FRONT YARD</text>
    <text x="650" y="380" class="lbl">DRIVEWAY</text>
    <text x="560" y="462" class="lbl">ALDER LANE</text>
    <text x="70" y="427" class="lbl">LCPD UNITS · MEDIC 12</text>
    <text x="390" y="540" class="lbl">HAYNES DRIVEWAY</text>
    <text x="560" y="540" class="lbl">(ACROSS STREET)</text>
    <g transform="translate(830 50)">
      <path d="M0 -18 L8 2 L16 -18 L8 -12 Z" class="north" transform="rotate(180 8 -8)"/>
      <text x="22" y="-4" class="lbl">N</text>
    </g>
    <g id="zone-labels"></g>
  </svg>`;
};

/* ---------- Body diagram (body phase) ----------
   Two simple pictogram figures, like the outline diagrams on a real
   investigator's body chart. Deliberately non-graphic. */
ART.figure = function (x, label) {
  return `
    <g transform="translate(${x} 20)">
      <text x="100" y="0" class="lbl" text-anchor="middle">${label}</text>
      <g class="fig">
        <line x1="88" y1="160" x2="82" y2="282" class="flimb"/>
        <line x1="112" y1="160" x2="118" y2="282" class="flimb"/>
        <line x1="70" y1="62" x2="42" y2="168" class="flimb thin"/>
        <line x1="130" y1="62" x2="158" y2="168" class="flimb thin"/>
        <rect x="68" y="50" width="64" height="120" rx="22" class="ftorso"/>
        <circle cx="100" cy="28" r="20" class="fhead"/>
      </g>
    </g>`;
};

ART.bodychart = function () {
  return `
  <svg class="sketch bodychart" viewBox="0 0 420 320" role="img" aria-label="Body chart. Markers show documented findings.">
    ${ART.figure(0, "POSTERIOR · AS FOUND")}
    ${ART.figure(220, "ANTERIOR")}
    <g id="body-markers"></g>
  </svg>`;
};

/* ---------- Timeline (time-since-death phase), drawn to scale ----------
   x axis: Sun 16:00 (h = 0) to Wed 12:00 (h = 92). Labels sit in four
   rows (two above the axis, two below) so nearby events never collide. */
ART.timeline = function () {
  const x0 = 40, w = 820, H = 92, AX = 130;
  const X = h => +(x0 + (h / H) * w).toFixed(1);
  const rowY = [24, 66, 196, 238];
  const ev = [
    { h: 2.68,  t: "Sun 18:41", s: "Last call with Dana", row: 0 },
    { h: 3.0,   t: "Sun 19:00", s: "Last seen alive", row: 3 },
    { h: 15.0,  t: "Mon AM", s: "Paper, pills untouched", row: 1 },
    { h: 16.07, t: "Mon 08:04", s: "First missed call", row: 2 },
    { h: 39.0,  t: "Tue AM", s: "Paper uncollected", row: 0 },
    { h: 89.13, t: "Wed 09:08", s: "911 call", row: 3 }
  ];
  const days = [{ h: 8, t: "MON" }, { h: 32, t: "TUE" }, { h: 56, t: "WED" }];
  return `
  <svg class="sketch timeline" viewBox="0 0 900 290" role="img" aria-label="Timeline from Sunday afternoon to Wednesday noon. The likely window of death, Sunday 7 PM to Monday 8 AM, is shaded.">
    <rect x="${X(3)}" y="${AX - 34}" width="${(X(16.07) - X(3)).toFixed(1)}" height="68" class="window"/>
    <text x="${X(3) + 6}" y="${AX - 14}" class="lbl strong">LIKELY WINDOW</text>
    ${days.map(d => `<line x1="${X(d.h)}" y1="${AX - 40}" x2="${X(d.h)}" y2="270" class="grid"/>
      <text x="${X(d.h) + 5}" y="284" class="lbl">${d.t} 00:00</text>`).join("")}
    <line x1="${x0}" y1="${AX}" x2="${x0 + w}" y2="${AX}" class="axis"/>
    ${ev.map(e => {
      const up = e.row < 2, y = rowY[e.row], end = e.h > 80, anchor = end ? "end" : "start";
      return `<line x1="${X(e.h)}" y1="${AX}" x2="${X(e.h)}" y2="${up ? y + 22 : y - 16}" class="tick"/>
        <circle cx="${X(e.h)}" cy="${AX}" r="6" class="ev"/>
        <text x="${X(e.h)}" y="${y}" class="lbl strong-ink" text-anchor="${anchor}">${e.t}</text>
        <text x="${X(e.h)}" y="${y + 17}" class="lbl" text-anchor="${anchor}">${e.s}</text>`;
    }).join("")}
  </svg>`;
};
