
const loadAllPhone = async(status,brandName) => {

    document.getElementById('spinner').style.display = "none";
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName?brandName:"iphone"}`)
    const data = await response.json()

    if(status){
        displayAllPhones(data.data)
    }
    else{
        displayAllPhones(data.data.slice(0,6))
    }
    
}

    const displayAllPhones = (phones) => {

        const phonesContainer = document.getElementById('phones-container')
        phones.forEach(phone => {
            const {brand,image,slug} = phone
            const div = document.createElement('div')
            div.innerHTML = `
            <div class="card m-2 bg-base-100 w-96 shadow-xl">
            <figure class="px-10 pt-10">
                <img
                src=${image}
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${brand}</h2>
                <p>${slug}</p>
                <div class="card-actions">
                <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
            </div>

            `
            phonesContainer.append(div);
        });
    }

    const handleShowAll = () => {
        loadAllPhone(true)
    }



const handleSearch = () => {

    document.getElementById('spinner').style.display = "block";

    const searchText = document.getElementById('search-box').value
    setTimeout(function () {
        loadAllPhone(false,searchText)
    }, 3000);
}



const phoneDetails = async(slugs) => {
    const response = await fetch(` https://openapi.programming-hero.com/api/phone/${slugs}`)
    const data = await response.json()
    console.log(data.data)

    const {brand, image, slug} = data.data

    const modalContainer = document.getElementById('modal-container')
    
    modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">${brand}</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    `

    my_modal_1.showModal()
}


loadAllPhone(false)