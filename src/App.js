// import logo from './logo.svg';
import {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [inputPerData,setInputPerData] = useState([])
  const [inputData,setInputData] = useState({firstName:"",lastName:"",contactNum:''});
  const [search,setSearch] = useState("")

  useEffect(() => localStorage.setItem('Storage',JSON.stringify(inputPerData)),[inputPerData]) // To store the data in local storage

  let nameVal = /^[A-Za-z ]+$/;
  let phoneVal = /^[6-9][0-9]{9}$/

  function changeHandle(e)
  {
    setInputData({...inputData,
                  [e.target.name]:e.target.value
                })
  }

  let arr;
  let {firstName,lastName,contactNum} = inputData

// To add records into table
  function addData()
  {

    arr = [...inputPerData]
    let i;

    if((inputData.firstName==="" ))
      {
        alert("Enter a valid name")
        return
      }
      if((inputData.lastName===""))
      {
        alert("last name is required")
        return
      }
      if((inputData.contactNum===''))
      {
        alert("contact number is required")
        return
      }
      if(isNaN(inputData.contactNum) || inputData.contactNum.length!==10 || inputData.contactNum[1]===0)
      {
        alert('please enter a valid phone number')
        return
      }
    // To check the duplicates
    for(i=0;i<arr.length;i++)
    {
      console.log("Checking duplicates")
      if((arr[i].firstName+arr[i].lastName===inputData.firstName+inputData.lastName))
      {
        alert("name already used.")
        return
      }
      if(arr[i].contactNum===inputData.contactNum)
      {
        alert("phone number already used.")
        return
      }
      
    }

    // If no duplicate found record will be inserted
    if(i===arr.length)
    {
      if(!nameVal.test(inputData.firstName+" "+inputData.lastName))
      {
        alert("Enter a valid name")
        return
      }
      if(!phoneVal.test(inputData.contactNum))
      {
        alert("enter a valid mobile number")
        return
      }

      // To update in the array
      setInputPerData([...inputPerData,{firstName,lastName,contactNum}])
     
      // console.log(inputData)
      // console.log(localStorage.getItem("personal data"))
      setInputData({firstName:"",lastName:"",contactNum:''})
      
    }
    
  }

  //to delete record
  let array;
  function removeRecord(i)
  {
    if(window.confirm("Press OK to delete the record")===true)
    {
      array = [...inputPerData]
      array.splice(i,1)
      setInputPerData(array)
    }
  }


  // To sort records in alphabetical order
  function sortData()
  {
    arr = [...inputPerData]
    let sortedData = arr.sort((a,b) => {
      return (((a.firstName+a.lastName)<(b.firstName+b.lastName))?-1:1)
    })
    console.log(sortedData)
    setInputPerData(sortedData)
  }



  return (
    <div className="App">
      
      <div className='names'>
        <label>Person Name</label><br></br>
        <input className='inputField inputField1' type="text" autoComplete='off' name="firstName" value={inputData.firstName} placeholder='Enter First Name' onChange={changeHandle} autoFocus required/>{' '}
        <input className='inputField' type="text" autoComplete='off' name="lastName" value={inputData.lastName} placeholder='Enter Last Name' onChange={changeHandle} required/>
        <div>
          <label>Contact</label><br></br>
          <input className='inputField' type="phone" autoComplete='off' name="contactNum" value={inputData.contactNum} placeholder='Contact' onChange={changeHandle} required/><br></br>
        </div>
      </div>
      
      <br></br>
      <div>
        <div id='saveButton' onClick={addData}>Save</div>
      </div>
      <br></br><br></br>
      <div>
        <input className='inputField searchBar' type="text" autoComplete='off' name="searchBar" placeholder='Search ' value={search} onChange={(e) => setSearch(e.target.value)}/><br></br>
      </div>
      <div className='pData'>
        <table>
          <thead>
            <tr>
              <th>SN.</th>
              <th id='sortData' onClick={() => sortData()}>Name</th>
              <th>Contact</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              inputPerData.filter(per => (per.firstName+per.lastName).toLowerCase().includes(search.toLowerCase())).map(
                (item,i) => {
                  return(
                    <tr key={i+1}>
                      <td>{i+1}</td>
                      <td>{item.firstName +' '+ item.lastName}</td>
                      <td>{item.contactNum}</td>
                      <td onClick={() => removeRecord(i)}>x</td>
                    </tr>
                  )
                }
              )
            }
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;
