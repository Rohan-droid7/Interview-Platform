fetch('https://wandbox.org/api/compile.json', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    compiler: 'gcc-head',
    code: '#include <iostream>\nusing namespace std;\nint main() { string s; cin >> s; cout << "Hello " << s; return 0; }',
    stdin: 'World'
  })
}).then(res => res.json()).then(console.log).catch(console.error);
