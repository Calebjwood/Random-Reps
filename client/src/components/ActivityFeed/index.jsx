import { Link } from 'react-router-dom';


export default function ActivityFeed({ workouts, title }) {
    if(!workouts.length){
        return <h3>No Workouts saved</h3>
    }
    console.log(workouts);

    return(
        <div>
            <h1 className="text-center">{title}</h1>
            {workouts.map((workout) => (
            <div key={workout._id} >
                <h3>{workout.title}</h3>
                {workout.exercises.map((exercises) => (
                <h5>{exercises.title} <br />
                    {exercises.sets} <br />
                    {exercises.reps} <br />
                    {exercises.rest} <br />
                    {exercises.time} <br />
                  </h5>
                )
                )}
            <Link>start workout</Link>
            </div>
            ))

            }
        </div>
    )
}