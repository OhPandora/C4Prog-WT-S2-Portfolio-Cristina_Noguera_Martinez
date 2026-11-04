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