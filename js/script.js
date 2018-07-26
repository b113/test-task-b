// Task #1

const productBoxes = document.querySelectorAll('.product-box__item');
const totalProductsInCart = document.querySelectorAll('.red-info')[0];
const totalPriceInCart = document.querySelectorAll('.red-info')[1];
let order = {};
let totalProducts = 0;
let totalPrice = 0;

const countTotalPrice = function (order) {
    let total = 0;
    for (key in order) {
        total += order[key].totalPrice;
    }
    return total;
}

const countTotalProducts = function (order) {
    let sum = 0;
    for (key in order) {
        sum += order[key].totalProducts;
    }
    return sum;
}

productBoxes.forEach((productBox, i) => {
    productBox.addEventListener('click', (e) => {

        if (e.target.textContent === 'Добавить') {

            let parentProductBox = e.target.parentElement;
            let priceOfProduct = parseInt(parentProductBox.querySelector('.product-box__meta p').textContent)
            let amountOfProducts = parseInt(parentProductBox.querySelector('.qty__item').value)

            if (amountOfProducts >= 0) {

                totalPrice = amountOfProducts * priceOfProduct;
                totalProducts = amountOfProducts;
                order[i] = { totalPrice, totalProducts }

                totalPriceInCart.textContent = countTotalPrice(order);
                totalProductsInCart.textContent = countTotalProducts(order);

            } else {
                alert('А вот и никаких отрицательных и нулевых продуктов сегодня!')
            }
        }
    })
})


// Task #2

const selects = document.querySelectorAll('.select-control');
const filterStore = { a: 0, b: 0 }

const filter = function (category, cost) {

    let categoryStore = {
        0: 0,
        1: 'завтраки',
        2: 'первые блюда',
        3: 'гарниры',
    }

    productBoxes.forEach(productBox => {
        let price = parseInt(productBox.querySelector('.product-box__meta p').textContent);
        let attr = productBox.getAttribute('data-food-category');

        if (category === 0 && cost === 0) {
            productBox.style.display = 'flex';
        } else if (attr === categoryStore[category] && cost === 0) {
            productBox.style.display = 'flex';
        } else if (categoryStore[category] === 0 && price <= cost) {
            productBox.style.display = 'flex';
        } else if (attr === categoryStore[category] && price <= cost) {
            productBox.style.display = 'flex';
        } else {
            productBox.style.display = 'none';
        }
    })
}

selects.forEach((select, i) => {
    select.addEventListener('change', () => {
        if (i === 1) {
            filterStore.b = +select.value
        } else if (i === 0) {
            filterStore.a = +select.value
        }
        filter(filterStore.a, filterStore.b)
    })
})


// Task #3

const buttonOrder = document.querySelector('.btn-check');

buttonOrder.addEventListener('click', () => {

    const modalWindow = document.createElement('div');

    document.body.style.overflow = "hidden";
    modalWindow.style.cssText = `
        width: 100%;
        height: 100%;
        background-color: rgb(211, 211, 211, 0.7);
        top: 0;
        left:0;
        position: fixed;
        z-index:1; 
    `;

    document.body.appendChild(modalWindow);

    const form = document.createElement('form');
    const name = document.createElement('input');
    const email = document.createElement('input');
    const buttonSend = document.createElement('input');
    const nameLabel = document.createElement('label');
    const emailLabel = document.createElement('label');

    form.id = 'form'

    form.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); 
        width: 290px;
        height: 195px;
        border: 1px dotted #ff3adc;
        background-color: #fff;
        padding: 20px;
        z-index:2;
    `;

    nameLabel.setAttribute("for", "name");
    nameLabel.innerText = 'Имя:';
    nameLabel.style.cssText = `
        padding-left: 30px;
        margin-bottom: 10px;
    `;

    name.setAttribute("type", "text");
    name.placeholder = 'Введите ваше имя';
    name.id = 'name';
    name.style.cssText = `
        display: block;
        border: 1px solid #d3d3d3;
        width: 200px;
        height: 30px;
        margin: 0 auto;
        padding-left: 10px;
        margin-bottom: 10px;   
    `;

    emailLabel.setAttribute("for", "email");
    emailLabel.innerText = 'Почта:';
    emailLabel.style.cssText = `
        padding-left: 30px;
        margin-bottom: 10px;
    `;

    email.setAttribute("type", "email");
    email.placeholder = 'Введите вашу почту';
    email.id = 'email';
    email.style.cssText = `
        display: block;
        border: 1px solid #d3d3d3;
        width: 200px;
        height: 30px;
        margin: 0 auto;
        padding-left: 10px;
        margin-bottom: 10px;
    `;

    buttonSend.setAttribute("type", "submit");
    buttonSend.value = 'Отправить';
    buttonSend.style.cssText = `
        display: block;
        background: #2a6496;
        color: #fff;
        width: 200px;
        height: 30px;
        margin: 0 auto;
        padding-left: 10px;
        border: 0;
        cursor: pointer;
    `;

    modalWindow.appendChild(form);
    form.appendChild(nameLabel);
    form.appendChild(name);
    form.appendChild(emailLabel);
    form.appendChild(email);
    form.appendChild(buttonSend);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (name.value === "" ||
            email.value === "" ||
            name.value.replace(/\s/g, '').length === 0 ||
            email.value.replace(/\s/g, '').length === 0) {
            alert('Заполните форму, пожалуйста')
        } else {
            alert('Спасибо за покупки');
            order = {};
            totalProductsInCart.textContent = 'XXX';
            totalPriceInCart.textContent = 'XXX';
            // modalWindow.style.display = 'none';
            modalWindow.remove();
            document.body.style.overflow = "";
        }
    })

    window.addEventListener('click', (e) => {
        if (e.target == modalWindow) {
            // modalWindow.style.display = 'none';
            modalWindow.remove();
            document.body.style.overflow = "";
            modalWindow.remove();

        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
            // modalWindow.style.display = 'none';
            modalWindow.remove();
            document.body.style.overflow = "";
        }
    })
})

