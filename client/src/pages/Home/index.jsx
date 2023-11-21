import './style.scss';
import { Link } from 'react-router-dom';


export default function Home() {

 
  
  return (
    <div id="home-page">
      <div className="card-footer text-center m-3">
        <h2>Find your next workout!</h2>
        <Link to="/settings">
          <button className="btn btn-lg btn-danger">Generate Workout</button>
        </Link>
      </div>
    </div>
  );
}


