const BASE_URL = "http://192.168.1.10:8080/api";


function toggleForm() {
  const form = document.getElementById("registerForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.access) {
    localStorage.setItem("token", data.access);
    window.location.href = "dashboard.html";
  } else {
    alert("Login failed");
  }
}

async function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${BASE_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    alert("Registered successfully! Please login.");
    toggleForm();
  } else {
    alert("Registration failed");
  }
}

async function fetchActivities() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/activities/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  const list = document.getElementById("activityList");
  list.innerHTML = "";
  data.forEach(a => {
    list.innerHTML += `<div class="activity">
      <strong>${a.type}</strong><br/>
      Duration: ${a.duration} mins<br/>
      Calories: ${a.calories}<br/>
      Date: ${a.date}
    </div>`;
  });
}

async function addActivity() {
  const token = localStorage.getItem("token");
  const activity = {
    type: document.getElementById("type").value,
    duration: Number(document.getElementById("duration").value),
    calories: Number(document.getElementById("calories").value)
  };

  await fetch(`${BASE_URL}/activities/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(activity)
  });

  fetchActivities();
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

if (window.location.pathname.includes("dashboard")) {
  fetchActivities();
}
