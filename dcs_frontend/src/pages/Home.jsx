
import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [item, setItem] = useState("");
  const [numCriteria, setNumCriteria] = useState(0);
  const [numOptions, setNumOptions] = useState(0);

  const [criteria, setCriteria] = useState([]);
  const [options, setOptions] = useState([]);
  const [scores, setScores] = useState({});

  // Generate Criteria Inputs
  const handleCriteriaChange = (value) => {
    const count = parseInt(value) || 0;
    setNumCriteria(count);

    const newCriteria = Array.from({ length: count }, (_, i) => ({
      id: i,
      name: ""
    }));

    setCriteria(newCriteria);
  };

  // Generate Options Inputs
  const handleOptionsChange = (value) => {
    const count = parseInt(value) || 0;
    setNumOptions(count);

    const newOptions = Array.from({ length: count }, (_, i) => ({
      id: i,
      name: ""
    }));

    setOptions(newOptions);
  };

  // Update Criterion Name
  const updateCriterionName = (index, value) => {
    const updated = [...criteria];
    updated[index].name = value;
    setCriteria(updated);
  };

  // Update Option Name
  const updateOptionName = (index, value) => {
    const updated = [...options];
    updated[index].name = value;
    setOptions(updated);
  };

  // Update Scores
  const updateScore = (optionIndex, criterionIndex, value) => {
    const newScores = { ...scores };

    if (!newScores[optionIndex]) {
      newScores[optionIndex] = {};
    }

    newScores[optionIndex][criterionIndex] = value;
    setScores(newScores);
  };
  const handleSubmit = () => {
  const data = {
    item,
    criteria,
    options,
    scores
  };

  console.log("Submitted Data:", data);
  alert("Decision Data Submitted Successfully!");
};

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <header className="header">
        <h2 className="logo">Decision Companion System</h2>
        <button className="logout-btn">Logout</button>
      </header>

      <div className="container">
        {/* Catchy Heading */}
        <h1 className="main-heading">
          Make Smarter Decisions with Confidence
        </h1>

        {/* Item Input */}
        <div className="section">
          <label>Enter Item (What are you deciding?)</label>
          <input
            type="text"
            placeholder="Example: Laptop"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>

        {/* Number of Criteria */}
        <div className="section">
          <label>Enter Number of Criteria</label>
          <input
            type="number"
            min="0"
            onChange={(e) => handleCriteriaChange(e.target.value)}
          />
        </div>

        {/* Criteria Inputs */}
        {criteria.map((c, index) => (
          <div key={index} className="section">
            <label>Enter Name of Criterion {index + 1}</label>
            <input
              type="text"
              value={c.name}
              onChange={(e) => updateCriterionName(index, e.target.value)}
            />
          </div>
        ))}

        {/* Number of Options */}
        <div className="section">
          <label>Enter Number of Options</label>
          <input
            type="number"
            min="0"
            onChange={(e) => handleOptionsChange(e.target.value)}
          />
        </div>

        {/* Option Inputs */}
        {options.map((o, index) => (
          <div key={index} className="section">
            <label>Enter Name of Option {index + 1}</label>
            <input
              type="text"
              value={o.name}
              onChange={(e) => updateOptionName(index, e.target.value)}
            />
          </div>
        ))}

        {/* Score Matrix */}
        {options.length > 0 && criteria.length > 0 && (
          <div className="score-section">
            <h2>Enter Scores</h2>

            {options.map((option, optionIndex) => (
              <div key={optionIndex} className="option-block">
                <h3 className="option-title">{option.name || `Option ${optionIndex + 1}`}</h3>

                {criteria.map((criterion, criterionIndex) => (
                  <div key={criterionIndex} className="score-input">
                    <label>
                      {criterion.name || `Criterion ${criterionIndex + 1}`}
                    </label>
                    <input
                      type="number"
                      onChange={(e) =>
                        updateScore(
                          optionIndex,
                          criterionIndex,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Home;