// Example: Electron renderer process - installation form
async function installDatabase() {
  const hostname = document.getElementById('hostname').value;
  const db_user = document.getElementById('db_user').value;
  const db_pass = document.getElementById('db_pass').value;
  const db_name = document.getElementById('db_name').value;

  const res = await fetch('http://localhost:3000/api/install', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hostname, db_user, db_pass, db_name })
  });
  const data = await res.json();
  if (data.success) {
    alert('Success! Admin user: ' + data.adminUser + ' Pass: ' + data.adminPass);
    // Redirect to login page in Electron
  } else {
    alert('Error: ' + data.message);
  }
}