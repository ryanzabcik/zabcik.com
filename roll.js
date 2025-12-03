class Roller {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = [
            { weight: 1, text: "I architect scalable systems." },
            { weight: 1, text: "I craft elegant solutions." },
            { weight: 1, text: "I optimize performance." },
            { weight: 1, text: "I automate workflows." },
            { weight: 1, text: "I embrace complexity." },
            { weight: 2, text: "I drive innovation." },
            { weight: 2, text: "I value clean code." },
            { weight: 2, text: "I learn continuously." },
            { weight: 4, text: "I build for the future." },
            { weight: 4, text: "I design with purpose." },
            { weight: 4, text: "I love open source." },
            { weight: 6, text: "I turn data into insights." },
            { weight: 6, text: "I love processes and data." },
            { weight: 8, text: "I solve hard problems." },
        ];

        this.itemHeight = 60; // Must match CSS
        this.isSpinning = false;
        this.currentOffset = 0;

        this.init();
    }

    init() {
        // Clear initial content
        this.container.innerHTML = '';

        // Create a long list for scrolling effect
        // We'll repeat the list enough times to scroll for a while
        // For the final state, we'll pick a weighted random item

        // Initial render - just show the "I solve problems" or random
        this.renderList([this.items[this.items.length - 1]]); // Start with "I solve problems"
    }

    getWeightedRandomItem() {
        const totalWeight = this.items.reduce((acc, item) => acc + item.weight, 0);
        let random = Math.random() * totalWeight;

        for (const item of this.items) {
            random -= item.weight;
            if (random <= 0) {
                return item;
            }
        }
        return this.items[this.items.length - 1];
    }

    spin() {
        if (this.isSpinning) return;
        this.isSpinning = true;

        // Generate a sequence of items for the spin
        // We want to scroll through many items and land on a target
        const spinLength = 30; // How many items to scroll through
        const spinItems = [];

        // Add random items for the "blur" effect
        for (let i = 0; i < spinLength; i++) {
            spinItems.push(this.items[Math.floor(Math.random() * this.items.length)]);
        }

        // Select the final item based on weights
        const finalItem = this.getWeightedRandomItem();
        spinItems.push(finalItem);

        // Render the full list
        // We need to preserve the current item at the top to start smoothly? 
        // Actually, simpler to just replace content and animate from 0 to end.
        // But to make it look continuous, we should probably append.

        // Let's try a simpler approach:
        // 1. Clear container
        // 2. Fill with spinItems
        // 3. Animate translateY from 0 to -(totalHeight - itemHeight)

        this.container.innerHTML = '';
        this.renderList(spinItems);

        // Reset transform
        this.container.style.transition = 'none';
        this.container.style.transform = 'translateY(0)';

        // Force reflow
        this.container.offsetHeight;

        // Animate
        const totalHeight = (spinItems.length - 1) * this.itemHeight;
        const duration = 2000; // 2 seconds

        this.container.style.transition = `transform ${duration}ms cubic-bezier(0.25, 1, 0.5, 1)`; // Ease out
        this.container.style.transform = `translateY(-${totalHeight}px)`;

        setTimeout(() => {
            this.isSpinning = false;
            // Cleanup: keep only the last item to save DOM nodes
            this.container.style.transition = 'none';
            this.container.style.transform = 'translateY(0)';
            this.container.innerHTML = '';
            this.renderList([finalItem]);
        }, duration);
    }

    renderList(items) {
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'slot-item';
            div.textContent = item.text;
            this.container.appendChild(div);
        });
    }
}
