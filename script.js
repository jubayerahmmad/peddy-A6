const fetchAllPetsInfo = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayAllPets(data.pets);
};

const displayAllPets = async (pets) => {
  const petsContainer = document.getElementById("pet-cards-container");
  petsContainer.innerHTML = "";

  pets.forEach((pet) => {
    const div = document.createElement("div");
    const { pet_name, breed, date_of_birth, image, gender, price } = pet;
    div.innerHTML = `
          <div class="cards border border-teal-600 rounded-xl">
               <div class="img p-4">
                 <img class="rounded-xl" src="${image}" alt="pet" />
               </div>
               <div class="content p-4">
                 <h1 class="text-2xl font-extrabold my-4">${pet_name}</h1>
                 <p class="text-gray-500 flex items-center gap-2">
                   <i class="fa-solid fa-paw"></i>Breed: ${
                     breed ? breed : "Unknown"
                   }
                 </p>
                 <p class="text-gray-500 flex items-center gap-2">
                   <i class="fa-solid fa-calendar-days"></i>Birth: ${
                     date_of_birth ? date_of_birth : "Unknown"
                   }
                 </p>
                 <p class="text-gray-500 flex items-center gap-2">
                   <i class="fa-solid fa-mercury"></i>Gender: ${
                     gender ? gender : "Unknown"
                   }
                 </p>
                 <p class="text-gray-500 flex items-center gap-2 price">
                   <i class="fa-solid fa-dollar-sign"></i>Price: ${
                     price ? price : "N/A"
                   } $
                 </p>
                 <div class="divider"></div>
                 <div class="buttonss flex justify-between items-center mt-4">
                   <button onclick="likePet('${
                     pet.image
                   }')" class="btn btn-outline btn-sm xl:btn-md text-teal-600">
                     <i class="fa-regular fa-thumbs-up text-xl"></i>
                   </button>
                   
                   <button id="${pet.petId}" onclick="adoptPet('${
      pet.petId
    }')" class="btn btn-outline btn-sm xl:btn-md text-teal-600">Adopt Now</button> 
                   <button onclick="petDetailsById('${
                     pet.petId
                   }')" class="btn btn-outline btn-sm xl:btn-md text-teal-600">Details</button>
                 </div>
               </div>
             </div>
    `;
    petsContainer.appendChild(div);
  });
};

const fetchAllCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  // console.log(data.categories);
  displayCategoriesBtn(data.categories);
};

const displayCategoriesBtn = (categories) => {
  const categoryBtn = document.getElementById("category-buttons");
  categories.forEach((category) => {
    // console.log(category);

    const div = document.createElement("div");
    div.innerHTML = `
    <button
    id="${category.category}"
    onclick="fetchPetsByCatagory('${category.category}')"
          class="category-btn btn btn-outline btn-lg w-48 text-xl font-semibold"
        >
        <img class="w-10 h-10" src="${category.category_icon}"> </img>
          ${category.category}
        </button>
    `;
    categoryBtn.appendChild(div);
  });
};

const fetchPetsByCatagory = async (categoryName) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await res.json();
  displayPetsBycategoryName(data.data);
};

const displayPetsBycategoryName = (dataForEachCategory) => {
  const petCardsContainer = document.getElementById("pet-cards-container");
  if (dataForEachCategory.length === 0) {
    petCardsContainer.classList.remove("grid");
    petCardsContainer.innerHTML = "";
    const noPets = document.createElement("div");
    noPets.classList.add("border", "border-gray-300", "rounded-md", "py-4");
    noPets.innerHTML = `
    <div class="flex flex-col justify-center items-center">
    <img src="./images/error.webp" alt="" />
     <h1 class="text-5xl font-bold text-center">No Pets Found in this Category</h1>
    </div>
    `;
    petCardsContainer.appendChild(noPets);
  } else {
    petCardsContainer.classList.add("grid");
    displayAllPets(dataForEachCategory);
  }
};

fetchAllCategories();
fetchAllPetsInfo();
