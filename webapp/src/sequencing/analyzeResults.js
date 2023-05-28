import React from "react";

function Results(props) {
  const { linkageFreq, surgarFreq, mass, bases } = props.results;
  return (
    <div className="flex flex-column p-3">
      <div className="mb-2">
        <span className="text-900">Linkage Freq</span>:
        <ul>
          {Object.entries(linkageFreq).filter(entry => entry[0] !== 'null').map((entry, index) => (
            <li key={index}>{entry[0]}: {entry[1]}</li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <span className="text-900">Surgar Freq</span>:
        <ul>
          {Object.entries(surgarFreq).map((entry, index) => (
            <li key={index}>{entry[0]}: {entry[1]}</li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <span className="text-900">Mass of Sequence</span>: {mass}
      </div>
      <div className="mb-2">
        <span className="text-900">Shipping labels</span>: {bases}
      </div>
    </div>
  );
}

export default Results;