import { ChangeEvent, FormEvent, useEffect, useState } from "react";


const defaultForm = {date: "", time: "", amountOfPersons:"", description: "",guest: { name: "", email: "", mobile: ""}  }



export const BookingForm = () => {

const[userInput, setUserInput] = useState(defaultForm)
   
const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
e.preventDefault()
confirm("gdpr.....")
console.log(userInput) 
setUserInput(defaultForm)
}

const handleChangeOne=(e: ChangeEvent<HTMLInputElement>)=>{
const name = e.target.name;
setUserInput({ ...userInput, [name]: e.target.value });
}

const handleChangeTwo=(e: ChangeEvent<HTMLInputElement>)=>{ 
const name = e.target.name;
setUserInput({ ...userInput, guest:{...userInput.guest,[name]: e.target.value }});
}

return (
  <div className="form-wrapper">
     <form onSubmit={handleSubmit}>
      <div>
     <label htmlFor="name"> Namn:</label> <input type="text" value={userInput.guest.name} onChange={handleChangeTwo} name="name" required/>
     </div>
     <div>
     <label htmlFor="email"> Mail:</label>
      <input type="email" value={userInput.guest.email} onChange={handleChangeTwo} name="email" required/>
      </div>
      <div>
      <label htmlFor="mobile"> Telefonnummer:</label>
      <input type="tel" value={userInput.guest.mobile} onChange={handleChangeTwo} name="mobile" required />
      </div>
      <div>
      <label htmlFor="amoutOfPersons"> Antal personer:</label>
      <input type="number" value={userInput.amountOfPersons} onChange={handleChangeOne} name="amountOfPersons"  required/>
      </div>
      <div>
      <label htmlFor="date"> Välj datum:</label>
      <input type="date" value={userInput.date} onChange={handleChangeOne} name="date" required />
      </div>
      <div>
      <label>Välj tid
      <select name="time" onChange={(e)=> setUserInput({...userInput, time: e.target.value})} >
        <option value="18:00">18:00</option>
        <option value="21:00">21:00</option>
      </select>
      </label>
      </div>
      <div>
      <label>Meddelande till oss</label>
      <input type="text" name="description" onChange={handleChangeOne} />
      </div>
      <button> boka 
        
      </button>
    </form>
    </div>

)
  
};