import ValueTable from "@/components/ValueTable";

interface AccordionValues {
    clusterType: string
    mapTuple: string
    mapIndices: number[]
}
export default function ClusterDetails({ clusterType, mapTuple, mapIndices }: AccordionValues) {
    const detailTitle = `${clusterType}: ${mapTuple}`

    return (
        <div>
            {/* Table showing cluster values */}
            <ValueTable clusterType = {clusterType} mapValue = {mapTuple}/>
            <h2 className="text-center text-lg font-semibold mt-4 mb-2">{detailTitle}</h2>
        </div>
            
    )
}