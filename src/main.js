document.addEventListener("DOMContentLoaded", function () {
    const answer = document.getElementById("correctAnswer");
    const overlay = document.getElementById("completeOverlay");

    if (answer) {
        answer.addEventListener("click", function () {
            overlay.classList.remove("hidden");
        });
    }
});