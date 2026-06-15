document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements Selector Cache
    const filterButtons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".card");
    const modal = document.getElementById("cardModal");
    const modalCloseBtn = document.querySelector(".modal-close-btn");
    
    // Modal Inner Elements
    const modalImg = document.getElementById("modalImg");
    const modalBadge = document.getElementById("modalBadge");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalAvatar = document.getElementById("modalAvatar");
    const modalAuthorName = document.getElementById("modalAuthorName");

    /* ==========================================================================
       1. Category Filtering Logic
       ========================================================================== */
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active style from previous buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            // Add active style to target button
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            cards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                if (filterValue === "all" || filterValue === cardCategory) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    /* ==========================================================================
       2. Dynamic Modal Window Logic
       ========================================================================== */
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            // Extract UI metadata directly from target DOM card
            const imgSrc = card.querySelector(".card-image img").src;
            const badgeText = card.querySelector(".card-badge").textContent;
            const titleText = card.querySelector(".card-title").textContent;
            const descText = card.querySelector(".card-description").textContent;
            const avatarSrc = card.querySelector(".author-avatar img").src;
            const authorNameText = card.querySelector(".author-name").textContent;

            // Inject the metadata into the modal components
            modalImg.src = imgSrc;
            modalImg.alt = titleText;
            modalBadge.textContent = badgeText;
            modalTitle.textContent = titleText;
            
            // Appends a fallback mock paragraph to simulate a real comprehensive article
            modalDesc.innerHTML = `<strong>${descText}</strong><br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;
            
            modalAvatar.src = avatarSrc;
            modalAvatar.alt = authorNameText;
            modalAuthorName.textContent = authorNameText;

            // Show the Modal Overlay
            modal.classList.add("open");
            document.body.style.overflow = "hidden"; // Prevent background content scroll
        });
    });

    // Close Modal via Button click
    modalCloseBtn.addEventListener("click", closeModalWindow);

    // Close Modal via Clicking backdrop/outside window bounds
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModalWindow();
        }
    });

    // Close Modal via pressing Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
            closeModalWindow();
        }
    });

    function closeModalWindow() {
        modal.classList.remove("open");
        document.body.style.overflow = ""; // Re-enable window scroll
    }
});