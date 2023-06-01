import Tasks from "../../mongoose/models/TasksModel";
import jsonResponse from "../../helpers/jsonResponse";

const deleteTaskController = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const query = {
      userId: user.id,
      _id: id,
    };

    const task = await Tasks.deleteOne(query);

    if (!task) return jsonResponse(res, 404, "Task not found");

    return jsonResponse(res, 200, "Task deleted successfully");
  } catch (err) {
    jsonResponse(res, 500, "Error deleting task");
  }
};
export default deleteTaskController;
