import React, { useEffect, useState } from 'react';
import { getLatestDecisionAPI } from '../services/allAPIs';
import './Result.css';

function Result() {

  const [decision, setDecision] = useState(null);
  const [results, setResults] = useState([]);
  const [explanation, setExplanation] = useState([]);

  useEffect(() => {
    fetchDecision();
  }, []);

  const fetchDecision = async () => {
    const token = localStorage.getItem("token");

    const response = await getLatestDecisionAPI({
      Authorization: `Bearer ${token}`
    });

    if (response.status === 200) {
      setDecision(response.data);
      calculateResult(response.data);
    }
  };

  const calculateResult = (data) => {

    const { criteria, options, scores } = data;

    const totalWeight = criteria.reduce((sum, c) => sum + parseFloat(c.weight), 0);

    const normalizedWeights = criteria.map(c =>
      parseFloat(c.weight) / totalWeight
    );

    let finalScores = [];

    options.forEach((option, optionIndex) => {

      let totalScore = 0;

      criteria.forEach((criterion, criterionIndex) => {

        const values = options.map((_, i) =>
          parseFloat(scores[i][criterionIndex])
        );

        const min = Math.min(...values);
        const max = Math.max(...values);

        const value = parseFloat(scores[optionIndex][criterionIndex]);

        let normalizedValue = 0;

        if (max === min) {
          normalizedValue = 1;
        } else if (criterion.type === "benefit") {
          normalizedValue = (value - min) / (max - min);
        } else {
          normalizedValue = (max - value) / (max - min);
        }

        totalScore += normalizedValue * normalizedWeights[criterionIndex];
      });

      finalScores.push({
        name: option.name,
        score: totalScore,
        index: optionIndex
      });
    });

    finalScores.sort((a, b) => b.score - a.score);

    setResults(finalScores);

    generateExplanation(finalScores[0], data);
  };

  const generateExplanation = (topOption, data) => {

    const { criteria, options, scores } = data;
    const explanations = [];

    const optionIndex = topOption.index;

    criteria.forEach((criterion, criterionIndex) => {

      const values = options.map((_, i) =>
        parseFloat(scores[i][criterionIndex])
      );

      const max = Math.max(...values);
      const min = Math.min(...values);

      const value = parseFloat(scores[optionIndex][criterionIndex]);
      const weight = parseFloat(criterion.weight);

      // Best performance
      if (
        (criterion.type === "benefit" && value === max) ||
        (criterion.type === "cost" && value === min)
      ) {
        explanations.push(`It had the best ${criterion.name}.`);
      }

      // Above average
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      if (
        (criterion.type === "benefit" && value > avg) ||
        (criterion.type === "cost" && value < avg)
      ) {
        explanations.push(`It performed above average in ${criterion.name}.`);
      }

      // High weight influence
      if (weight >= 40) {
        explanations.push(`High weight on ${criterion.name} favored it.`);
      }
    });

    setExplanation(explanations);
  };

  return (
    <div className="result-container min-h-screen">
      <h1 className="result-title">Decision Results</h1>

      {results.length > 0 ? (
        <>
          <div className="result-cards">
            {results.map((res, index) => (
              <div
                key={index}
                className={`result-card ${index === 0 ? "winner" : ""}`}
              >
                <div className="rank">Rank {index + 1}</div>
                <h2 className="option-name">{res.name}</h2>
                <p className="score">Score: {res.score.toFixed(4)}</p>
              </div>
            ))}
          </div>

          {/* Explanation Section */}
          <div className="explanation-box">
            <h2 id='explaining'>Why did "{results[0].name}" rank highest?</h2>
            <ul>
              {explanation.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="loading-text">Calculating results...</p>
      )}
    </div>
  );
}

export default Result;