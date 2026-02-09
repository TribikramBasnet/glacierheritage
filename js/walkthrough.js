// A variable to hold the scroll timer.
let scrollTimer;

// Function to show the walkthrough modal on every page load.
function showWalkthroughModal() {
    const myModal = new bootstrap.Modal(document.getElementById('walkthroughModal'), {
        keyboard: false
    });
    myModal.show();
}

// Function to show the thank you banner after a delay
function showThankYouBanner() {
    // You can adjust the delay time in milliseconds here
    setTimeout(() => {
        const banner = document.getElementById('thank-you-banner');
        if (banner) {
            banner.style.display = 'block';
        }
    }, 5000); // 5-second delay
}

// Function to handle showing and hiding the banner based on scroll.
function handleScroll() {
    const banner = document.getElementById('thank-you-banner');
    
    // Clear the previous timer to reset the "stop" event.
    clearTimeout(scrollTimer);

    // Hide the banner as soon as a scroll is detected.
    if (banner) {
        banner.style.display = 'none';
    }

    // Set a new timer. The function inside will execute after the user stops scrolling for 200ms.
    scrollTimer = setTimeout(() => {
        if (banner) {
            banner.style.display = 'block';
        }
    }, 10000); // Adjust this delay to control how quickly the banner reappears after scrolling stops.
}

// Attach the functions to the window's load and scroll events.
window.addEventListener('load', () => {
    showWalkthroughModal();
    showThankYouBanner();
});

window.addEventListener('scroll', handleScroll);
