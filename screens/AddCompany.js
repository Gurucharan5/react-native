
import React from 'react'
const AddCompany = (props) => {
  
    let formFields = {}
 



    return(
          <div>
             <input ref={input => formFields.name = input} placeholder='Enter the name of the company'/>
            <button onClick={()=> props.submitHandler({name:formFields.name.value})}>Submit</button>
           </div>
    )
}


export default AddCompany