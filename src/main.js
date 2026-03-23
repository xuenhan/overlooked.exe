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

  toggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      const allOff = [...toggles].every((t) => !t.checked);

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
      if (
        overlay &&
        !overlay.classList.contains("hidden") &&
        overlay.contains(e.target)
      ) {
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
    document.addEventListener(
      "wheel",
      (e) => {
        if (overlay && !overlay.classList.contains("hidden")) return;

        e.preventDefault();
      },
      { passive: false },
    );

    // disable touch scroll
    document.addEventListener(
      "touchmove",
      (e) => {
        if (overlay && !overlay.classList.contains("hidden")) return;

        e.preventDefault();
      },
      { passive: false },
    );

    // disable keyboard scrolling
    document.addEventListener("keydown", (e) => {
      if (overlay && !overlay.classList.contains("hidden")) return;

      const blockedKeys = ["PageUp", "PageDown", "Home", "End", " "];

      if (blockedKeys.includes(e.key)) {
        e.preventDefault();
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  
  const firstNameInput = document.getElementById("firstName");
  const errorText = document.getElementById("firstNameError");
  const nextBtn = document.getElementById("nextBtn");

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");

  const dayInput = document.getElementById("dayInput");
  const yearInput = document.getElementById("yearInput");
  const genderSelect = document.getElementById("genderSelect");

  const yearError = document.getElementById("dobError");
  const dayError = document.getElementById("dobError");
  const genderError = document.getElementById("genderError");

  const nextBtnStep2 = document.getElementById("nextBtnStep2");

  function validateDOB() {
  const day = dayInput.value.trim();
  const year = yearInput.value.trim();

  const isDayValid = /^\d+$/.test(day);
  const isYearValid = /^\d+$/.test(year);

  // reset styles first
  dayInput.classList.remove("border-2", "border-[#B30000]");
  yearInput.classList.remove("border-2", "border-[#B30000]");

  dayInput.classList.add("border-gray-400");
  yearInput.classList.add("border-gray-400");

  // ❌ if both valid
  if (day !== "" && year !== "" && isDayValid && isYearValid) {
    dayError.classList.add("hidden");
    return;
  }

  // ❌ otherwise show error
  dayError.classList.remove("hidden");

  // highlight ONLY the wrong ones
  if (day === "" || !isDayValid) {
    dayInput.classList.remove("border-gray-400");
    dayInput.classList.add("border-2", "border-[#B30000]");
  }

  if (year === "" || !isYearValid) {
    yearInput.classList.remove("border-gray-400");
    yearInput.classList.add("border-2", "border-[#B30000]");
  }
}

  dayInput.addEventListener("input", validateDOB);
  yearInput.addEventListener("input", validateDOB);

  firstNameInput.addEventListener("input", () => {
    if (firstNameInput.value.trim() !== "") {
      // ✅ hide error
      errorText.classList.add("hidden");

      // reset styles
      firstNameInput.classList.remove(
        "border-2",
        "border-[#B30000]",
        "focus:ring-2",
        "focus:ring-[#B30000]",
      );

      firstNameInput.classList.add(
        "border",
        "border-gray-400",
        "focus:ring-1",
        "focus:ring-primary",
      );
    }
  });

  nextBtn.addEventListener("click", () => {
    if (firstNameInput.value.trim() === "") {
      // ❌ show error
      errorText.classList.remove("hidden");

      firstNameInput.classList.remove("border-gray-400");
      firstNameInput.classList.add(
        "border-2", // thicker border
        "border-[#B30000]",
        "focus:ring-2", // thicker ring
        "focus:ring-[#B30000]",
      );
    } else {
      // ✅ remove error
      errorText.classList.add("hidden");

      firstNameInput.classList.remove(
        "border-2", // thicker border
        "border-[#B30000]",
        "focus:ring-2", // thicker ring
        "focus:ring-[#B30000]",
      );
      firstNameInput.classList.add("border-gray-400");
      step1.classList.add("hidden");
      step2.classList.remove("hidden");
    }
  });

  nextBtnStep2.addEventListener("click", () => {

  let hasError = false;

  // ❌ YEAR VALIDATION
  if (
  dayInput.value.trim() === "" ||
  yearInput.value.trim() === ""
) {
  hasError = true;

  dayError.classList.remove("hidden");

  dayInput.classList.add("border-2", "border-[#B30000]");
  yearInput.classList.add("border-2", "border-[#B30000]");
}

  // ❌ GENDER VALIDATION
  if (genderSelect.value === "") {
    hasError = true;

    genderError.classList.remove("hidden");

    genderSelect.classList.remove("border-gray-400");
    genderSelect.classList.add("border-2", "border-[#B30000]");
  } else {
    genderError.classList.add("hidden");

    genderSelect.classList.remove("border-2", "border-[#B30000]");
    genderSelect.classList.add("border-gray-400");
  }

  // ✅ If no errors → proceed
  if (!hasError) {
    console.log("Step 2 valid");
    // 👉 move to next page / overlay / next step
  }
});
genderSelect.addEventListener("change", () => {
  if (genderSelect.value !== "") {
    // ✅ valid → remove error
    genderError.classList.add("hidden");

    genderSelect.classList.remove("border-2", "border-[#B30000]");
    genderSelect.classList.add("border-gray-400");
  }
});
});
