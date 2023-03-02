// Change the <link> to a stylesheet so that its styling is applied once loaded
document.querySelector('#bootstrap').addEventListener('load', ({ target }) => {
    target.rel = 'stylesheet';
});