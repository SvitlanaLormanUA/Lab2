document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('#productNameInput');
    const addButton = document.querySelector('#addProductButton');
    const productList = document.querySelector('#productList');
    const boughtItems = document.querySelector('.boughtItems');
    const leftItems = document.querySelector('.left');
    const block1 = document.querySelector('.block1');
    const block2 = document.querySelector('.block2');

    function displayFromSt() {
        const fI = localStorage.getItem("firstItem");
        const sI = localStorage.getItem("secondItem");
        const tI = localStorage.getItem("thirdItem");

        if (fI) {
            addProductToList(fI);
        }
        if (sI) {
            addProductToList(sI);
        }
        if (tI) {
            addProductToList(tI);
        }
    }

    function addProductToList(productName) {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.setAttribute('data-product-name', productName);

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
        quantitySpan.textContent = '2';
        funcButtonsDiv.appendChild(quantitySpan);

        const plusButton = document.createElement('button');
        plusButton.className = 'plus tooltip';
        plusButton.textContent = '+';
        funcButtonsDiv.appendChild(plusButton);

        const boughtDiv = document.createElement('div');
        boughtDiv.className = 'boughtT';

        const boughtButton = document.createElement('button');
        boughtButton.className = 'bought tooltip';
        boughtButton.textContent = 'Не куплено';
        boughtDiv.appendChild(boughtButton);

        const removeButton = document.createElement('button');
        removeButton.className = 'cross';
        removeButton.textContent = 'x';
        boughtDiv.appendChild(removeButton);

        productDiv.appendChild(nameDiv);
        productDiv.appendChild(funcButtonsDiv);
        productDiv.appendChild(boughtDiv);

        productList.appendChild(productDiv);

        const leftItem = document.createElement('button');
        leftItem.className = 'bought';
        const textDiv = document.createElement('div');
        textDiv.className = 'secondBlocktext';

        leftItem.setAttribute('data-product-name', productName);
        textDiv.textContent = productName;
        const circle = document.createElement('span');
        circle.className = 'circle';
        circle.textContent = '2';
        leftItem.appendChild(textDiv);
        leftItem.appendChild(circle);

        boughtItems.appendChild(leftItem);

        block1.style.height = 'auto';
        block2.style.height = 'auto';
        block2.style.width = 'auto';
    }

    function editProductName(originalName, newName) {
        const productDiv = block2.querySelector(`[data-product-name="${originalName}"]`);

        if (productDiv) {
            const productNameLabel = productDiv.querySelector('.nameProduct');
            const leftItem = boughtItems.querySelector(`[data-product-name="${originalName}"]`);
            const quantitySpan = productDiv.querySelector('.square');

            if (productNameLabel) {
                productNameLabel.textContent = newName;
            }
            if (leftItem) {
                leftItem.setAttribute('data-product-name', newName);
                leftItem.querySelector('.secondBlocktext').textContent = newName;
            }
            if (quantitySpan && leftItem) {
                const quantity = parseInt(quantitySpan.textContent);
                leftItem.querySelector('.circle').textContent = quantity;
            }

        }
    }

    function addProduct() {
        const productName = input.value.trim();
        if (productName !== '') {
            const existingProducts = document.querySelectorAll('.product');
            let isDuplicate = false;
            existingProducts.forEach(product => {
                const productNameAttr = product.getAttribute('data-product-name');
                if (productNameAttr && productNameAttr.toLowerCase() === productName.toLowerCase()) {
                    alert('Продукт з такою назвою вже існує!');
                    isDuplicate = true;
                    return;
                }
            });

            if (!isDuplicate) {
                addProductToList(productName);
                input.value = '';
                input.focus();
            }
        }
    }

    function removeProduct(productName) {
        const productDivs = document.querySelectorAll(`[data-product-name="${productName}"]`);
        productDivs.forEach(div => {
            div.remove();
        });
        updateStatistics();
    }

    productList.addEventListener('click', function (event) {
        const target = event.target;
        const productDiv = target.closest('.product');

        if (productDiv) {
            const quantitySpan = productDiv.querySelector('.square');
            const minusButton = productDiv.querySelector('.minus');
            const plusButton = productDiv.querySelector('.plus');
            let productNameLabel = productDiv.querySelector('.nameProduct');
            const productName = productDiv.getAttribute('data-product-name');

            if (productNameLabel === target) {
                let originalName = productNameLabel.textContent.trim();
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = productNameLabel.textContent;
                inputField.style.width = '5em';
                productNameLabel.replaceWith(inputField);
                inputField.focus();

                inputField.addEventListener('keypress', function (event) {
                    if (event.key === 'Enter') {
                        const editedName = inputField.value.trim();
                        const existingProducts = document.querySelectorAll('.product');
                        let isDuplicate = false;

                        existingProducts.forEach(product => {
                            const productNameAttr = product.getAttribute('data-product-name');
                            if (productNameAttr && productNameAttr.toLowerCase() === editedName.toLowerCase() && productNameAttr !== originalName.toLowerCase() && editedName.toLowerCase() !== originalName.toLowerCase()) {
                                alert('Продукт з такою назвою вже існує!');
                                isDuplicate = true;
                                return;
                            }
                        });

                        if (!isDuplicate) {
                            productNameLabel.textContent = editedName;
                            productDiv.setAttribute('data-product-name', editedName);
                            editProductName(originalName, editedName);
                            inputField.replaceWith(productNameLabel);
                            saveToLocalStorage(editedName);
                        }
                    }
                });
            }

            if (target.classList.contains('cross')) {
                removeProduct(productName);
            } else if (target.classList.contains('minus')) {
                let quantity = parseInt(quantitySpan.textContent);
                if (quantity > 1) {
                    quantitySpan.textContent = quantity - 1;
                    updateStatistics(productDiv);

                    const circle = boughtItems.querySelector(`[data-product-name="${productName}"] .circle`);
                    if (circle) {
                        circle.textContent = quantity - 1;
                    }

                    if (quantity === 2) {
                        minusButton.disabled = true;
                    }
                } else if (quantity === 1) {
                    minusButton.disabled = true;
                    updateStatistics(productDiv);
                }

            } else if (target.classList.contains('plus')) {
                let quantity = parseInt(quantitySpan.textContent);
                quantitySpan.textContent = quantity + 1;
                minusButton.disabled = false;
                updateStatistics(productDiv);

                const circle = boughtItems.querySelector(`[data-product-name="${productName}"] .circle`);
                if (circle) {
                    circle.textContent = quantity + 1;
                }
            } else if (target.classList.contains('bought')) {
                if (target.textContent.toLowerCase() === 'не куплено') {
                    productNameLabel.style.textDecoration = 'line-through';
                    target.textContent = 'Куплено';
                    minusButton.style.visibility = 'hidden';
                    plusButton.style.visibility = 'hidden';
                    productDiv.querySelector('.cross').style.visibility = 'hidden';
                    const boughtItem = boughtItems.querySelector(`[data-product-name="${productName}"]`);
                    if (boughtItem) {
                        boughtItems.removeChild(boughtItem);
                    }
                    leftItems.appendChild(boughtItem);
                    updateStatistics();

                } else {
                    productNameLabel.style.textDecoration = 'none';
                    target.textContent = 'Не куплено';
                    minusButton.style.visibility = 'visible';
                    plusButton.style.visibility = 'visible';
                    productDiv.querySelector('.cross').style.visibility = 'visible';
                    const leftItem = leftItems.querySelector(`[data-product-name="${productName}"]`);
                    if (leftItem) {
                        leftItems.removeChild(leftItem);
                    }
                    boughtItems.appendChild(leftItem);
                    updateStatistics();
                }
            }
        }
    });

    function updateStatistics() {
        const totalProducts = document.querySelectorAll('.product').length;
        const boughtProducts = document.querySelectorAll('.product .bought').length;
        const notBoughtProducts = totalProducts - boughtProducts;

        console.log(`Total: ${totalProducts}, Bought: ${boughtProducts}, Not Bought: ${notBoughtProducts}`);
    }

    function saveToLocalStorage(productName) {
        if (!localStorage.getItem('firstItem')) {
            localStorage.setItem('firstItem', productName);
        } else if (!localStorage.getItem('secondItem')) {
            localStorage.setItem('secondItem', productName);
        } else if (!localStorage.getItem('thirdItem')) {
            localStorage.setItem('thirdItem', productName);
        }
    }

    addButton.addEventListener('click', addProduct);
    displayFromSt();
});
