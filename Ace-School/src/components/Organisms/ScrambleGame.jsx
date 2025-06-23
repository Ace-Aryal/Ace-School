import { useEffect, useState } from "react";

export default function UnscrambleGame() {
  const [word, setWord] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [definition, setDefinition] = useState("");
  const [guess, setGuess] = useState("");
  const [status, setStatus] = useState("");
  const [showHint, setShowHint] = useState(false);

  // Scramble function
  const scrambleWord = (w) => {
    let chars = w.split("");
    let shuffled = "";
    do {
      shuffled = chars.sort(() => Math.random() - 0.5).join("");
    } while (shuffled === w);
    return shuffled;
  };

  useEffect(() => {
    const getWord = async () => {
      try {
        const wordRes = await fetch(
          "https://random-word-api.herokuapp.com/word?length=6"
        );
        const [fetchedWord] = await wordRes.json();
        setWord(fetchedWord);

        const defRes = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${fetchedWord}`
        );
        const defData = await defRes.json();
        const def =
          defData[0]?.meanings?.[0]?.definitions?.[0]?.definition ||
          "No definition found.";
        setDefinition(def);
        setScrambled(scrambleWord(fetchedWord));
      } catch (err) {
        console.error(err);
        setWord("travel");
        setScrambled("laevrt");
        setDefinition("Make a journey, typically of some length.");
      }
    };

    getWord();
  }, []);

  const handleSubmit = () => {
    if (guess.trim().toLowerCase() === word.toLowerCase()) {
      setStatus("✅ Correct!");
    } else {
      setStatus("❌ Try again.");
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        Game | Unscramble the Word
      </h2>
      <p className="text-xl font-mono tracking-widest text-blue-600">
        {scrambled.toUpperCase()}
      </p>

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Your guess..."
        className="mt-4 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-200 text-blue-600 py-2 rounded-lg hover:bg-indigo-200 transition"
      >
        Submit
      </button>

      {status && (
        <p className="mt-3 text-center font-semibold text-lg text-gray-700">
          {status}
        </p>
      )}

      <button
        onClick={() => setShowHint(!showHint)}
        className="mt-4 text-sm text-gray-500 underline hover:text-gray-700"
      >
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>

      {showHint && (
        <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
          {definition}
        </p>
      )}
    </div>
  );
}
