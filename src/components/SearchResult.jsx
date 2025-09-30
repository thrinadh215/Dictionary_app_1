import React from "react";
import "../static/searchResult.css";

const SearchResult = (props) => {
  const { meaning, phonetic, antonyms = [], synonyms = [], example, partOfSpeech } = props;

  // ✅ Safely format antonyms & synonyms with commas or fallback text
  const formattedAntonyms = antonyms.length > 0 ? antonyms.join(", ") : "Not found";
  const formattedSynonyms = synonyms.length > 0 ? synonyms.join(", ") : "Not found";

  // ✅ Handle example: show first non-empty example if available
  let displayExample = "Not found";
  if (Array.isArray(example)) {
    displayExample = example.find((ex) => ex && ex.trim() !== "") || "Not found";
  } else if (typeof example === "string" && example.trim() !== "") {
    displayExample = example;
  }

  return (
    <div className="searchResult">
      <h3>
        Part of Speech: <p>{partOfSpeech || "Not available"}</p>
      </h3>
      <hr />

      <h3>
        Meaning: <p>{meaning || "Not available"}</p>
      </h3>
      <hr />

      <h3>
        Phonetic: <p>{phonetic || "Not available"}</p>
      </h3>
      <hr />

      <h3>
        Antonyms: <p>{formattedAntonyms}</p>
      </h3>
      <hr />

      <h3>
        Synonyms: <p>{formattedSynonyms}</p>
      </h3>
      <hr />

      <h3>
        Example: <p>{displayExample}</p>
      </h3>
    </div>
  );
};

export default SearchResult;
