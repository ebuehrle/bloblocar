const env = new metacar.env('metacar', metacar.level.level3);
env.setAgentLidar({pts: 5, width: 4, height: 5, pos: -1.5});
env.load();

/* Stop window from scrolling */
window.addEventListener('keydown', e => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});

/* Set up Blockly workspace */
let workspace = Blockly.inject('blockly', {
    toolbox: document.getElementById('toolbox')
});

workspace.addChangeListener(() => {
    const xml = Blockly.Xml.workspaceToDom(workspace);

    const text = Blockly.Xml.domToText(xml);
    localStorage.setItem('workspaceContents', text);

    const prettyText = Blockly.Xml.domToPrettyText(xml);
    const file = new Blob([prettyText]);
    document.querySelector('.save').href = URL.createObjectURL(file);
    document.querySelector('.save').download = 'code.blo';
});

(function loadWorkspace(xmlText) {
    if (xmlText) {
        return setWorkspaceContents(xmlText);
    }
    
    if ('workspaceContents' in localStorage) {
        const text = localStorage.getItem('workspaceContents');
        return setWorkspaceContents(text);
    }
})();

function setWorkspaceContents(xmlText) {
    const xml = Blockly.Xml.textToDom(xmlText);
    workspace.clear();
    Blockly.Xml.domToWorkspace(xml, workspace);
}

document.querySelector('.undo').addEventListener('click', () => 
    workspace.undo(false)
);

document.querySelector('.redo').addEventListener('click', () => 
    workspace.undo(true)
);

document.querySelector('.open').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    e.target.value = null;

    const reader = new FileReader();
    reader.onload = e => {
        const xmlText = e.target.result;
        setWorkspaceContents(xmlText);
    };
    reader.readAsText(file);
});

/* Code runner */
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
            stopProgram(); // execution terminated or stopped
        })();
        resolve();
    });
});

function stopProgram() {
    if (codeInterpreter) {
        codeInterpreter.paused_ = true;
    }
    codeInterpreter = null;
    document.querySelector('.execution').classList.remove('running');
}

/* Set up controls */
document.querySelector('.stop').addEventListener('click', () => {
    stopProgram();
    env.level.agent.core.v = 0;
});

document.querySelector('.reset').addEventListener('click', () => {
    env.reset();
});

const btnForward = document.querySelector('.forward');
btnForward.addEventListener('mousedown', () => {
    env.level.agent.motion.moveForward();
});
btnForward.addEventListener('touchstart', () => {
    env.level.agent.motion.moveForward();
});
btnForward.addEventListener('mouseup', () => {
    env.level.agent.core.v = 0;
});
btnForward.addEventListener('touchend', () => {
    env.level.agent.core.v = 0;
});

const btnBackward = document.querySelector('.backward');
btnBackward.addEventListener('mousedown', () => {
    env.level.agent.motion.moveBackward();
});
btnBackward.addEventListener('touchstart', () => {
    env.level.agent.motion.moveBackward();
});
btnBackward.addEventListener('mouseup', () => {
    env.leven.agent.core.v = 0;
});
btnBackward.addEventListener('touchend', () => {
    env.leven.agent.core.v = 0;
});

const btnLeft = document.querySelector('.left');
btnLeft.addEventListener('click', () => {
    env.level.agent.motion.turnLeft();
});

const btnRight = document.querySelector('.right');
btnRight.addEventListener('click', () => {
    env.level.agent.motion.turnRight();
});
