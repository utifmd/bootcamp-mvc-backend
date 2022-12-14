const router = require("express").Router()
const { TodoController } = require("../controllers")

router.get("/", TodoController.getTodos)
router.get("/:todoId", TodoController.getTodo)
router.post("/create", TodoController.create)
router.put("/update", TodoController.update)
router.delete("/delete/:todoId", TodoController.delete)

module.exports = router