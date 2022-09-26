import { useLocation } from "react-router";
import NavBar from "./navBar";

function NewsDetailsPage({ news }) {
  const location = useLocation();  

  return <div>
    <NavBar/>
    {JSON.stringify(location.state)}
  </div>;
}

export default NewsDetailsPage;
