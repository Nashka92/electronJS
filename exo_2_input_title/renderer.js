const formData = document.getElementById("form-data");

formData.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputData = document.getElementById("input-data").value;
  window.electronAPI.sendMessage("channel", inputData);
});
