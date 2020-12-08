function login(){
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    
    SincroAuth.basicAuth(email, password, (response) => {
        window.location = response.url;
    }, (err) => {
        alert(err.errorMessage);
    });
}