let characters = [];
let options = [];

const getCharacters = async () => {
    let background = document.querySelector('.background');
    let loader = loading();
    background.appendChild(loader);
    
    
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

    loader.remove();
    let optionsDiv = document.getElementById('opt');
    optionsDiv.classList.add('options')
    
    createOptions(options);
    createCards(options[0]);
    // console.log(characters[0]);
    
}

const createOptions = async (options) => {
    for (const [index, option] of options.entries()) {

        const div = document.createElement('div');
        const input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'option');
        input.setAttribute('id', `option${index}`);
        input.addEventListener('change', () => {
            deleteCards();
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

            let cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            let imageDiv = document.createElement('div');
            imageDiv.classList.add('imageContainer');
            let infoDiv = document.createElement('div');
            infoDiv.classList.add('infoContainer');
            let loader = loading();
            cardDiv.appendChild(loader);
            
            let image = document.createElement('img');
            image.setAttribute('src', character.image);
            image.addEventListener('load', () => {
                loader.remove();
                imageDiv.appendChild(image);

                let info1 = document.createElement('h2');
                let info2 = document.createElement('h2');
                info1.innerText = character.name;
                info2.innerText = character.origin.name;
    
    
                infoDiv.appendChild(info1);
                infoDiv.appendChild(info2);
    
                cardDiv.appendChild(imageDiv);
                cardDiv.appendChild(infoDiv);
            })

            let cards = document.querySelector('.cards');
            cards.appendChild(cardDiv);
        }
    }
}

const deleteCards = () => {
    let cards = document.querySelectorAll('.card');    
    for (const card of cards) {
        card.remove();
    }
}

const loading = () => {
    // <div class="lds-ring">
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    // </div>
    let ringDiv = document.createElement('div');
    ringDiv.classList.add('lds-ring')
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    ringDiv.appendChild(div1);
    ringDiv.appendChild(div2);
    ringDiv.appendChild(div3);
    ringDiv.appendChild(div4);
    return ringDiv;
}

getCharacters();