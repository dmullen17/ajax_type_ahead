const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    
const cities = []; 
    
const prom = fetch(endpoint);
console.log(prom);
// from that it will return a blob of data 
fetch(endpoint).then(blob => console.log(blob));

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => console.log(data));

// Now we can add the data to our cities const using the spread operator and .push.  We use the spread operator b/c it will be a nested array otherwise.
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // here we need to figure out if the city or state matches the search 
        // g (global) - full string
        // i - case insensitive 
        const regex = new RegExp(wordToMatch, 'gi')
        return place.city.match(regex) || place.city.match(regex);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
    console.log(this.value); // shows the typed value if we call it on the .search form 
    const matches = findMatches(this.value, cities); 
    console.log(matches);
    
    const html = matches.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class='hl'>${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class='hl'>${this.value}</span>`);
        
        return `
            <li>
                <span class='name'>${cityName}, ${stateName}</span>
                <span class='population'>${numberWithCommas(place.population)}</span>
            </li>
               `
    }).join(''); //returns an array and we want a string 
    suggestions.innerHTML = html; // set the inner html of the suggestions object to the new html string
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
// for a change event you have to click outside the box, we can add a keyup event to refresh on each key you type
searchInput.addEventListener('keyup', displayMatches);