import jsonResponse from "../../helpers/jsonResponse";
import Tasks from "../../mongoose/models/TasksModel";

const createTaskController = async (req, res, next) => {
    try {
        const { user } = req
        const task = new Tasks({
            ...req.body,
            userId: user.id
        });
        await task.save();
        return jsonResponse(res, 201, null, null, task)

    } catch (err) {
        return jsonResponse(res, 400, 'error creating task',)
    }
}
export default createTaskController