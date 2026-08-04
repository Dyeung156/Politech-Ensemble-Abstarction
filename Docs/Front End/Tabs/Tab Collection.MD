# Tab Collection 
# Description 
This component is essentially the router that decides which tabs appear on screen. It holds all the tabs and uses resizeable panels to allow for users to change the width of each tab.

It uses the Cluster Slice to determine which clusters / maps to display. The locking mechanism (lockOff) is to allow tab 3 to stay on the screen even after the user moves their mouse off of the cluster in Circle Visual. 

# Dependencies 
- React Resizeable Panels (needs updating) 
  - Panel
  - PanelGroup
  - PanelResizeHandle
- Cluster Visual Tab
- Cluster Details Tab
- Map Details Tab
- Cluster Slice (React Redux)
  - wipeCluster
  - lockOff

# Used By 
- App
