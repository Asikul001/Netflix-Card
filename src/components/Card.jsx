import React from "react";

// adding css module
import hold from "../components/card.module.css";

//import styled component library
import styled from "styled-components";





const Card=(props)=>
{
    const {title,genre,release_year,description,rating,netflix_url,free,price,image}=props.send;
    const heding=styled.h1({color:"black"});   {/*defined styled component*/}
    
    const helement={
    color:`${rating>8?"#000000":"#ffffff"}`
    };
  return (
    <>
     <div className="card" >

     <img src={image} width="100%" height="60%"/>   

     {/* inline css  styled componrnt */}
     <div style={{textAlign:"center"}}>
     <heading style={{color:"yellow"}} className="font-stretch-100% font-bold text-2xl [text-shadow:_0_4px_8px_#f7f400]  " >{title}</heading> 
     </div>

     <div className={hold.box}>
     {/*use another component in same file*/}
    {genre.map((send)=> <Catagory key={send} data={send}/>)}
    </div>
     
    <div style={{textAlign:"center",fontSize:"14px"}}>
    <p className="font-serif tracking-tight">
      {description}
    </p>
    </div>
<br/>
    <div  >
    <span style={{fontSize:"20px",padding:"0px",margin:"0px",textAlign:"center"}}>
    <h6 style={helement}>Rating : {rating}</h6>
    <h6 >Price : {price}</h6></span>
    </div>

    <br/>
    <div style={{textAlign:"center"}}>
    <a href={netflix_url} target="_blank">
    <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full">Watch Now</button>
    </a>
    </div>


    </div>
    </>
  )
};
export default Card;

{/* Adding css module */}
const Catagory=({data})=>{
    return(
        
        <h5 className={hold['ch-box']}>{data}</h5> 
    )
};