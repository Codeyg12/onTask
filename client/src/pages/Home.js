import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_PROJECTS } from "../utils/queries";
import Auth from "../utils/auth";

const Home = () => {
  const { loading, data } = useQuery(USER_PROJECTS);
  const userArr = data?.userProjects || [];


  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 mx-3">
        <div className="card container-fluid border text-center shadow p-2">
          <div className="card-header d-flex align-items-center justify-content-between">
            {Auth.loggedIn() && (
              <div className="d-flex align-items-center">
                <div className="title-part">
                  <p className="mb-0 font-weight-bold card-title">
                    Hello {Auth.getProfile()?.data?.username}
                  </p>
                </div>
              </div>
            )}
            <div className="title-part">
              <h1 className="card-title mb-0 font-weight-bold">
                Welcome to OnTask!
              </h1>
            </div>

            {Auth.loggedIn() && (
              <button className="btn bg-dark text-white" onClick={Auth.logout}>
                Logout
              </button>
            )}
          </div>
          <div className="card-body my-4">
            {!Auth.loggedIn() ? (
              <>
                <h2 className="mb-5">
                  Create an account or sign in to view projects
                </h2>
                <Link className="mx-4" to="/login">
                  <button className="btn btn-lg btn-dark">Login</button>
                </Link>
                <Link className="mx-4" to="/signup">
                  <button className="btn btn-lg btn-dark">Signup</button>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

// {
{
  /* <div className="card-body text-center m-3">
  {!Auth.loggedIn() ? (
    <>
    </>
  ) : (
    <>
      <div className="card-body p-5">
        <div className="text-center">
          {userArr.map((project) => {
            return (
              <p
                className={
                  userArr.length < 10 ? "projectList" : "projectLongList"
                }
                key={project._id}
              >
                <Link to={`/project/${project._id}`}>
                  {project.title}
                </Link>
              </p>
            );
          })}
        </div>
      </div>
      <h2 className="mt-4">Project List</h2>
      <Link to="/project">
        <button className="btn btn-dark">Add Project</button>
      </Link>
    </>
  )}
</div>
</div>  */
}
// }
