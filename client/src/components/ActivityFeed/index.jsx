export default function ActivityFeed({ workouts, title }) {
    if(!workouts.length){
        return <h3>No Workouts saved</h3>
    }


    return(
        <div>
            <h1 className="text-center">Activity Feed:</h1>
            {workouts && 
            workouts.map((workout) => {
            <div key={workout._id} >
              <div >
                <h4 >
                  {workout.title} <br />
                  <span className="text-white" style={{ fontSize: '1rem' }}>
                
                  </span>
                </h4>

              </div>
            </div>
            })

            }
        </div>
    )
}