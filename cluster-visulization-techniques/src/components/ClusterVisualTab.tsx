import ColorTriangle from "./ColorTriangle";

export default function ClusterVisualTab() {
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