import React, { useEffect,  useState } from 'react'
import "./style.css"
import { AddItem, DeleteItem, GetItem } from '../api/api';
const ItemTableNeww = () => {
let totalAmmount=0
const [IsNewLine,setIsNewLine ]=useState(true)

      const [getRow,setGetRow]=useState([])
      const [tables, setTables] = useState([]);
    const [hideFirstRow,setHideFirstRow]=useState(true)
    const [apicall,setapicall]=useState(false)
      const [rowAdd,setRowAdd]=useState({
        item:"",
        qty:"",
        rate:"",
        amount:""
      })
 
     
     
     const HandleFirstRowAdd=(e)=>{
      setRowAdd({ ...rowAdd, [e.target.name]: e.target.value });
     }



     let amount = rowAdd.qty*rowAdd.rate;
     useEffect(() => {
      setRowAdd({
         ...rowAdd,
         amount: `${amount}`,
        
       });
       totalAmmount+=Number (amount)
       
     }, [rowAdd.qty,rowAdd.rate, rowAdd.amount ,amount,totalAmmount]);


   
  

    const handleTableRowChange = (index, e) => {
      const { name, value } = e.target;
      setTables((prevTables) =>
        prevTables.map((table, i) => {
          if (i === index) {
            const updatedTable = {
              ...table,
              [name]: value,
            };
            // Calculate the amount for the current row based on qty and rate
            updatedTable.amount = (parseFloat(updatedTable.qty) * parseFloat(updatedTable.rate)).toFixed(2);
            return updatedTable;
          }
          return table;
        })
      );
    };
    
    
  
    const handleAddRowData = async () => {
      // Check if all the fields in the rowAnother object are filled
      const lastRowIndex = tables.length - 1;
      const lastRow = tables[lastRowIndex];
  
      if (
        lastRow.item !== "" &&
        lastRow.qty !== "" &&
        lastRow.rate !== "" &&
        lastRow.amount !== ""
      ) {
        // You can submit the data to the database or perform any other operations here
        console.log("Submit the data:", lastRow);
      } else {
        alert("Please fill in the new line first.");
        console.log("another row--", lastRow);
      }
    };




const handleAddRow = async () => {
  if (getRow.length === 0) {
    // If there are no rows, it means the user wants to submit the first row as data
    const response = await AddItem(rowAdd);
    console.log("message--" + JSON.stringify(response));
    if (response.message === "Add item successfully") {
      setHideFirstRow(false);
      setapicall(true);
      setRowAdd({
        item: "",
        qty: "",
        rate: "",
        amount: ""
      });
    }
  } else {
    // If there are already rows, it means the user wants to add a new line
    if (IsNewLine) {
      setRowAdd({
        item: "",
        qty: "",
        rate: "",
        amount: ""
      });
      AddNewline();
      setIsNewLine(false); // Reset the flag for the next time
    } else {
      console.log("befor uuuusubmit--"+JSON.stringify(tables))
      // If the user is submitting data after creating a line
      if (
        tables[0].item !== "" &&
        tables[0].qty !== "" &&
        tables[0].rate !== "" &&
        tables[0].amount !== ""
      ) {
      
        const response = await AddItem(tables[0]);
        console.log("message--" + JSON.stringify(response));
        if (response.message === "Add item successfully") {
          setHideFirstRow(false);
          getAlldata()
          setapicall(true);
         setTables([])
           handleAddRowData();
        AddNewline(); 
        }
       
        // Add the necessary logic to submit rowAnother data to the database here
      } else {
        alert("Please fill in the new line first.");
        
      }
    }
  }
};


      const AddNewline=()=>{
        const newTable = {
          item: "",
          qty: "",
          rate: "",
          amount: ""
        };
    
        setTables((prevTables) => [...prevTables, newTable]);


       
      }
      
    
      const handleDeleteRow = async(index) => {

        console.log(index)
        const response= await DeleteItem(index)
        console.log("delete"+JSON.stringify(response))
        if(response.messsage==="item delete successfully"){
          getAlldata()
          setapicall(true)
        }
       
        // const updatedRows = [...rows];
        // updatedRows.splice(0, 4);
        // setRows(updatedRows);
      };
    
   
    const getAlldata=async()=>{
        const response= await GetItem()
        console.log(JSON.stringify(response))
        setGetRow(response.data)
        setapicall(false)
        getRow.map((data)=>{
          console.log(data.amount)
         totalAmmount+=Number (data.amount)
         return{}
        })

        
    }

  
      // useEffect(() => {
       
      //   const grandTotal = calculateGrandTotal();
      //   // You can use `grandTotal` for any other purposes (e.g., display it elsewhere in the component).
      //   // If you want to update a state with the grand total, you can do it here as well.
      //   console.log('Grand Total:', grandTotal);
      // }, [rows]);
    
      useEffect(()=>{
        getAlldata()
      },[ apicall,totalAmmount])
  return (
    <>
    <div className="container">
      <div className="row bg-brand text-light py-2 rounded-top-2 mt-3">
        <div className="col-4">Item</div>
        <div className="col-2 px-0">Quantity</div>
        <div className="col-2 px-0">Rate</div>
        <div className="col-2 px-0">Amount</div>
        <div className="col-2 px-0"></div>
      </div>
{ getRow.length===0&& hideFirstRow===true?<div
          className="row py-3 bg-secondary-subtle d-flex align-items-center overflow-hidden" 
        >
          <div className="col-4 border-bottom py-2">
            <input className="number_input" type="text"name="item" value={rowAdd.item} onChange={ HandleFirstRowAdd} placeholder="Item name" />
          </div>
          <div
            className="col-2 px-0 border-bottom py-2 d-flex align-items-center overflow-hidden"
          >
            <input className="number_input" type="number" placeholder="0" name="qty" value={rowAdd.qty} onChange={HandleFirstRowAdd} />
          </div>
          <div
            className="col-2 px-0 border-bottom py-2 d-flex align-items-center overflow-hidden"
          >
            <i className="fa-solid fa-indian-rupee-sign"></i>
            <input className="number_input" type="number" placeholder="0" name="rate" value={rowAdd.rate} onChange={HandleFirstRowAdd}/>
          </div>
          <div
            className="col-2 px-0 border-bottom py-2 d-flex align-items-center overflow-hidden"
          >
            <i className="fa-solid fa-indian-rupee-sign"></i>
            <input className="number_input" type="number" placeholder="0.0" name="amount" value={rowAdd.amount} readOnly />
          </div>
          {/* <div className="col-2 px-0 py-2 text-center">
           <button className="border-0 bg-secondary-subtle" onClick={() => handleDeleteRow(row.id)}> <i className="fa-solid fa-xmark text-brand"></i></button>
          </div> */}
        </div> :null}
      
      { getRow.map((row, index) => 
      {
        totalAmmount+=Number (row.amount)
        
        return(<> 
         <div
          className="row py-3 bg-secondary-subtle d-flex align-items-center overflow-hidden" key={index}
        >
          <div className="col-4 border-bottom py-2">
            <input className="number_input" type="text"name="item" value={row.item}  placeholder="Item name" />
          </div>
          <div
            className="col-2 px-0 border-bottom py-2 d-flex align-items-center overflow-hidden"
          >
            <input className="number_input" type="number" placeholder="0" name="qty" value={row.qty}  />
          </div>
          <div
            className="col-2 px-0 border-bottom py-2 d-flex align-items-center overflow-hidden"
          >
            <i className="fa-solid fa-indian-rupee-sign"></i>
            <input className="number_input" type="number" placeholder="0" name="rate" value={row.rate}/>
          </div>
          <div
            className="col-2 px-0 border-bottom py-2 d-flex align-items-center overflow-hidden"
          >
            <i className="fa-solid fa-indian-rupee-sign"></i>
            <input className="number_input" type="number" placeholder="0.0" name="amount" value={row.amount} readOnly />
          </div>
          <div className="col-2 px-0 py-2 text-center">
           <button className="border-0 bg-secondary-subtle" onClick={() => handleDeleteRow(row.id)}> <i className="fa-solid fa-xmark text-brand"></i></button>
          </div>
        </div> </>)
         
        })}
       {tables.map((table, index) => (
        <div className="mb-3" key={index}>
          <div className="row py-3 bg-secondary-subtle d-flex align-items-center overflow-hidden">
            <div className="col-4 border-bottom py-2">
              <input
                className="number_input"
                type="text"
                name="item"
                value={table.item}
                onChange={(e) => handleTableRowChange(index, e)}
                placeholder="Item name"
              />
            </div>
            <div className="col-2 px-0 border-bottom py-2 d-flex align-items-center overflow-hidden">
            <input className="number_input" type="number" placeholder="0" name="qty" value={table.qty} onChange={(e) => handleTableRowChange(index, e)} />
            </div>
            <div className="col-2 px-0 border-bottom py-2 d-flex align-items-center overflow-hidden">
            <i className="fa-solid fa-indian-rupee-sign"></i>
            <input className="number_input" type="number" placeholder="0" name="rate" value={table.rate} onChange={(e) => handleTableRowChange(index, e)}/>
            </div>
            <div className="col-2 px-0 border-bottom py-2 d-flex align-items-center overflow-hidden">
            <i className="fa-solid fa-indian-rupee-sign"></i>
            <input className="number_input" type="number" placeholder="0.0" name="amount" value={table.amount} readOnly />
            </div>
            <div className="col-2 px-0 py-2 text-center">
              {/* ... */}
            </div>
          </div>
        </div>
      ))}
      <button
        className="add_btn universal_text w-100 btn bg-secondary-subtle mt-2 text-center"
        onClick={handleAddRow}
      >
        <i className="fa-solid fa-plus text-brand"></i> Add New Line
      </button>
      <div className="total_amount pt-5">
        <div className="row">
          <div className="col-sm-8"></div>
          <div className="col-sm-4">
            <p className="universal_text">
              <i className="fa-solid fa-tag text-brand"></i> Add
              Discounts/Additional Changes
            </p>
            <p className="mb-0 universal_text">
              <i className="fa-duotone fa-square text-brand"></i> Summarise Total
              Quantity
            </p>
            <div
              className="grand_total my-2 py-2 border-top border-bottom d-flex justify-content-between"
            >
              <span className="">Total(INR)</span><span className=""><i className="fa-solid fa-indian-rupee-sign"></i> <b>{totalAmmount}</b></span>
            </div>
            <p className="universal_text">
              <i className="fa-solid fa-indian-rupee-sign text-brand"></i> Show
              Total In words
            </p>
            <p className="universal_text">
              <i className="fa-solid fa-plus text-brand"></i> Addm More Fields
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ItemTableNeww
