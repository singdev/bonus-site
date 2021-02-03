let users = null;
let currentIndex = 0;
let numberByStep = 10;

window.addEventListener('load', async () => {

    const token = await loginToAPI();
    if (token) {
        const users = await fetchUsers(token);
        displayUsers(users);
    }
});

function displayUsers(users) {
    const container = document.querySelector("#content");

    for (let i = 0; i < users.length; i++) {
        const tr = document.createElement("tr");
        const nom = document.createElement("td");
        nom.innerHTML = users[i].nom;
        nom.classList.add('dropdown');
        
        
        const prenom = document.createElement("td");
        prenom.innerHTML = users[i].prenom;
        const email = document.createElement("td");
        email.innerHTML = users[i].email;
        
        const statu = document.createElement("td");
        let str = users[i].cvURL ? '<span>CV</span>' : '<span class="no">CV</span>';
        if(users[i].ficheCircuitURL){
            str += '<span>FC</span>';
        } else {
            str += '<span class="no">FC</span>';
        }
        console.log(users[i].reference);
        if(users[i].reference != '' && users[i].reference != undefined){
            str += '<span>RE</span>';
        } else {
            str += '<span class="no">RE</span>';
        }
        statu.innerHTML = str;
        
        const type = document.createElement("td");
        type.innerHTML = users[i].type;
        const date = document.createElement("td");
        date.innerHTML = formatDate(users[i].date);
        const action = document.createElement("td");
        const button = document.createElement('a');
        action.appendChild(button);
        button.href = "#";
        button.innerHTML = users[i].isRegister ? '<i class="fas fa-toggle-on"></i>' : '<i class="fas fa-toggle-off"></i>';
        button.addEventListener("click", async () => {
            await updateUser(users[i]._id, { isRegister: !users[i].isRegister });
        });

        tr.appendChild(nom);
        tr.appendChild(prenom);
        tr.appendChild(email);
        tr.appendChild(statu);
        tr.appendChild(type);
        tr.appendChild(date);
        tr.appendChild(action);
        if (users[i].isRegister == false) {
            tr.classList.add("not-register");
        }

        container.appendChild(tr);
    }
}

function dropdown(root) {
    const template = `
        <div class="dropdown">
        </div>
    `
}

async function updateUser(userId, data) {
    const token = await loginToAPI();
    const res = await fetch("/api/user/update/" + userId, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
            'authorization': "Bearer " + token
        },
        body: JSON.stringify(data)
    });
    if (res.status == 200) {
        const users = await res.json();
        window.location.reload();
        return users;
    } else {
        return null;
    }
}

async function loginToAPI() {
    const resToken = await fetch("/api/admin/login", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            identifiant: "sing02",
            password: "pivot402020"
        })
    });

    if (resToken.status == 200) {
        const token = await resToken.text();
        return token
    } else {
        return null;
    }
}

async function fetchUsers(token) {
    const res = await fetch("/api/user", {
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'authorization': "Bearer " + token
        }
    });
    if (res.status == 200) {
        const users = await res.json();
        return users;
    } else {
        return null;
    }
}

function formatDate(date) {
    const d = new Date(date);
    return (d.getDate() < 10 ? '0' : '') + d.getDate()
        + '/' + (d.getMonth() < 10 ? '0' : '') + d.getMonth()
        + '/' + d.getFullYear();
}