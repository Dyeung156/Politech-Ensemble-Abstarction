# Cluster Slice 
# Description 
Is the file responsible for the React Redux logi used in the Front End. It is used to store the cluster and its maps that the user is interested in from the Circle Visual. 

The React Redux state has 2 parameters: 
- cluster : the current cluster being displayed (can be null)
- is locked: boolean that determines if the cluster value can be changed or not 

The file includes functions that changes the current cluster (addCluster, wipeCluster) and functions that turns isLocked on or off. 

# Dependencies 
- React Redux 

# Used By 
- [Cluster Button](../Smaller%20Components/Cluster%20Button.MD)
- [Cluster Details Tab](../Tabs/Cluster%20Details%20Tab.MD)
- [Map Details Tab](../Tabs/Map%20Details%20Tab.MD)
- [Tab Collection](../Tabs/Tab%20Collection.MD)