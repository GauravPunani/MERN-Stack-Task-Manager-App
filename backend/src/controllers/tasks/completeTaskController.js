import jsonResponse from "../../helpers/jsonResponse"
import Tasks from "../../mongoose/models/TasksModel"

const completeTaskController = async (req, res, next) => {

    try {

        const { user } = req
        console.log(user)
        const { id } = req.params
        console.log(id)
        const task = await Tasks.findOne({
            _id: id,
            userId: user.id
        })
        if (!task) return jsonResponse(res, 400, 'Task not found')
        console.log(task)
        task.completed = true
        await task.save()

        return jsonResponse(res, 200, 'Task completed successfully')
    } catch (error) {
        console.log(error)
        return jsonResponse(res, 500, 'something went wrong, please try again')
    }
}
export default completeTaskController