// Create an overlay container once email address is clicked
document.addEventListener("DOMContentLoaded", () => {
    const email = document.getElementById("emailLink");
    const overlay = document.getElementById("completeOverlay");

    if (email && overlay) {
        email.addEventListener("click", () => {
            overlay.classList.remove("hidden");
        })
    }
})

// Create an overlay to introduce barrier once the button is clicked
document.addEventListener("DOMContentLoaded", () => {
    const barrierOverlay = document.getElementById("introduceBarrier");
    const continueButton = document.getElementById("continueButton");

    if (barrierOverlay && continueButton) {
        continueButton.addEventListener("click", () => {
            barrierOverlay.classList.remove("hidden");
        })
    }
})