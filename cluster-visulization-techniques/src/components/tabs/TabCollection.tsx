import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ClusterVisualTab from "@/components/tabs/ClusterVisualTab";
import ClusterDetailsTab from "./ClusterDetailsTab";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/index";
import MapDetailsTab from "./MapDetailsTab";

import {useDispatch } from "react-redux"
import {wipeCluster, lockOff} from "@/redux/clusterSlice"

export default function TabCollection() {
    const lock: boolean = useSelector((state: RootState) => state.clusters.isLocked);

    const dispatch = useDispatch();
    const deleteButton = () =>
    {
        dispatch(lockOff());
        dispatch(wipeCluster());
    }

    return (
        <PanelGroup direction="horizontal" >
            <Panel defaultSize={50} minSize={20} maxSize={80} className="bg-gray-300 w-3/4 p-4 overflow-y-auto outline-black">
                <h2 className="text-lg font-semibold mb-4 text-center">Cluster Visualization</h2>
                <div className="flex flex-col space-y-2">
                   <ClusterVisualTab/>
                </div>
            </Panel>

            <PanelResizeHandle className = "outline-black w-1"/>

            <Panel className="bg-gray-300 w-3/4 p-4 overflow-y-auto">
                {!lock ?
                    (<>
                        <h2 className="text-lg font-semibold mb-4 text-center">Cluster Details</h2>
                        <ClusterDetailsTab/> 
                    </>)
                    : 
                    (<>
                        <div className="flex items-center justify-center gap-4">
                            <h2 className="text-lg font-semibold ">District Map Details</h2>
                            <button className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                                onClick={deleteButton}>
                                X
                            </button>
                        </div>
                        
                        <MapDetailsTab/>
                    </>)
                }
            </Panel> 
        </PanelGroup>
    );
}