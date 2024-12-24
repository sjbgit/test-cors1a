// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post('http://localhost:5000/api/data', {
        message: message,
      });
      setResponse(result.data);
      setError('');
    } catch (err) {
      setError('Error: ' + err.response?.data?.error || 'Unknown error');
      setResponse(null);
    }
  };

  return (
    <div className="App">
      <h1>React and Node.js CORS Example</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter a message"
        />
        <button type="submit">Send</button>
      </form>

      {response && (
        <div>
          <h3>Response from Server:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
