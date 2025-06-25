fetch('https://emkc.org/api/v2/piston/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    language: 'c++',
    version: '10.2.0',
    files: [{ name: 'main.cpp', content: '#include <iostream>\nusing namespace std;\nint main() { cout << "Hello"; return 0; }' }],
    stdin: ''
  })
}).then(res => res.text()).then(console.log).catch(console.error);
