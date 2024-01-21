import axios from "axios";
const PokeSearch = async (numer)=>{
    const responseOne = await axios.get(`https://pokeapi.co/api/v2/pokemon/${numer}`)
    const responseTwo = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${numer}`)
    const response = {
        basic: responseOne,
        advanced: responseTwo
    }
    return response ;
}
export default PokeSearch