let cv = null;
let fiche_circuit = null;

function onloadCV(e){
    cv = e.files[0];
}

function onloadFicheCircuit(e){
    fiche_circuit = e.files[0];
}

async function registerPrestataire() {
    const feedback = document.querySelector('.feedback');
    feedback.innerHTML = "Veuillez patienter";
    feedback.style.color = "black";

    const nom = document.querySelector('input[name="nom"]').value;
    const prenom = document.querySelector('input[name="prenom"]').value;
    const entreprise = document.querySelector('input[name="entreprise"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const reference = document.querySelector('input[name="reference"]').value;
    const type = "prestataire";

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("entreprise", entreprise);
    formData.append("email", email);
    formData.append("reference", reference);
    formData.append("type", type);
    formData.append("cv", cv);
    formData.append("fiche_circuit", fiche_circuit);
    
    const res = await fetch('/api/user', {
        method: 'post',
        body: formData
    });

    if (res.status == 200) {
        window.location = "/partage";
    } else {
        feedback.innerHTML = "Une erreur c'est produite";
        feedback.style.color = "red";
    }
}

async function registerDonneurDOrdre() {
    const feedback = document.querySelector('.feedback');
    feedback.innerHTML = "Veuillez patienter";
    feedback.style.color = "black";

    const nom = document.querySelector('input[name="nom"]').value;
    const prenom = document.querySelector('input[name="prenom"]').value;
    const entreprise = document.querySelector('input[name="entreprise"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const type = "donneur-dordre";
    const adresse = document.querySelector('input[name="adresse"]').value;
    const telephone = document.querySelector('input[name="telephone"]').value;

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("entreprise", entreprise);
    formData.append("email", email);
    formData.append("type", type);
    formData.append("adresse", adresse);
    formData.append("fiche_circuit", fiche_circuit);
    formData.append("telephone", telephone);
    
    const res = await fetch('/api/user', {
        method: 'post',
        body: formData
    });


    if (res.status == 200) {
        window.location = "/partage";
    } else {
        feedback.innerHTML = "Une erreur c'est produite";
        feedback.style.color = "red";
    }
}