let characters = [];
let options = [];

const getCharacters = async () => {
    let data = await axios("https://rickandmortyapi.com/api/character");
    const pages = data.data.info.pages;

    for (const character of data.data.results) {
        characters.push(character)
        
        if (!options.includes(character.species)){
            options.push(character.species);
        }
    }

    for (let page = 2; page < pages; page++) {
        let data = await axios(`https://rickandmortyapi.com/api/character?page=${page}`);
        for (const character of data.data.results) {
            characters.push(character)
            
            if (!options.includes(character.species)){
                options.push(character.species);
            }
        }
    }

    createOptions(options);
}

const createOptions = async (options) => {
    for (const [index, option] of options.entries()) {

        const div = document.createElement('div');
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'option');
        input.setAttribute('id', `option${index}`);
        input.addEventListener('change', () => {
            createCards(option);            
        })
        const label = document.createElement('label');
        label.setAttribute('for', `option${index}`);
        label.innerText = option;

        if (index === 0){
            input.checked = true;
        }

        const optionsDiv = document.querySelector('.options');
        div.appendChild(input);
        div.appendChild(label);
        optionsDiv.appendChild(div);
    }
}

const createCards = async (option) => {
    for (const character of characters) {
        if (character.species === option){
            console.log(option);
            // TODO: use option's values to create card
        }
    }
}

getCharacters();