document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('#productNameInput');
    const addButton = document.querySelector('#addProductButton');
    const productList = document.querySelector('#productList');

    const block1 = document.querySelector('.block1');
    const block2 = document.querySelector('.block2');


    const left = document.querySelector('.left');
    const boughtItems = document.querySelector('.boughtItems');

    function addProduct() {
        const productName = input.value.trim();
        if (productName !== '') {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            const nameDiv = document.createElement('div');
            nameDiv.className = 'namePr';
            const nameLabel = document.createElement('label');
            nameLabel.className = 'nameProduct';
            nameLabel.textContent = productName;
            nameDiv.appendChild(nameLabel);

            const funcButtonsDiv = document.createElement('div');
            funcButtonsDiv.className = 'funcButtons';

            const minusButton = document.createElement('button');
            minusButton.className = 'minus tooltip';
            minusButton.textContent = '-';
            funcButtonsDiv.appendChild(minusButton);

            const quantitySpan = document.createElement('span');
            quantitySpan.className = 'square';
            quantitySpan.textContent = '1';
            funcButtonsDiv.appendChild(quantitySpan);

            const plusButton = document.createElement('button');
            plusButton.className = 'plus tooltip';
            plusButton.textContent = '+';
            funcButtonsDiv.appendChild(plusButton);

            const boughtDiv = document.createElement('div');
            boughtDiv.className = 'boughtT';

            const removeButton = document.createElement('button');
            removeButton.className = 'crossUmv';
            removeButton.textContent = 'x';
            boughtDiv.appendChild(removeButton);

            const boughtButton = document.createElement('button');
            boughtButton.className = 'bought tooltip';
            boughtButton.textContent = 'Не куплено';
            boughtDiv.appendChild(boughtButton);

            productDiv.appendChild(nameDiv);
            productDiv.appendChild(funcButtonsDiv);
            productDiv.appendChild(boughtDiv);

            productList.appendChild(productDiv);

            block1.style.height = (block1.offsetHeight + productDiv.offsetHeight - 30) + 'px';
            block2.style.height = (block2.offsetHeight + productDiv.offsetHeight - 30) + 'px';

            input.value = '';
            input.focus();

            const left = document.createElement('button');
            const circle = document.createElement('span');
            circle.className = 'circle';
            left.className = 'bought cheese';
            left.textContent = productName;
            
            // Додати текст кнопки та коло в одному рядку
            left.style.display = 'inline-flex';
            left.appendChild(document.createTextNode(' ')); // Пробіл між текстом і колом
            left.appendChild(circle);
            
            boughtItems.appendChild(left);
            
            
            


            block2.style.width = (block1.offsetHeight + productDiv.offsetHeight - 30) + 'px';
          
            updateStatistics(productDiv);
        }
    }

    productList.addEventListener('click', function(event) {
        const target = event.target;
        const productDiv = target.closest('.product');
        
        if (productDiv) {
            const quantitySpan = productDiv.querySelector('.square');
            const minusButton = productDiv.querySelector('.minus');
            if (target.classList.contains('minus')) {
                let quantity = parseInt(quantitySpan.textContent);
                if (quantity > 1) {
                    quantitySpan.textContent = quantity - 1;
                    quantityOfPr == quantitySpan.textContent;
                    updateStatistics(productDiv);
                } else if (quantity === 1) {
                    quantitySpan.textContent = '0';
                    minusButton.disabled = true;
                    quantityOfPr = quantitySpan.textContent;     
                    updateStatistics(productDiv);

                }
            } else if (target.classList.contains('plus')) {
                let quantity = parseInt(quantitySpan.textContent);
                quantitySpan.textContent = quantity + 1;
                minusButton.disabled = false;
               
                updateStatistics(productDiv);
            } else if (target.classList.contains('bought')) {
                if (target.textContent.toLowerCase() === 'не куплено') {
                    target.textContent = 'Куплено';
                    boughtItems.removeChild(productDiv);
                    left.appendChild(productDiv);
                } else {
                    target.textContent = 'Не куплено';
                    left.removeChild(productDiv);
                    boughtItems.appendChild(productDiv);
                }
              
            } else if (target.classList.contains('crossUmv')) {
                productDiv.parentNode.removeChild(productDiv); 
               updateStatistics(productDiv);
            }
        }
    });

    addButton.addEventListener('click', addProduct);

    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addProduct();
        }
    });

    function updateStatistics(productDiv) {
        const productName = productDiv.querySelector('.nameProduct').textContent;
        const quantitySpan = productDiv.querySelector('.square');
        let circle = productDiv.querySelector('.circle'); 
        const isBought = productDiv.querySelector('.bought').textContent === 'Куплено';
    
        const quantity = parseInt(quantitySpan.textContent);
        circle.textContent = quantity; 
    
        const productButton = document.createElement('button');
        productButton.className = 'bought';
        productButton.textContent = `${productName} `;
        circle.textContent = quantity;
    

    }
    
    
});
