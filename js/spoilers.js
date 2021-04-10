document.querySelectorAll('.spoiler').forEach(e => {
    e.addEventListener('click', () => e.classList.toggle('open'))
});

/* Blockly doesn't like being initialized in hidden divs. */
(function openAllSpoilers() {
    document.querySelectorAll('.spoiler').forEach(e => e.classList.add('open'));
})();

document.querySelectorAll('.spoiler-blockly').forEach(e => {
    e.addEventListener('click', e => e.stopImmediatePropagation());

    const workspace = Blockly.inject(e.id, {
        toolbox: toolboxDefinition,
        readOnly: true,
        scrollbars: true,
    });

    if (!e.dataset.src) {
        return;
    }

    fetch(e.dataset.src)
        .then(result => result.text())
        .then(xmlText => {
            const xml = Blockly.Xml.textToDom(xmlText);
            Blockly.Xml.domToWorkspace(xml, workspace);
        });
});

(function closeAllSpoilers() {
    document.querySelectorAll('.spoiler').forEach(e => e.classList.remove('open'))
})();
