import React, { useState } from "react";
import SearchResult from "./SearchResult";
import "../static/home.css";
const Home = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [antonyms, setAntonyms] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [example, setExample] = useState("");
  const [partOfSpeech, setpartOfSpeech] = useState("");

  const fetchWordData = async () => {
    const Word =word.toLowerCase()
    if (!Word.trim()) {
      alert("Please enter a word to search!");
      return;
    }

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${Word}`
      );
      const resData = await response.json();
      setpartOfSpeech(resData[0]?.meanings[0]?.partOfSpeech || "Not found");

      setMeaning(
        resData[0]?.meanings[0]?.definitions[0]?.definition || "Not found"
      );
      setPhonetic(resData[0]?.phonetic || "N/A");
      setAntonyms(resData[0]?.meanings[0]?.antonyms || []);
      setSynonyms(resData[0]?.meanings[0]?.synonyms || []);
      setExample(
        resData[0]?.meanings[0]?.definitions[1]?.example || "Not found"
      );
    } catch (error) {
        alert("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="home">
      <div className="search-box">
        <h1 className="div_head">Search Word Here</h1>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word"
        />
        <button onClick={fetchWordData}>Search</button>
        {!meaning ? (
          ""
        ) : (
          <SearchResult
            meaning={meaning}
            phonetic={phonetic}
            antonyms={antonyms}
            synonyms={synonyms}
            example={example}
            partOfSpeech={partOfSpeech}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
