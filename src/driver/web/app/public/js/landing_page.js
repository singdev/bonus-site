
document.querySelector('.menu-button').addEventListener('click', (e) => {
    const drawer =  document.querySelector('.drawer');
    drawer.classList.toggle('show-drawer');
    if(drawer.classList.contains('show-drawer')){
        document.querySelector('button.menu-button').querySelector('i').style.display = 'none';
        document.querySelector('button.menu-button').querySelector('span').style.display = 'inline';

    } else {
        document.querySelector('button.menu-button').querySelector('i').style.display = 'inline';
        document.querySelector('button.menu-button').querySelector('span').style.display = 'none';
    }
})