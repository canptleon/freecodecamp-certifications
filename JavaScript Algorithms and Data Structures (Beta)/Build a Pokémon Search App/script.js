document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    const searchValue = document
      .getElementById("search-input")
      .value.trim()
      .toLowerCase();

    if (!searchValue) {
      alert("Please enter a valid Pokémon name or ID");
      return;
    }

    const spriteContainer = document.getElementById("sprite-container");
    spriteContainer.innerHTML = "Loading...";

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchValue}`
      );

      if (!response.ok) {
        throw new Error("Pokémon not found");
      }

      const data = await response.json();
      displayPokemonData(data);
    } catch (error) {
      alert(error.message);
      spriteContainer.innerHTML = "";
    }
  });

function displayPokemonData(data) {
  const stats = {
    "pokemon-name": data.name.toUpperCase(),
    "pokemon-id": `#${data.id}`,
    weight: data.weight,
    height: data.height,
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    "special-attack": data.stats[3].base_stat,
    "special-defense": data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
  };

  for (const key in stats) {
    document.getElementById(key).textContent = stats[key];
  }

  const typesContainer = document.getElementById("types");
  typesContainer.innerHTML = "";
  data.types.forEach((typeInfo) => {
    const typeElement = document.createElement("p");
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    typesContainer.appendChild(typeElement);
  });

  const spriteContainer = document.getElementById("sprite-container");
  spriteContainer.innerHTML = "";
  const img = document.createElement("img");
  img.id = "sprite";
  img.src = data.sprites.front_default;
  img.alt = `Image of ${data.name}`;
  spriteContainer.appendChild(img);
}
