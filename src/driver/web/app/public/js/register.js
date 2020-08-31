
async function registerPrestataire() {
    const feedback = document.querySelector('.feedback');
    feedback.innerHTML = "Veuillez patienter";
    feedback.style.color = "black";

    const nom = document.querySelector('input[name="nom"]').value;
    const prenom = document.querySelector('input[name="prenom"]').value;
    const entreprise = document.querySelector('input[name="entreprise"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const type = "prestataire";

    const res = await fetch('/api/user', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nom, prenom, entreprise, email, type
        })
    });

    if (res.status == 200) {
        console.log("success");
        feedback.innerHTML = "Félicitation, vous faites parties des premières personnes à avoir rejoind BONUS, n'oubliez pas de partager le lien sur les réseaux sociaux <br> <strong>www.gobonus.ga</strong> "
        feedback.style.color = "#8E0B56";
    } else {
        feedback.innerHTML = "Une erreur c'est produite";
        feedback.style.color = "red";
    }
}

async function registerDonneurDOrdre() {
    console.log("AAAA");
    const feedback = document.querySelector('.feedback');
    feedback.innerHTML = "Veuillez patienter";
    feedback.style.color = "black";

    const nom = document.querySelector('input[name="nom"]').value;
    const prenom = document.querySelector('input[name="prenom"]').value;
    const entreprise = document.querySelector('input[name="entreprise"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const type = "donneur-dordre";

    const res = await fetch('/api/user', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nom, prenom, entreprise, email, type
        })
    });


    if (res.status == 200) {
        console.log("success");
        feedback.innerHTML = "Félicitation, vous faites parties des premières personnes à avoir rejoind BONUS, n'oubliez pas de partager le lien sur les réseaux sociaux <br> <strong>www.gobonus.ga</strong> "
        feedback.style.color = "#8E0B56";

    } else {
        feedback.innerHTML = "Une erreur c'est produite";
        feedback.style.color = "red";
    }
}