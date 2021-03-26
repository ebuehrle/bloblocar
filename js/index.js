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
});

(function loadWorkspace() {
    if ('workspaceContents' in localStorage) {
        const text = localStorage.getItem('workspaceContents');
        const xml = Blockly.Xml.textToDom(text);
        Blockly.Xml.domToWorkspace(xml, workspace);
    }
})();

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
            document.querySelector('.execution').classList.remove('running');
        })();
        resolve();
    });
});

/* Set up control buttons */
document.querySelector('.stop').addEventListener('click', () => {
    codeInterpreter.paused_ = true;
    codeInterpreter = null;
    document.querySelector('.execution').classList.remove('running');
    env.level.agent.core.v = 0;
});

document.querySelector('.reset').addEventListener('click', () => {
    env.reset();
});

const btnForward = document.querySelector('.forward');
document.querySelector('.forward').addEventListener('mousedown', () => {
    env.level.agent.motion.moveForward();
});
document.querySelector('.forward').addEventListener('touchstart', () => {
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
