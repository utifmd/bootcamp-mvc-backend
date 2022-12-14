class TodoModel{
    constructor(id, task, status, createdAt, updatedAt){
        this.id = id || null
        this.task = task
        this.status = status
        this.createdAt = createdAt || null
        this.updatedAt = updatedAt || null
    }
}
module.exports = TodoModel