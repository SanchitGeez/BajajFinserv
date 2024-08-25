import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValidJson, setIsValidJson] = useState(false);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(inputValue);
      console.log(jsonData)
      setIsValidJson(true);
      axios.post('http://localhost:5000/bfhl', { data: jsonData.data })
        .then(response => {
          setResponse(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      setIsValidJson(false);
    }
  };

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;
    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      if (option === 'Alphabets') {
        filteredResponse.alphabets = response.alphabets;
      } else if (option === 'Numbers') {
        filteredResponse.numbers = response.numbers;
      } else if (option === 'Highest lowercase alphabet') {
        filteredResponse.highestLowercaseAlphabet = response.highest_lowercase_alphabet;
      }
    });
    return (
      <div>
        {Object.keys(filteredResponse).map((key, index) => (
          <div key={index}>
            <h4>{key}</h4>
            <ul>
              {filteredResponse[key].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={inputValue} onChange={handleInputChange} />
        <button type="submit">Submit</button>
        {isValidJson ? null : <div style={{ color: 'red' }}>Invalid JSON</div>}
      </form>
      {response && (
        <div>
          <select multiple value={selectedOptions} onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;