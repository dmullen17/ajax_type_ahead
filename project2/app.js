const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const input = document.querySelector('input');
const ul = document.querySelector('ul');
const cities = []; 
fetch(endpoint).then(blob => blob.json()).then(data => cities.push(...data));

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function filterMatches(pattern, citiesArray) {
/*    // console.log(this.value);
    const regex = new RegExp(this.value, 'gi');
    //console.log(regex);
    const filteredCities = cities.filter(city => city.city.match(regex) || city.state.match(regex));
    console.log(filteredCities)*/
    const regex = new RegExp(pattern, 'gi');
    return citiesArray.filter(city => city.city.match(regex) || city.state.match(regex));
}

function displayMatches() {
    const matches = filterMatches(this.value, cities);
    const regex = new RegExp(this.value, 'gi');
    ul.innerHTML = matches.map(city => {
        const cityHighlighted = city.city.replace(regex, `<span class='highlight'>${this.value}</span>`);
        const stateHighlighted = city.state.replace(regex, `<span class='highlight'>${this.value}</span>`);
        return `<li><span class='name'>${cityHighlighted}, ${stateHighlighted}</span><span class='population'>${numberWithCommas(city.population)}</span></li>`
    }).join('');
}

input.addEventListener('keyup', displayMatches);    


/* Notes / Recycled Code */ 

// I can just do this in the first few lines of "displayMatches" 
// It was instructive to build this out step by step though
/*function filterMatches() {
    // console.log(this.value);
    const regex = new RegExp(this.value, 'gi');
    //console.log(regex);
    const filteredCities = cities.filter(city => city.city.match(regex) || city.state.match(regex));
    console.log(filteredCities)
}*/
