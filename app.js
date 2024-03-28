const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

const form = document.querySelector("form"); // Sélectionne le formulaire dans le document.

form.addEventListener("submit", handleForm) // Attache un gestionnaire d'événements à la soumission du formulaire.

function handleForm(e){
  e.preventDefault(); // Empêche le comportement par défaut de rechargement de la page lors de la soumission du formulaire.

  calculateBmi(); // Appelle la fonction pour calculer l'IMC.
}

const inputs = document.querySelectorAll("input") // Sélectionne tous les éléments input du formulaire.

function calculateBmi(){
  const height = inputs[0].value; // Récupère la valeur de la taille depuis le premier input.
  const weight = inputs[1].value // Récupère la valeur du poids depuis le deuxième input.

  if(!height || !weight || height<=0 || weight<=0){ // Vérifie si les valeurs de taille et de poids sont valides.
    handleError(); // Appelle la fonction de gestion d'erreur si les valeurs ne sont pas valides.
    return; // Sort de la fonction si une erreur est détectée.
  }

  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1) // Calcule l'IMC en utilisant la formule standard, arrondi à un chiffre après la virgule.

  showResult(BMI); // Appelle la fonction pour afficher le résultat de l'IMC calculé.
}

const displayBmi = document.querySelector(".bmi-value"); // Sélectionne l'élément destiné à afficher la valeur de l'IMC.
const result = document.querySelector(".result"); // Sélectionne l'élément destiné à afficher le résultat du calcul de l'IMC.

function handleError() {
  displayBmi.textContent = "Oups!"; // Affiche un message d'erreur dans l'élément destiné à la valeur de l'IMC.
  displayBmi.style.color = "inherit"; // Réinitialise la couleur du texte à celle par défaut.
  result.textContent = "Remplissez correctement les inputs."; // Affiche un message d'erreur demandant à l'utilisateur de remplir correctement les champs.
}

function showResult(BMI){
  const rank = BMIData.find(data => {
    if(BMI >= data.range[0] && BMI <data.range[1]) // Détermine le classement de l'IMC si celui-ci se situe dans un intervalle.
      return data;
    else if(typeof data.range === "number" && BMI >= data.range) // Détermine le classement de l'IMC si celui-ci dépasse une valeur spécifique.
      return data;
  })

  displayBmi.textContent = BMI; // Affiche la valeur de l'IMC calculée.
  displayBmi.style.color =  `${rank.color}`; // Change la couleur du texte en fonction du classement de l'IMC.
  result.textContent = `Résultat : ${rank.name}`; // Affiche le classement de l'IMC avec son nom.
}
