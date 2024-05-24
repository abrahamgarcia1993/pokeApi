const contenedor= document.querySelector(".contenedor")
const input= document.querySelector("input")
let pokemons = [];
async function accederApi(){
    try{
        const url=`https://pokeapi.co/api/v2/pokemon`
        const response=await fetch(url)
        if(!response.ok){
           throw new Error("no se ha conectado correctamente")
        }
        const data= await response.json()
        pokemons= data.results

        mostrarResultados(pokemons)
    }catch(error){
        console.error("ha ocurrido un error pisha")
    }
}

accederApi()


const mostrarResultados=(pokemons)=>{
    contenedor.innerHTML=""
    pokemons.forEach(pokemon => {
        const tarjeta= document.createElement("div")
        tarjeta.classList.add("tarjeta")
        
        const nombre= document.createElement("p")
        nombre.textContent= pokemon.name
        const url= document.createElement("p")
        url.textContent=pokemon.url
        
        contenedor.appendChild(tarjeta)
        recogerInfo(pokemon.url, tarjeta)
        tarjeta.appendChild(nombre)
    });
}

const recogerInfo= async(url, tarjeta)=>{
    
    try{
        response=await fetch(url)
        if(!response.ok){
            throw new Error("te pasas tio")
        }
        const data=await response.json()
        console.log(data)
        mostrarResultadosUrl(data,tarjeta)
    }catch(error){
        console.error("mu ma")
    }
    
}
function mostrarResultadosUrl(data,tarjeta){
    
    const img= document.createElement("img")
    img.src=data.sprites.front_default
    tarjeta.appendChild(img)
    contenedor.appendChild(tarjeta)
    
    
}
input.addEventListener("input", (event) => {
    const terminoBusqueda = event.target.value.toLowerCase();
    const resultadosFiltrados = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(terminoBusqueda));
    if(terminoBusqueda === ""){
        mostrarResultados(pokemons);
        return;
    }else{
        mostrarResultados(resultadosFiltrados);
         

    }
});