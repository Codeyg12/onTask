import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../utils/mutations";
import { HomeButton, ProjectForm } from "../components";

const Project = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
  });

  const [addProject] = useMutation(ADD_PROJECT);

  return (
    <>
      <HomeButton />
      <ProjectForm
        title="Add New Project"
        handleSub={addProject}
        project={project}
        setProject={setProject}
      />
    </>
  );
};

export default Project;
