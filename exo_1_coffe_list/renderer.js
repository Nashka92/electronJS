const cafes = [
    { name: 'Expresso', url: 'https://en.wikipedia.org/wiki/Espresso' },
    { name: 'Latte', url: 'https://en.wikipedia.org/wiki/Latte' },
    { name: 'Cappuccino', url: 'https://en.wikipedia.org/wiki/Cappuccino' }
];

const listContainer = document.getElementById('cafe-list');

cafes.map(cafe => {
    const listItem = document.createElement('li');
    // créer un <li> pour chaque café 

    const element = document.createElement('a'); // créer un a pour href
    // avec à l'intérieur de chaque <li> son nom et son url
    element.text = cafe.name;
    element.href = cafe.url;

    // on ajoute dans le html
    listItem.appendChild(element); //listItem = <li>
    listContainer.appendChild(listItem);
});
