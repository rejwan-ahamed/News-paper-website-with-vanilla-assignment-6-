// fetch news category here

const newsCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')

        .then(res => res.json())
        .then(data => showNewsCategory(data.data.news_category))
        .catch(error => console.log(error))
}

const category = document.getElementById('category')

const showNewsCategory = (newses) => {
    newses.forEach(news => {
        const div = document.createElement('div');
        div.innerHTML = `
        <li class="inline-flex items-center" onclick="categoryNews(${news.category_id})">
        <a href="#"
            class="mb-2 inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
        ${news.category_name}
        </a>
         </li> 
        `

        category.append(div)

    })

}

// click to show category 

function categoryNews(newsData) {
    console.log(newsData)
    let r = loadNewsData('0' + newsData)
    spinner(true)
}


// load news data here

const loadNewsData = (searchCategory) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${searchCategory}`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data))
        .catch(error => console.log(error))
}


// load news in cards

const newsCards = document.getElementById('newsCards')
const newsNumbers = document.getElementById('resultNumber')

const showNews = (data) => {

    // show news numbers
    if (data.length == 0) {
        newsNumbers.innerText = "Jonkar Vhai dose not post any news on this topic."
        spinner(false)
    } else {
        newsNumbers.innerText = `${data.length} results found`
    }

    newsCards.innerHTML = ''
    data.forEach(news => {
        console.log(data)
        const newsCard = document.createElement('div')
        newsCard.innerHTML = `
        <a href="#"
        class="mb-4 2xl:max-w-2xl 2xl:mb-0 xl:mb-0 lg:mb-0 mx-auto flex flex-col items-center bg-white rounded-lg border shadow-md w-fit md:flex-row md:max-w-xl hover:bg-gray-100"  onclick="showmodule('${news._id}')">
        <img class="object-cover  w-6xl 2xl:w-60 h-96 rounded-t-lg md:h-auto md:w-2xl md:rounded-none md:rounded-l-lg"
            src="${news.thumbnail_url}"
            alt="">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 "> ${news.title.slice(0,100)+ '...'}</h5>
            <p class="mb-3 font-normal text-gray-700 ">${news.details.slice(0,150)+ '...'}</p>


            <div class="main-author-section flex justify-between 2xl:px-4">
                <div class="author flex gap-1 items-center ">
                    <img class="w-8 h-auto rounded-full"
                        src="${news.author.img? news.author.img: 'No image'}"
                        alt="" srcset="">
                    <h4 class="font-mono text-sm font-bold">${news.author.name? news.author.name: 'No Name'}</h4>
                </div>

                <div class="author flex gap-1 items-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    <h4 class="font-mono text-sm font-bold">${news.total_view? news.total_view: 'No views'}</h4>
                </div>
            </div>
        </div>
    </a>
        `
        newsCards.appendChild(newsCard)
        spinner(false);
    })


}

// data load spinner here

const spinner = showSpinner => {
    const spinner = document.getElementById('spinner');
    if (showSpinner == true) {
        spinner.classList.remove('hidden')
    } else {
        spinner.classList.add('hidden')
    }
}



// show modal
const module = document.getElementById('main-module');
const showmodule = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => modalData(data))
        .catch(error => console.log(error))
}

const modalData = (data) => {

    const modalParagraph = document.getElementById('news-modal-paragrapg');
    modalParagraph.innerText = `${data.data[0].details}`;


    if (data) {
        module.classList.remove('hidden')
    } else {
        module.classList.add('hidden')
    }
    console.log(data)
}

// close module 

function closeButton() {
    module.classList.add('hidden')
    console.log('button clicked')
}


// this function called for load data in category in the API

loadNewsData('01')

// this function called for load data in News cards in the API

newsCategory();