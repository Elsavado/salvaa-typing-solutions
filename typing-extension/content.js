const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runAutoTyper() {
    console.log("Analyzing typing page architecture...");

    // ==========================================
    // 1. DYNAMIC TEXT IDENTIFICATION
    // ==========================================
    let textToType = "";
    
    // Check Option A: Modern letter-by-letter span structures (e.g., typing.com)
    const activeLetters = document.querySelectorAll('.letter, .word span, .screen-reader-text');
    
    if (activeLetters.length > 0) {
        textToType = Array.from(activeLetters).map(el => el.textContent).join('');
    } else {
        // Check Option B: Legacy paragraph structures (e.g., stellarstuffing)
        const passageElement = document.querySelector('p.font-mono, .typing-area, [data-test-id="typing-wrapper"]');
        if (passageElement) {
            textToType = passageElement.innerText;
        }
    }

    if (!textToType) {
        alert("Could not dynamically extract the text block from this webpage layout!");
        return;
    }

    // ==========================================
    // 2. CHOOSE TARGET & SIMULATE FOCUS
    // ==========================================
    // Check if there is a direct input/textarea area on screen
    let inputBox = document.querySelector('textarea[data-slot="textarea"], input[type="text"], textarea');
    
    // Fall back to active element or body if a direct text field doesn't exist
    const inputTarget = inputBox || document.activeElement || document.body;
    inputTarget.focus();
    await sleep(500);

    // ==========================================
    // 3. CALIBRATE HUMAN CADENCE
    // ==========================================
    const chosenWPM = window.TargetBotWPM || 72;
    const calculatedBaseDelay = 60000 / (chosenWPM * 5);
    
    console.log(`Injecting text sequence at a calibrated ${chosenWPM} WPM speed cadence...`);

    for (let i = 0; i < textToType.length; i++) {
        const char = textToType[i];
        
        // Setup standardized keyboard data packets
        const eventConfig = {
            key: char,
            char: char,
            keyCode: char.charCodeAt(0),
            which: char.charCodeAt(0),
            bubbles: true,
            cancelable: true
        };

        // EVENT ROADWAY 1: Dispatch hardware events for modern JavaScript listener frameworks
        inputTarget.dispatchEvent(new KeyboardEvent('keydown', eventConfig));
        inputTarget.dispatchEvent(new KeyboardEvent('keypress', eventConfig));
        
        // EVENT ROADWAY 2: Alter physical value properties for classic standard inputs
        if (inputTarget.tagName === 'INPUT' || inputTarget.tagName === 'TEXTAREA') {
            inputTarget.value += char;
            inputTarget.dispatchEvent(new Event('input', { bubbles: true }));
        }

        inputTarget.dispatchEvent(new KeyboardEvent('keyup', eventConfig));

        // ==========================================
        // 4. PRESERVE ORIGINAL ACCENT BREAKS
        // ==========================================
        const varianceRange = calculatedBaseDelay * 0.2;
        let randomDelay = calculatedBaseDelay + (Math.random() * (varianceRange * 2) - varianceRange);
        
        if (char === ' ') {
            randomDelay += (calculatedBaseDelay * 0.3); 
        } else if (char === '.' || char === ',' || char === '?' || char === '!') {
            randomDelay += Math.floor(Math.random() * 150) + 100; 
        } else if (char === char.toUpperCase() && char !== char.toLowerCase()) {
            randomDelay += (calculatedBaseDelay * 0.15); 
        }

        await sleep(randomDelay);
    }

    console.log(`Successfully completed typing block smoothly at an optimized ${chosenWPM} WPM baseline.`);
}

runAutoTyper();
