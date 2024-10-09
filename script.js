const fetchAllPetsInfo = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayAllPets(data.pets);
};

const displayAllPets = async (pets) => {
  sortBtn(pets);
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

const sortBtn = (pets) => {
  document.getElementById("spinner").classList.add("hidden");
  document.getElementById("spinner").classList.remove("flex");
  document.getElementById("sort-by-price").addEventListener("click", () => {
    const sortedPets = [...pets].sort((a, b) => {
      return b.price - a.price;
    });
    displayAllPets(sortedPets);
  });
};

const likePet = (image) => {
  const likedPetContainer = document.getElementById("liked-pet-container");
  const div = document.createElement("div");
  div.innerHTML = `
  
  <div class="p-2 rounded-xl border border-teal-600">
  <img class="rounded-md" src="${image}"  />
  </div>
  `;
  likedPetContainer.appendChild(div);
};

const adoptPet = (petId) => {
  const adoptModal = document.getElementById("adopt-modal-container");
  const div = document.createElement("div");
  div.innerHTML = `
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box flex flex-col justify-center items-center">
    <h3 class="text-lg font-bold">Congratulations!!!</h3>
    <p class="py-4">Your Adoption has been Completed</p>
    <p id="countdown" class="py-4"></p>
  </div>
</dialog>
  `;
  adoptModal.appendChild(div);

  // const modal = document.getElementById("my_modal_5");
  const countdownId = document.getElementById("countdown");

  let countdown = 3;

  const updateCount = () => {
    countdownId.innerText = `Countdown closing in ${countdown} seconds`;
    countdown--;
    if (countdown < 0) {
      document.getElementById(`${petId}`).disabled = true;
      document.getElementById(`${petId}`).innerText = "Adopted";
      document.getElementById("my_modal_5").close();
      // my_modal_5.close();
      // modal.close();
    } else {
      setTimeout(updateCount, 1000);
    }
  };

  // modal.showModal();
  // my_modal_5.showModal();
  document.getElementById("my_modal_5").showModal();
  updateCount();
};

const petDetailsById = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  const modalContainer = document.getElementById("modal-container");
  const {
    image,
    date_of_birth,
    breed,
    gender,
    pet_name,
    price,
    vaccinated_status,
    pet_details,
  } = data.petData;
  const div = document.createElement("div");
  div.innerHTML = `
  <dialog id="my_modal_${petId}" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
  <img class="w-full rounded-md" src="${image}" />
    <h3 class="text-3xl my-4 font-bold">${pet_name}</h3>
    <p class="text-gray-500 flex items-center gap-2">
           <i class="fa-solid fa-paw"></i>Breed: ${breed ? breed : "Unknown"}
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
                 <p class="text-gray-500 flex items-center gap-2 price">
                   <i class="fa-solid fa-syringe"></i>Vaccinated Status: ${
                     vaccinated_status ? vaccinated_status : "N/A"
                   }
                 </p>
                 <div class="divider"></div>
           <h3 class="text-3xl my-4 font-bold">Detailed Description</h3>
           <p>${pet_details}</p>

    <div class="modal-action w-full">
      <form class="w-full" method="dialog">
        <button class="btn btn-outline w-full">Close</button>
      </form>
    </div>
  </div>
</dialog>
  `;

  modalContainer.appendChild(div);
  document.getElementById(`my_modal_${petId}`).showModal();
};

const fetchAllCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  displayCategoriesBtn(data.categories);
};

const displayCategoriesBtn = (categories) => {
  const categoryBtn = document.getElementById("category-buttons");
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button
    id="${category.category}"
    onclick="fetchPetsByCatagory('${category.category}')"
          class="category-btn btn btn-outline btn-lg hover:bg-teal-50 hover:text-black w-48 text-xl font-semibold"
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

  const petCardsContainer = document.getElementById("pet-cards-container");
  document.getElementById("spinner").classList.remove("hidden");
  document.getElementById("spinner").classList.add("flex");
  document.getElementById("pet-grids").classList.add("hidden");
  petCardsContainer.innerHTML = "";
  if (data.data.length === 0) {
    setTimeout(() => {
      petCardsContainer.classList.remove("grid");
      document.getElementById("spinner").classList.remove("flex");
      document.getElementById("spinner").classList.add("hidden");
      document.getElementById("pet-grids").classList.remove("hidden");
      const noPets = document.createElement("div");
      noPets.classList.add("border", "border-gray-300", "rounded-md", "py-4");
      noPets.innerHTML = `
      <div class="flex flex-col justify-center items-center p-12">
      <img src="./images/error.webp" alt="" />
      <h1 class="text-2xl lg:text-5xl font-bold text-center">No Pets Found in this Category</h1>
      </div>
      `;
      petCardsContainer.appendChild(noPets);
    }, 2000);
    activeBtn(categoryName);
  } else {
    setTimeout(() => {
      petCardsContainer.classList.add("grid");
      document.getElementById("pet-grids").classList.remove("hidden");
      document.getElementById("spinner").classList.remove("flex");
      document.getElementById("spinner").classList.add("hidden");
      displayAllPets(data.data);
    }, 2000);
    activeBtn(categoryName);
  }
};

const removeActiveClass = () => {
  const buttons = document.querySelectorAll(".category-btn");
  buttons.forEach((button) => {
    button.classList.remove("border-teal-600", "btn-circle", "bg-teal-100");
  });
};
const activeBtn = (categoryName) => {
  removeActiveClass();
  const button = document.getElementById(categoryName);
  button.classList.add("border-teal-600", "btn-circle", "bg-teal-100");
};

fetchAllCategories();
fetchAllPetsInfo();
