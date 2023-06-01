import jsonResponse from "../../helpers/jsonResponse";
import Tasks from "../../mongoose/models/TasksModel";

const getTasksController = async (req, res, next) => {
  try {
    const { user } = req;
    const { q: searchText, limit = 10, offset = 0 } = req.query;

    const query = {
      userId: user.id,
    };

    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ];
    }

    const totalTasks = await Tasks.count(query);

    const tasks = await Tasks.find(query)
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    return jsonResponse(res, 200, null, null, {
      tasks,
      limit,
      offset,
      totalRecords: totalTasks,
    });
  } catch (err) {
    console.log(err);
    return jsonResponse(res, 500, "error retrieving tasks");
  }
};
export default getTasksController;
