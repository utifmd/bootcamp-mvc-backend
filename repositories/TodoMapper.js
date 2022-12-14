const { TodoModel, MessageModel } = require("../models");

class TodoMapper {
    static asResponse(response){
        let { id, task, status, createdAt, updatedAt } = response
        return new TodoModel(id, task, status, createdAt, updatedAt)
    }
    static asListResponse(response){
        return response.map(todo => this.asResponse(todo))
    }
    static asRequest(request){
        const { id, task, status, createdAt } = request
        return new TodoModel(id || null, task, status, createdAt || null)
    }
    static asMessage(text){
        return new MessageModel(text)
    }
}
module.exports = TodoMapper