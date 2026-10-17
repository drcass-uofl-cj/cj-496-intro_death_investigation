/* =====================================================================
   CASE CONTENT — "418 Alder Lane"
   ---------------------------------------------------------------------
   Everything students read lives in this file: the story, the choices,
   the feedback, the scoring and the real-world fact cards.
   You can edit any text between the quote marks or backticks without
   touching the game engine (engine.js).

   SCORING: every student starts at 100 in each of the lesson's
   Five Components. A choice can subtract points with `score`:
     team  = Teamwork        doc   = Documentation
     pres  = Preservation    sense = Common Sense
     flex  = Flexibility
   `flag` records a mistake on the final report.
     err = one of Geberth's 10 most common errors (1-10), or omit
     nij = section of the NIJ Death Investigation guide (e.g. "B2")

   THE CASE IS FICTIONAL. The people, address and county are invented.
   The procedures (NIJ, 2011), the science and the "Real-World File"
   cards are real and cited.
   ===================================================================== */

const COURSE = {
  title: "CJ 496: Death Investigation",
  week: "Week 1 · Introduction to Death Investigation",
  gameTitle: "418 Alder Lane",
  agency: "Lake Corvin County Office of the Medical Examiner",
  caseNo: "LCME-26-01147",
  // OPTIONAL: paste a Google Form "prefilled link" setup here so students
  // can submit their results. See README.md, Step 7. Leave as null to hide.
  googleForm: null
  /* Example:
  googleForm: {
    url: "https://docs.google.com/forms/d/e/XXXXXXXX/viewform",
    nameField: "entry.1111111111",
    scoreField: "entry.2222222222",
    summaryField: "entry.3333333333"
  }
  */
};

const COMPONENTS = {
  team:  { label: "Teamwork",      short: "TEAM", lesson: "Everyone works together so the scene is processed correctly and in the shortest time." },
  doc:   { label: "Documentation", short: "DOC",  lesson: "Documentation must be rigorous enough to withstand courtroom scrutiny." },
  pres:  { label: "Preservation",  short: "PRES", lesson: "If evidence is incorrectly preserved, it is worthless." },
  sense: { label: "Common Sense",  short: "SENSE",lesson: "If you think it may be evidence, it probably is. If you think a specialist is needed, one probably is." },
  flex:  { label: "Flexibility",   short: "FLEX", lesson: "Not every scene goes by the textbook. Be prepared for things to go wrong and adjust." }
};

/* Geberth's 10 most common errors (from the Week 1 lesson) */
const GEBERTH = {
  1: "Improper response to the scene",
  2: "Failure to protect the crime scene",
  3: "Not handling suspicious deaths as homicides",
  4: "Responding with a preconceived notion",
  5: "Failure to take sufficient photographs",
  6: "Failure to manage the crime scene process",
  7: "Failure to evaluate victimology",
  8: "Failure to coordinate and conduct an efficient canvass",
  9: "Failure to work together as a team",
  10: "Command interference or inappropriate action"
};

/* ---------------------------------------------------------------------
   REAL-WORLD FILES — verified facts students unlock as they play.
   They are collected in the Field Manual.
   --------------------------------------------------------------------- */
const FACTS = {
  coroner: {
    title: "Where the word coroner comes from",
    body: `In 1194, England's Articles of Eyre created the office of <i>custos placitorum coronae</i>, the "keeper of the pleas of the Crown." The title was shortened to "crowner," then "coroner." The early coroner's job was largely financial: making sure the Crown collected what it was owed from a death, including the dead person's goods.`,
    source: "Britannica, \"Coroner\"",
    url: "https://www.britannica.com/topic/coroner"
  },
  meHistory: {
    title: "The first medical examiners",
    body: `In 1877 Massachusetts replaced its coroners with physician "medical examiners." New York City created what is usually called the first modern medical examiner's office in 1918; Dr. Charles Norris served as its first Chief Medical Examiner until 1935.`,
    source: "Charles Norris (medical examiner), summary of NYC OCME history",
    url: "https://en.wikipedia.org/wiki/Charles_Norris_(medical_examiner)"
  },
  systems: {
    title: "Coroner or medical examiner? It depends on the state",
    body: `CDC data for 2023: 22 states plus Washington, D.C. are served entirely by medical examiner systems, 11 states use coroners in every county, and 14 more use coroners in some counties. That patchwork is why the lesson says your title and employer depend on where you work.`,
    source: "CDC, Coroner and Medical Examiner Laws",
    url: "https://www.cdc.gov/phlp/php/coroner/index.html"
  },
  bjs: {
    title: "How many deaths does the system see?",
    body: `The federal census of medical examiner and coroner offices counted about 2,000 offices nationwide. Those offices received nearly 1 million death referrals in 2004 and accepted about 500,000 for investigation. Most of those deaths turn out to be natural.`,
    source: "Bureau of Justice Statistics, Medical Examiners and Coroners' Offices, 2004 (NCJ 216756)",
    url: "https://bjs.ojp.gov/library/publications/medical-examiners-and-coroners-offices-2004"
  },
  nas: {
    title: "The 2009 report that shook forensic science",
    body: `<i>Strengthening Forensic Science in the United States: A Path Forward</i> (National Research Council, 2009) found that the field lacked mandatory standards, certification and accreditation. It also recommended that the coroner system eventually be replaced by medical examiner systems run by trained forensic pathologists.`,
    source: "National Academies Press",
    url: "https://nap.nationalacademies.org/catalog/12589"
  },
  nij: {
    title: "The rulebook for this game",
    body: `Every step you take in this case follows <i>Death Investigation: A Guide for the Scene Investigator</i> (NIJ, 2011 technical update). It splits a scene into five task groups: Arriving at the Scene (B), Documenting the Scene (C), Documenting the Body (D), the Decedent Profile (E) and Completing the Investigation (F).`,
    source: "National Institute of Justice, NCJ 234457",
    url: "https://www.ojp.gov/pdffiles1/nij/234457.pdf"
  },
  nutshell: {
    title: "The Nutshell Studies",
    body: `In the 1940s and '50s, Frances Glessner Lee built a series of miniature death scenes at a scale of one inch to one foot to train investigators at Harvard's Department of Legal Medicine. Most were based on real cases. Trainees were taught to scan each room with their eyes in a clockwise spiral before drawing any conclusion. Eighteen are still used for training by Maryland's Office of the Chief Medical Examiner in Baltimore.`,
    source: "Smithsonian, \"Murder Is Her Hobby\"",
    url: "https://torch.si.edu/2017/10/murder-is-her-hobby-crime-in-a-nutshell"
  },
  chalk: {
    title: "There is no chalk outline",
    body: `The chalk outline is mostly a movie invention. Tracing around a body would put chalk, hands and knees directly onto the most important evidence at the scene. Real investigators document body position with photographs, measurements and a sketch.`,
    source: "Standard scene practice; see NIJ guide, Sections C and D",
    url: "https://www.ojp.gov/pdffiles1/nij/234457.pdf"
  },
  locard: {
    title: "Edmond Locard",
    body: `French criminologist Edmond Locard set up one of the first police crime laboratories in Lyon in 1910. His exchange principle, "every contact leaves a trace," applies to accidents and natural deaths as much as to homicides. In this case, the head that struck a counter left blood and hair on it.`,
    source: "Edmond Locard, biography",
    url: "https://en.wikipedia.org/wiki/Edmond_Locard"
  },
  ramsey: {
    title: "Real case: a scene that was never secured",
    body: `On December 26, 1996, six-year-old JonBenét Ramsey was reported missing from her family's home in Boulder, Colorado. The house was not sealed off. Friends and family moved through it for hours, and her father found her body in the basement and carried it upstairs before investigators could document it. Those first-morning problems are still taught as a warning about scene security.`,
    source: "Widely documented; summarized in many crime scene texts",
    url: "https://en.wikipedia.org/wiki/Killing_of_JonBen%C3%A9t_Ramsey"
  },
  simpson: {
    title: "Real case: chain of custody on trial",
    body: `In the 1995 O.J. Simpson murder trial, the defense attacked how the blood evidence had been collected, packaged, stored and logged, arguing contamination and gaps in documentation. Simpson was acquitted. The trial is still used to show why every transfer of evidence must be recorded.`,
    source: "Widely documented",
    url: "https://en.wikipedia.org/wiki/O._J._Simpson_murder_case"
  },
  namus: {
    title: "When no one knows who they are",
    body: `An estimated 4,400 unidentified bodies are received by U.S. medical examiner and coroner offices in an average year, and about 1,000 are still unidentified a year later. NamUs, the National Missing and Unidentified Persons System, helps match them to missing-person reports. That is why identification gets its own step at every scene.`,
    source: "Office of Justice Programs, NamUs",
    url: "https://www.ojp.gov/files/archives/blogs/2021/justice-department-fights-missing"
  },
  abmdi: {
    title: "Becoming a certified death investigator",
    body: `The American Board of Medicolegal Death Investigators (ABMDI) certifies investigators. To sit for the basic Registry exam you must work for a medical examiner or coroner office and document at least 640 hours of death investigation experience.`,
    source: "ABMDI",
    url: "https://en.wikipedia.org/wiki/American_Board_of_Medicolegal_Death_Investigators"
  },
  purge: {
    title: "Purge fluid is not bleeding",
    body: `As a body decomposes, gas pressure pushes reddish-brown "purge" fluid from the nose and mouth. New investigators often mistake it for bleeding from an assault. The NIJ guide tells you to document fluid from the orifices, including its location and pattern, before the body is moved (Section D3).`,
    source: "NIJ guide, Section D3",
    url: "https://www.ojp.gov/pdffiles1/nij/234457.pdf"
  },
  certificate: {
    title: "\"Cardiac arrest\" is not a cause of death",
    body: `Everyone's heart stops when they die. Cardiac arrest and respiratory arrest are mechanisms, not causes. U.S. death certificate guidance asks the certifier to name the underlying disease or injury that started the chain of events, such as atherosclerotic cardiovascular disease.`,
    source: "CDC/NCHS, Physicians' Handbook on Medical Certification of Death",
    url: "https://crvs.unescap.org/resource/physicians-handbook-medical-certification-death"
  }
};

/* ---------------------------------------------------------------------
   THE CASE, phase by phase.
   `time` is the in-game clock (24-hour) when the phase starts.
   --------------------------------------------------------------------- */
const PHASES = [

  /* ---------------- 1. CALL-OUT ---------------- */
  {
    id: "callout",
    type: "story",
    chapter: "Call-out",
    nij: "Initial notification",
    time: "09:41",
    title: "Your phone rings at 09:41",
    body: `
      <p>You are a medicolegal death investigator for the <b>Lake Corvin County Office of the Medical Examiner</b>. You are a civilian employee of the ME's office, not a police officer. At this scene you will work alongside patrol officers and a sergeant from the Lake Corvin Police Department.</p>
      <div class="form-block">
        <div class="form-row"><span>Received</span><b>Wed 10/14/2026 · 09:41</b></div>
        <div class="form-row"><span>From</span><b>LCPD Dispatch, for Sgt. Tom Becker</b></div>
        <div class="form-row"><span>Location</span><b>418 Alder Lane (single-family home)</b></div>
        <div class="form-row"><span>Decedent</span><b>Adult male, believed to be resident Raymond Ellis, 67</b></div>
        <div class="form-row"><span>Reported by</span><b>Neighbor (RP) Carol Haynes, 911 call at 09:08</b></div>
        <div class="form-row"><span>Summary</span><b>Welfare check. Daughter could not reach him since Sunday. Officer forced the front door and found him on the kitchen floor. Fire/EMS determined obvious death at 09:29.</b></div>
      </div>
      <p>Sgt. Becker comes on the line: <q>Looks like an older guy who fell in the kitchen. Probably natural. Some blood by his head. We're holding the scene for you.</q></p>`,
    facts: ["systems", "nij"]
  },
  {
    id: "callout-q",
    type: "questions",
    chapter: "Call-out",
    nij: "Initial notification",
    time: "09:43",
    title: "Before you get in the van",
    questions: [
      {
        id: "jurisdiction",
        prompt: "Is this a death your office should take jurisdiction over?",
        options: [
          { text: "Yes. It is sudden, unexpected and unattended: he died at home with no physician present, and there may be an injury.", correct: true,
            feedback: "Correct. The lesson notes that statutes usually bring the ME or coroner in when a death is sudden, unexpected or traumatic and the person was not under a physician's care at the time." },
          { text: "No. He had a cardiologist, so his doctor can sign the death certificate without anyone going out.", score: { sense: -10 },
            flag: { err: 1, nij: "B", text: "Declined a sudden, unattended death that has a possible injury." },
            feedback: "Not here. Having a doctor does not make an unwitnessed death with blood at the scene a routine sign-out. Someone has to look at the scene and the body first." },
          { text: "Only if police tell you it's a homicide.", score: { sense: -10, team: -5 },
            flag: { err: 1, text: "Waited for police to call it a homicide before responding." },
            feedback: "Jurisdiction comes from your office's statute, not from a police opinion. Police and the ME office have separate legal responsibilities at the same scene." }
        ]
      },
      {
        id: "mindset",
        prompt: "The sergeant has already called it \"probably natural.\" How do you approach the scene?",
        options: [
          { text: "Treat it as a homicide until the evidence shows otherwise, and document everything as if it will end up in court.", correct: true,
            feedback: "Correct. That is the lesson's default investigative direction. If it really is natural, being thorough costs you an hour. If it isn't, the work you skipped cannot be done later." },
          { text: "Ask patrol to bag him and send him to the morgue. You'll review their phone photos later.", score: { doc: -15, team: -5 },
            flag: { err: 1, nij: "B", text: "Tried to handle the scene remotely and let untrained personnel move the body." },
            feedback: "That is an improper response. Patrol officers are not trained in body documentation, and once the body is moved its original position can never be restored." },
          { text: "Agree it's natural and plan a quick in-and-out so the family can have the house back.", score: { sense: -15 },
            flag: { err: 4, text: "Went in with a preconceived notion that the death was natural." },
            feedback: "That is a preconceived notion, one of Geberth's top errors. You don't know what happened until the evidence is analyzed and the ME certifies cause and manner." }
        ]
      }
    ]
  },

  /* ---------------- 2. KIT ---------------- */
  {
    id: "kit",
    type: "select",
    chapter: "Equipment",
    nij: "A",
    time: "09:50",
    title: "Pack your scene kit",
    intro: "NIJ Section A lists the tools an investigator should carry. Select everything you will need at 418 Alder Lane, then check your kit.",
    missPenalty: { doc: -3 },
    items: [
      { id: "gloves", label: "Nitrile gloves (several pairs)", needed: true, why: "Change them between items so you don't move trace evidence from one place to another." },
      { id: "ppe", label: "Shoe covers, disposable suit, mask", needed: true, why: "This is a decomposition scene. PPE protects you and keeps your own trace out of the scene." },
      { id: "camera", label: "Camera with spare batteries and cards", needed: true, why: "Photography is the permanent record of the scene (NIJ C1)." },
      { id: "scales", label: "Photo scales and evidence placards", needed: true, why: "Close-ups need a scale in the frame (NIJ C1-E)." },
      { id: "tape", label: "Measuring tape", needed: true, why: "Measurements turn the photos into a sketch someone else can rebuild." },
      { id: "thermo", label: "Thermometer (ambient and body)", needed: true, why: "NIJ D5 requires you to document scene and body temperature and how you measured them." },
      { id: "notebook", label: "Investigative notebook and report forms", needed: true, why: "Written notes back up the photos and refresh your memory in court." },
      { id: "paper", label: "Clean paper bags and envelopes", needed: true, why: "Paper breathes. Biological evidence sealed in plastic can grow mold and degrade." },
      { id: "seals", label: "Evidence tape, seals and labels", needed: true, why: "Tamper-evident seals and labels are the start of the chain of custody." },
      { id: "tags", label: "Body ID tags, clean sheet, body bag with lock or seal", needed: true, why: "NIJ D8: tag the body and the bag, and seal it before transport." },
      { id: "light", label: "Flashlight or portable lighting", needed: true, why: "You need light to see trace evidence and to photograph it." },
      { id: "id", label: "Your official ID and business cards", needed: true, why: "NIJ B1: present ID to the lead investigator. You'll leave cards with the family." },
      { id: "chalk", label: "Sidewalk chalk for the body outline", needed: false, why: "Chalk outlines are a TV invention. Tracing the body contaminates it.", fact: "chalk" },
      { id: "ziploc", label: "Plastic zip bags for the bloody items", needed: false, why: "Wrong packaging. Moist biological evidence goes in paper after it air-dries." },
      { id: "spray", label: "Air freshener to cover the odor", needed: false, why: "Odor is fragile evidence you are supposed to document (NIJ C2-C), and the spray contaminates the scene." },
      { id: "coffee", label: "Coffee and a breakfast sandwich to eat on scene", needed: false, why: "Never eat, drink or smoke inside a scene. It is a contamination and biohazard risk." },
      { id: "personalphone", label: "Your personal phone as the main scene camera", needed: false, why: "Most offices ban personal devices for evidence photos. Those photos become part of the case file and can be subpoenaed." }
    ],
    facts: ["chalk"]
  },

  /* ---------------- 3. ARRIVAL ---------------- */
  {
    id: "arrival",
    type: "sequence",
    chapter: "Arrival",
    nij: "B1–B5",
    time: "10:15",
    title: "Arriving at 418 Alder Lane",
    intro: `It is 10:15. Two patrol cars and an ambulance are at the curb, crime scene tape is across the front walk, and a neighbor is watching from across the street. <b>Choose what you do next, one step at a time.</b>`,
    penalty: { doc: -3 },
    steps: [
      { id: "park", text: "Park where you won't block emergency vehicles or drive over possible evidence", nij: "B2-C", why: "Securing your vehicle and parking safely comes before anything else." },
      { id: "intro", text: "Find the officer in charge, show your ID and explain your role", nij: "B1-A/B", why: "Introductions establish who leads what before anyone enters the scene." },
      { id: "first", text: "Find out who was first on scene and who has been inside since", nij: "B1-C", why: "You need to know what the first responders touched, moved or brought in before you can trust what you see." },
      { id: "safety", text: "Assess scene safety: hazards, animals, need for PPE", nij: "B2", why: "No investigation starts until the scene is safe. Here: decomposition (biohazard) and a cat loose in the house." },
      { id: "confirm", text: "Confirm who pronounced death, and when and where", nij: "B3", why: "Death must be confirmed before medicolegal jurisdiction begins. Here, Paramedic J. Okafor at 09:29." },
      { id: "brief", text: "Hold a scene briefing with police: what they know, who does what", nij: "B4", why: "The briefing sets the scope: suspicious or not, how many scenes, which agency collects what." },
      { id: "log", text: "Sign the scene log, put on PPE, and agree on one path in and out", nij: "B5-B", why: "Every person entering is logged. A single path limits disturbance." },
      { id: "walk", text: "Do your initial walk-through and view the decedent", nij: "B5", why: "The walk-through is your first full look: the body, fragile evidence, and a plan for documenting it all." }
    ],
    facts: ["bjs"]
  },
  /* ---------------- 5. FIRST RESPONDER ---------------- */
  {
    id: "ruiz",
    type: "interview",
    chapter: "Arrival",
    nij: "B1-C · C5",
    time: "10:24",
    title: "Talk to the first officer",
    witness: { name: "Officer Marcus Ruiz", role: "LCPD patrol · first on scene", initials: "MR" },
    intro: "Before you document anything, find out exactly what the first responders did. You have time for <b>4 questions</b>.",
    maxQuestions: 4,
    mustAsk: ["entry", "who", "touch"],
    missPenalty: { doc: -5 },
    missFlag: { err: 6, nij: "B1-C", text: "Did not establish what first responders touched or moved." },
    questions: [
      { id: "entry", q: "What time did you arrive, and how did you get in?",
        a: "I arrived at 09:16. Nobody answered and I could smell decomposition at the door. Front door was locked, so I forced it at 09:24. The splintered frame is from me.",
        note: "Ruiz arrived 09:16; forced front door 09:24. Damage to front door frame was caused by police entry." },
      { id: "who", q: "Who has been inside since then?",
        a: "Just me, Paramedic Okafor and EMT Hale. We came in the front door and went down the hall to the kitchen. Nobody else.",
        note: "Inside before ME arrival: Ofc. Ruiz, Paramedic J. Okafor, EMT S. Hale. Entered via front door and hall." },
      { id: "touch", q: "Did anyone touch, move or turn anything on or off?",
        a: "I turned on the kitchen light. Okafor lifted his right shoulder a few inches to check his neck and face, then laid him back down, and he put three ECG stickers on his chest to confirm no heart activity. The TV was already on when we got here.",
        note: "Artifacts: kitchen light switched on by Ruiz. Paramedic briefly lifted right shoulder and placed 3 ECG electrodes on chest. TV was on at entry." },
      { id: "locks", q: "Did you see any other forced entry?",
        a: "No. I checked the windows I could see from inside, and the back door is deadbolted from the inside. The only damage is mine.",
        note: "Ruiz: no other forced entry observed. Back door deadbolted from inside." },
      { id: "think", q: "So what do you think happened?",
        a: "Honestly? Old guy fell and hit his head. Happens all the time.",
        bad: true, score: { sense: -4 },
        flag: { err: 4, text: "Took an officer's opinion as a finding." },
        feedback: "His opinion isn't evidence, and leaning on it invites a preconceived notion. Ask for facts: times, actions, observations." },
      { id: "photos", q: "Can you text me the photos you took on your phone?",
        a: "Uh, I took a couple on my personal phone, yeah.",
        note: "Ofc. Ruiz took photos on his personal phone. Refer to LCPD supervisor for proper retention.",
        feedback: "Worth knowing, because those photos are discoverable. But don't pass evidence by text. Note it and let his supervisor handle retention under department policy." }
    ],
    facts: ["chalk"]
  },

  {
    id: "sergeant",
    type: "questions",
    chapter: "Arrival",
    nij: "B2 · Scene security",
    time: "10:34",
    title: "Rank does not preclude contamination",
    questions: [
      {
        id: "sgt",
        context: `As you finish the briefing, <b>Lieutenant Dale Price</b> pulls up. He is Sgt. Becker's boss. He walks straight past the scene log, coffee in hand: <q>I just want to take a quick look at the kitchen.</q>`,
        prompt: "What do you do?",
        options: [
          { text: "Politely stop him. Ask him to sign the log and suit up, or offer to show him the photos once you've documented the kitchen.", correct: true,
            feedback: "Correct. Everyone who enters goes in the log with name, agency and time, regardless of rank. The log is how you later explain a stray fingerprint or DNA profile. Offering him the photos keeps the working relationship intact." },
          { text: "Let him in. He outranks everyone here and it's his department's scene.", score: { pres: -12, team: -3 },
            flag: { err: 10, nij: "B5-B", text: "Let a commander walk into the scene without logging in or wearing PPE." },
            feedback: "That is command interference, error #10 on Geberth's list. Rank does not stop someone from contaminating a scene, and he is carrying coffee into it." },
          { text: "Let him in, but write his name down yourself afterward.", score: { pres: -8 },
            flag: { err: 2, text: "Allowed an unnecessary person into the scene." },
            feedback: "Better than nothing, but the problem is the entry itself. Unneeded people add evidence and destroy it. Keep the scene to people who are actively working it." }
        ]
      }
    ],
    facts: ["ramsey"]
  },

  /* ---------------- 4. PERIMETER ---------------- */
  {
    id: "perimeter",
    type: "zones",
    chapter: "Securing the Scene",
    nij: "B2 · B5",
    time: "10:40",
    title: "Set the perimeter",
    intro: `Patrol taped only the front walk. Use the site plan to set up the scene properly. Pick a marker, then tap each area.
      <ul class="tight">
        <li><b>Inner perimeter:</b> anywhere evidence is expected, and any route a perpetrator could have used to enter or leave.</li>
        <li><b>Outer perimeter:</b> a border around the inner perimeter so people can move without crossing it.</li>
        <li><b>Secure area:</b> where responders, family and staging can gather away from the public.</li>
      </ul>
      The lesson's rule: <b>larger is always better.</b>`,
    zones: [
      { id: "house",    label: "House interior",                      answer: "inner",  why: "The body and nearly all the evidence are inside." },
      { id: "porch",    label: "Front porch and front door",          answer: "inner",  why: "This is the forced entry point, and the uncollected newspapers on it are part of the timeline." },
      { id: "back",     label: "Back yard, side yards and back door", answer: "inner",  why: "These are possible entry or exit routes. Until you've confirmed the back door and windows are locked, assume someone could have used them." },
      { id: "yard",     label: "Front yard and driveway",             answer: "outer",  why: "This buffer lets responders move around without crossing the inner perimeter." },
      { id: "street",   label: "Sidewalk and street frontage",        answer: "outer",  why: "Push the outer line to the street. Larger is better, and it keeps onlookers and media back." },
      { id: "neighbor", label: "Across-street driveway (Carol Haynes's)", answer: "secure", why: "A secure area for the command post, the RP and family, out of the public eye and off the scene." }
    ],
    facts: ["ramsey"]
  },

  /* ---------------- 6. THE SCENE ---------------- */
  {
    id: "scene",
    type: "scene",
    chapter: "Documenting the Scene",
    nij: "C1–C4",
    time: "10:50",
    title: "Document the scene",
    intro: `You are suited up and inside. Start with <b>orientation photographs</b> of every room. Then tap each item on the sketch to examine it, and work in order: <b>photograph → scale/measure → collect</b>. Nothing gets collected before it is documented. Don't move the body yet.`,
    overallPenalty: { doc: -6 },
    missPenalty: { doc: -4 },
    items: [
      {
        id: "body", label: "Decedent", x: 248, y: 330, key: false,
        observe: "An adult male lies face down (prone) between the kitchen peninsula and the table, head toward the counter corner. He is wearing flannel pajama pants, a gray T-shirt and one slipper. There is a strong odor of decomposition.",
        note: "Decedent prone on kitchen floor, head toward peninsula corner. Pajama pants, gray T-shirt, L slipper on.",
        actions: [
          { id: "photo", label: "Photograph as found", doc: true },
          { id: "measure", label: "Measure from two fixed points", doc: true, requires: ["photo"], note: "Top of head 31 cm S of peninsula corner; heels 142 cm W of table leg (NE)." }
        ],
        required: ["photo", "measure"],
        info: "Everything on the body is examined in the next phase. For now, document his position and leave him where he is."
      },
      {
        id: "corner", label: "Counter corner", x: 222, y: 232, key: true, evidence: true,
        observe: "The lower corner of the peninsula countertop, 91 cm above the floor, has a small dried smear of blood with two short gray hairs stuck in it.",
        note: "Dried blood smear with two gray hairs on SW corner of peninsula, 91 cm above floor.",
        actions: [
          { id: "photo", label: "Photograph in place", doc: true },
          { id: "scale", label: "Close-up with scale", doc: true, requires: ["photo"] },
          { id: "collect", label: "Swab blood and collect hairs", collect: true, requires: ["photo", "scale"],
            package: {
              prompt: "How do you package the swab and the hairs?",
              options: [
                { text: "Air-dry the swab, then put the swab box and the folded paper with the hairs in a sealed, labeled paper envelope.", correct: true, feedback: "Correct. Biological evidence stays dry and breathable, and the label and seal start the chain of custody." },
                { text: "Put them straight into a plastic zip bag so nothing falls out.", score: { pres: -10 }, flag: { nij: "C4", text: "Packaged moist biological evidence in plastic." }, feedback: "Plastic traps moisture, and mold and bacteria degrade DNA. A wrongly preserved item is worthless." },
                { text: "Put them in an airtight paint can.", score: { pres: -6 }, feedback: "Airtight cans are for volatile evidence such as fire debris that may contain accelerant. Biological evidence needs to breathe." }
              ]
            } }
        ],
        required: ["photo", "scale", "collect"],
        question: {
          prompt: "Blood and hair from his head ended up on the counter. Which principle does this show?",
          options: [
            { text: "Locard's Exchange Principle: every contact leaves a trace.", correct: true, feedback: "Correct. Locard's principle applies to any contact, accidental or not. This trace places his head at that corner." },
            { text: "The CSI effect.", score: { sense: -3 }, feedback: "The CSI effect is about TV-driven expectations. This is Locard: contact leaves a trace." },
            { text: "Chain of custody.", score: { sense: -3 }, feedback: "Chain of custody tracks evidence after you collect it. This is Locard's Exchange Principle." }
          ]
        },
        fact: "locard"
      },
      {
        id: "nitro", label: "Pill bottle on floor", x: 300, y: 300, key: true, evidence: true,
        observe: "An amber prescription bottle lies on its side on the floor about 30 cm past his right hand, cap off. Three small white tablets are scattered beside it. The label reads: NITROGLYCERIN 0.4 MG SL · RAYMOND ELLIS · Dissolve 1 tablet under tongue for chest pain.",
        note: "Open Rx bottle, nitroglycerin 0.4 mg SL (R. Ellis), on floor ~30 cm from R hand; 3 tablets on floor.",
        actions: [
          { id: "photo", label: "Photograph in place", doc: true },
          { id: "scale", label: "Close-up with scale", doc: true, requires: ["photo"] },
          { id: "collect", label: "Collect, count and inventory", collect: true, requires: ["photo", "scale"], note: "Nitroglycerin bottle collected: 3 tablets on floor + 19 in bottle. Inventoried with Ofc. Ruiz as witness." }
        ],
        required: ["photo", "scale", "collect"],
        question: {
          prompt: "What kind of evidence is this open nitroglycerin bottle?",
          options: [
            { text: "Physical, circumstantial evidence. It suggests he was having chest pain, but it doesn't prove that on its own.", correct: true, feedback: "Correct. It is a tangible object, and it needs inference: it fits chest pain, and the pathologist will test that idea." },
            { text: "Direct evidence that he died of a heart attack.", score: { sense: -5 }, flag: { err: 4, text: "Treated circumstantial evidence as proof of cause of death." }, feedback: "Direct evidence proves a fact without interpretation. A pill bottle can't tell you the cause of death; only the autopsy and the full investigation can." },
            { text: "Verbal evidence, because it has writing on the label.", score: { sense: -3 }, feedback: "Verbal evidence is a person's testimony. A labeled bottle, like any document, is physical evidence." }
          ]
        }
      },
      {
        id: "chair", label: "Overturned chair", x: 300, y: 372, key: true,
        observe: "A wooden kitchen chair lies on its back between the table and the decedent, pushed about a meter from its place at the table.",
        note: "Kitchen chair overturned on its back, ~1 m from its place at W side of table.",
        actions: [
          { id: "photo", label: "Photograph in place", doc: true },
          { id: "measure", label: "Measure and sketch position", doc: true, requires: ["photo"] }
        ],
        required: ["photo", "measure"],
        info: "Collecting furniture is rarely needed. Its position is the evidence here, so photographs and measurements preserve it."
      },
      {
        id: "organizer", label: "Weekly pill organizer", x: 140, y: 102, key: true, evidence: true,
        observe: "A seven-day AM/PM pill organizer sits on the counter. Sunday AM and Sunday PM are empty. Every compartment from Monday AM through Saturday PM is still full.",
        note: "Pill organizer: Sun AM & PM empty; Mon AM through Sat PM full.",
        actions: [
          { id: "photo", label: "Photograph lid by lid", doc: true },
          { id: "collect", label: "Collect and inventory", collect: true, requires: ["photo"] }
        ],
        required: ["photo", "collect"],
        question: {
          prompt: "Why does this organizer matter?",
          options: [
            { text: "It suggests he took his Sunday evening pills but never took his Monday morning pills. That helps set the time of death.", correct: true, feedback: "Correct. It's circumstantial evidence for the timeline, and it lines up with other clues you'll find." },
            { text: "It proves he overdosed.", score: { sense: -5 }, feedback: "Nothing here points to an overdose. Every compartment from Monday on is full. Stay with what the evidence shows." },
            { text: "It doesn't matter in a death that looks natural.", score: { sense: -5 }, flag: { err: 4, text: "Dismissed timeline evidence because the death looked natural." }, feedback: "Everything is evidence, the lesson's second basic principle. This one may be the best clock in the house." }
          ]
        }
      },
      {
        id: "meds", label: "Prescription bottles", x: 82, y: 102, key: true, evidence: true,
        observe: "In the cabinet beside the sink: lisinopril 20 mg, metformin 1000 mg, atorvastatin 40 mg and aspirin 81 mg (over the counter). All are in Raymond Ellis's name, prescribed by Dr. P. Natarajan (cardiology) and Dr. L. Moore (primary care). Pill counts match the fill dates.",
        note: "Rx: lisinopril 20 mg, metformin 1000 mg, atorvastatin 40 mg; OTC aspirin 81 mg. Prescribers Dr. Natarajan (cardiology), Dr. Moore (PCP). Counts consistent with fill dates.",
        actions: [
          { id: "photo", label: "Photograph labels", doc: true },
          { id: "collect", label: "Inventory, count and collect (with witness)", collect: true, requires: ["photo"] }
        ],
        required: ["photo", "collect"],
        info: "NIJ C4 calls for inventorying, collecting and safeguarding prescription and over-the-counter medications, with a witness. Medications tell you the medical history before anyone says a word."
      },
      {
        id: "phone", label: "Cell phone", x: 270, y: 102, key: true,
        observe: "A cell phone is charging on the peninsula. The lock screen shows 11 missed calls and 6 texts from \"Dana.\" The earliest missed call is Monday at 8:04 AM.",
        note: "Cell phone on peninsula: lock screen shows 11 missed calls from 'Dana', earliest Mon 10/12 08:04.",
        actions: [
          { id: "photo", label: "Photograph the lock screen as it appears", doc: true },
          { id: "search", label: "Unlock it and scroll through messages", bad: true, score: { sense: -8 },
            flag: { nij: "B7", text: "Searched phone contents without confirming legal authority." },
            feedback: "Stop. Searching the contents of a device can require consent or a warrant (NIJ B7: follow the laws on evidence collection). Document what is visible, secure the phone, and work with detectives and the family on consent." },
          { id: "secure", label: "Secure the phone for the ME office and note it for detectives", collect: true, requires: ["photo"], note: "Phone secured as property/evidence; contents not searched. Consent or warrant to be addressed with LCPD and next of kin." }
        ],
        required: ["photo", "secure"]
      },
      {
        id: "wallet", label: "Wallet", x: 330, y: 444, key: true,
        observe: "A leather wallet sits on the kitchen table with $142 in cash, two credit cards and a driver's license for Raymond E. Ellis, DOB 03/22/1959.",
        note: "Wallet on table: $142 cash, 2 credit cards, DL R. E. Ellis DOB 03/22/1959.",
        actions: [
          { id: "photo", label: "Photograph in place", doc: true },
          { id: "collect", label: "Count cash and inventory with a witness, both sign", collect: true, requires: ["photo"], note: "Wallet and contents inventoried with Ofc. Ruiz as witness; both signed property form." },
          { id: "pocket", label: "Pocket it for safekeeping and inventory later", bad: true, score: { pres: -8 },
            flag: { nij: "C4", text: "Took decedent's property without a witnessed inventory." },
            feedback: "Never handle money alone. The NIJ guide calls for inventory with a witness. It protects the property for the family and protects you from being accused of theft." }
        ],
        required: ["photo", "collect"],
        question: {
          prompt: "Cash and cards were left in plain view. What does that suggest?",
          options: [
            { text: "Robbery is less likely, but it isn't ruled out. Keep investigating.", correct: true, feedback: "Correct. It's circumstantial and points away from robbery. One clue doesn't close the question." },
            { text: "It proves no one else was ever in the house.", score: { sense: -4 }, feedback: "It doesn't prove that. It only makes one motive less likely." }
          ]
        }
      },
      {
        id: "table", label: "Dinner and newspaper", x: 400, y: 430, key: true,
        observe: "On the table: a plate with a half-eaten meal, a fork, a glass of water, and the Sunday 10/11 newspaper folded open to a half-finished crossword with a pen beside it.",
        note: "Table: half-eaten dinner; Sunday 10/11 newspaper open to half-finished crossword.",
        actions: [
          { id: "photo", label: "Photograph in place", doc: true },
          { id: "measure", label: "Note and sketch", doc: true, requires: ["photo"] }
        ],
        required: ["photo"]
      },
      {
        id: "backdoor", label: "Back door", x: 58, y: 230, key: true,
        observe: "The back door is closed. The deadbolt is engaged from the inside. There are no pry marks or damage on the door or frame.",
        note: "Back door closed, deadbolt engaged from inside, no tool marks.",
        actions: [
          { id: "photo", label: "Photograph lock and frame", doc: true },
          { id: "prints", label: "Ask the crime lab to check the door for latent prints", doc: true, requires: ["photo"], note: "Requested LCPD crime lab latent processing of back door (precautionary)." }
        ],
        required: ["photo"]
      },
      {
        id: "frontdoor", label: "Front door", x: 600, y: 72, key: true,
        observe: "The front door frame is splintered at the strike plate, from Officer Ruiz's forced entry at 09:24.",
        note: "Front door frame splintered at strike plate — police forced entry 09:24 (artifact).",
        actions: [
          { id: "photo", label: "Photograph and label as responder damage", doc: true }
        ],
        required: ["photo"],
        info: "Document responder damage as responder damage. Otherwise someone reading your report later may mistake it for a break-in."
      },
      {
        id: "porch", label: "Newspapers on porch", x: 690, y: 40, key: true,
        observe: "Two newspapers in plastic sleeves lie on the porch, Monday 10/12 and Tuesday 10/13. The mailbox holds Monday's and Tuesday's mail.",
        note: "Porch: uncollected newspapers Mon 10/12 and Tue 10/13; mail for Mon and Tue in box.",
        actions: [
          { id: "photo", label: "Photograph with dates visible", doc: true }
        ],
        required: ["photo"]
      },
      {
        id: "thermostat", label: "Thermostat", x: 470, y: 300, key: true,
        observe: "The hallway thermostat is set to heat at 78°F and reads 77°F. Your own thermometer reads 77.0°F in the kitchen.",
        note: "Thermostat set 78°F (heat), reading 77°F. Ambient kitchen temp 77.0°F by investigator thermometer.",
        actions: [
          { id: "photo", label: "Photograph the display", doc: true },
          { id: "ambient", label: "Record ambient temp with your thermometer", doc: true, note: "Ambient temp 77.0°F, kitchen, digital thermometer." }
        ],
        required: ["photo", "ambient"],
        info: "Temperature is fragile evidence. Someone could change it in a minute, and it controls how fast the body cools and decomposes."
      },
      {
        id: "bedroom", label: "Bedroom", x: 760, y: 430, key: true,
        observe: "The bed is made and has not been slept in. A water bowl on the floor is empty. A frightened orange cat is hiding under the bed.",
        note: "Bedroom: bed made, not slept in. Cat (orange) under bed; water bowl empty.",
        actions: [
          { id: "photo", label: "Photograph the bedroom", doc: true },
          { id: "cat", label: "Have an officer arrange care for the cat", doc: false, note: "Cat 'Biscuit' secured; daughter or neighbor to take custody.", feedback: "Good. NIJ B2-E: remove or secure animals. Animals left in a scene can disturb evidence, and sometimes the body." }
        ],
        required: ["photo", "cat"]
      },
      {
        id: "tv", label: "Living room TV", x: 780, y: 170, key: false,
        observe: "The TV is on, tuned to a sports channel, beside a recliner with a folded blanket.",
        note: "Living room TV on (sports channel) at entry per Ruiz.",
        actions: [
          { id: "photo", label: "Photograph", doc: true },
          { id: "off", label: "Turn the TV off, it's distracting", bad: true, score: { pres: -4 },
            feedback: "Leave the scene as you found it until it's documented. The TV being on is part of the picture of his last evening." }
        ],
        required: ["photo"]
      }
    ],
    facts: ["nutshell", "locard"]
  },

  /* ---------------- 7. THE BODY ---------------- */
  {
    id: "body",
    type: "body",
    chapter: "Documenting the Body",
    nij: "D1–D5",
    time: "12:30",
    title: "Examine the body",
    intro: `The scene around him is documented. Now examine the most important piece of evidence there is. Work from the outside in, and <b>do not roll him</b> until the back of the body is photographed and examined.`,
    missPenalty: { doc: -5 },
    exams: [
      { id: "photos", label: "Photograph the body as found, with and without scales", side: "back", marker: [100, 60], required: true,
        finding: "Overall, mid-range and close-up photographs taken from four sides, with scales. Face not cleaned or altered.",
        note: "Body photographed as found (4 sides, with/without scale). Face not cleaned." },
      { id: "position", label: "Position and clothing", side: "back", marker: [100, 150], required: true, requires: ["photos"],
        finding: "Prone. Head toward the counter, face turned slightly left. Right arm extended toward the nitroglycerin bottle, left arm under the chest. Flannel pajama pants, gray T-shirt, slipper on left foot; right slipper near the chair. Clothing intact, not torn or disarranged.",
        note: "Prone; R arm extended toward Rx bottle, L arm beneath chest. Clothing intact. R slipper near chair." },
      { id: "head", label: "Head and face", side: "back", marker: [100, 28], required: true, requires: ["photos"],
        finding: "A 3.2 cm laceration of the right forehead with abraded, bruised, ragged edges and bridges of tissue in the depth of the wound. A small amount of dried blood is on the floor beneath. Reddish-brown fluid is seeping from the nose and mouth. Fly eggs are in the nostrils and the wound.",
        note: "3.2 cm laceration R forehead, abraded margins with tissue bridging. Reddish-brown fluid from nose/mouth. Fly eggs at nostrils and wound.",
        question: {
          prompt: "Ragged, abraded edges with tissue bridges across the wound point to what kind of injury?",
          options: [
            { text: "Blunt force, such as striking a hard edge.", correct: true, feedback: "Correct. Blunt force tears the skin and leaves tissue bridges. A sharp blade cuts cleanly through everything." },
            { text: "A sharp-force (knife) wound.", score: { sense: -5 }, feedback: "Incised wounds have clean edges and no tissue bridges. This wound is torn." },
            { text: "A gunshot wound.", score: { sense: -5 }, feedback: "Nothing here suggests a gunshot. There is no defect pattern, soot or stippling." }
          ]
        },
        question2: {
          prompt: "What is the reddish-brown fluid from the nose and mouth most likely to be?",
          options: [
            { text: "Decomposition purge fluid. Document its location and pattern.", correct: true, feedback: "Correct. Gas pressure from decomposition pushes purge fluid out. It is easy to mistake for bleeding from an assault." },
            { text: "Internal bleeding from a beating.", score: { sense: -5 }, flag: { text: "Mistook decomposition purge for trauma." }, feedback: "With the decomposition you're seeing, this is purge fluid. Document it, and let the autopsy look for internal injury." }
          ]
        },
        fact: "purge" },
      { id: "hands", label: "Hands and arms", side: "back", marker: [40, 170], required: true, requires: ["photos"],
        finding: "No defensive injuries. Fingernails intact, with no visible foreign material. Early skin slippage on the left forearm. Faded \"USMC\" tattoo on the left forearm.",
        note: "Hands: no defense injuries, nails intact. Early skin slippage L forearm. 'USMC' tattoo L forearm.",
        question: {
          prompt: "Do you bag his hands before transport?",
          options: [
            { text: "Yes, in clean paper bags secured at the wrists, because cause and manner are still unknown.", correct: true, feedback: "Correct. It's cheap insurance under the homicide-until-proven-otherwise approach, and paper keeps the hands from sweating in plastic (NIJ D3-C)." },
            { text: "Yes, in plastic bags so nothing leaks.", score: { pres: -8 }, flag: { nij: "D3-C", text: "Bagged hands in plastic." }, feedback: "Plastic traps moisture. Use unused paper bags." },
            { text: "No, it looks natural.", score: { pres: -4 }, flag: { err: 3, text: "Skipped a preservation step because the death 'looked natural'." }, feedback: "Bagging hands is optional at some scenes, but \"it looks natural\" is not a reason. There is an injury and an unwitnessed death, so preserve the hands." }
          ]
        } },
      { id: "rigor", label: "Rigor mortis", side: "back", marker: [118, 232], required: true, requires: ["photos"],
        finding: "Jaw, neck, elbows, wrists, knees and ankles all move freely. Rigor is absent throughout.",
        note: "Rigor absent in all joints.",
        question: {
          prompt: "Rigor is completely gone. With the other changes you're seeing, what does that suggest?",
          options: [
            { text: "Rigor has already developed and passed, so he has probably been dead more than a day and a half.", correct: true, feedback: "Correct. Rigor typically shows within 2–6 hours, is fully developed around 12 hours, and resolves over roughly 24–48 hours. Heat speeds it up. No rigor plus decomposition means it has passed." },
            { text: "He died within the last two hours, before rigor started.", score: { sense: -5 }, feedback: "No rigor can mean very early, but the decomposition and the timeline rule that out. Read all the changes together." }
          ]
        } },
      { id: "temp", label: "Body temperature", side: "back", marker: [100, 205], required: true, requires: ["photos"],
        finding: "By your office's protocol, body temperature is 77.4°F. Ambient is 77.0°F.",
        note: "Body temp 77.4°F (per office protocol); ambient 77.0°F.",
        question: {
          prompt: "The body is the same temperature as the room. What does that tell you?",
          options: [
            { text: "The body has finished cooling to room temperature, so body temperature can't narrow the time of death any further.", correct: true, feedback: "Correct. Cooling formulas such as the Glaister rule of thumb only work while the body is still cooling. Once it reaches room temperature, that clock stops." },
            { text: "He died recently, because the body isn't cold.", score: { sense: -5 }, feedback: "The room is 77°F. A body cools toward the room, not toward cold. It got there days ago." }
          ]
        } },
      { id: "roll", label: "Roll the body (with assistance) and photograph the front", side: "front", marker: [100, 100], required: true, requires: ["photos", "position", "head", "hands", "rigor", "temp"], gate: true,
        finding: "With Officer Ruiz's help, you roll him onto a clean sheet and photograph the front of the body and the floor beneath it.",
        note: "Body rolled onto clean sheet with assistance; anterior body and surface beneath photographed." },
      { id: "livor", label: "Livor mortis", side: "front", marker: [100, 160], required: true, requires: ["roll"],
        finding: "Purple livor on the face, chest, abdomen and front of the thighs. It does not blanch under firm pressure. The forehead, chin, chest and knees, where they pressed against the floor, are pale.",
        note: "Livor anterior (face, chest, abdomen, anterior thighs), fixed/non-blanching; contact blanching at forehead, chin, chest, knees.",
        question: {
          prompt: "Fixed livor on the front, with pale pressure points where he touched the floor. What does that mean?",
          options: [
            { text: "It matches the face-down position. He has been lying like this since shortly after death and was not moved later.", correct: true, feedback: "Correct. Livor settles with gravity and usually becomes fixed after about 8–12 hours. If it didn't match his position, you would suspect the body had been moved (NIJ C3-C)." },
            { text: "He was moved here after death.", score: { sense: -6 }, feedback: "Moving the body would leave livor that doesn't match the position. This livor matches." }
          ]
        } },
      { id: "anterior", label: "Front of torso", side: "front", marker: [100, 120], required: true, requires: ["roll"],
        finding: "Three ECG electrode pads on the chest, placed by EMS. No injuries to the chest, abdomen or neck. Green discoloration of the lower abdomen spreading to the flanks, early marbling over the shoulders, and mild bloating of the abdomen.",
        note: "3 ECG pads on chest (EMS artifact). No anterior injuries. Green discoloration lower abdomen; early marbling shoulders; mild abdominal bloating.",
        question: {
          prompt: "What do you do about the three ECG pads on his chest?",
          options: [
            { text: "Leave them in place and document them as EMS artifacts.", correct: true, feedback: "Correct. NIJ D2-I: document treatment and resuscitation efforts, and leave medical equipment in place for the pathologist." },
            { text: "Peel them off so the photos look clean.", score: { pres: -6 }, flag: { nij: "D8-A", text: "Removed medical/resuscitative equipment at the scene." }, feedback: "Leave medical equipment in place. The pathologist needs to see it, and your report explains it." }
          ]
        } },
      { id: "ident", label: "Identification", side: "front", marker: [100, 20], required: true, requires: ["roll"],
        finding: "His face is swollen and discolored from decomposition. The driver's license photo, the USMC tattoo and the location are consistent with Raymond Ellis.",
        note: "Presumptive ID: R. E. Ellis (DL, residence, USMC tattoo). Scientific confirmation pending.",
        question: {
          prompt: "How should identification be confirmed?",
          options: [
            { text: "Treat it as presumptive for now, then confirm scientifically with fingerprints or dental records. As a Marine veteran he probably has fingerprints on file with the FBI.", correct: true, feedback: "Correct. Visual ID is unreliable once decomposition starts. Scientific methods include fingerprints, dental records, X-rays and DNA (NIJ D4)." },
            { text: "Have his daughter look at him in the kitchen.", score: { sense: -6, team: -3 }, flag: { nij: "D4", text: "Planned a visual ID of a decomposing body by family at the scene." }, feedback: "Visual identification isn't reliable with decomposition, and it would be traumatic for her. Use scientific methods." },
            { text: "The license in the wallet is enough.", score: { sense: -4 }, feedback: "A license found near a body is circumstantial. It shows whose house this is, not whose body this is." }
          ]
        },
        fact: "namus" }
    ],
    facts: ["purge"]
  },

  /* ---------------- 8. THE RP ---------------- */
  {
    id: "carol",
    type: "interview",
    chapter: "Witnesses",
    nij: "C5 · E1–E2",
    time: "13:20",
    title: "Interview the reporting person",
    witness: { name: "Carol Haynes, 72", role: "Neighbor · reporting person (RP)", initials: "CH" },
    intro: "Carol is waiting in the secure area across the street. Interview witnesses one at a time. You have time for <b>5 questions</b>.",
    maxQuestions: 5,
    mustAsk: ["last", "discover", "touchc"],
    missPenalty: { doc: -5 },
    missFlag: { err: 8, nij: "E1-E2", text: "Missed key discovery or last-seen information from the RP." },
    questions: [
      { id: "last", q: "When did you last see Raymond alive?",
        a: "Sunday evening, around seven. He was pulling his trash bins to the curb. He waved and went back inside.",
        note: "RP last saw decedent alive Sun 10/11 ~19:00, taking trash bins to curb." },
      { id: "discover", q: "What made you check on him this morning?",
        a: "His daughter Dana called me around nine. She hadn't reached him since Sunday. I saw two newspapers on the porch, and when I knocked I smelled... something. So I called 911.",
        note: "Daughter called RP ~09:00 Wed. RP saw two papers on porch, noticed odor, called 911 at 09:08." },
      { id: "touchc", q: "Did you go inside or touch anything?",
        a: "No. I opened the storm door to knock and looked through the front window. I have a key somewhere but I couldn't find it.",
        note: "RP did not enter. Touched storm door handle; looked through front window. RP has a key (not located)." },
      { id: "visitors", q: "Have you noticed any visitors, strangers or trouble at the house lately?",
        a: "No, nothing like that. He's a homebody. His daughter visits every few weeks. No arguments, nobody strange around.",
        note: "RP: no recent visitors, strangers or disputes. Daughter visits every few weeks." },
      { id: "health", q: "Do you know anything about his health?",
        a: "He had a heart attack a few years ago and got a stent. Lately he walked slower, and he told me last week he'd had \"heartburn.\"",
        note: "RP: prior heart attack with stent; recently slower; mentioned 'heartburn' last week." },
      { id: "mood", q: "How had he been doing since his wife passed?",
        a: "Sad at first, of course. Linda died in 2021. But he had his routines: coffee at the diner, his crosswords, the cat. He seemed all right.",
        note: "RP: widower since 2021; routines (diner, crosswords, cat); seemed all right." },
      { id: "lead", q: "He just had a heart attack, right?",
        a: "I... I suppose so? You'd know better than me.",
        bad: true, score: { sense: -5 }, flag: { err: 4, text: "Asked a witness a leading question." },
        feedback: "That's a leading question. It puts your theory in her mouth and contaminates her account. Keep questions open: \"What did you notice?\"" },
      { id: "help", q: "Could you come inside and show me where he kept his medications?",
        a: "Oh — well, if you need me to...",
        bad: true, score: { pres: -8 }, flag: { err: 2, text: "Invited a civilian witness into the scene." },
        feedback: "Never bring a witness into the scene. Friends and relatives are among the lesson's five scene contaminators, even when they mean well." }
    ]
  },

  /* ---------------- 9. THE DAUGHTER ---------------- */
  {
    id: "dana-arrives",
    type: "questions",
    chapter: "Next of Kin",
    nij: "D7 · F4",
    time: "13:45",
    title: "The daughter arrives",
    questions: [
      {
        id: "notify",
        context: `A car pulls up at the outer perimeter. <b>Dana Ellis-Ward</b>, 41, has driven in from out of town since Carol called her this morning. An officer walks her to the secure area. She hasn't been officially told anything.`,
        prompt: "How do you deliver the news?",
        options: [
          { text: "Introduce yourself, sit down with her privately, and tell her plainly: \"I'm very sorry. Your father, Raymond, has died.\" Then stay and answer her questions.", correct: true,
            feedback: "Correct. Notify in person, in private, with clear words like \"died\" and \"dead\" rather than euphemisms. The lesson stresses that communication, empathy and cultural competency are core skills for a death investigator." },
          { text: "\"We lost him. He's in a better place now.\"", score: { team: -6 },
            flag: { nij: "D7", text: "Used euphemisms during death notification." },
            feedback: "Euphemisms like \"lost\" or \"passed\" leave room for confusion and false hope. Be kind, and be clear." },
          { text: "Tell the officer to let her know while you finish your paperwork.", score: { team: -8 },
            flag: { err: 9, nij: "D7", text: "Delegated notification without planning who would do it or confirming it was done." },
            feedback: "NIJ D7 requires you to make sure notification happens: decide who does it, and document when. She's standing in front of you. Do it yourself, properly." }
        ]
      },
      {
        id: "seehim",
        context: `Dana is crying. <q>I need to see him. Let me go in. And I want to clean up that kitchen before anyone else sees it like that.</q>`,
        prompt: "What do you say?",
        options: [
          { text: "Explain gently that the house is still being documented and she can't go in yet. Tell her there will be a chance to see him later at the funeral home, and that you'll give her information on professional scene-cleanup services.", correct: true,
            feedback: "Correct. Relatives are one of the five scene contaminators, usually with the best intentions. NIJ F4 says to tell families about support services, including death scene cleanup, and to make sure they aren't left alone with the body." },
          { text: "Let her in for a few minutes. She's his daughter and it's her family's house.", score: { pres: -10, team: -2 },
            flag: { err: 2, text: "Let next of kin into an undocumented scene." },
            feedback: "Compassion matters, but she would be walking into an active scene, and the sight would be traumatic. Protect the scene and protect her." },
          { text: "Tell her the details of the decomposition so she understands why she can't go in.", score: { team: -6 },
            feedback: "Honest doesn't mean graphic. Tell her what she needs to know, without details that will stay with her for years." }
        ]
      },
      {
        id: "csi",
        context: `<q>Can't you just run his DNA or something and tell me what happened tonight? On TV they know in an hour.</q>`,
        prompt: "How do you answer?",
        options: [
          { text: "Explain that the medical examiner will likely examine him in the next day or two, that toxicology usually takes several weeks, and that you'll give her the office's number and a case number.", correct: true,
            feedback: "Correct. That's the CSI effect, built on the myths of lab capabilities and schedules. NIJ F4 says to give families a realistic timetable for releasing the body and the reports." },
          { text: "\"We'll have answers by tonight.\"", score: { team: -6 },
            flag: { nij: "F4", text: "Gave the family an unrealistic timeline." },
            feedback: "A promise you can't keep damages trust. Real autopsies, toxicology and reports take days to weeks." }
        ]
      },
      {
        id: "autopsy",
        context: `<q>Does there have to be an autopsy? Dad hated the idea of being cut on.</q>`,
        prompt: "What do you tell her?",
        options: [
          { text: "Tell her honestly that because his death was sudden, unwitnessed and involved a head injury, the medical examiner will decide whether an autopsy is needed. Write down her concern and pass it to the pathologist.", correct: true,
            feedback: "Correct. NIJ F4-A: tell the family whether an autopsy is required. NIJ E5-I: document religious, cultural or personal objections to autopsy. Some offices can limit the exam when it's legally appropriate." },
          { text: "\"No, we can skip it if you don't want one.\"", score: { sense: -6 },
            feedback: "You don't have the authority to promise that. The ME decides under the statute. Here, the head injury means the pathologist has to rule trauma in or out." }
        ]
      }
    ],
    facts: ["certificate"]
  },
  {
    id: "dana",
    type: "interview",
    chapter: "Next of Kin",
    nij: "E2–E5",
    time: "14:05",
    title: "Build the decedent profile",
    witness: { name: "Dana Ellis-Ward, 41", role: "Daughter · next of kin", initials: "DE" },
    intro: "Victimology asks who the victim was and what was going on in their life. Dana agrees to talk. You have time for <b>6 questions</b>.",
    maxQuestions: 6,
    mustAsk: ["lastcall", "medical", "mental"],
    missPenalty: { doc: -5 },
    missFlag: { err: 7, nij: "E2–E4", text: "Incomplete victimology: missed terminal history, medical or mental health history." },
    questions: [
      { id: "lastcall", q: "When did you last talk to your father, and how did he sound?",
        a: "Sunday, around 6:40 in the evening. He said he'd had heartburn for two days and was tired. He was going to call his doctor Monday. Then he didn't answer Monday morning, and he always answers.",
        note: "NOK last spoke with decedent Sun 10/11 ~18:41. Complained of 'heartburn' x2 days, fatigue; planned to call doctor Mon. Did not answer from Mon AM." },
      { id: "medical", q: "What medical problems did he have, and who were his doctors?",
        a: "A heart attack in 2019, and they put a stent in. High blood pressure, type 2 diabetes, cholesterol. He quit smoking after the heart attack. He sees Dr. Natarajan, a cardiologist, and Dr. Moore. He skipped his cardiology follow-up in September.",
        note: "Hx: MI 2019 w/ stent, HTN, type 2 DM, hyperlipidemia; ex-smoker (quit 2019). Cardiology: Dr. Natarajan; PCP: Dr. Moore. Missed Sept cardiology f/u." },
      { id: "mental", q: "Has he ever had depression, or talked about hurting himself?",
        a: "Never. He was sad after Mom died, and he did grief counseling at the VA for a few months in 2021. But he never said anything like that. He was planning a fishing trip with my son in November.",
        note: "Mental health: grief counseling at VA 2021; no known depression dx, no suicidal statements or attempts. Future plans (Nov fishing trip)." },
      { id: "social", q: "What was his daily life like? Work, routines, alcohol?",
        a: "Retired HVAC technician. Marine veteran. Coffee at the diner Tuesdays and Thursdays, crosswords, the cat. Maybe one beer with a game. No money problems that I know of.",
        note: "Social: retired HVAC tech, USMC veteran; routines; occasional beer; no known financial problems." },
      { id: "conflict", q: "Was anyone upset with him, or did anyone else have access to the house?",
        a: "No one. Carol and I are the only ones with keys. He kept to himself.",
        note: "Keys: daughter and RP only. No known conflicts." },
      { id: "marks", q: "Did he have any tattoos or other identifying marks?",
        a: "A USMC tattoo on his left forearm. A scar on his right knee from a surgery in the '90s.",
        note: "NOK reports USMC tattoo L forearm; surgical scar R knee." },
      { id: "fault", q: "Why didn't you check on him sooner?",
        a: "(She starts crying.) I... I thought he was just busy...",
        bad: true, score: { team: -6 }, flag: { text: "Asked next of kin a blaming question." },
        feedback: "That question assigns blame. It hurts her and gets you nothing you need. Keep the interview about facts." },
      { id: "drink", q: "Was he a drinker? Is that why he fell?",
        a: "What? No! Why would you say that?",
        bad: true, score: { sense: -5, team: -3 }, flag: { err: 4, text: "Asked a leading, accusatory question." },
        feedback: "That's leading and accusatory. Ask an open question about alcohol use instead, the way the social history question does." }
    ]
  },

  /* ---------------- 10. MEDIA ---------------- */
  {
    id: "media",
    type: "questions",
    chapter: "Media",
    nij: "D6-A",
    time: "14:35",
    title: "A reporter at the tape",
    questions: [
      {
        id: "reporter",
        context: `A local TV reporter calls out to you from the sidewalk: <q>Was it a murder? Can you confirm it's Raymond Ellis? We heard there was blood everywhere.</q>`,
        prompt: "What do you do?",
        options: [
          { text: "Say only that you can't comment, and refer her to the ME office's public information officer. Don't confirm a name, a cause or any details.", correct: true,
            feedback: "Correct. No one talks to the media without authorization. A name isn't released until next of kin are notified, and anything you say about \"blood\" can damage the case and hurt the family." },
          { text: "\"It looks like natural causes. Mr. Ellis just fell.\"", score: { sense: -10, team: -4 },
            flag: { nij: "D6-A", text: "Released a name and speculated on cause of death to the media." },
            feedback: "You just released a name and guessed at a cause before the autopsy, without authorization. Know what you'll say and how before you say anything, and here that's nothing." },
          { text: "\"There wasn't blood everywhere, just a little by his head.\"", score: { sense: -8 },
            flag: { nij: "D6-A", text: "Released scene details to the media." },
            feedback: "Correcting a rumor still releases scene details. Details only the investigators know can be important later." }
        ]
      }
    ]
  },

  /* ---------------- 11. TIME SINCE DEATH ---------------- */
  {
    id: "pmi",
    type: "pmi",
    chapter: "Time Since Death",
    nij: "D5 · E2",
    time: "14:45",
    title: "Estimate the time since death",
    intro: "Postmortem changes give you broad ranges. Circumstantial evidence often narrows them. Select every clue that helps set the timeline, then make your estimate.",
    clues: [
      { id: "c1", text: "Pill organizer: Sunday PM empty, Monday AM full", good: true },
      { id: "c2", text: "Monday and Tuesday newspapers uncollected", good: true },
      { id: "c3", text: "First missed call from Dana: Monday 8:04 AM", good: true },
      { id: "c4", text: "Bed made and not slept in", good: true },
      { id: "c5", text: "Neighbor saw him alive Sunday ~7:00 PM; phone call 6:41 PM", good: true },
      { id: "c6", text: "Sunday paper open to a half-done crossword; half-eaten dinner", good: true },
      { id: "c7", text: "Rigor resolved, livor fixed, early decomposition", good: true },
      { id: "c8", text: "The USMC tattoo", good: false, why: "It helps with identification, not timing." },
      { id: "c9", text: "Front door frame splintered", good: false, why: "That was police entry at 09:24 Wednesday." }
    ],
    options: [
      { text: "Within the last 12 hours", score: { sense: -10 }, feedback: "Rigor has passed and decomposition has started, so this is far too recent. Nobody saw or heard from him after Sunday evening." },
      { text: "Monday afternoon or evening", score: { sense: -6 }, feedback: "Close, but his Monday morning pills were never taken, the Monday paper was never collected, and he missed calls from 8:04 AM Monday." },
      { text: "Sunday evening or night: after about 7 PM Sunday and before Monday morning", correct: true, feedback: "Correct. That's about 2½ days before discovery. Last seen Sunday about 7 PM; Sunday pills taken; bed never slept in; no Monday pills, paper or calls answered. The postmortem changes are consistent with that in a 77°F house." },
      { text: "More than a week ago", score: { sense: -8 }, feedback: "He was seen alive Sunday, and the decomposition is early, not advanced." }
    ]
  },

  /* ---------------- 12. WRAP-UP ---------------- */
  {
    id: "wrap",
    type: "sequence",
    chapter: "Completing the Investigation",
    nij: "D6–F3",
    time: "15:05",
    title: "Release the scene properly",
    intro: "The documentation is done. Take the remaining steps in order.",
    penalty: { doc: -3, pres: -2 },
    steps: [
      { id: "debrief", text: "Debrief with LCPD: share findings and assign who handles notification, media and evidence", nij: "D6", why: "The debriefing sets each agency's responsibilities after the scene." },
      { id: "inventory", text: "Inventory property and clothing on the body, with a witness", nij: "D8-B", why: "Property is inventoried before the body is packaged." },
      { id: "tagbody", text: "Place an ID tag on the body", nij: "D8-E", why: "Tag the body first, so it can't be misidentified at the receiving facility." },
      { id: "bag", text: "Wrap him in a clean sheet, place him in the body bag, tag the bag and seal it, recording the seal number", nij: "D8-E/F", why: "A numbered seal shows the bag was not opened between the scene and the morgue." },
      { id: "transport", text: "Supervise removal and arrange secure transport to the ME facility", nij: "D8-G/H · F1", why: "You keep jurisdiction over the body during transport, which protects the chain of custody." },
      { id: "exit", text: "Do an exit walk-through: collect all evidence and equipment, report any hazards", nij: "F3", why: "Make sure nothing is left behind, and tell the family about any unsafe conditions, such as biohazard." },
      { id: "family", text: "Give Dana your card, the case number, the release timetable and cleanup resources", nij: "F4", why: "Families need a timetable and resources before you leave." }
    ],
    facts: ["simpson"]
  },
  {
    id: "specialists",
    type: "questions",
    chapter: "Completing the Investigation",
    nij: "D6-B",
    time: "15:45",
    title: "Who else do you need?",
    questions: [
      {
        id: "spec",
        context: "The lesson's comparison chart: for a <b>recent death</b> where legal consequences are immediate, the ME or coroner works the scene, and the pathologist (and an odontologist, if needed) examines the remains.",
        prompt: "What do you request?",
        options: [
          { text: "Autopsy by the forensic pathologist, with toxicology. Fingerprint or dental comparison for identification. No entomologist or anthropologist.", correct: true,
            feedback: "Correct. The autopsy has to settle the head injury against the heart disease. Fingerprints or dental records confirm ID. The timeline is already set by witnesses, so an entomologist adds nothing, and the remains aren't skeletal, so you don't need an anthropologist." },
          { text: "All of them: pathologist, entomologist, anthropologist, odontologist and a botanist.", score: { sense: -6 },
            feedback: "More isn't always better. Each specialist should answer a question you actually have. An entomologist is useful when the time of death is unknown, but here witnesses have already set it." },
          { text: "None. He had heart disease, so no autopsy is needed.", score: { sense: -10 },
            flag: { err: 4, text: "Skipped the autopsy because of a presumed cause." },
            feedback: "There is an unexplained head injury in an unwitnessed death. Only the autopsy can tell you whether it contributed." }
        ]
      },
      {
        id: "prelim",
        prompt: "What do you write for manner of death in your scene report?",
        options: [
          { text: "Pending autopsy. Scene findings are consistent with a collapse, and no evidence of foul play was found at the scene.", correct: true,
            feedback: "Correct. You report what you found. The medical examiner certifies cause and manner after the autopsy." },
          { text: "Accident: he fell and hit his head.", score: { sense: -8 }, flag: { err: 4, text: "Assigned manner of death at the scene." },
            feedback: "That's a conclusion the evidence doesn't support yet. Did the fall cause the death, or did the death cause the fall?" },
          { text: "Natural: heart attack.", score: { sense: -5 }, flag: { err: 4, text: "Assigned manner of death at the scene." },
            feedback: "That may turn out to be right, but it isn't yours to certify, and it isn't proven yet. Write \"pending.\"" }
        ]
      }
    ],
    facts: ["abmdi"]
  },

  /* ---------------- 13. AUTOPSY + CERTIFICATE ---------------- */
  {
    id: "autopsy",
    type: "certificate",
    chapter: "The Medical Examiner",
    nij: "F2",
    time: "Fri 09:00",
    title: "Two days later: the autopsy",
    findings: `
      <div class="form-block">
        <div class="form-row"><span>Heart</span><b>540 g (enlarged); thickened left ventricle; healed scar from an old infarct in the front wall</b></div>
        <div class="form-row"><span>Coronary arteries</span><b>Severe atherosclerosis: left anterior descending 90% narrowed beyond the stent; right coronary 75%</b></div>
        <div class="form-row"><span>Head</span><b>3.2 cm laceration of the right forehead with a small bruise beneath the scalp. <u>No</u> skull fracture. <u>No</u> bleeding on or in the brain.</b></div>
        <div class="form-row"><span>Neck</span><b>No injuries; hyoid bone and larynx intact</b></div>
        <div class="form-row"><span>Toxicology</span><b>No alcohol; prescribed medications only; no drugs of abuse</b></div>
        <div class="form-row"><span>ID</span><b>Confirmed by fingerprint comparison (military record)</b></div>
      </div>`,
    partI: {
      prompt: "Part I, line (a): the underlying cause of death",
      options: [
        { text: "Cardiac arrest", feedback: "Cardiac arrest is a mechanism. Everyone's heart stops. Name the disease that caused it.", score: { sense: -6 } },
        { text: "Atherosclerotic and hypertensive cardiovascular disease", correct: true, feedback: "Correct. It's the underlying disease that started the chain of events." },
        { text: "Blunt force injury of the head", feedback: "The laceration was superficial: no fracture, no bleeding in the brain. It came from the collapse and didn't cause the death.", score: { sense: -6 } },
        { text: "Old age", feedback: "\"Old age\" is not an acceptable cause on a U.S. death certificate. Name the specific disease.", score: { sense: -6 } }
      ]
    },
    partII: {
      prompt: "Part II: another significant condition that contributed",
      options: [
        { text: "Type 2 diabetes mellitus", correct: true, feedback: "Correct. Diabetes speeds up coronary artery disease, so it contributed without being the underlying cause." },
        { text: "Laceration of the forehead", feedback: "It didn't contribute to the death. It's documented in the autopsy report, not on the certificate.", score: { sense: -4 } },
        { text: "Decomposition", feedback: "Decomposition is a postmortem change, not a contributing condition.", score: { sense: -4 } }
      ]
    },
    mechanism: {
      prompt: "Mechanism (the physiological change at death)",
      options: [
        { text: "Cardiac arrhythmia from heart muscle that wasn't getting enough blood", correct: true, feedback: "Correct. This is the most likely mechanism. It is the how, not the cause." },
        { text: "Bleeding from the scalp wound", feedback: "The blood loss was small, and the autopsy showed no significant bleeding.", score: { sense: -4 } }
      ]
    },
    manner: {
      prompt: "Manner of death",
      options: [
        { text: "Natural", correct: true, feedback: "Correct. Disease alone caused the death. The fall was the result of the collapse, not the cause of death." },
        { text: "Accident", feedback: "The fall didn't contribute. If the autopsy had found bleeding on the brain from that fall, the manner would be Accident, even with his heart disease.", score: { sense: -6 } },
        { text: "Homicide", feedback: "There's no evidence another person was involved: the doors were locked, nothing was taken, there were no defensive injuries and the neck was unremarkable.", score: { sense: -8 } },
        { text: "Suicide", feedback: "Nothing supports it. He had no history of suicidal thoughts, had future plans, and his medication counts were normal.", score: { sense: -8 } },
        { text: "Undetermined", feedback: "Undetermined is for cases where the evidence can't decide between manners. Here it clearly supports Natural.", score: { sense: -4 } }
      ]
    },
    whatIf: `<b>What if?</b> If the autopsy had found a subdural hematoma (bleeding on the brain) under that forehead wound, the fall would have contributed to his death. The manner would then be <b>Accident</b>, even though heart disease started the collapse. Same scene, different manner. This is why you treat every scene as a homicide until the evidence says otherwise, and why you don't assign manner at the scene.`,
    facts: ["certificate", "nas", "coroner", "meHistory"]
  },

  /* ---------------- 14. REPORT ---------------- */
  {
    id: "report",
    type: "report",
    chapter: "Case Closed",
    time: "Fri 15:00",
    title: "Your case review",
    reflections: [
      { id: "r1", prompt: "Which of Geberth's 10 most common errors do you think would be easiest to make at a scene like this one, and why?" },
      { id: "r2", prompt: "Raymond's death was natural. Explain why treating his scene as a homicide until proven otherwise was still the right call." }
    ]
  }
];

/* ---------------------------------------------------------------------
   FIELD MANUAL — the lesson's reference material, always one tap away.
   --------------------------------------------------------------------- */
const MANUAL = [
  {
    id: "principles",
    title: "Three Basic Principles",
    html: `<dl class="defs">
      <dt>Rapid Response</dt><dd>Protect evidence from being moved, destroyed, altered or lost.</dd>
      <dt>Everything Is Evidence</dt><dd>You never know what will matter when building a case, so document everything with photographs and in writing.</dd>
      <dt>Secure the Scene and Notify</dt><dd>Securing the scene protects evidence. Notification brings in the specialists.</dd></dl>`
  },
  {
    id: "components",
    title: "Five Components (your score)",
    html: `<dl class="defs">
      <dt>Teamwork</dt><dd>Everyone works together so the scene is processed correctly and as quickly as possible.</dd>
      <dt>Documentation</dt><dd>It must be rigorous enough to withstand courtroom scrutiny.</dd>
      <dt>Preservation</dt><dd>Incorrectly preserved evidence is worthless.</dd>
      <dt>Common Sense</dt><dd>Use it. If you think it may be evidence, it probably is.</dd>
      <dt>Flexibility</dt><dd>No two scenes are the same. Expect problems and adjust.</dd></dl>`
  },
  {
    id: "contaminators",
    title: "Five Scene Contaminators",
    html: `<dl class="defs">
      <dt>Weather</dt><dd>Changes or destroys physical evidence.</dd>
      <dt>Relatives and friends</dt><dd>Change the scene for personal reasons.</dd>
      <dt>Suspects or associates</dt><dd>Try to destroy or remove evidence.</dd>
      <dt>Others</dt><dd>Contaminate it intentionally or by accident.</dd>
      <dt>Other law enforcement</dt><dd>Untrained, curious, or "helping" when they shouldn't.</dd></dl>`
  },
  {
    id: "evidence",
    title: "Types of evidence",
    html: `<dl class="defs">
      <dt>Verbal</dt><dd>Oral or written testimony from a witness about what they observed or know. The words are verbal evidence; a document is physical evidence.</dd>
      <dt>Physical</dt><dd>Tangible material that can be collected, analyzed and interpreted scientifically. Includes objects, body materials and impressions.</dd>
      <dt>Direct</dt><dd>Proves a fact on its own, with no interpretation needed.</dd>
      <dt>Indirect / circumstantial</dt><dd>Proves something by inference or deduction, and needs explanation.</dd></dl>
      <p><b>Locard's Exchange Principle:</b> the perpetrator takes traces of the victim and the scene away; the victim keeps traces of the perpetrator; the perpetrator leaves traces at the scene.</p>
      <p><b>Packaging:</b> mark it so it can be found, identified and matched to records. Use tamper-evident tape and initials. Biological items go in porous paper; volatile items go in airtight containers. Store evidence cool, dry and out of sunlight.</p>`
  },
  {
    id: "cmm",
    title: "Cause, mechanism and manner",
    html: `<dl class="defs">
      <dt>Cause</dt><dd>The disease or injury that started the chain of events leading to death. <i>Example: atherosclerotic cardiovascular disease.</i></dd>
      <dt>Mechanism</dt><dd>The physiological change that ends life. <i>Example: cardiac arrhythmia.</i> Some texts call this the "mode." Never list a mechanism alone as the cause.</dd>
      <dt>Manner</dt><dd>How the death came about: <b>Natural, Accident, Suicide, Homicide, Undetermined</b>, or <b>Pending</b> while the investigation continues.</dd></dl>`
  },
  {
    id: "pmc",
    title: "Postmortem changes (typical ranges)",
    html: `<p class="small">These are rules of thumb. Heat, body size, clothing, illness and environment all shift them. Use them only together with circumstantial evidence.</p>
      <div class="table-wrap"><table>
      <thead><tr><th>Change</th><th>What happens</th><th>Typical timing</th></tr></thead>
      <tbody>
      <tr><td>Livor mortis</td><td>Blood settles with gravity, causing purple discoloration on the lowest surfaces. Pressure points stay pale.</td><td>Visible within about 30 min–2 h; becomes fixed (no longer blanches) after about 8–12 h</td></tr>
      <tr><td>Rigor mortis</td><td>Muscles stiffen, usually showing first in small muscles such as the jaw.</td><td>Begins about 2–6 h; fully developed about 12 h; resolves over about 24–48 h</td></tr>
      <tr><td>Algor mortis</td><td>The body cools (or warms) toward the room temperature.</td><td>Roughly 1–1.5°F per hour after death, until it matches the room</td></tr>
      <tr><td>Eyes</td><td>The cornea clouds; if the eyes stay open, the exposed white of the eye dries to a dark band (tache noire).</td><td>Hours</td></tr>
      <tr><td>Early decomposition</td><td>Green discoloration of the lower right abdomen, then marbling (veins showing through), bloating, purge fluid and skin slippage.</td><td>Starts around 1–2 days; much faster in heat</td></tr>
      <tr><td>Insects</td><td>Blow flies lay eggs in openings and wounds.</td><td>Can be within minutes to hours of death if flies have access</td></tr>
      </tbody></table></div>`
  },
  {
    id: "glaister",
    title: "Glaister cooling calculator",
    calculator: true,
    html: `<p>A classic classroom rule of thumb: <b>hours since death ≈ (98.4 − body temperature °F) ÷ 1.5</b>. It is very imprecise. It assumes a normal starting temperature, and it fails completely once the body reaches room temperature, as Raymond's had.</p>`
  },
  {
    id: "specialists",
    title: "Specialists",
    html: `<p><b>Employed by crime labs:</b> ballistics specialists, crime scene investigators, criminalists, death investigators, drug analysts, fingerprint specialists, forensic pathologists, questioned document examiners, serologists/geneticists, toxicologists.</p>
      <p><b>Consulted:</b> forensic anthropologists (skeletal remains), forensic odontologists (dental ID), forensic entomologists (insects and time of death), forensic botanists (plants, pollen, location and timing).</p>
      <div class="table-wrap"><table><thead><tr><th></th><th>Recent death</th><th>Years between death and discovery</th><th>Ancient death</th></tr></thead>
      <tbody><tr><td>Visual ID</td><td>Possible</td><td>Not possible</td><td>Not possible</td></tr>
      <tr><td>Legal consequence</td><td>Immediate</td><td>Immediate or uncertain</td><td>Limited</td></tr>
      <tr><td>At the scene</td><td>ME or coroner</td><td>ME/coroner with anthropologists and archaeologists</td><td>Archaeologist</td></tr>
      <tr><td>Remains analyzed by</td><td>ME and odontologist</td><td>Forensic anthropologist and odontologist</td><td>Physical anthropologist</td></tr></tbody></table></div>`
  },
  {
    id: "geberth",
    title: "Geberth's 10 most common errors",
    html: `<ol class="geberth">${Object.values(GEBERTH).map(t => `<li>${t}</li>`).join("")}</ol>`
  },
  {
    id: "nijsteps",
    title: "NIJ scene investigation steps",
    html: `<dl class="defs">
      <dt>B · Arriving at the scene</dt><dd>Introduce yourself and your role · Scene safety and security · Confirm or pronounce death · Scene briefing · Walk-through · Chain of custody · Follow evidence laws</dd>
      <dt>C · Documenting the scene</dt><dd>Photograph · Written description and sketch · Probable location of injury or illness · Collect and safeguard property and evidence · Interview witnesses</dd>
      <dt>D · Documenting the body</dt><dd>Photograph · External exam · Preserve evidence on the body · Identification · Postmortem changes · Debriefing · Next-of-kin notification · Secure the remains</dd>
      <dt>E · Decedent profile</dt><dd>Discovery history · Terminal episode · Medical, mental health and social history</dd>
      <dt>F · Completing the investigation</dt><dd>Maintain, then release, jurisdiction of the body · Exit procedures · Assist the family</dd></dl>`
  }
];
