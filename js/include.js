// This function will find all elements with the 'data-include-html' attribute
// and inject the specified HTML file's content into them.
async function includeHTML() {
    // Select all elements with the custom attribute
    const elements = document.querySelectorAll('[data-include-html]');

    // Loop through each element found
    for (const element of elements) {
        // Get the file path from the attribute value
        const file = element.getAttribute('data-include-html');

        if (file) {
            try {
                // Fetch the content of the specified HTML file
                const response = await fetch(file);
                
                // Check if the file was fetched successfully
                if (response.ok) {
                    const data = await response.text();
                    // Inject the content into the element
                    element.innerHTML = data;
                } else {
                    console.error(`Error fetching HTML: ${response.statusText}`);
                }
            } catch (error) {
                console.error("Failed to include HTML:", error);
            }
        }
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', includeHTML);
