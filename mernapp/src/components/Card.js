import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.foodOptions;
  let priceopt = Object.keys(options || {});
  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");
  const handleAddToCart = async () =>{
    let food = []
    for (const item of data){
      if(item.id === props.foodItem._id){
        food = item
        break;
      }
    }
    if(food != []){
      if(food.size === size){
        await dispatch({type: "UPDATE",id: props.foodItem._id,price:finalPrice,qty:qty});
        return
      }
      else if(food.size !== size){
        await dispatch({type:"ADD",id: props.foodItem._id,name:props.foodItem.name,price: finalPrice,qty:qty,size:size});
        return
      }
      return
    }
    await dispatch({type:"ADD",id: props.foodItem._id,name:props.foodItem.name,price: finalPrice,qty:qty,size:size});
  }
  let finalPrice = qty*parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
        <div className="card mt-4" style={{ width: "18rem", maxHeight: "400px" }}>
          <img className="card-img-top" src={props.foodItem.img} alt="Card image cap" style={{height:"150px",maxWidth:"100%"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">{props.foodItem.description}</p>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(10), (err, res) => {
                  return (
                    <option key={res + 1} value={res + 1}>
                      {res + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceopt.map((data)=> {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className='d-inline h-100'>
                ₹{finalPrice}/-
              </div>
            </div>
            <hr />
            <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
    </div>
  )
}
