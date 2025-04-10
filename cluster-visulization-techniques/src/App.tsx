import { Provider } from "react-redux";
import {store} from "@/redux/index"
import TabCollection from "@/components/tabs/TabCollection";

export default function App() {
  return (
    <Provider store = {store}>
      <div className="bg-gray-400 min-h-screen flex items-center justify-center">
        <TabCollection/>
      </div>

      
    </Provider>
  )
}
