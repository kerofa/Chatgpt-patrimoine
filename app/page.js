export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>chatgpt-patrimoine</h1>
      <div id="chat" style={{ marginBottom: "1rem" }}>
        <p><strong>Bot :</strong> Salut ! Pose-moi ta question patrimoniale.</p>
      </div>
      <form id="form">
        <input type="text" id="input" placeholder="Pose ta question ici..." style={{ padding: "0.5rem", width: "70%" }} />
        <button type="submit" style={{ padding: "0.5rem" }}>Envoyer</button>
      </form>
      <script dangerouslySetInnerHTML={{
        __html: `
        const form = document.getElementById('form');
        const input = document.getElementById('input');
        const chat = document.getElementById('chat');
        form.onsubmit = async (e) => {
          e.preventDefault();
          const message = input.value;
          chat.innerHTML += '<p><strong>Toi :</strong> ' + message + '</p>';
          input.value = '';
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
          });
          const data = await res.json();
          chat.innerHTML += '<p><strong>Bot :</strong> ' + data.response + '</p>';
        };
      `}} />
    </main>
  );
}