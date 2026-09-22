/* =========================================
   SPIDER-VERSE // ARCHIVE
========================================= */


/* =========================================
   STATE
========================================= */

let state = JSON.parse(
  localStorage.getItem("spiderArchive")
) || {

  discoveredUniverses: [],

  unlockedFiles: [],

  highScore: 0,

  spiderTestCompleted: false,

  spiderSenseCompleted: false,

  missionCompleted: false

};


function saveState() {

  localStorage.setItem(
    "spiderArchive",
    JSON.stringify(state)
  );

}


/* =========================================
   HELPERS
========================================= */

const $ = selector =>
  document.querySelector(selector);


const $$ = selector =>
  [...document.querySelectorAll(selector)];


function random(array) {

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];

}


function showToast(message) {

  const toast = $("#toast");

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


function unlockFile(file) {

  if (
    !state.unlockedFiles.includes(file)
  ) {

    state.unlockedFiles.push(file);

    saveState();

    showToast(
      "CLASSIFIED FILE UNLOCKED: " + file
    );

  }

  updateProgress();

}


/* =========================================
   PROGRESS
========================================= */

function updateProgress() {

  const completed =
    state.unlockedFiles.length +
    (state.spiderTestCompleted ? 1 : 0) +
    (state.spiderSenseCompleted ? 1 : 0) +
    (state.missionCompleted ? 2 : 0);

  const total = 12;

  const percentage = Math.min(
    100,
    Math.round(
      completed / total * 100
    )
  );

  $("#progress-number").textContent =
    percentage + "%";

  $("#progress-bar-fill").style.width =
    percentage + "%";

  $("#stability-value").textContent =
    Math.max(
      60,
      98 - percentage
    ) + "%";

}


/* =========================================
   MODAL
========================================= */

function openModal(content) {

  $("#modal-body").innerHTML =
    content;

  $("#modal").classList.remove(
    "hidden"
  );

}


function closeModal() {

  $("#modal").classList.add(
    "hidden"
  );

}


$("#modal-close").onclick =
  closeModal;


$(".modal-background").onclick =
  closeModal;


/* =========================================
   BOOT SEQUENCE
========================================= */

function bootSequence() {

  const lines = [

    "DIMENSIONAL SCANNER       ONLINE",

    "SPIDER-SENSE              ONLINE",

    "WEB DATABASE              ONLINE",

    "MULTIVERSE CONNECTION     UNSTABLE",

    "",

    "WARNING:",

    "UNKNOWN SPIDER-SIGNATURE DETECTED.",

    "",

    "IDENTIFYING..."

  ];

  let index = 0;

  const text = $("#boot-text");

  const progress =
    $("#boot-progress-bar");


  const interval = setInterval(() => {

    if (
      index < lines.length
    ) {

      text.textContent +=
        lines[index] + "\n";

      progress.style.width =
        (
          (index + 1) /
          lines.length *
          100
        ) + "%";

      index++;

    }

    else {

      clearInterval(interval);

      $("#enter-archive")
        .classList
        .remove("hidden");

    }

  }, 250);


  $("#enter-archive").onclick = () => {

    $("#boot-screen").style.display =
      "none";

    $("#app").classList.remove(
      "hidden"
    );

    loadRoute();

  };

}


/* =========================================
   ROUTING
========================================= */

function loadRoute() {

  const route =
    location.hash.replace("#", "")
    || "home";

  renderRoute(route);

}


window.addEventListener(
  "hashchange",
  loadRoute
);


/* =========================================
   ROUTE RENDERER
========================================= */

function renderRoute(route) {

  switch (route) {

    case "database":
      renderDatabase();
      break;

    case "spider-test":
      renderSpiderTest();
      break;

    case "spider-sense":
      renderSpiderSense();
      break;

    case "suits":
      renderSuits();
      break;

    case "multiverse":
      renderMultiverse();
      break;

    case "bugle":
      renderBugle();
      break;

    case "map":
      renderMap();
      break;

    case "game":
      renderGame();
      break;

    case "classified":
      renderClassified();
      break;

    case "terminal":
      renderTerminal();
      break;

    default:
      renderHome();

  }

  updateProgress();

}


/* =========================================
   HOME
========================================= */

function renderHome() {

  $("#content").innerHTML = `

    <section class="hero">

      <div class="hero-content">

        <div class="kicker">
          DIMENSIONAL MONITORING SYSTEM // 000
        </div>

        <h1>
          Spider-
          <span>Verse</span>
          Archive
        </h1>

        <p>
          A classified interactive database
          documenting Spider-People,
          unstable universes, anomalous
          technology and dimensional events.
          The archive has detected an
          unidentified Spider-Signature.
        </p>

        <br>

        <a
          href="#database"
          class="primary-button"
        >
          ENTER DATABASE →
        </a>

      </div>

      <div class="hero-orbit"></div>

    </section>


    <section class="stats">

      <div class="stat">

        <span class="stat-number">
          ${spiders.length}
        </span>

        <span class="stat-label">
          Spider Profiles
        </span>

      </div>


      <div class="stat">

        <span class="stat-number">
          ${state.discoveredUniverses.length}
        </span>

        <span class="stat-label">
          Universes Found
        </span>

      </div>


      <div class="stat">

        <span class="stat-number">
          ${state.unlockedFiles.length}
        </span>

        <span class="stat-label">
          Files Unlocked
        </span>

      </div>


      <div class="stat">

        <span class="stat-number">
          ${state.highScore}
        </span>

        <span class="stat-label">
          Rooftop Score
        </span>

      </div>

    </section>


    <div class="section-header">

      <div>

        <div class="kicker">
          ARCHIVE INDEX
        </div>

        <h2>
          Explore
        </h2>

      </div>

      <div class="section-description">

        Every module reveals another
        piece of the dimensional anomaly.

      </div>

    </div>


    <div class="card-grid">

      ${homeCards()}

    </div>

  `;

}


function homeCards() {

  const cards = [

    [
      "01",
      "Spider Database",
      "Search known Spider-People.",
      "database"
    ],

    [
      "02",
      "Spider Test",
      "Discover your Spider-Person archetype.",
      "spider-test"
    ],

    [
      "03",
      "Spider-Sense",
      "Test your reaction speed.",
      "spider-sense"
    ],

    [
      "04",
      "Multiverse",
      "Generate alternate universes.",
      "multiverse"
    ],

    [
      "05",
      "Daily Bugle",
      "Read questionable journalism.",
      "bugle"
    ],

    [
      "06",
      "Rooftop Run",
      "Play the archive's mini-game.",
      "game"
    ],

    [
      "07",
      "Dimensional Map",
      "Explore the multiverse.",
      "map"
    ],

    [
      "08",
      "Classified",
      "Find restricted records.",
      "classified"
    ],

    [
      "09",
      "Terminal",
      "Access the archive console.",
      "terminal"
    ]

  ];


  return cards.map(card => `

    <a
      class="card"
      href="#${card[3]}"
    >

      <div class="card-number">
        ${card[0]}
      </div>

      <h3>
        ${card[1]}
      </h3>

      <p>
        ${card[2]}
      </p>

    </a>

  `).join("");

}


/* =========================================
   DATABASE
========================================= */

function renderDatabase() {

  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 02
        </div>

        <h2>
          Spider Database
        </h2>

      </div>

      <div class="section-description">
        Known Spider-Signatures indexed
        across monitored universes.
      </div>

    </div>


    <input
      id="spider-search"
      class="search"
      placeholder="Search subject, universe, ability..."
    >


    <div class="filters">

      <button class="filter active"
        data-earth="ALL">
        ALL
      </button>

      <button class="filter"
        data-earth="Earth-616">
        EARTH-616
      </button>

      <button class="filter"
        data-earth="Earth-1610">
        EARTH-1610
      </button>

      <button class="filter"
        data-earth="Earth-65">
        EARTH-65
      </button>

      <button class="filter"
        data-earth="Earth-928">
        EARTH-928
      </button>

      <button class="filter"
        data-earth="Earth-138">
        EARTH-138
      </button>

    </div>


    <div
      id="profile-grid"
      class="profile-grid"
    ></div>

  `;


  function updateProfiles(
    filter = "ALL",
    search = ""
  ) {

    const results =
      spiders.filter(spider => {

        const matchesEarth =
          filter === "ALL"
          || spider.earth === filter;

        const searchable =
          `${spider.name}
           ${spider.alias}
           ${spider.earth}
           ${spider.traits.join(" ")}`
          .toLowerCase();

        return (
          matchesEarth &&
          searchable.includes(
            search.toLowerCase()
          )
        );

      });


    $("#profile-grid").innerHTML =
      results.map((spider, index) => `

        <article
          class="profile"
          data-index="${index}"
        >

          <div class="profile-avatar">

            ${spider.name
              .split(" ")
              .map(word => word[0])
              .join("")}

          </div>

          <h3>
            ${spider.name}
          </h3>

          <div class="profile-meta">

            ${spider.alias}
            //
            ${spider.earth}

          </div>

          <div class="tags">

            ${spider.traits
              .map(trait => `
                <span class="tag">
                  ${trait}
                </span>
              `)
              .join("")}

          </div>

        </article>

      `).join("");


    $$(".profile").forEach(
      (card, index) => {

        card.onclick = () => {

          const spider =
            results[index];

          openModal(`

            <div class="kicker">
              SPIDER-SIGNATURE
            </div>

            <h2>
              ${spider.name}
            </h2>

            <p>
              <strong>
                ${spider.alias}
              </strong>
            </p>

            <p>
              ${spider.description}
            </p>

            <div class="tags">

              ${spider.traits
                .map(t => `
                  <span class="tag">
                    ${t}
                  </span>
                `)
                .join("")}

            </div>

            <hr
              style="
                margin:25px 0;
                border-color:#222;
              "
            >

            <p style="
              font-family:var(--mono);
              font-size:10px;
            ">

              UNIVERSE:
              ${spider.earth}

              <br>

              STATUS:
              ACTIVE

              <br>

              ARCHIVE ACCESS:
              LEVEL 02

            </p>

          `);

        };

      }

    );

  }


  updateProfiles();


  $("#spider-search").oninput =
    event => {

      const active =
        $(".filter.active");

      updateProfiles(
        active.dataset.earth,
        event.target.value
      );

    };


  $$(".filter").forEach(
    button => {

      button.onclick = () => {

        $$(".filter").forEach(
          b => b.classList.remove(
            "active"
          )
        );

        button.classList.add(
          "active"
        );

        updateProfiles(
          button.dataset.earth,
          $("#spider-search").value
        );

      };

    }
  );

}


/* =========================================
   SPIDER TEST
========================================= */

const questions = [

  {
    question:
      "A building is collapsing. You have seconds.",

    answers: [
      "Save whoever is closest.",
      "Find the safest route.",
      "Improvise something impossible.",
      "Take command."
    ]

  },

  {
    question:
      "Your enemy discovers your secret identity.",

    answers: [
      "Talk your way out.",
      "Protect everyone around you.",
      "Turn it into a joke.",
      "Remove the threat."
    ]

  },

  {
    question:
      "Your team is losing.",

    answers: [
      "Encourage everyone.",
      "Trust your instincts.",
      "Do something unexpected.",
      "Take control."
    ]

  },

  {
    question:
      "You get one new ability.",

    answers: [
      "Precise danger sense.",
      "Invisibility.",
      "Dimensional travel.",
      "Enhanced strength."
    ]

  }

];


let questionIndex = 0;

let scores = [0,0,0,0];


function renderSpiderTest() {

  questionIndex = 0;

  scores = [0,0,0,0];


  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 03
        </div>

        <h2>
          Spider Test
        </h2>

      </div>

      <div class="section-description">

        A fictional Spider-Person
        personality analysis.

      </div>

    </div>


    <div
      id="quiz"
      class="quiz"
    ></div>

  `;


  showQuestion();

}


function showQuestion() {

  const question =
    questions[questionIndex];


  $("#quiz").innerHTML = `

    <div class="kicker">

      QUESTION
      ${questionIndex + 1}
      /
      ${questions.length}

    </div>


    <div class="quiz-question">

      ${question.question}

    </div>


    <div class="answers">

      ${question.answers
        .map((answer,index) => `

          <button
            class="answer"
            data-answer="${index}"
          >

            ${String.fromCharCode(
              65 + index
            )}

            .

            ${answer}

          </button>

        `)
        .join("")}

    </div>

  `;


  $$(".answer").forEach(
    button => {

      button.onclick = () => {

        scores[
          Number(
            button.dataset.answer
          )
        ]++;


        questionIndex++;


        if (
          questionIndex <
          questions.length
        ) {

          showQuestion();

        }

        else {

          showTestResult();

        }

      };

    }
  );

}


function showTestResult() {

  const names = [

    "Peter Parker",
    "Miles Morales",
    "Gwen Stacy",
    "Hobie Brown"

  ];


  const highest =
    scores.indexOf(
      Math.max(...scores)
    );


  const result =
    names[highest];


  state.spiderTestCompleted =
    true;

  unlockFile(
    "SPIDER-IDENTITY"
  );


  saveState();


  $("#quiz").innerHTML = `

    <div class="result">

      <div class="kicker">
        ANALYSIS COMPLETE
      </div>

      <h3>
        ${result}
      </h3>

      <p>
        Your responses produced
        a fictional Spider-Signature
        leaning toward this archetype.
      </p>


      <div class="meter">

        ${[
          "Responsibility",
          "Improvisation",
          "Empathy",
          "Chaos"
        ].map((name,index) => `

          <div class="meter-row">

            <span>
              ${name}
            </span>

            <div class="meter-track">

              <div
                class="meter-fill"
                style="
                  width:${40 + scores[index] * 20}%
                "
              ></div>

            </div>

            <span>
              ${40 + scores[index] * 20}%
            </span>

          </div>

        `).join("")}

      </div>


      <button
        class="primary-button"
        onclick="renderSpiderTest()"
      >

        RUN AGAIN

      </button>

    </div>

  `;

}


/* =========================================
   SPIDER SENSE
========================================= */

let senseRunning = false;

let senseScore = 0;

let senseMisses = 0;

let senseTimer = 15;

let senseInterval;


function renderSpiderSense() {

  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 04
        </div>

        <h2>
          Spider-Sense
        </h2>

      </div>

      <div class="section-description">

        Tap the threat as soon
        as it appears.

      </div>

    </div>


    <div class="sense-hud">

      <span>
        THREATS:
        <b id="sense-score">
          0
        </b>
      </span>

      <span>
        TIME:
        <b id="sense-time">
          15
        </b>
      </span>

      <span>
        FALSE ALERTS:
        <b id="sense-misses">
          0
        </b>
      </span>

    </div>


    <div
      id="sense-game"
      class="sense-game"
    >

      <button
        id="start-sense"
        class="primary-button"
      >

        ACTIVATE SPIDER-SENSE

      </button>

    </div>

  `;


  $("#start-sense").onclick =
    startSpiderSense;

}


function startSpiderSense() {

  senseRunning = true;

  senseScore = 0;

  senseMisses = 0;

  senseTimer = 15;


  $("#sense-game").innerHTML = "";


  senseInterval =
    setInterval(() => {

      senseTimer--;

      $("#sense-time")
        .textContent =
        senseTimer;


      if (
        senseTimer <= 0
      ) {

        endSpiderSense();

      }

    }, 1000);


  spawnTarget();

}


function spawnTarget() {

  if (!senseRunning)
    return;


  const game =
    $("#sense-game");


  const target =
    document.createElement("button");


  target.className =
    "spider-target";


  target.style.left =
    (5 + Math.random() * 85) + "%";


  target.style.top =
    (5 + Math.random() * 80) + "%";


  target.onclick = () => {

    senseScore++;

    $("#sense-score")
      .textContent =
      senseScore;

    target.remove();

    setTimeout(
      spawnTarget,
      150 + Math.random() * 600
    );

  };


  game.appendChild(target);


  setTimeout(() => {

    if (
      target.isConnected
    ) {

      target.remove();

      senseMisses++;

      $("#sense-misses")
        .textContent =
        senseMisses;

      spawnTarget();

    }

  }, 900);

}


function endSpiderSense() {

  senseRunning = false;

  clearInterval(
    senseInterval
  );


  state.spiderSenseCompleted =
    true;


  unlockFile(
    "SPIDER-SENSE"
  );


  saveState();


  $("#sense-game").innerHTML = `

    <div class="result">

      <div class="kicker">
        ANALYSIS COMPLETE
      </div>

      <h3>

        ${
          senseScore >= 12
          ? "EXCEPTIONAL"
          : senseScore >= 7
          ? "SPIDER-QUALIFIED"
          : "UNSTABLE"
        }

      </h3>

      <p>

        Threats detected:
        <strong>
          ${senseScore}
        </strong>

        <br>

        Missed:
        <strong>
          ${senseMisses}
        </strong>

      </p>


      <button
        class="primary-button"
        onclick="renderSpiderSense()"
      >

        RUN AGAIN

      </button>

    </div>

  `;

}


/* =========================================
   SUITS
========================================= */

function renderSuits() {

  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 05
        </div>

        <h2>
          Suit Archive
        </h2>

      </div>

      <div class="section-description">

        Armor, fabrics, gadgets and
        questionable fashion choices.

      </div>

    </div>


    <div class="card-grid">

      ${suits.map(
        (suit,index) => `

          <article
            class="card"
            onclick="
              openModal(\`
                <div class='kicker'>
                  SUIT FILE // ${index + 1}
                </div>

                <h2>
                  ${suit.name}
                </h2>

                <p>
                  <strong>
                    TYPE:
                  </strong>
                  ${suit.type}
                </p>

                <p>
                  <strong>
                    SYSTEMS:
                  </strong>
                  ${suit.systems}
                </p>

                <p>
                  ${suit.description}
                </p>
              \`)
            "
          >

            <div class="card-number">

              SUIT
              ${String(index + 1).padStart(2,"0")}

            </div>

            <h3>
              ${suit.name}
            </h3>

            <p>
              ${suit.type}
            </p>

          </article>

      `).join("")}

    </div>

  `;

}


/* =========================================
   MULTIVERSE
========================================= */

function renderMultiverse() {

  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 06
        </div>

        <h2>
          Multiverse
        </h2>

      </div>

      <div class="section-description">

        Generate an alternate universe
        and store it in the archive.

      </div>

    </div>


    <button
      id="generate-universe"
      class="primary-button"
    >

      GENERATE UNIVERSE →

    </button>


    <br><br>


    <div
      id="universe"
      class="universe"
    >

      <div class="kicker">
        WAITING FOR DIMENSIONAL SCAN
      </div>

      <div class="universe-name">
        UNKNOWN
      </div>

      <p>
        Press generate to begin.
      </p>

    </div>

  `;


  $("#generate-universe").onclick =
    generateUniverse;

}


function generateUniverse() {

  const id =
    "EARTH-" +
    Math.floor(
      100 + Math.random() * 8900
    );


  const city =
    random(
      universes.cities
    );


  const power =
    random(
      universes.powers
    );


  const villain =
    random(
      villains
    );


  const web =
    random(
      universes.webTypes
    );


  const spider =
    random(
      universes.spiderNames
    );


  state.discoveredUniverses.push(
    id
  );


  state.discoveredUniverses =
    [
      ...new Set(
        state.discoveredUniverses
      )
    ];


  unlockFile(
    "DIMENSIONAL-SCAN"
  );


  saveState();


  $("#universe").innerHTML = `

    <div class="universe-id">

      ${id}

    </div>


    <div class="universe-name">

      ${spider}

    </div>


    <div class="data-grid">

      <div class="data-cell">

        <small>
          CITY
        </small>

        <strong>
          ${city}
        </strong>

      </div>


      <div class="data-cell">

        <small>
          PRIMARY ABILITY
        </small>

        <strong>
          ${power}
        </strong>

      </div>


      <div class="data-cell">

        <small>
          ARCHENEMY
        </small>

        <strong>
          ${villain.name}
        </strong>

      </div>


      <div class="data-cell">

        <small>
          WEB TYPE
        </small>

        <strong>
          ${web}
        </strong>

      </div>


      <div class="data-cell">

        <small>
          DIMENSION STATUS
        </small>

        <strong>
          ${random([
            "STABLE",
            "UNSTABLE",
            "CRITICAL"
          ])}
        </strong>

      </div>

    </div>

  `;

}


/* =========================================
   DAILY BUGLE
========================================= */

function renderBugle() {

  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 07
        </div>

        <h2>
          Daily Bugle
        </h2>

      </div>

      <div class="section-description">

        Reliable journalism is not guaranteed.

      </div>

    </div>


    <div class="newspaper">

      <div class="newspaper-header">

        <h2>
          THE DAILY BUGLE
        </h2>

        <p>
          NEW YORK'S MOST TRUSTED SOURCE
          FOR SPIDER-MAN-RELATED SPECULATION
        </p>

      </div>


      <div class="article-grid">

        ${articles.map(
          article => `

            <article class="article">

              <div class="article-author">

                ${article.author}

              </div>

              <h3>
                ${article.title}
              </h3>

              <p>
                ${article.lead}
              </p>

              <p>
                ${article.body}
              </p>

            </article>

        `).join("")}

      </div>

    </div>

  `;


  unlockFile(
    "BUGLE-REPORTS"
  );

}


/* =========================================
   DIMENSIONAL MAP
========================================= */

function renderMap() {

  const nodes = [

    ["EARTH-616",20,30],
    ["EARTH-1610",65,25],
    ["EARTH-65",42,70],
    ["EARTH-928",78,70],
    ["EARTH-42",55,45],
    ["EARTH-50101",27,78],
    ["UNKNOWN",86,15],
    ["EARTH-000",12,55],
    ["EARTH-138",60,84]

  ];


  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 08
        </div>

        <h2>
          Dimensional Map
        </h2>

      </div>

      <div class="section-description">

        Explore monitored universes.
        The blinking nodes remain unexplained.

      </div>

    </div>


    <div class="dimension-map">

      <div class="map-center">

        MULTIVERSE
        <br>
        NETWORK

      </div>


      ${nodes.map(
        node => `

          <button
            class="map-node"
            style="
              left:${node[1]}%;
              top:${node[2]}%;
            "
            data-name="${node[0]}"
          >

            <span class="map-node-label">

              ${node[0]}

            </span>

          </button>

      `).join("")}

    </div>

  `;


  $$(".map-node").forEach(
    node => {

      node.onclick = () => {

        const name =
          node.dataset.name;


        if (
          name === "UNKNOWN"
          ||
          name === "EARTH-000"
        ) {

          unlockFile(
            "UNKNOWN-SIGNATURE"
          );


          openModal(`

            <div class="kicker">
              ANOMALOUS DIMENSION
            </div>

            <h2>
              ${name}
            </h2>

            <p>
              DIMENSION STATUS:
              UNKNOWN
            </p>

            <p>
              SIGNATURE:
              UNIDENTIFIED
            </p>

            <p>
              ACCESS:
              RESTRICTED
            </p>

          `);

        }

        else {

          openModal(`

            <div class="kicker">
              DIMENSION RECORD
            </div>

            <h2>
              ${name}
            </h2>

            <p>
              STATUS:
              MONITORED
            </p>

            <p>
              SPIDER-SIGNATURES:
              DETECTED
            </p>

          `);

        }

      };

    }

  );

}


/* =========================================
   CLASSIFIED
========================================= */

function renderClassified() {

  const files = [

    [
      "PROJECT: SPIDER",
      "SPIDER-IDENTITY"
    ],

    [
      "SPIDER-SENSE",
      "SPIDER-SENSE"
    ],

    [
      "DIMENSIONAL SCAN",
      "DIMENSIONAL-SCAN"
    ],

    [
      "BUGLE NETWORK",
      "BUGLE-REPORTS"
    ],

    [
      "UNKNOWN SIGNATURE",
      "UNKNOWN-SIGNATURE"
    ],

    [
      "ROOFTOP INCIDENT",
      "ROOFTOP-RUN"
    ],

    [
      "EARTH-000",
      "DEEP-ARCHIVE"
    ]

  ];


  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 10
        </div>

        <h2>
          Classified
        </h2>

      </div>

      <div class="section-description">

        Continue exploring to unlock
        restricted records.

      </div>

    </div>


    <div class="classified-grid">

      ${files.map(
        file => {

          const unlocked =
            state.unlockedFiles
              .includes(file[1]);


          return `

            <article
              class="
                file
                ${unlocked ? "" : "locked"}
              "
            >

              <div class="kicker">

                FILE

              </div>


              <h3>

                ${file[0]}

              </h3>


              <p>

                ${
                  unlocked
                  ? "Access granted."
                  : "ACCESS DENIED."
                }

              </p>


              ${
                unlocked
                ? `
                  <button
                    class="secondary-button"
                    onclick="
                      openModal(
                        \`
                        <div class='kicker'>
                          CLASSIFIED RECORD
                        </div>

                        <h2>
                          ${file[0]}
                        </h2>

                        <p>
                          The archive has decrypted
                          this file.
                        </p>

                        <p>
                          STATUS:
                          ACTIVE
                        </p>
                        \`
                      )
                    "
                  >

                    OPEN FILE →

                  </button>
                `
                : ""
              }

            </article>

          `;

        }

      ).join("")}

    </div>

  `;

}


/* =========================================
   TERMINAL
========================================= */

function renderTerminal() {

  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 11
        </div>

        <h2>
          Terminal
        </h2>

      </div>

      <div class="section-description">

        Legacy archive console.

      </div>

    </div>


    <div class="terminal">

      <div
        id="terminal-output"
        class="terminal-output"
      >
        SPIDER-VERSE ARCHIVE TERMINAL v4.2

        --------------------------------

        Type "help" for available commands.

      </div>


      <form
        id="terminal-form"
        class="terminal-form"
      >

        <span>
          archive@sv:~$
        </span>

        <input
          id="terminal-input"
          autocomplete="off"
          autofocus
        >

      </form>

    </div>

  `;


  const output =
    $("#terminal-output");


  $("#terminal-form").onsubmit =
    event => {

      event.preventDefault();


      const input =
        $("#terminal-input");


      const command =
        input.value
          .trim()
          .toLowerCase();


      let response = "";


      switch (command) {

        case "help":

          response =
`commands:

help
status
scan
spiders
universes
classified
42
clear`;

          break;


        case "status":

          response =
`NETWORK: ONLINE
DIMENSIONAL STABILITY: 98%
SIGNATURE: UNKNOWN`;

          break;


        case "scan":

          unlockFile(
            "TERMINAL-SCAN"
          );

          response =
`SCANNING...

ANOMALY DETECTED.

LOCATION:
EARTH-000`;

          break;


        case "spiders":

          response =
            spiders
              .map(
                spider =>
                  `${spider.name} // ${spider.earth}`
              )
              .join("\n");

          break;


        case "universes":

          response =
            state.discoveredUniverses.length

            ? state.discoveredUniverses.join("\n")

            : "NO DISCOVERED UNIVERSES.";

          break;


        case "classified":

          response =
            state.unlockedFiles.length +
            " CLASSIFIED FILES UNLOCKED.";

          break;


        case "42":

          unlockFile(
            "DEEP-ARCHIVE"
          );

          response =
`YOU FOUND A DOOR
THAT WAS NOT SUPPOSED
TO EXIST.

ACCESS GRANTED.`;

          break;


        case "clear":

          output.textContent = "";

          input.value = "";

          return;


        default:

          response =
            "UNKNOWN COMMAND.";

      }


      output.textContent +=

        `\n\narchive@sv:~$ ${command}\n` +

        response;


      input.value = "";

      output.scrollTop =
        output.scrollHeight;

    };

}


/* =========================================
   ROOFTOP GAME
========================================= */

function renderGame() {

  $("#content").innerHTML = `

    <div class="section-header">

      <div>

        <div class="kicker">
          MODULE 09
        </div>

        <h2>
          Rooftop Run
        </h2>

      </div>

      <div class="section-description">

        Move with A/D or arrow keys.
        Jump with W, ↑ or Space.

      </div>

    </div>


    <div class="game-hud">

      <span>

        SCORE:
        <b id="game-score">
          0
        </b>

      </span>


      <span>

        HIGH SCORE:
        <b>
          ${state.highScore}
        </b>

      </span>


      <span>

        STATUS:
        <b id="game-status">
          READY
        </b>

      </span>

    </div>


    <canvas
      id="game-canvas"
      class="game-canvas"
      width="1000"
      height="430"
    ></canvas>


    <div class="game-controls">

      <button
        id="start-game"
        class="primary-button"
      >

        START RUN

      </button>

    </div>

  `;


  startGameEngine();

}


function startGameEngine() {

  const canvas =
    $("#game-canvas");


  const ctx =
    canvas.getContext("2d");


  let running = false;

  let playerX = 120;

  let playerY = 300;

  let velocityY = 0;

  let score = 0;

  let obstacles = [];

  let collectibles = [];

  let keys = {};


  const ground = 355;


  document.onkeydown =
    event => {

      keys[
        event.key.toLowerCase()
      ] = true;


      if (
        [" ","w","arrowup"]
          .includes(
            event.key.toLowerCase()
          )
      ) {

        jump();

      }

    };


  document.onkeyup =
    event => {

      keys[
        event.key.toLowerCase()
      ] = false;

    };


  function jump() {

    if (
      playerY >=
      ground - 42
    ) {

      velocityY = -14;

    }

  }


  $("#start-game").onclick =
    () => {

      running = true;

      playerX = 120;

      playerY =
        ground - 42;

      velocityY = 0;

      score = 0;

      obstacles = [];

      collectibles = [];

      $("#game-status")
        .textContent =
        "RUNNING";


      requestAnimationFrame(
        loop
      );

    };


  function spawn() {

    if (
      Math.random() < .65
    ) {

      obstacles.push({

        x: 1000,

        y: ground - 30,

        width:
          25 + Math.random() * 25,

        height: 30

      });

    }

    else {

      collectibles.push({

        x: 1000,

        y:
          250 +
          Math.random() * 70,

        width: 18,

        height: 18

      });

    }

  }


  function collision(a,b) {

    return (

      a.x < b.x + b.width &&

      a.x + a.width > b.x &&

      a.y < b.y + b.height &&

      a.y + a.height > b.y

    );

  }


  let lastSpawn = 0;


  function loop(time) {

    if (!running)
      return;


    if (
      time - lastSpawn >
      900
    ) {

      spawn();

      lastSpawn = time;

    }


    if (
      keys["a"] ||
      keys["arrowleft"]
    ) {

      playerX -= 5;

    }


    if (
      keys["d"] ||
      keys["arrowright"]
    ) {

      playerX += 5;

    }


    playerX =
      Math.max(
        20,
        Math.min(
          930,
          playerX
        )
      );


    velocityY += .7;

    playerY += velocityY;


    if (
      playerY >
      ground - 42
    ) {

      playerY =
        ground - 42;

      velocityY = 0;

    }


    obstacles.forEach(
      obstacle => {

        obstacle.x -= 5;

      }
    );


    collectibles.forEach(
      item => {

        item.x -= 5;

      }
    );


    const player = {

      x: playerX,

      y: playerY,

      width: 38,

      height: 42

    };


    for (
      const obstacle
      of obstacles
    ) {

      if (
        collision(
          player,
          obstacle
        )
      ) {

        running = false;

        $("#game-status")
          .textContent =
          "GAME OVER";


        if (
          score >
          state.highScore
        ) {

          state.highScore =
            score;

          saveState();

          showToast(
            "NEW HIGH SCORE"
          );

        }

        break;

      }

    }


    for (
      let i =
        collectibles.length - 1;

      i >= 0;

      i--
    ) {

      if (
        collision(
          player,
          collectibles[i]
        )
      ) {

        score += 100;

        collectibles.splice(
          i,
          1
        );

      }

    }


    score++;


    $("#game-score")
      .textContent =
      score;


    drawGame();


    if (running) {

      requestAnimationFrame(
        loop
      );

    }

  }


  function drawGame() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    ctx.fillStyle =
      "#080a10";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );


    ctx.fillStyle =
      "#151619";

    ctx.fillRect(
      0,
      ground,
      canvas.width,
      75
    );


    /* Buildings */

    ctx.fillStyle =
      "#101116";


    for (
      let x = 0;
      x < 1000;
      x += 100
    ) {

      ctx.fillRect(
        x,
        210,
        75,
        145
      );

    }


    /* Player */

    ctx.fillStyle =
      "#e92735";

    ctx.beginPath();

    ctx.arc(
      playerX + 19,
      playerY + 15,
      18,
      0,
      Math.PI * 2
    );

    ctx.fill();


    /* Eyes */

    ctx.fillStyle =
      "white";

    ctx.fillRect(
      playerX + 8,
      playerY + 9,
      7,
      5
    );

    ctx.fillRect(
      playerX + 22,
      playerY + 9,
      7,
      5
    );


    /* Obstacles */

    ctx.fillStyle =
      "#555";


    obstacles.forEach(
      obstacle => {

        ctx.fillRect(
          obstacle.x,
          obstacle.y,
          obstacle.width,
          obstacle.height
        );

      }
    );


    /* Collectibles */

    ctx.fillStyle =
      "#74d7e8";


    collectibles.forEach(
      item => {

        ctx.beginPath();

        ctx.arc(
          item.x,
          item.y,
          9,
          0,
          Math.PI * 2
        );

        ctx.fill();

      }
    );

  }


  drawGame();

}


/* =========================================
   START
========================================= */

bootSequence();
