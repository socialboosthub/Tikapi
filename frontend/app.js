async function loadProfile() {
  const username = document.getElementById("username").value;
  const status = document.getElementById("status");
  const videosDiv = document.getElementById("videos");

  status.innerText = "Loading...";
  videosDiv.innerHTML = "";

  const res = await fetch(
    `http://localhost:3000/api/profile?username=${username}`,
    {
      headers: { "x-api-key": "devkey123" }
    }
  );

  const data = await res.json();

  if (!data.videos) {
    status.innerText = "Error fetching profile";
    return;
  }

  status.innerText = data.cached ? "Loaded from cache" : "Fresh data";

  data.videos.forEach(v => {
    const video = document.createElement("video");
    video.src = v.play;
    video.controls = true;
    videosDiv.appendChild(video);
  });
}
