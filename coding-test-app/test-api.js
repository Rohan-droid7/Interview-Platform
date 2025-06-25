fetch('http://localhost:3001/api/run-code', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    language: 'c++',
    version: '10.2.0',
    code: '#include <iostream>\nusing namespace std;\nint main() { cout << "Hello"; return 0; }',
    stdin: ''
  })
}).then(res => res.json()).then(console.log).catch(console.error);
