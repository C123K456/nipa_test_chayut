import React from 'react'

const Analyzed = ({boundingBox}) => {
    return (
        <div className="analyzed">
        <div className="results_box">
          <h3>Analyzed Results:</h3>
          {Object.keys(boundingBox).map((box, index) => {
            return (
              <li
                className="listdetect"
                key={index}
                style={{ listStyleType: "none" }}
              >
                {index + 1}.{boundingBox[box].name} ({" "}
                {(boundingBox[box].confidence * 100).toFixed(2)}% )
              </li>
            );
          })}
        </div>
      </div>
    )
}

export default Analyzed
