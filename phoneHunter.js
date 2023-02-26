const loadPhone = async (searchText,dataLimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res =await fetch(url)
    const data = await res.json();
 
    displayPhones(data.data,dataLimit)
}

const displayPhones =( phones,dataLimit) =>{
     const phonesContainer  = document.getElementById('phone-container');
     phonesContainer.textContent='';
    //  display 20 phones only
    const showAll =document.getElementById('show-all')
   if(dataLimit && phones.length>10){
    phones = phones.slice(0,10)
    showAll.classList.remove('d-none')

   }else{
    showAll.classList.add('d-none')
   }
     
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
          
            <!-- Button trigger modal -->
            <button onclick="loadDetails('${phones.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Details
            </button>
          </div>
        </div>
      
  
        
        
        
        `
        phonesContainer.appendChild(phoneDiv)
     }) 
     
    //  stop spinner loader
    toggleSpinner(false)
}

const processing =(dataLimit)=>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
     const searchText = searchField.value;
     loadPhone(searchText,dataLimit)
}


document.getElementById('btn-search').addEventListener('click',function(){
    // start loader
    processing(10)
})

document.getElementById('btn-show-all').addEventListener('click',function(){
    processing()
})


// handle enter event handler
document.getElementById('search-field').addEventListener('keydown', function (e) {

    console.log(e.key)
    if (e.key === 'Enter') {
        processing(10)
    }
});









const toggleSpinner =isLoading =>{
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }else{
        loaderSection.classList.add('d-none')
    }
}


// load details 
const loadDetails =async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneData (data.data);


}
const displayPhoneData =(phone)=>{
  console.log(phone)
const modalTitle = document.getElementById('#exampleModal');
  modalTitle.innerText=phone.name;
  const phoneDetails =document.getElementById('phone-details');
  phoneDetails.innerHTML=`
  
  <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No ReleaseDate found'} </p>
  <p>Release Date : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No ReleaseDate found'} </p>
  <p>Release Date : ${phone.mainFeatures ? phone.mainFeatures.chipSet: 'No ReleaseDate found'} </p>
  <p>Release Date : ${phone.mainFeatures ? phone.mainFeatures.displaySize: 'No ReleaseDate found'} </p>
  <p>Release Date : ${phone.mainFeatures ? phone.mainFeatures.memory : 'No ReleaseDate found'} </p>
  <p> others : ${phone.others ? phone.others.Bluetooth : 'No ReleaseDate found'} </p>
  <p> Brand : ${phone.brand ? phone.brand : 'No ReleaseDate found'} </p>
   
  `
}
//loadPhone()