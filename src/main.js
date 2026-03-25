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

  if (profileBtn && profileMenu) {
    profileBtn.addEventListener("click", () => {
      profileMenu.classList.toggle("hidden");
    });
  }

  // Settings button
  const settingsBtn = document.getElementById("settingsBtn");
  const profilePage = document.getElementById("profilePage");
  const settingsPage = document.getElementById("settingsPage");

  if (settingsBtn && profilePage && settingsPage) {
    settingsBtn.addEventListener("click", () => {
      profilePage.classList.add("hidden");
      settingsPage.classList.remove("hidden");
      profileMenu.classList.add("hidden");
    });
  }

  // Notifications page
  const notificationsBtn = document.getElementById("notificationsBtn");
  const settingsPrivacyPage = document.getElementById("settingsPrivacyPage");
  const notificationsPanel = document.getElementById("notificationsPanel");

  if (notificationsBtn && settingsPrivacyPage && notificationsPanel) {
    notificationsBtn.addEventListener("click", () => {
      settingsPrivacyPage.classList.add("hidden");
      notificationsPanel.classList.remove("hidden");
    });
  }

  const toggles = document.querySelectorAll(".notifToggle");

  if (toggles.length > 0) {
    toggles.forEach((toggle) => {
      toggle.addEventListener("change", () => {
        const allOff = [...toggles].every((t) => !t.checked);

        if (allOff) {
          overlay.classList.remove("hidden");
        }
      });
    });
  }

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
  const step3 = document.getElementById("step3");
  const step4 = document.getElementById("step4");
  const completeOverlay = document.getElementById("completeOverlay");

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
    if (dayInput.value.trim() === "" || yearInput.value.trim() === "") {
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
      step2.classList.add("hidden");
      step3.classList.remove("hidden");
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

  const passwordInput = document.getElementById("passwordInput");

  const ruleLength = document.getElementById("ruleLength");
  const ruleUpper = document.getElementById("ruleUpper");
  const ruleLower = document.getElementById("ruleLower");
  const ruleNumber = document.getElementById("ruleNumber");
  const ruleSpecial = document.getElementById("ruleSpecial");

  function updateRule(el, condition) {
    const icon = el.querySelector(".icon");

    if (condition) {
      // ✅ valid → green + checks
      icon.classList.remove("bg-[#B30000]");
      icon.classList.add("bg-[#008A25]");

      icon.innerHTML = `
    <svg class="w-3 h-3 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="3">
      <path d="M5 10l3 3 7-7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
    } else {
      // ❌ invalid → red + cross
      icon.classList.remove("bg-[#008A25]");
      icon.classList.add("bg-[#B30000]");

      icon.textContent = "✗";
    }
  }

  passwordInput.addEventListener("input", () => {
    console.log("typing password");
    const val = passwordInput.value;

    updateRule(ruleLength, val.length >= 12);
    updateRule(ruleUpper, /[A-Z]/.test(val));
    updateRule(ruleLower, /[a-z]/.test(val));
    updateRule(ruleNumber, /\d/.test(val));
    updateRule(ruleSpecial, /[!#%,*]/.test(val));
  });

  const showPassword = document.getElementById("showPassword");

  if (showPassword && passwordInput) {
    showPassword.addEventListener("change", () => {
      passwordInput.type = showPassword.checked ? "text" : "password";
    });
  }

  const createBtn = document.getElementById("createBtn");
  const passwordError = document.getElementById("passwordError");

  const usernameInput = document.getElementById("usernameInput");
  const usernameError = document.getElementById("usernameError");

  usernameInput.addEventListener("input", () => {
    const username = usernameInput.value.trim();
    const isUsernameValid = /^\d+$/.test(username);

    if (isUsernameValid) {
      // ✅ valid → hide error
      usernameError.classList.add("hidden");

      usernameInput.classList.remove("border-2", "border-[#B30000]");
      usernameInput.classList.add("border-gray-400");
    } else {
      // ❌ invalid → show error
      usernameError.classList.remove("hidden");

      usernameInput.classList.remove("border-gray-400");
      usernameInput.classList.add("border-2", "border-[#B30000]");
    }
  });

  createBtn.addEventListener("click", () => {
    let hasError = false;

    // ===== USERNAME VALIDATION =====
    const username = usernameInput.value.trim();
    const isUsernameValid = /^\d+$/.test(username);

    if (!isUsernameValid) {
      hasError = true;

      usernameError.classList.remove("hidden");

      usernameInput.classList.remove("border-gray-400");
      usernameInput.classList.add("border-2", "border-[#B30000]");
    } else {
      usernameError.classList.add("hidden");

      usernameInput.classList.remove("border-2", "border-[#B30000]");
      usernameInput.classList.add("border-gray-400");
    }

    // ===== PASSWORD VALIDATION =====
    const val = passwordInput.value;

    const isPasswordValid =
      val.length >= 12 &&
      /[A-Z]/.test(val) &&
      /[a-z]/.test(val) &&
      /\d/.test(val) &&
      /[!#%,*]/.test(val);

    if (!isPasswordValid) {
      hasError = true;

      passwordError.classList.remove("hidden");

      passwordInput.classList.remove("border-gray-400");
      passwordInput.classList.add("border-2", "border-[#B30000]");
    } else {
      passwordError.classList.add("hidden");

      passwordInput.classList.remove("border-2", "border-[#B30000]");
      passwordInput.classList.add("border-gray-400");
    }

    // ===== PROCEED =====
    if (!hasError) {
      step3.classList.add("hidden");
      step4.classList.remove("hidden");
    }
  });

  const createAccountBtn = document.getElementById("createAccountBtn");
  const termsCheckbox = document.getElementById("termsCheckbox");
  const termsError = document.getElementById("termsError");

  createAccountBtn.addEventListener("click", () => {
    if (!termsCheckbox.checked) {
      // ❌ show error
      termsError.classList.remove("hidden");
      return;
    }

    // ✅ remove error
    termsError.classList.add("hidden");
    completeOverlay.classList.remove("hidden");
    completeOverlay.classList.add("flex", "flex-col");
    console.log("Account successfully created 🎉");
  });
});

function openProduct() {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("productPage").classList.remove("hidden");
}

function goToCart() {
  document.getElementById("productPage").classList.add("hidden");
  document.getElementById("cartPage").classList.remove("hidden");
}

function completeTask() {
  document.getElementById("cartPage").classList.add("hidden");
  document.getElementById("completeOverlay").classList.remove("hidden");
  const container = document.getElementById("taskContainer");

  container.classList.remove("border", "border-gray-500", "bg-white");
  document.getElementById("topBar").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("birthYear");
  if (!select) return;

  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= 1900; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    select.appendChild(option);
  }
});

function validateForm() {
  const formError = document.getElementById("formError");

  const fields = [
    document.getElementById("firstName"),
    document.getElementById("lastName"),
    document.getElementById("birthDate"),
    document.getElementById("birthYear"),
    document.getElementById("gender"),
    document.getElementById("username"),
    document.getElementById("password"),
  ];

  let hasError = false;

  fields.forEach((field) => {
    if (!field || field.value.trim() === "") {
      hasError = true;
    } 
  });

  if (hasError) {
    formError.classList.remove("hidden");
    return;
  }

  // ✅ success
  formError.classList.add("hidden");
  completeTask();
}
