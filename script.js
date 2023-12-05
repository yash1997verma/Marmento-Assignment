//holds the current view state, by default list view
let view = 'list';

//select components
const searchBox = document.querySelector('.productSearch input');
const listView = document.getElementById('listView');
const gridView  = document.getElementById('gridView');


//highlight variants matching search key
const highlight = (event)=>{
    // console.log('hello')
    console.log(event.target.value);
}

//add event listners
searchBox.addEventListener('keyup', highlight);



const getData = async()=>{
    const res = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093');
    const productData = await res.json();
    // console.log(productData.data);
    return productData.data;
}


getData();


