const pages = [
  // Main pages
  { title: "Movies", url: "movies.html", keywords: "film cinema movie mcu" },
  { title: "TV", url: "tv.html", keywords: "show tv series streaming disney+ special presentation netflix abc" },
  { title: "Chronology", url: "chronology.html", keywords: "timeline order chronological watch order" },
  { title: "Characters", url: "characters.html", keywords: "heroes villains profiles" },
  { title: "Easter Eggs & Theories", url: "eastereggs.html", keywords: "hidden details theories easter egg community archive" },

  // Movies
  { title: "Iron Man (2008)", url: "movies.html#iron-man", keywords: "tony stark iron man arc reactor obadiah stane james rhodes happy hogan pepper potts" },
  { title: "Captain America: The First Avenger (2011)", url: "movies.html#captain-america-first-avenger", keywords: "steve rogers captain america red skull peggy carter bucky barnes hydra" },
  { title: "The Avengers (2012)", url: "movies.html#avengers", keywords: "avengers assemble loki thor captain america steve rogers iron man tony stark hawkeye clint barton black widow natasha romanoff the hulk bruce banner nick fury phil coulson maria hill" },

  // TV Shows
  { title: "WandaVision", url: "tv.html#wandavision", keywords: "wanda vision westview sitcom agatha harkness billy tommy pietro" },
  { title: "Loki", url: "tv.html#loki", keywords: "tva variants multiverse sylvie mobius" },
  { title: "Hawkeye", url: "tv.html#hawkeye", keywords: "clint barton kate bishop yelena belova kingpin wilson fisk echo maya lopez" },

  // Characters
  { title: "Tony Stark / Iron Man", url: "characters/iron-man.html", keywords: "tony stark iron man" },
  { title: "Steve Rogers / Captain America", url: "characters.html", keywords: "steve rogers captain america" },
  { title: "Natasha Romanoff / Black Widow", url: "characters.html", keywords: "natasha romanoff black widow" },

  // Coming Soon
  { title: "Daredevil: Born Again — Season 2", url: "tv.html#daredevil-born-again-season-2", keywords: "daredevil matt murdock born again season 2" },
  { title: "X-Men '97 — Season 2", url: "tv.html#xmen-97-season-2", keywords: "xmen x-men 97 season 2 mutants" },
  { title: "Your Friendly Neighborhood Spider-Man — Season 2", url: "tv.html#friendly-neighborhood-spiderman-season-2", keywords: "spiderman spider-man peter parker season 2 animated" },
  { title: "VisionQuest", url: "tv.html#visionquest", keywords: "vision white vision wanda sequel" }
];

const resultsList = document.getElementById("results-list");

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Safety check so it doesn't error if loaded on another page by accident
if (resultsList) {
  const params = new URLSearchParams(window.location.search);
  const queryRaw = params.get("q") || "";
  const query = queryRaw.trim().toLowerCase();

  // Clear any existing content safely
  resultsList.textContent = "";

  const makeLi = (text) => {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
  };

  if (!query) {
    resultsList.appendChild(makeLi("Please enter a search term."));
  } else {
    const terms = query.split(/\s+/).filter(Boolean);

    const results = pages.filter((page) => {
      const haystack = `${page.title} ${page.keywords}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });

    if (results.length === 0) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode('No results found for "'));
      const strong = document.createElement("strong");
      strong.textContent = queryRaw; // safe
      li.appendChild(strong);
      li.appendChild(document.createTextNode('".'));
      resultsList.appendChild(li);
    } else {
      results.forEach((page) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = page.url;          // safe because it’s from your pages array
        a.textContent = page.title; // safe
        li.appendChild(a);
        resultsList.appendChild(li);
      });
    }
  }
}
