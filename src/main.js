document.addEventListener("DOMContentLoaded", function () {
    const answer = document.getElementById("correctAnswer");
    const overlay = document.getElementById("completeOverlay");

    if (answer) {
        answer.addEventListener("click", function () {
            overlay.classList.remove("hidden");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

  const overlay = document.getElementById("completeOverlay");

  // Task 2 profile dropdown
  const profileBtn = document.getElementById("profileBtn");
  const profileMenu = document.getElementById("profileMenu");

  profileBtn.addEventListener("click", () => {
      profileMenu.classList.toggle("hidden");
  });

  // Settings button
  const settingsBtn = document.getElementById("settingsBtn");
  const profilePage = document.getElementById("profilePage");
  const settingsPage = document.getElementById("settingsPage");

  settingsBtn.addEventListener("click", () => {
      profilePage.classList.add("hidden");
      settingsPage.classList.remove("hidden");
      profileMenu.classList.add("hidden");
  });

  // Notifications page
  const notificationsBtn = document.getElementById("notificationsBtn");
  const settingsPrivacyPage = document.getElementById("settingsPrivacyPage");
  const notificationsPanel = document.getElementById("notificationsPanel");

  notificationsBtn.addEventListener("click", () => {
      settingsPrivacyPage.classList.add("hidden");
      notificationsPanel.classList.remove("hidden");
  });

  // Notification toggles
  const toggles = document.querySelectorAll(".notifToggle");

  toggles.forEach(toggle => {
      toggle.addEventListener("change", () => {

          const allOff = [...toggles].every(t => !t.checked);

          if (allOff) {
              overlay.classList.remove("hidden");
          }

      });
  });

});

document.addEventListener("DOMContentLoaded", () => {

  if (document.body.id === "barrierPage") {

    const overlay = document.getElementById("completeOverlay");

    // block mouse clicks
    document.addEventListener("click", (e) => {

      const sidebar = document.querySelector("aside");
      if (overlay && !overlay.classList.contains("hidden") && overlay.contains(e.target)) {
    return;
  }

  if (sidebar && sidebar.contains(e.target)) {
    return;
  }

      e.preventDefault();
      e.stopPropagation();

    });

    // handle ENTER interaction
    document.addEventListener("keydown", (e) => {

      if (overlay && !overlay.classList.contains("hidden")) return;

      if (e.key !== "Enter") return;

      const el = document.activeElement;
      if (!el) return;

      e.preventDefault();

      if (el.type === "checkbox") {
        el.checked = !el.checked;
        el.dispatchEvent(new Event("change"));
      } else {
        el.click();
      }

    });

    // disable scroll wheel
    document.addEventListener("wheel", (e) => {

      if (overlay && !overlay.classList.contains("hidden")) return;

      e.preventDefault();

    }, { passive: false });

    // disable touch scroll
    document.addEventListener("touchmove", (e) => {

      if (overlay && !overlay.classList.contains("hidden")) return;

      e.preventDefault();

    }, { passive: false });

    // disable keyboard scrolling
    document.addEventListener("keydown", (e) => {

      if (overlay && !overlay.classList.contains("hidden")) return;

      const blockedKeys = [
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " "
      ];

      if (blockedKeys.includes(e.key)) {
        e.preventDefault();
      }

    });

  }

});

