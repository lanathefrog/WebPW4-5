document.addEventListener('DOMContentLoaded', function() {
    let header = document.querySelector('header');
let content = document.querySelector('.content');

content.style.paddingTop = header.offsetHeight + 'px';

const pizzaInfo = [
    {
        id: 1,
        icon: 'assets/images/pizza_7.png',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size: {
            weight: 370,
            size: 30,
            price: 99
        },
        big_size: {
            weight: 660,
            size: 40,
            price: 169
        },
        is_new: true
    },
    {
        id: 2,
        icon: 'assets/images/pizza_2.png',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size: {
            weight: 460,
            size: 30,
            price: 139
        },
        big_size: {
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular: true
    },
    {
        id: 3,
        icon: 'assets/images/pizza_1_bublyk.png',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['БУБЛИК, вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size: {
            weight: 430,
            size: 30,
            price: 115
        },
        big_size: {
            weight: 780,
            size: 40,
            price: 179
        },
        is_new: true 
    },
    {
        id: 4,
        icon: 'assets/images/pizza_5_kvity.png',
        title: "Сициліано",
        type: 'М’ясна піца',
        content: {
            meat: ['КВІТИ','вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський', 'соус томатний']
        },
        small_size: {
            weight: 450,
            size: 30,
            price: 111
        },
        big_size: {
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id: 17,
        icon: 'assets/images/pizza_3.png',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size: {
            weight: 370,
            size: 30,
            price: 89
        }
    },
    {
        id: 43,
        icon: 'assets/images/pizza_6_butcool.png',
        title: "Крута піца",
        type: 'М’ясна піца',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        small_size: {
            weight: 470,
            size: 30,
            price: 115
        },
        big_size: {
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id: 90,
        icon: 'assets/images/pizza_8_yellowboi.png',
        title: "Дольче Маре",
        type: 'Морська піца',
        content: {
            ocean: ['YELLOW BOI, криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        big_size: {
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id: 6,
        icon: 'assets/images/pizza_4.png',
        title: "Россо Густо",
        type: 'Морська піца',
        content: {
            ocean: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        small_size: {
            weight: 400,
            size: 30,
            price: 189
        },
        big_size: {
            weight: 700,
            size: 40,
            price: 299
        }
    }
];
const pizzaContainer = document.querySelector('.pizzas');
const cartMainContent = document.querySelector('#cart-main-content');
const totalQuantityLabel = document.querySelector('#cart-number');
const totalPriceLabel = document.querySelector('#total-price');
const orderButton = document.querySelector('#cart-bottom-pannel .button');
const notificationPanel = document.getElementById('notification-panel');

function createPizzaHTML(pizza) {
    const isNew = pizza.is_new ? '<div class="pizza-label-new">Нова</div>' : '';
    const isPopular = pizza.is_popular ? '<div class="pizza-label-popular">Популярна</div>' : '';

    const description = Object.keys(pizza.content).map(key => pizza.content[key].join(', ')).join(', ');
    const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    return `
        <div class="single-pizza" data-id="${pizza.id}">
            ${isNew}
            ${isPopular}
            <div class="pizza-image"><img src="${pizza.icon}"></div>
            <div class="pizza-name">${pizza.title}</div>
            <div class="pizza-type">${pizza.type}</div>
            <div class="pizza-description">
                ${capitalizedDescription}
            </div>
            <div class="weight-size">
                ${pizza.small_size ? `
                <div class="cheap-info"> 
                    <div class="weight"><img src="assets/images/size-icon.svg">${pizza.small_size.size}</div>
                    <div class="size"><img src="assets/images/weight.svg">${pizza.small_size.weight}</div> 
                    <div class="pizza-price">${pizza.small_size.price} <div class="grn">грн</div></div>
                    <button class="button buy-button" data-size="small">Купити</button>
                </div>` : ''}
                ${pizza.big_size ? `
                <div class="pricy-info"> 
                    <div class="weight"><img src="assets/images/size-icon.svg">${pizza.big_size.size}</div>
                    <div class="size"><img src="assets/images/weight.svg">${pizza.big_size.weight}</div> 
                    <div class="pizza-price">${pizza.big_size.price} <div class="grn">грн</div></div>
                    <button class="button buy-button" data-size="big">Купити</button>
                </div>` : ''}
            </div>
        </div>
    `;
}

pizzaInfo.forEach(pizza => {
    pizzaContainer.innerHTML += createPizzaHTML(pizza);
});

let cart = loadCartFromLocalStorage();

pizzaContainer.addEventListener('click', function(event) {
    let target = event.target;
    if (target) {
        const pizzaElement = target.closest('.single-pizza');
        if (pizzaElement) {
            const pizzaId = pizzaElement.dataset.id;
            const size = target.dataset.size;
            addToCart(pizzaId, size);
        }
    }
});

function addToCart(pizzaId, size) {
    const pizza = pizzaInfo.find(pizza => pizza.id == pizzaId);
    const price = size === 'small' ? pizza.small_size.price : pizza.big_size.price;
    const weight = size === 'small' ? pizza.small_size.weight : pizza.big_size.weight;
    const existingCartItem = cart.find(item => item.id == pizzaId && item.size == size);

    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        cart.push({ ...pizza, size, price, weight, quantity: 1 });
    }

    updateCart();
    saveCartToLocalStorage();
}

function updateCart() {
    cartMainContent.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
        totalPrice += item.quantity * item.price;
        cartMainContent.innerHTML += `
            <div class="cart-pizza">
                <div class="cart-pizza-details">
                    <div class="cart-pizza-name">${item.title} (${item.size === 'small' ? 'Мала' : 'Велика'})</div>
                    <div class="cart-pizza-size-and-weight">
                        <span class="cart-pizza-size"><img src="assets/images/size-icon.svg"><span class="cart-pizza-small-text">${item.size === 'small' ? item.small_size.size : item.big_size.size}</span></span>
                        <span class="cart-pizza-weight"><img src="assets/images/weight.svg"><span class="cart-pizza-small-text">${item.size === 'small' ? item.small_size.weight : item.big_size.weight}</span></span>
                    </div> 
                    <div class="cart-pizza-bottom-text">
                        <div class="cart-pizza-price">${item.price} грн</div>
                        <span class="buttons">
                            <span class="cart-pizza-minus" data-id="${item.id}" data-size="${item.size}">-</span>
                            <span class="cart-pizza-quantity">${item.quantity}</span>
                            <span class="cart-pizza-plus" data-id="${item.id}" data-size="${item.size}">+</span>
                        </span>
                        <span class="cart-pizza-delete" data-id="${item.id}" data-size="${item.size}">x</span>
                    </div>
                </div>
                <div class="cart-pizza-image"><img src="${item.icon}"></div>
            </div>
            <hr>
        `;
    });

    totalQuantityLabel.textContent = totalQuantity;
    totalPriceLabel.textContent = `${totalPrice} грн`;

    saveCartToLocalStorage();

    document.querySelectorAll('.cart-pizza-minus').forEach(button => {
        button.addEventListener('click', function() {
            updateCartItemQuantity(button.dataset.id, button.dataset.size, -1);
        });
    });

    document.querySelectorAll('.cart-pizza-plus').forEach(button => {
        button.addEventListener('click', function() {
            updateCartItemQuantity(button.dataset.id, button.dataset.size, 1);
        });
    });

    document.querySelectorAll('.cart-pizza-delete').forEach(button => {
        button.addEventListener('click', function() {
            deleteCartItem(button.dataset.id, button.dataset.size);
        });
    });

    document.getElementById('clear').addEventListener('click', function() {
        cartMainContent.innerHTML = '';
        cart = [];
        updateCart();
        saveCartToLocalStorage();
    });
}


function updateCartItemQuantity(pizzaId, size, change) {
    const cartItem = cart.find(item => item.id == pizzaId && item.size == size);

    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item !== cartItem);
        }
        updateCart();
        saveCartToLocalStorage();
    }
}

function deleteCartItem(pizzaId, size) {
    cart = cart.filter(item => item.id != pizzaId || item.size != size);
    updateCart();
    saveCartToLocalStorage();
}

orderButton.addEventListener('click', function() {
    // Show the notification panel
    notificationPanel.classList.add('visible');

    // Clear the cart after a delay
    setTimeout(() => {
        notificationPanel.classList.remove('visible');
        cartMainContent.innerHTML = '';
        cart = [];
        updateCart();
        saveCartToLocalStorage();
    }, 1050); 
});

// Initial cart update
updateCart();

const tabs = document.querySelectorAll('.tab');

// Add event listener to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Get the category of the clicked tab
        const category = this.dataset.category;

        let filteredPizzas = pizzaInfo;
        if (category !== 'all') {
            filteredPizzas = pizzaInfo.filter(pizza => pizza.type === category);
            if (category === 'З ананасами') {
                filteredPizzas = pizzaInfo.filter(pizza => pizza.content.pineapple);
            }
        }
        pizzaContainer.innerHTML = '';

        filteredPizzas.forEach(pizza => {
            pizzaContainer.innerHTML += createPizzaHTML(pizza);
        });

        document.querySelector('#quantity-main').textContent = filteredPizzas.length;
    });
});

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
}

});