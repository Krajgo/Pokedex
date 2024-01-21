import className from "classnames";
function TypePlate({typ, onClick, rotate, notClickable, isActive}){
    const klasa = className(" flex px-3.5 py-1 rounded-3xl border-4 font-extrabold text-white text-shadow-2 drop-shadow-5",
     "[text-shadow:_3px_0.5px_3px_rgb(0_0_0_/_100%)]",
    typ === "normal" ? "[background-color:#aaaba2]":
    typ === "poison" ? "[background-color:#993399]":
    typ === "psychic" ? "[background-color:#ff6699]":
    typ === "grass" ? "[background-color:#66cc33]":
    typ === "ground" ? "[background-color:#cc9933]":
    typ === "ice" ? "[background-color:#99ccff]":
    typ === "fire" ? "[background-color:#f55542]":
    typ === "rock" ? "[background-color:#b5936d]":
    typ === "dragon" ? "[background-color:#6666cc]":
    typ === "water" ? "[background-color:#3399ff]":
    typ === "bug" ? "[background-color:#cccc33]":
    typ === "dark" ? "[background-color:#372820]":
    typ === "fighting" ? "[background-color:#b16341]":
    typ === "ghost" ? "[background-color:#666699]":
    typ === "steel" ? "[background-color:#cccccc]":
    typ === "flying" ? "[background-color:#9999cc]":
    typ === "electric" ? "[background-color:#fce53d]":
    typ === "fairy" ? "[background-color:#f8adff]":
    "",
    {"xd": rotate},
    {"cursor-default": notClickable},
    isActive ? "border-purple-800": "border-white"
   
    )
    return<button  onClick={onClick}><p className={klasa}>{typ.toUpperCase()}</p></button>
}

export default TypePlate