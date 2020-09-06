
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
        window.location = "/partage";
    } else {
        feedback.innerHTML = "Une erreur c'est produite";
        feedback.style.color = "red";
    }
}