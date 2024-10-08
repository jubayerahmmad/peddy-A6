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

fetchAllPetsInfo();
