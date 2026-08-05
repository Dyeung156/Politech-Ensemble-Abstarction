# Circle Visual 
# Description 
Is a circle that places each cluster in relation to the cluster features. Users can see at a glance where each cluster measures based on their placement to the anchor points. 

For example, a cluster that has high Opportunity Districts will go higher in the circle to be closer to anchor point for max Opportunity Districts. Another cluster with a low Median Margin of Victory will go lower towards the min anchor point for it. 

The placement of each cluster will be determined by the average of its values in each cluster feature, which was already computed by the Back End. This component uses hard-coded values from a JSON file to place each cluster. 

# Dependencies 
- Cluster Button 
- Anchor Point
- React 
  - useEffect
  - useRef
- D3

# Used By 
- Cluster Visual Tab