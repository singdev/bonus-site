function login(){
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    
    SincroAuth.basicAuth(email, password, (response) => {
        if(response.valide){
            window.location = response.url;
        } else {
            alert("Identifiants invalident !");
        }
        console.log("success");
    }, (err) => {
        alert(err.errorMessage);
    });
}