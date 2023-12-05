(async ()=>{
    //holds the current view state, by default list view
    let view = 'list';
    let searchTerm= '';
    //select components
    const searchBox = document.querySelector('.productSearch input');
    const listView = document.getElementById('listView');
    const gridView  = document.getElementById('gridView');
    const productSection = document.querySelector('.productSection');
    const productList = document.querySelector('.productList');
    const productGrid = document.querySelector('.productGrid');


    //highlight variants matching search key
    const highlight = async(event)=>{
        searchTerm = event.target.value;
        //re-render the products component
        await displayProducts();
    }

    //change product view
    const changeView = (currView)=>{
        view = currView;
    }


    //fetch api endpoint
    const getData = async()=>{
        try{
            const res = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093');
            const resData = await res.json();
            const productData = resData.data;
            return productData;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    //dislay products in a list view
    const displayList = (productData)=>{
        productGrid.innerHTML = '';
        productList.innerHTML = '';

        productData.map((product)=>{
            let productListItem = document.createElement('div');
            productListItem.classList.add('productListItem');

            productListItem.innerHTML = `
                <div class='productImage'>
                    <img src='${product.product_image}' alt="">
                    <p >${product.product_badge}</p>
                </div>
                <div class = 'productInfo'>
                    <p class="productInfoTitle">${product.product_title}</p>
                    <div class='productVariants'>
                    ${product.product_variants.map(variant => {
                        const variantText = variant.v1 || variant.v2 || variant.v3;
                        let backgroundColor =''
                        if(searchTerm.length > 0){
                            backgroundColor = variantText.toLowerCase().includes(searchTerm.toLowerCase()) ? '#CCFF78 ' : '';
                        }
                        return `<p style="background-color: ${backgroundColor};">${variantText}</p>`;

                    }).join('')}
                    </div>

                </div>
            `;

            productList.appendChild(productListItem)

        });

        
    }

    //dispaly products in a grid view
    const displayGrid = (productData)=>{
        productList.innerHTML = '';
        productGrid.innerHTML = '';
        productData.map((product)=>{
            let productGridItem = document.createElement('div');
            productGridItem.classList.add('productGridItem');

            productGridItem.innerHTML = `
                <div class='productGridImage'>
                    <img src='${product.product_image}' alt="">
                    <p>${product.product_badge}</p>
                </div>
                <div class = 'productGridInfo'>
                <p class="productGridInfoTitle">${product.product_title}</p>
                <div class='productGridVariants'>
                    ${product.product_variants.map(variant => {
                        const variantText = variant.v1 || variant.v2 || variant.v3;
                        let backgroundColor =''
                        if(searchTerm.length > 0){
                            backgroundColor = variantText.toLowerCase().includes(searchTerm.toLowerCase()) ? '#CCFF78 ' : '';
                        }
                        return `<p style="background-color: ${backgroundColor};">${variantText}</p>`;
            
                    }).join('')}
                </div>
        
            </div>
           
        `;

            productGrid.appendChild(productGridItem)

        });
    }




    //for rendering the products, depending on view, using IIFE
    const displayProducts = async ()=>{
        const productData = await getData();
        //render products according to which view is selected
        view === 'list' ? displayList(productData) : displayGrid(productData);

    };
    await displayProducts();


    //add event listners
    searchBox.addEventListener('keyup', highlight);
    listView.addEventListener('click',async()=>{
        changeView(listView.getAttribute('data-view'));
        await displayProducts();
    });
    gridView.addEventListener('click',async()=>{
        changeView(gridView.getAttribute('data-view'));
        await displayProducts();
    });
})();