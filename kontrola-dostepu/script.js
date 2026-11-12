(function () {
  "use strict";

  const form = document.getElementById("lead-form");
  const steps = Array.from(form.querySelectorAll(".form-step"));
  const progressBar = document.getElementById("progress-bar");
  const progressValue = document.getElementById("progress-value");
  const stepLabel = document.getElementById("step-label");
  const mailStatus = document.getElementById("mail-status");
  let currentStep = 0;

  function updateProgress() {
    const percentage = Math.round(((currentStep + 1) / steps.length) * 100);
    progressBar.style.width = percentage + "%";
    progressValue.textContent = percentage + "%";
    stepLabel.textContent = "Krok " + (currentStep + 1) + " z " + steps.length;
  }

  function showStep(index) {
    steps.forEach(function (step, stepIndex) {
      const active = stepIndex === index;
      step.hidden = !active;
      step.classList.toggle("is-active", active);
    });
    currentStep = index;
    updateProgress();
    const legend = steps[index].querySelector("legend");
    if (legend) {
      legend.setAttribute("tabindex", "-1");
      legend.focus({ preventScroll: true });
    }
  }

  function selectedValue(name) {
    const selected = form.querySelector('input[name="' + name + '"]:checked');
    return selected ? selected.value : "";
  }

  function validateChoice(step) {
    const radio = step.querySelector('input[type="radio"]');
    if (!radio) return true;
    const name = radio.name;
    const error = step.querySelector('[data-error="' + name + '"]');
    if (!selectedValue(name)) {
      error.textContent = "Wybierz jedną odpowiedź, aby przejść dalej.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  form.querySelectorAll(".next-step").forEach(function (button) {
    button.addEventListener("click", function () {
      if (validateChoice(steps[currentStep])) showStep(Math.min(currentStep + 1, steps.length - 1));
    });
  });

  form.querySelectorAll(".prev-step").forEach(function (button) {
    button.addEventListener("click", function () {
      showStep(Math.max(currentStep - 1, 0));
    });
  });

  form.querySelectorAll('input[type="radio"]').forEach(function (input) {
    input.addEventListener("change", function () {
      const error = input.closest("fieldset").querySelector(".field-error");
      if (error) error.textContent = "";
    });
  });

  function validateContactStep() {
    const requiredFields = Array.from(steps[3].querySelectorAll("input[required]"));
    let valid = true;
    requiredFields.forEach(function (field) {
      const fieldValid = field.checkValidity();
      field.setAttribute("aria-invalid", fieldValid ? "false" : "true");
      if (!fieldValid) valid = false;
    });

    const error = steps[3].querySelector('[data-error="contact"]');
    if (!valid) {
      error.textContent = "Uzupełnij wymagane pola i zaakceptuj informację o prywatności.";
      const firstInvalid = requiredFields.find(function (field) { return !field.checkValidity(); });
      if (firstInvalid) firstInvalid.focus();
      return false;
    }
    error.textContent = "";
    return true;
  }

  form.addEventListener("input", function (event) {
    if (event.target.matches("input[required]")) event.target.setAttribute("aria-invalid", "false");
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateContactStep()) return;

    const data = new FormData(form);
    const subject = "Zapytanie o system kontroli dostępu — " + data.get("company");
    const message = [
      "Dzień dobry,",
      "",
      "proszę o kontakt w sprawie systemu kontroli dostępu.",
      "",
      "Liczba przejść lub punktów dostępu: " + selectedValue("access_points"),
      "Typ obiektu: " + selectedValue("facility_type"),
      "Priorytet: " + selectedValue("priority"),
      "",
      "Imię i nazwisko: " + data.get("name"),
      "Firma: " + data.get("company"),
      "Stanowisko: " + data.get("position"),
      "Telefon: " + data.get("phone"),
      "E-mail: " + data.get("email"),
      "Zgoda marketingowa: " + (data.get("marketing") ? "tak" : "nie")
    ].join("\n");

    const mailto = "mailto:biuro@polsystem.pl?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
    window.location.href = mailto;

    form.hidden = true;
    document.querySelector(".progress").hidden = true;
    mailStatus.hidden = false;
    mailStatus.focus();
  });

  updateProgress();
})();
