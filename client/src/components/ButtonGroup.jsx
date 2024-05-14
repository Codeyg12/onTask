import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faCheck,
  faCheckDouble,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { TaskContext } from "./TaskContext";
import Modal from "./Modal";

export default function ButtonGroup({ task }) {
  const [deleteModal, setDeleteModal] = useState(false);

  let {
    removeTask,
    updateComplete,
    refetch,
    incompleteRefetch,
    completeRefetch,
    setSelectedOption,
    selectedOption,
  } = useContext(TaskContext);

  const taskDelete = async (e, taskId) => {
    e.preventDefault();

    try {
      await removeTask({
        variables: { taskId },
      });
      await Promise.all([refetch(), completeRefetch(), incompleteRefetch()]);
      await setSelectedOption(selectedOption);
    } catch (err) {
      console.error(err);
    }
  };

  const changeStatus = async (e, taskId) => {
    e.preventDefault();

    try {
      await updateComplete({
        variables: { taskId },
      });
      await Promise.all([refetch(), completeRefetch(), incompleteRefetch()]);
      await setSelectedOption(selectedOption);
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = () => {
    setDeleteModal(true);
  };

  const closeModal = (e, id) => {
    taskDelete(e, id);
    setDeleteModal(false);
  };

  return (
    <>
      {!task.complete ? (
        <button
          className="btn btn-danger"
          onClick={(e) => {
            changeStatus(e, task._id);
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      ) : (
        <div className="btn-group">
          <button
            className="btn btn-success"
            onClick={(e) => {
              changeStatus(e, task._id);
            }}
          >
            <FontAwesomeIcon icon={faArrowRotateLeft} />
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              openModal(task._id);
            }}
          >
            {/* <FontAwesomeIcon icon={faCheckDouble} /> */}
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
      {deleteModal && (
        <Modal
          modalMessage={"Are you sure you want to delete this task?"}
          buttonConfig={[
            {
              label: "Cancel",
              className: "btn-success",
              onClick: () => setDeleteModal(false),
            },
            {
              label: "Confirm",
              className: "btn-danger",
              onClick: (e) => closeModal(e, task._id),
            },
          ]}
        />
      )}
    </>
  );
}
