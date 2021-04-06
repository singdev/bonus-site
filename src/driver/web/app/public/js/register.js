let cv = null;
let fiche_circuit = null;
let cnss = null;
let faillite = null;
let compte_certifie = null;
let imposition = null;

function onloadCV(e){
    cv = e.files[0];
}

function onloadFicheCircuit(e){
    fiche_circuit = e.files[0];
}

function onloadNonFaillite(e){
    faillite = e.files[0];
}

function onloadCNSS(e){
    cnss = e.files[0];
}

function onloadImposition(e){
    imposition = e.files[0];
}

function onloadCompteCertifie(e){
    compte_certifie = e.files[0];
}

async function registerPrestataire() {
    showModal("loader");
    const nom = document.querySelector('input[name="nom"]').value;
    const prenom = document.querySelector('input[name="prenom"]').value;
    const entreprise = document.querySelector('input[name="entreprise"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const reference = document.querySelector('textarea[name="reference"]').value;
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
    formData.append("faillite", faillite);
    formData.append("cnss", cnss);
    formData.append("imposition", imposition);
    formData.append("compte_certifie", compte_certifie);
    
    
    if(nom == '' || prenom == '' || email == ''){
        alert("Les informations suivantes sont obligatoires:\n- Nom\n- Prenom\n- Email");
    } else {
        await validate(formData);
    }
}

async function registerDonneurDOrdre() {  
    showModal("loader");
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
    if(nom == '' || prenom == '' || email == ''){
        alert("Les informations suivantes sont obligatoires:\n- Nom\n- Prenom\n- Email");
    } else {
        await validate(formData);
    }
}

async function validate(formData){
    if(verifyChecked()){
        await register(formData);
    } else {
        alert("Vous n'avez pas confirmé la lecture d'un des documents\n- Politique de confidentialité\n- Conditions d'utilisation");
    }
}

async function register(formData){
    const res = await fetch('/api/user', {
        method: 'post',
        body: formData
    });
    hideModal("loader");
    if (res.status == 200) {
        window.location = "/partage";
    } else {
        const message = "Veuillez verifier les informations puis réessayer";
        alert(message);
    }
}

function verifyChecked(){
    const politique = document.getElementById("politique");
    const condition = document.getElementById("condition");
    
    return politique.checked && condition.checked;
}