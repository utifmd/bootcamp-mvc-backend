const router = require("express").Router()
const todoRoutes = require("./todoRoutes")

router.get("/", (req, resp) => {
    resp.send("EXPRESS REST API")
})
router.use("/todos", todoRoutes)

module.exports = router