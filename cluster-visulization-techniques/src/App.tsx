import ClusterVisualTab from "@/components/ClusterVisualTab";
import { Provider } from "react-redux";
import {store} from "@/redux/index"

export default function App() {
  return (
    <Provider store = {store}>
      <div className="bg-gray-400 min-h-screen flex items-center justify-center">
        <ClusterVisualTab/>
      </div>
    </Provider>
  )
}
