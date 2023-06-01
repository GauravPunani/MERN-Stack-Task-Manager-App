import jsonResponse from "../../helpers/jsonResponse";
import Tasks from "../../mongoose/models/TasksModel"

const getTaskByIdController = async (req, res, next) => {
    try {
        const {user} = req
        const {id} = req.params

        const query = {
            userId: user.id,
            id
        }

        const task = await Tasks.findOne(query)
        if (!task) return jsonResponse(res, 404, "Task not found")

        return jsonResponse(res, 200, null, null, task)
    } catch (err) {
        return jsonResponse(res, 500, 'Error retrieving task')
    }
}
export default getTaskByIdController