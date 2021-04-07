document.querySelectorAll('.spoiler').forEach(e => {
    e.addEventListener('click', () => e.classList.toggle('open'))
});