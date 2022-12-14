const { TodoRepository, TodoMapper } = require("../repositories")

class TodoController{
    static getTodos(_, resp){
        TodoRepository.getAllTodos()
            .then(data => resp.json(TodoMapper.asListResponse(data)))
            .catch(error => resp.json(error))
    }
    static create(req, resp){
        const { task, status } = req.body
        if(!task || !status) {
            resp.json(TodoMapper.asMessage("invalid form input"))
            return
        }
        TodoRepository.addTodo(TodoMapper.asRequest(req.body))
            .then(data => resp.json(data))
            .catch(error => resp.json(error))
    }
    static getTodo = (req, resp) => {
        const { todoId } = req.params
        if(isNaN(todoId)) {
            resp.json(TodoMapper.asMessage(`todoId must be a number`))
            return
        }
        TodoRepository.getTodo(todoId)
            .then(data => resp.json(TodoMapper.asResponse(data)))
            .catch(() => resp.json(TodoMapper.asMessage(`todoId ${todoId} was not found`)))
    }
    static async update(req, resp){
        const { id } = req.query
        const { task, status } = req.body
        if(!task || !status) {
            resp.json(TodoMapper.asMessage("invalid form input"))
            return
        }
        const todo = await TodoRepository.getTodo(id)
        if(!todo){
            resp.json(TodoMapper.asMessage(`todoId ${id} was not found`))
            return
        }
        req.body.id = id
        req.body.createdAt = todo.createdAt

        TodoRepository.putTodo(TodoMapper.asRequest(req.body))
            .then(([state]) => {
                const text = state === 1 
                    ? `id ${id} has been updated` 
                    : `couldn\'t update ${id}`

                resp.json(TodoMapper.asMessage(text))
            })
            .catch(error => resp.json(TodoMapper.asMessage(error.message)))
    }
    static async delete(req, resp){
        const { todoId } = req.params
        if(isNaN(todoId)) {
            resp.json(TodoMapper.asMessage(`todoId must be a number`))
            return
        }
        const todo = await TodoRepository.getTodo(todoId)
        if(!todo){
            resp.json(TodoMapper.asMessage(`todoId ${todoId} was not found`))
            return
        }
        TodoRepository.delTodo(todoId)
            .then(state => {
                const text = state === 1 
                    ? `id ${todoId} has been deleted`
                    : `couldn\'t delete ${todoId}`
                resp.json(TodoMapper.asMessage(text))
            })
            .catch(error => resp.json(TodoMapper.asMessage(error.message)))
    }
}
module.exports = TodoController