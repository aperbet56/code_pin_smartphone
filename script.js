// Récupération des éléments HTML5
const generatorInput = document.querySelector(".pin-generator > .form");
const generateBtn = document.querySelector(".pin-generator > .generate-btn");
const userInput = document.querySelector(".input-section > .form");
const submitBtn = document.querySelector(".input-section .submit-btn");
const calculatorBtns = document.querySelectorAll(".calc-body .button");
const submitAttempt = document.querySelector(".input-section .action-left");
const matched = document.querySelector(".notify-section .matched");
const notMatched = document.querySelector(".notify-section .notmatched");

// Création des variables generatedPin, submittedPin et attempt
let generatedPin = 0;
let submittedPin = 0;
let attempt = 3;

// Déclaration de la fonction pinGenerator qui va permettre de générer un code PIN
const pinGenerator = () => {
  // Création d'un code PIN aléatoire
  generatedPin = Math.floor(1000 + Math.random() * 9000);
  console.log("PIN:", generatedPin);
  generatorInput.value = generatedPin;
  generatorInput.disabled = true;
  generatorInput.classList.add("active");
  generateBtn.disabled = true;
  // Mise en place du focus sur userInput
  userInput.focus();
  userInput.value = "";
};

// Déclaration de la fonction userPin Generator qui va permettre de récupérer le code PIN saisi par l'internaute
const userPinGenerator = (e) => {
  const { innerText: btnLabel } = e.target;
  userInput.disabled = true;

  // condition if else if else
  if (btnLabel === "<") {
    // Suppression de la dernière valeur saisie par l'internaute
    userInput.value = userInput.value.slice(0, -1);
  } else if (btnLabel === "C") {
    // Suppression de toutes les valeurs saisies par l'internaute
    userInput.value = "";
  } else {
    // si l'internaute n'a pas saisi 4 valeurs
    if (userInput.value.length < 4) {
      userInput.value += btnLabel;
      submittedPin = parseInt(userInput.value);
    }
  }
};

// Déclaration de la fonction handlePin submit qui va permettre de gérer la soumission du code Pin saisi par l'internaute
const handlePinSubmit = () => {
  // L'input est vidé (sans valeur)
  userInput.value = "";
  // La méthode blur() retire le focus du clavier de l'élément courant.
  userInput.blur();

  // Mise en place de conditions
  if (generatedPin > 0 && submittedPin > 0) {
    attempt--;
    console.log("esssai :", attempt);

    if (generatedPin !== submittedPin) {
      // Reset submittedPin and UI Update
      submittedPin = 0;
      submitAttempt.textContent = `Essai restant : ${attempt}`;
      submitAttempt.style.color = "#158888";

      // Affichage de la notification
      notMatched.classList.add("active");
      setTimeout(() => {
        notMatched.classList.toggle("active");
      }, 3000);
    }
  } else if (generatedPin === 0 || submittedPin === 0) {
    console.log("PIN :", generatedPin, "PIN saisi :", submittedPin);
  }
  if (attempt === 0) {
    submitBtn.disabled = true;
    alert(
      "Il ne vous reste plus aucun essai ! Votre smartphone est bloqué. Veuillez attendre quelques secondes avant de pouvoir générer un nouveau code PIN !!"
    );
    setTimeout(() => {
      generatedPin = 0;
      submittedPin = 0;
      attempt = 3;

      // Reset generatedInput, userInput, attempt
      generatorInput.value = "";
      generatorInput.disabled = false;
      generateBtn.disabled = false;
      submitBtn.disabled = false;
      generatorInput.classList.remove("active");
      userInput.disabled = false;
      userInput.value = "";

      submitAttempt.textContent = `Essai restant : ${attempt}`;
    }, 5000);
  }
  if (generatedPin > 0 && generatedPin === submittedPin) {
    generatedPin = 0;
    submittedPin = 0;
    attempt = 3;

    // Reset generatedInput, userInput, attempt
    generatorInput.value = "";
    generatorInput.disabled = false;
    generateBtn.disabled = false;
    generatorInput.classList.remove("active");
    userInput.disabled = false;
    userInput.value = "";

    submitAttempt.textContent = `Essai restant : ${attempt}`;

    // Affichage de la notification
    matched.classList.add("active");
    setTimeout(() => {
      matched.classList.toggle("active");
    }, 3000);
  }
};

// Ecoute de l'événement "click" sur le bouton generateBtn et appel de la fonction pinGenerator
generateBtn.addEventListener("click", pinGenerator);

// Sur chaque claculatorBtns
calculatorBtns.forEach((btn) => {
  // Ecoute de l'événement "click" et appel de la fonction userPinGenerator
  btn.addEventListener("click", userPinGenerator);
});

// Ecoute de l'événement "click" sur le bouton submitBtn et appel de la fonction HandlePinSubmit
submitBtn.addEventListener("click", handlePinSubmit);
