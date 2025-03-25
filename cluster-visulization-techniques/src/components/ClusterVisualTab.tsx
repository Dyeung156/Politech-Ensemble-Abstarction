import { useEffect } from "react";
import ColorTriangle from "./ColorTriangle";

export default function ClusterVisualTab() {
    useEffect(() => {
        // console.log(curr_map[1]);
        // console.log(max_values)

    }, [])


    // const generateButtons = () => {
    //     return(
    //     <>
    //         {data.map( ([keys, value], index) => (
    //             <button  key={index} onClick = {() => {setMap(data[index])}}>
    //                 Values: {keys}
    //             </button>
    //         ))}
    //     </>);
    // }


    return (
        <>
            <div>
                <ColorTriangle />
                {/* <ColorWheel /> */}
            </div>
        </>

    );
}