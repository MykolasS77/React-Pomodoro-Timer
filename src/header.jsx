import React, {useState} from 'react';
import { GiTomato } from "react-icons/gi";

function HeaderFunc(props){
    

    return (<header><h1 className='title'>{props.text} <GiTomato className="icon"/> </h1></header>)
}

export default HeaderFunc