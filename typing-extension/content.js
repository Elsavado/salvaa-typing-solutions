const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runAutoTyper() {
    console.log("Reading text package properties...");
    
    let passageElement = document.querySelector('p.font-mono');
    if (!passageElement) {
        alert("Could not locate passage element ('p.font-mono') on this page!");
        return;
    }
    
    const textToType = passageElement.innerText;
    let inputBox = document.querySelector('textarea[data-slot="textarea"]');
    if (!inputBox) {
        alert("Could not locate input arena container ('textarea')!");
        return;
    }
    
    inputBox.value = "";
    inputBox.focus();
    await sleep(500);

    // Read the passed speed selection or fall back safely to 72 WPM if missing
    const chosenWPM = window.TargetBotWPM || 72;
    
    // Formula math: 1 WPM is roughly 5 characters. 
    // 60,000 milliseconds / (WPM * 5) gives the average exact time delay per character.
    const calculatedBaseDelay = 60000 / (chosenWPM * 5);
    
    console.log(`Calibrating auto-keystrokes to match a natural ${chosenWPM} WPM speed layout...`);

    for (let i = 0; i < textToType.length; i++) {
        const char = textToType[i];
        
        inputBox.value += char;
        inputBox.dispatchEvent(new Event('input', { bubbles: true }));

        // Introduce a +/- 20% random swing to the calculated baseline to keep it looking human
        const varianceRange = calculatedBaseDelay * 0.2;
        let randomDelay = calculatedBaseDelay + (Math.random() * (varianceRange * 2) - varianceRange);
        
        // Contextual Human Accent Breaks
        if (char === ' ') {
            randomDelay += (calculatedBaseDelay * 0.3); // Minor physical spacebar bounce reset pause
        } else if (char === '.' || char === ',' || char === '?' || char === '!') {
            randomDelay += Math.floor(Math.random() * 150) + 100; // Sentence-ending comprehension pause
        } else if (char === char.toUpperCase() && char !== char.toLowerCase()) {
            randomDelay += (calculatedBaseDelay * 0.15); // Artificial physical 'Shift' key delay adjustment
        }

        await sleep(randomDelay);
    }

    console.log(`Successfully completed typing block smoothly at an optimized ${chosenWPM} WPM baseline.`);
}

runAutoTyper();

