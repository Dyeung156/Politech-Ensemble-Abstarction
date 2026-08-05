# Cluster Button
# Description 
Is a circular button on the Circle Visual. Each Cluster Button represents a cluster in relation to each cluster feature on the Circle Visual. Users can hover over it to see an overview of the cluister (tab 2) or click on it to see the district map plan in the cluster (tab 3). 

The Cluster Slice is React Redux that stores the selected cluster so a query is not needed every time. 

# Dependencies 
- React 
  - useState
  - useRef
  - useEffect
- Cluster Slice 
  - cluster, 
  - addCluster
  - wipeCluster
  - lockOn
- D3

# Used By 
- Circle Visual