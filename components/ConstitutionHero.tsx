"use client";

import { useState } from "react";

const rotatingWords: string[] = ["deeply", "smartly", "confidently", "thoroughly","he smart way."];

export default function ConstitutionHero() {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [animating, setAnimating] = useState<boolean>(false);

  const handleWordClick = (): void => {
    if (animating) return;
    setAnimating(true);

    setTimeout(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-12 bg-gradient-to-br from-[#f5f3ef] via-[#ede8df] to-[#f0ebe0]">
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="flex flex-col gap-6">

          {/* Badge
          <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-sm font-medium">
            ⭐ AI-powered constitutional learning
          </div> */}

          {/* Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            Learn the <br />
            Constitution of <br />
            India,{" "}
            <button
              onClick={handleWordClick}
              className={`inline-block px-4 py-1 rounded-lg text-white transition-all duration-300 ${
                animating ? "opacity-0 translate-y-2" : "opacity-100"
              } bg-orange-500`}
            >
              {rotatingWords[wordIndex]}
            </button>
          </h1>

          {/* Subtext */}
          <p className="text-gray-600 text-lg max-w-md">
            Search articles, ask AI doubts, practise quizzes and master every amendment.
          </p>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow border">
            <input
              type="text"
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.target.value)
              }
              placeholder="Search Article 21..."
              className="flex-1 outline-none bg-transparent text-sm"
            />
            <button className="px-4 py-2 bg-orange-500 text-white rounded-xl">
              Search
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-xl">
              Start learning
            </button>
            <button className="px-6 py-3 border rounded-xl">
              Explore articles
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-yellow-200 via-orange-300 to-yellow-400 shadow-xl flex items-center justify-center">
            <div className="w-40 h-40 bg-blue-900 rounded-full flex items-center justify-center text-yellow-300 text-xl font-bold">
              INDIA
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}