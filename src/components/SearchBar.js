
import {useState} from 'react';
function SearchBar({onSubmit}){
    const [term, setTerm] = useState('')

    const handleFormSubmit =(event)=>{
        event.preventDefault();
        onSubmit(term)
        setTerm('')
    };
    const handleChange = (event) =>{
        setTerm(event.target.value)
       
    }



    return <div className='searchbar'>
        <form onSubmit={handleFormSubmit}>
            
            <input className=''value={term} onChange={handleChange} onSubmit={ handleFormSubmit}/>
        </form>
    </div>
}
export default SearchBar;