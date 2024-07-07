import { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

    switch (strength) {
      case 5:
        return 'Strong';
      case 4:
        return 'Good';
      case 3:
        return 'Fair';
      default:
        return 'Weak';
    }
  };

  const generatePassword = () => {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charPool = '';
    if (includeUppercase) charPool += upperCaseChars;
    if (includeLowercase) charPool += lowerCaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool === '') {
      alert('Please select at least one character type.');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      generatedPassword += charPool[randomIndex];
    }

    setPassword(generatedPassword);
    setStrength(calculateStrength(generatedPassword));
  };

  const refreshPassword = () => {
    setPassword('');
    setStrength('');
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className="settings">
        <label>
          Length:
          <input
            type="number"
            min="1"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Include Uppercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Include Lowercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>
      <div className="buttons">
        <button onClick={generatePassword}>Generate Password</button>
        <button onClick={refreshPassword}>Refresh</button>
      </div>
      {password && (
        <div className="result">
          <div className="password-box">
            <input type="text" value={password} readOnly />
            <button
              onClick={() => navigator.clipboard.writeText(password)}
              className="copy-button"
            >
              Copy
            </button>
          </div>
          <div className="strength">
            <span>Password Strength: </span>
            <div className={`strength-bar ${strength.toLowerCase()}`}>
              {strength}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
