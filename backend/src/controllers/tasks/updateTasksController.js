import jsonResponse from "../../helpers/jsonResponse";
import Tasks from "../../mongoose/models/TasksModel";

const udpateTaskController = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const query = {
      userId: user.id,
      _id: id,
    };

    const response = await Tasks.updateOne(query, req.body, {
      new: true,
    });
    if (!response || response?.modifiedCount <= 0)
      return jsonResponse(res, 400, "Unable to update task");

    return jsonResponse(res, 200, null, null, response);
  } catch (err) {
    return jsonResponse(res, 400, "Error updating task");
  }
};
export default udpateTaskController;
