
const loveButton = document.getElementById("love-button");
const hiddenMessage = document.getElementById("hidden-message");

loveButton.addEventListener("click", () => {
    const isHidden = hiddenMessage.hidden;

    hiddenMessage.hidden = !isHidden;

    loveButton.textContent = isHidden
        ? "CLOSE YOUR LITTLE MESSAGE ↑"
        : "SEND A LITTLE LOVE ✿";

    if (isHidden) {
        hiddenMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});

// Gently reveal sections as they enter the screen.
const sections = document.querySelectorAll(
    ".letter-card, .memory-card, .wishes p, .photo-frame"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(14px)";
        section.style.transition =
            "opacity 700ms ease, transform 700ms ease";

        observer.observe(section);
    });

    const revealStyle = document.createElement("style");
    revealStyle.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(revealStyle);
}
