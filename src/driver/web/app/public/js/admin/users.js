let users = null;
let currentIndex = 0;
let numberByStep = 10;

window.addEventListener('load', async () => {
   
    const token = await loginToAPI();
    if(token){
        const users = await fetchUsers(token);
        displayUsers(users);
    }
});

function displayUsers(users){
    console.log(users);
}

async function loginToAPI(){
    const resToken = await fetch("/api/admin/login", {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            identifiant:"sing02",
            password:"pivot402020"   
        })
    });
    
    if(resToken.status == 200){
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
    if(res.status == 200){
        const users = await res.json();
        return users;
    } else {
        return null;
    }
}