import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ClusterVisualTab from "@/components/tabs/ClusterVisualTab";
import ClusterDetailsTab from "./ClusterDetailsTab";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/index";
import MapDetailsTab from "./MapDetailsTab";

export default function TabCollection() {
    const clusters = useSelector((state: RootState) => state.clusters.clusters);
    const maps = useSelector((state: RootState) => state.mapIndices.mapIndices);

    return (
        <PanelGroup direction="horizontal" >
            <Panel defaultSize={50} minSize={20} maxSize={80} className="bg-gray-300 w-3/4 p-4 overflow-y-auto outline-black">
                <h2 className="text-lg font-semibold mb-4 text-center">Cluster Visualization</h2>
                <div className="flex flex-col space-y-2">
                   <ClusterVisualTab/>
                </div>
            </Panel>

            <PanelResizeHandle className = "outline-black w-1"/>

           {clusters.length && <Panel className="bg-gray-300 w-3/4 p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4 text-center">Cluster Details</h2>
                <ClusterDetailsTab/>
            </Panel>}

            <PanelResizeHandle className = "outline-black w-1"/>

            {maps.length && <Panel className="bg-gray-300 w-3/4 p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4 text-center">Map Indices</h2>
                <MapDetailsTab/>
            </Panel> }
        </PanelGroup>
    );
}