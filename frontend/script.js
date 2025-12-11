const questions = [
    "What is React?",
    "Explain closures in JavaScript.",
    "What is MongoDB?",
    "Explain REST API.",
    "What is Machine Learning?"
];

document.getElementById("question").innerText =
    questions[Math.floor(Math.random() * questions.length)];

async function sendAnswer() {
    const question = document.getElementById("question").innerText;
    const answer = document.getElementById("answer").value;

    const res = await fetch("http://localhost:5000/api/interview/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer })
    });

    const data = await res.json();
    document.getElementById("feedback").innerText = data.feedback;
}
