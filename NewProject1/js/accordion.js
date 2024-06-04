document.addEventListener("DOMContentLoaded", () => {
    const accordion = document.querySelector(".accordion");

    if (accordion) {
        accordion.addEventListener("click", (e) => {
            const activePanel = e.target.closest(".accordion-panel");
            if (!activePanel) return;
            toggleAccordion(activePanel);
        });

        // Auto switch feature
        let currentPanelIndex = 0;
        const panels = accordion.querySelectorAll(".accordion-panel");

        if (panels.length > 0) {
            setInterval(() => {
                // Find the index of the currently active panel
                const currentActiveIndex = Array.from(panels).findIndex(panel => panel.querySelector("button[aria-expanded='true']"));
                
                // Determine the next panel index excluding the currently active panel
                let nextPanelIndex = currentActiveIndex;
                do {
                    nextPanelIndex = (nextPanelIndex + 1) % panels.length;
                } while (nextPanelIndex === currentActiveIndex); // Ensure next panel is different from current panel

                toggleAccordion(panels[nextPanelIndex]);
                currentPanelIndex = nextPanelIndex;
            }, 7500); // Change panel every 5 seconds
        }
    }

    function toggleAccordion(panelToActivate) {
        const buttons = panelToActivate.parentElement.querySelectorAll("button");
        const contents = panelToActivate.parentElement.querySelectorAll(".accordion-content");

        buttons.forEach((button) => {
            button.setAttribute("aria-expanded", false);
        });

        contents.forEach((content) => {
            content.setAttribute("aria-hidden", true);
        });

        panelToActivate.querySelector("button").setAttribute("aria-expanded", true);
        panelToActivate.querySelector(".accordion-content").setAttribute("aria-hidden", false);
    }
});
