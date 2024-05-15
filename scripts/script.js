const umbrellaImage = document.getElementById('umbrellaImage');
const loader = document.querySelector('.loader');
const fileInput = document.getElementById('logoInput');
const fileInputLabel = document.querySelector('label[for="logoInput"]');
const removeLogoButton = document.querySelector('.remove-logo');

// Function to change the umbrella image
function changeUmbrella(imageSrc, color) {
    // Hide previous loader icon
    const previousLoader = document.querySelector('.loader-icon.visible');
    if (previousLoader) {
        previousLoader.classList.remove('visible');
    }

    // Show loader for the selected color
    const loaderIcon = document.querySelector('.loader-icon');
    if (loaderIcon) {
        loaderIcon.src = `images/${color}.svg`; // Set the correct path for the loader icon
        loaderIcon.classList.add('visible');
    }

    // Fade out current umbrella
    umbrellaImage.style.opacity = '0';

    // Set loader display to block
    loader.style.display = 'block';

    // Simulate delay (replace with actual image loading logic)
    setTimeout(() => {
        // Load new umbrella image
        umbrellaImage.src = imageSrc;

        // Fade in new umbrella
        setTimeout(() => {
            umbrellaImage.style.opacity = '1'; // Fade in new umbrella
        }, 50); // Delay the fade in slightly for smoother transition

        // Hide loader after image is loaded
        setTimeout(() => {
            loaderIcon.classList.remove('visible'); // Hide loader
            loader.style.display = 'none'; // Hide loader container
        }, 1000);
    }, 1000);

    // Set background color of file input wrapper and logoInput label to match the swatch color
    switch (color) {
        case 'pink':
            document.querySelector('.file-input-wrapper').style.backgroundColor = '#ff69b4';
            fileInputLabel.style.backgroundColor = '#ff69b4';
            break;
        case 'yellow':
            document.querySelector('.file-input-wrapper').style.backgroundColor = '#f1c40f';
            fileInputLabel.style.backgroundColor = '#f1c40f';
            break;
        case 'blue':
            document.querySelector('.file-input-wrapper').style.backgroundColor = '#3498db';
            fileInputLabel.style.backgroundColor = '#3498db';
            break;
        default:
            document.querySelector('.file-input-wrapper').style.backgroundColor = '#fff'; // Default background color
            fileInputLabel.style.backgroundColor = '#fff'; // Default background color
            break;
    }

    // Show remove logo button
    if (document.querySelector('.logo')) {
        removeLogoButton.style.display = 'inline-block'; // Show remove logo button
    } else {
        removeLogoButton.style.display = 'none'; // Hide remove logo button
    }
}

// Function to handle logo upload
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const logoUrl = e.target.result;
            const logo = document.createElement('img');
            logo.src = logoUrl;
            logo.classList.add('logo');
            umbrellaImage.parentNode.appendChild(logo);
            // Call changeUmbrella function to show remove logo button
            changeUmbrella(umbrellaImage.src, 'blue');
        };
        reader.readAsDataURL(file);
    }
});

// Function to remove uploaded logo
function removeLogo() {
    const uploadedLogo = document.querySelector('.logo');
    if (uploadedLogo) {
        uploadedLogo.remove();
        // Reset the file input value to allow re-uploading the same file
        fileInput.value = '';
        // Reset the background color of the file input label
        fileInputLabel.style.backgroundColor = '#3498db'; // Change to default color
        // Hide the remove logo button
        removeLogoButton.style.display = 'none';
    }
}
