const env = new metacar.env('metacar', metacar.level.level3);
env.setAgentLidar({pts: 5, width: 4, height: 5, pos: -1.5});
env.load();

window.addEventListener('keydown', e => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});

let workspace = Blockly.inject('blockly', {
    toolbox: document.getElementById('toolbox')
});

workspace.addChangeListener(() => {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const text = Blockly.Xml.domToText(xml);
    localStorage.setItem('workspaceContents', text);
});

(function loadWorkspace() {
    if ('workspaceContents' in localStorage) {
        const text = localStorage.getItem('workspaceContents');
        const xml = Blockly.Xml.textToDom(text);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }
})();

let codeInterpreter;

document.querySelector('.run').addEventListener('click', () => {
    Blockly.JavaScript.addReservedWords('code', 'env');
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'sleep(1);\n';
    const code = Blockly.JavaScript.workspaceToCode(workspace);

    console.log(code);

    new Promise(resolve => {
        codeInterpreter = new Interpreter(code, initMetacarApi(env));
        (function runCode() {
            document.querySelector('.execution').classList.add('running');
            try {
                while (codeInterpreter && codeInterpreter.step()) {
                    const stepTimeout = codeInterpreter['stepTimeout'] || 0;
                    codeInterpreter['stepTimeout'] = 0;
                    if (stepTimeout) {
                        setTimeout(runCode, stepTimeout);
                        return;
                    }
                }
            } catch (e) {
                alert(e);
            }
            document.querySelector('.execution').classList.remove('running');
        })();
        resolve();
    });
});

document.querySelector('.stop').addEventListener('click', () => {
    codeInterpreter.paused_ = true;
    codeInterpreter = null;
    env.level.agent.core.v = 0
});

document.querySelector('.reset').addEventListener('click', () => {
    env.reset();
});
