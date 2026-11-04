
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
            musicButton.textContent = "Ⅱ";
            musicButton.setAttribute("aria-label", "Pause music");
        } catch (error) {
            musicButton.textContent = "!";
        }
    } else {
        music.pause();
        musicButton.textContent = "▶";
        musicButton.setAttribute("aria-label", "Play music");
    }
});

// Petals fall in small staggered batches at the same slow speed as the reference.
const petals = document.getElementById("petals");
const petalsPerBatch = 6;

function createPetal(onComplete) {
    const petal = document.createElement("i");
    const colorClass = Math.random() < 0.5 ? "petal-blue" : "petal-pink";
    const fallDistance = window.innerHeight + 56;
    const duration = Math.max(14, fallDistance / 34);

    petal.className = `petal ${colorClass}`;
    petal.setAttribute("aria-hidden", "true");
    petal.style.setProperty("--left", `${5 + Math.random() * 90}%`);
    petal.style.setProperty("--drift", `${Math.random() * 100 - 50}px`);
    petal.style.setProperty("--duration", `${duration}s`);

    petal.addEventListener("animationend", () => {
        petal.remove();
        onComplete();
    }, { once: true });

    petals.appendChild(petal);
}

function dropPetalBatch() {
    let remaining = petalsPerBatch;

    for (let i = 0; i < petalsPerBatch; i++) {
        window.setTimeout(() => {
            createPetal(() => {
                remaining--;
                if (remaining === 0) {
                    dropPetalBatch();
                }
            });
        }, i * 1100);
    }
}

dropPetalBatch();


