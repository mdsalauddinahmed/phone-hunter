const loadPhone = async (searchText)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res =await fetch(url)
    const data = await res.json();
    displayPhones(data.data)
}

const displayPhones = phones =>{
     const phonesContainer  = document.getElementById('phone-container');
     phonesContainer.textContent='';
    //  display 20 phones only
     phones =phones.slice(0,6)
    // display No phone found

     const noPhnFound = document.getElementById('no-phn-found')
     if(phones.length === 0){
        noPhnFound.classList.remove('d-none')
     }else{
        noPhnFound.classList.add('d-none')
     }


    //  display all phone found
     phones.forEach(phones=>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML= `
        
          <div class="card">
          <img src="${phones.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phones.phone_name}</h5>
            <p class="card-text"> ${phones.slug}</p>
          </div>
        </div>
      
  
        
        
        
        `
        phonesContainer.appendChild(phoneDiv)
     }) 
     
    //  stop spinner loader
    toggleSpinner(false)
}

document.getElementById('btn-search').addEventListener('click',function(){
    // start loader
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
     const searchText = searchField.value;
     loadPhone(searchText)
})

const toggleSpinner =isLoading =>{
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }else{
        loaderSection.classList.add('d-none')
    }
}

//loadPhone()