
/**
 * -------------------------------- html elements ------------------------
 */

const searchTriggerEl = document.getElementById("search-trigger");
const searchModalContainerEl  = document.getElementById("search-modal-container");
const searchModalEl  = document.getElementById("search-modal");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.getElementById("search-results");


/**
 * -------------------------------- search engine ------------------------
 */
const index = elasticlunr.Index.load(searchIndex);
const options = {
    bool: "AND",
    fields: {
        title: {boost: 2},
        body: {boost: 1},
    }
};

const noResultLi = document.createElement("li");
noResultLi.textContent = "No Results Found";
searchResultsEl.appendChild(noResultLi);

let currentTerm = "";

const searchHandler = value => {

    
    const term = value.trim();
    if (term === currentTerm || term === ''){
        return;
    }
    currentTerm = term;
    
    const results = index.search(term, options);
    
    searchResultsEl.childNodes.forEach(node => {
        searchResultsEl.removeChild(node);
    })

    if (results.length === 0) {
        searchResultsEl.appendChild(noResultLi);
        return;
    }

    for (let i = 0; i < Math.min(results.length, 10); i++) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = results[i].ref;
        a.innerText =  results[i].doc.title
        li.appendChild(a)
        searchResultsEl.appendChild(li)
    }
}

/**
 * -------------------------------- event handling ------------------------
 */

const openModal = () => {
    searchModalContainerEl.style.display = 'flex';
    searchInputEl.focus()
}

const closeModal = () => {
    searchModalContainerEl.style.display = 'none';
}

window.addEventListener("keydown", event => {
    if(event.ctrlKey && event.key === "k"){
        event.preventDefault();
        openModal()
    }
})

searchInputEl.addEventListener("keyup", event => searchHandler(event.target.value));
searchTriggerEl.addEventListener("click", openModal)
searchModalContainerEl.addEventListener("click", closeModal)

searchModalContainerEl.addEventListener("keyup", (event) => {
    if(event.key === "Escape"){
        closeModal();
    }
})

searchModalEl.addEventListener("click", event => {
    event.stopPropagation();
})