// declaration des variables globaux 
let works =[];
let categoriesWorks =[ {
  "id": 0,
  "name": "Tous"
}];


checkIfConnected();
loadFilters();
loadProjects();

// Charger les projet depuis l'API
function loadProjects(){
// Appel à l'API avec fetch
fetch('http://localhost:5678/api/works')
.then(function(response) {
        // Affichage de la réponse dans la console
        console.log(response);
         // Vérification de la réponse
        if(response.ok) {
          // Si la réponse est OK, la convertir en format JSON
            return response.json();
        }
  })
  .then(function (data) {
   // Stockage des données JSON dans la variable 'works'
    works = data;
     // Appel de la fonction createProjects avec les données 'works'
    createProjects(works);
  })
  .catch(function(error) {
    // Gestion des erreurs en affichant un message dans la console
    console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
    // Affichage d'une alerte en cas d'erreur
    alert("Une erreur est survenue ! Veuillez contacter l'administrateur! ");
  });
}
//Charger les filtres depuis l'API
function loadFilters(){
    // Appel à l'API avec fetch
    fetch('http://localhost:5678/api/categories')
    // Attente de la réponse de la requête
    .then(function(response) {
            // Affichage de la réponse dans la console
            console.log(response);
            // Vérification de la réponse
            if(response.ok) {
              // Si la réponse est OK, la convertir en format JSON
                return response.json();
            }
      })
      // Une autre promesse pour traiter les données JSON
      .then(function (data) {
        // Crée un tableau vide 'categoriesWorks' pour stocker les données JSON
        data.forEach(element => {
          // Ajoute chaque élément du tableau 'data' à 'categoriesWorks'
          categoriesWorks.push(element);
        });
        // Appel de la fonction createFilters avec les données 'categoriesWorks'
        createFilters(categoriesWorks);
      })
      // Gestion des erreurs en cas de problème avec la requête fetch
      .catch(function(error) {
        // Affichage d'un message d'erreur dans la console
        console.log('Il y a eu un problème avec l\'opération fetch : ' + error.message);
        // Affichage d'une alerte pour l'utilisateur en cas d'erreur
        alert("Une erreur est survenue ! Veuillez contacter l'administrateur! ");
      });
    }

// Définition de la fonction createProjects avec un paramètre 'tableauProjet'
function createProjects(tableauProjet){
    // Sélectionne l'élément HTML avec la classe "gallery" et le stocke dans la variable 'gallery'
    const gallery = document.querySelector(".gallery");
    // Efface le contenu HTML de l'élément 'gallery'
    gallery.innerHTML="";
    // Parcours chaque élément du tableau 'tableauProjet' avec une boucle forEach
    tableauProjet.forEach(element => {
      // Affiche l'élément dans la console
        console.log(element)
        // Crée une nouvelle balise HTML de type 'figure' en appelant la fonction 'createFigure' avec l'élément actuel
        const figure = createFigure(element);
        // Ajoute la 'figure' créée à l'élément 'gallery' pour l'afficher dans l'interface utilisateur
        gallery.appendChild(figure);
    });
}

  // Cette fonction prend un paramètre tableau d'éléments.
function createFilters(tableauFilter){
  // On sélectionne un élément du document ayant la classe CSS "filters" et on le stocke dans la variable "filters".
  const filters = document.querySelector(".filters");
  // on selectionne le composant select
  const select = document.getElementById("categories");
  // On vide le contenu de l'élément "filters". Cela effacera tous les éléments enfants qu'il contient.
  filters.innerHTML="";
  select.innerHTML="";
  // On utilise une boucle forEach pour parcourir chaque élément du tableau "tableauFilter".
  tableauFilter.forEach(element => {
    // On affiche chaque élément du tableau dans la console.
    console.log(element)
    // On appelle une fonction appelée "createFilter" avec l'élément actuel en tant qu'argument. Le résultat de cette fonction est stocké dans une variable appelée "filter".
    const filter = createFilter(element);
    // On ajoute l'élément "filter" en tant qu'enfant de l'élément "filters". Cela placera l'élément "filter" à l'intérieur de l'élément "filters".
    filters.appendChild(filter);

    // Ajoutez un console.log pour vérification ou débogage, par exemple :
    console.log("Élément ajouté aux filtres : " + element.name);

    if(element.id!=0){
      // On appelle une fonction appelée "createslectCategorie" avec l'élément actuel en tant qu'argument. Le résultat de cette fonction est stocké dans une variable appelée "option".
      const option = createOption(element);
      // On ajoute l'élément "option" en tant qu'enfant de l'élément "select".
      select.appendChild(option);

      // Ajoutez un console.log pour vérification ou débogage, par exemple :
          console.log("Option de catégorie ajoutée : " + element.name);
    }

    const filterAll = document.querySelector(".filters div")
    console.log(filterAll)
    filterAll.classList.add("couleur-inversee")
  });
}

// Coder une fonction que me cree un element figure comme suit 
function createFigure(work){
  // On crée un élément HTML de type figure
    const figure = document.createElement('figure');
     // On attribue un identifiant unique à la figure basé sur l'ID du travail
    figure.setAttribute("id", "figure"+work.id);
  // On crée un élément HTML de type img et on lui attribue sa source et un texte alternatif
    const img = document.createElement('img');
    img.src = work.imageUrl; // Définition de la source de l'image
    img.alt=work.title; // Définition du texte alternatif de l'image, généralement utilisé pour l'accessibilité
      // On crée un élément HTML de type figcaption pour le titre de l'image et on lui attribue le texte de la légende
    const figcaption = document.createElement('figcaption');
    figcaption.textContent = work.title; // Le texte de la légende est défini avec le titre du travail
    figcaption.className ="figcaptionIndex" // Ajout d'une classe CSS à la légende
  // On ajoute l'élément img à l'élément figure
    figure.appendChild(img);
  // On ajoute l'élément figcaption à l'élément figure
    figure.appendChild(figcaption);
  //Retourne l'élément "figure" crée
    return figure;
}


//OPTION MODALE 
//fonction createOption avec un paramètre 'categorie'
function createOption(categorie){
  // Crée un nouvel élément HTML de type 'option' et le stocke dans la variable 'option'
  const option = document.createElement("option");
  // Définit la valeur de l'attribut 'value' de l'élément 'option' avec l'ID de la catégorie
  option.value = categorie.id;
  // Définit le texte à afficher dans l'élément 'option' avec le nom de la catégorie
  option.text = categorie.name;
  // Ajout d'un console.log pour afficher des informations de débogage
  console.log("Option créée pour la catégorie : ", categorie.name);
  // Retourne l'élément 'option' créé
  return option;
}

// Créez une variable pour stocker le bouton actuellement actif
let boutonActif = null;
// On crée un bouton pour le filtre et on lui attribue le nom de la catégorie de travaux
function createFilter(categorie) {
// Crée un nouvel élément HTML de type "div" et l'assigne à la variable "button".
  const button = document.createElement("div");
  // Attribue le texte contenu dans la propriété "name" de l'objet "categorie" à la propriété "textContent" de l'élément "button".
  button.textContent = categorie.name;
  // Attribue la valeur de la propriété "id" de l'objet "categorie" à la propriété "id" de l'élément "button".
  button.id = categorie.id;
  // Ajoute la classe CSS "filter" à l'élément "button".
  button.className="filter";
// On ajoute un événement de clic sur le bouton pour filtrer les travaux correspondant à la catégorie sélectionnée
  button.addEventListener("click", () => {
 // Inversez les couleurs en utilisant la classe "couleur-inversee"
 button.classList.toggle('couleur-inversee');

 // Réinitialisez les autres boutons en supprimant la classe "couleur-inversee"
 const otherButtons = document.querySelectorAll('.filter');
 otherButtons.forEach((otherButton) => {
   if (otherButton !== button) {
     otherButton.classList.remove('couleur-inversee');
   }
 });

  resetFilters(categorie.id);
  if(categorie.id == 0){
    createProjects(works);
  }
  else{

    // trouver la nouvelle liste filtré depuis la liste des projets globale
 const listFilter= works.filter((work)=>(work.categoryId == categorie.id)); 
 // resultat : actualiser l'affichage par la nouvelle liste filtré
 createProjects(listFilter);

  }
 
  });

  return button;
}
// Définition de la fonction resetFilters avec un paramètre 'categorieId'
function resetFilters(categorieId){
  // Sélectionne tous les éléments HTML avec la classe 'filter' et les stocke dans la variable 'listFilters'
  const listFilters = document.querySelectorAll('.filter');
  // Parcours chaque élément de 'listFilters' avec une boucle forEach
  listFilters.forEach(element => {
    // Vérifie si l'ID de l'élément correspond à 'categorieId'
    if(element.id == categorieId)
    {
      // Si c'est le cas, ajoute la classe 'button-selected' à l'élément
      element.classList.add('button-selected');
    }
    else{
      // Sinon, supprime la classe 'button-selected' de l'élément
    element.classList.remove('button-selected');
  }
  });
}

// Définition de la fonction checkIfConnected (Vérifier si l'utilisateur est connecté)
function checkIfConnected(){
// Si l'utilisateur est connecté (vérification en utilisant localStorage)
if (localStorage.getItem('token')) {
// afficher le lien logout dans le menu et cacher celui de login
const login = document.getElementById("login");
login.style.display = "none";// Cacher le  "login"
const logout = document.getElementById("logout");
logout.style.display = "block";// Afficher le lien "logout"
// Cacher les filtres des options de filtrage
const filtres = document.querySelector(".filters");
filtres.style.display = "none";
// cacher la barre noir 
const barreNoir = document.querySelector(".barreNoir")
barreNoir.style.display = "flex";
// afficher les boutons modifier
const btnsModifier = document.querySelectorAll(".btnModifier")
btnsModifier.forEach(element => {
  element.style.display = "flex";
});
}
else {
  // cacher le lien logout dans le menu et afficher celui de login
const login = document.getElementById("login");
login.style.display = "block";
const logout = document.getElementById("logout");
logout.style.display = "none";
// afficher les filtres 
const filtres = document.querySelector(".filters");
filtres.style.display = "flex";
// afficher la barre noire 
const barreNoir = document.querySelector(".barreNoir")
barreNoir.style.display ="none";
// cacher les boutons modifier
const btnsModifier = document.querySelectorAll(".btnModifier")
btnsModifier.forEach(element => {
  element.style.display = "none";
});
}
}
// Lorsque l'utilisateur clique sur "logout", il se déconnecte.
const displayLogout = document.getElementById("logout");
// Ajoute un écouteur d'événement "click" à l'élément "displayLogout".
displayLogout.addEventListener("click",() =>{
  // Supprime l'élément "token" stocké dans le localStorage du navigateur.
  window.localStorage.removeItem("token");
  // redirect to offline homepage
  window.location.href = "/FrontEnd/index.html";
});