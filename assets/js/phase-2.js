// Get the API checkboxes
const dictionaryCheckbox = document.getElementById('dictionary-api');
const thesaurusCheckbox = document.getElementById('thesaurus-api');

// Get the input and response elements
const searchInput = document.getElementById('search-word');
const responseContent = document.getElementById('response-content');

// Clear the input and response when changing API
function clearForm() {
    searchInput.value = '';
    responseContent.textContent = 'Your API response will appear here.';
}

// Ensure only one API can be selected
dictionaryCheckbox.addEventListener('change', function () {
    if (dictionaryCheckbox.checked) {
        thesaurusCheckbox.checked = false;
        clearForm();
    }
});

thesaurusCheckbox.addEventListener('change', function () {
    if (thesaurusCheckbox.checked) {
        dictionaryCheckbox.checked = false;
        clearForm();
    }
});

// Build the API URL based on the selected checkbox
function buildApiUrl(word) {
    const encodedWord = encodeURIComponent(word);

    if (dictionaryCheckbox.checked) {
        return `https://api.api-ninjas.com/v1/dictionary?word=${encodedWord}`;
    }

    if (thesaurusCheckbox.checked) {
        return `https://api.api-ninjas.com/v1/thesaurus?word=${encodedWord}`;
    }

    return null;
}

// Get the form element
const apiForm = document.getElementById('api-form');

// Execute the API request when the form is submitted
apiForm.addEventListener('submit', function (event) {
    event.preventDefault();

    
const word = searchInput.value.trim();

// Check if an API has been selected
if (!dictionaryCheckbox.checked && !thesaurusCheckbox.checked) {
    responseContent.textContent = 'Please select an API.';
    return;
}

// Check if the search field is empty
if (!word) {
    responseContent.textContent = 'Please enter a word to search.';
    searchInput.focus();
    return;
}

// Build the API URL
const apiUrl = buildApiUrl(word);


    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'X-Api-Key': API_KEY
        }
    })
        .then(response => response.json())
        .then(data => {
            responseContent.textContent = JSON.stringify(data, null, 2);
        });
});
