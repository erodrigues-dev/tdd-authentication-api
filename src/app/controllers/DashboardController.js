class DashboardController {
    check(req, res) {
        return res.sendStatus(200)
    }
}

module.exports = new DashboardController()