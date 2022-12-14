const fs = require("fs")
const { todo } = require("../models")
const TodoMapper = require("./TodoMapper")

class TodoRepository {
    static getAllTodos = async () => 
        await todo.findAll()
    
    static addTodo = async (request) => 
        await todo.create(request)

    static getTodo = async (todoId) =>
        await todo.findByPk(todoId) 
    
    static putTodo = async (request) =>
        await todo.update(request, { where: { id: request.id }})

    static delTodo = async (todoId) => 
        await todo.destroy({ where: { id: todoId }})
        
    /*new Promise((resolve, reject) => {
        todo.destroy({ where: { id: todoId }})
            .then(state => {
                console.log(state)
                console.log(typeof state)
                resolve(true)
            })
            .catch(error => reject(error.message))
    })*/
        
    /*todo.findAll({ where: { id: todoId } })*/
    /*
    static getAllTodos = () => new Promise((resolve, reject) => {
         fs.readFile("./data.json", "utf-8", (error, data) => {
             if(error){
                 reject(error.message)
                 return
             }
             const todo = JSON
                 .parse(data)
                 .map(response => TodoMapper.asModel(response))
                 
             resolve(todo)
         })
     })
    */ 
}
module.exports = TodoRepository