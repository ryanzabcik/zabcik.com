window.onload = function () {
    var roller = new Roller("roller");

    // Spin on hover over the profile section or click
    var profileSection = document.querySelector('.profile-section');

    profileSection.addEventListener("mouseenter", () => roller.spin(), { once: true });
    profileSection.addEventListener("click", () => roller.spin());
};
