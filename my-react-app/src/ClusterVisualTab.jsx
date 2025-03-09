import React from "react";
import { useState, useEffect } from "react";
import ColorTriangle from "./ColorTriangle";
import opportunity_district_data from "./opportunity_district_data.json"


export default function ClusterVisualTab() {
    const data = Object.entries(opportunity_district_data);
    const [curr_map, setMap] = useState(data[0]);
    const [max_values] = useState(data[data.length - 1])

    useEffect(() => {
        // console.log(curr_map[1]);
        // console.log(max_values)
    
    }, [])


    const generateButtons = () => {
        return(
        <>
            {data.map( ([keys, value], index) => (
                <button  key={index} onClick = {() => {setMap(data[index])}}>
                    Values: {keys}
                </button>
            ))}
        </>);
    }


    return (
        <>
            {generateButtons()}
            <div>
                <ColorTriangle map = {curr_map} max = {max_values[1]}/>
            </div>
        </>

    );
}