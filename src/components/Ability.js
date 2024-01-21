
import { useState } from "react";
function Ability({ability}){
    const[prompt, setPrompt] = useState(false);
    
 const name = ability.name.slice(0,1).toUpperCase().concat(ability.name.slice(1));
 return <div >
        <span onMouseEnter={()=>setPrompt(true)} onMouseLeave={()=>setPrompt(false)} className="font-semibold text-xl text-blue-900">
            {name}
        </span>
        {prompt && <div className="z-30 p-3 max-w-xs absolute  bg-white box-border rounded-3xl drop-shadow-lg">
       {ability.effect}
        </div>}
    </div>
}

export default Ability;