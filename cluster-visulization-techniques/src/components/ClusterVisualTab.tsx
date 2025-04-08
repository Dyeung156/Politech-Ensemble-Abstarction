import ClusterDetails from "./ClusterDetails";
import ClusterDetailsTab from "./ClusterDetailsTab";
import ColorTriangle from "./ColorTriangle";

export default function ClusterVisualTab() {
    return (
        <>
            <div>
                <ColorTriangle />
                {/* <ColorWheel /> */}
                <ClusterDetailsTab/>
            </div>
        </>

    );
}