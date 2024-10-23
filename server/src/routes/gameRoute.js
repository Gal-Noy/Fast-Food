import express from 'express'
import gameController from '../controllers/gameController.js'

const gameRouter = express.Router()

gameRouter.post("/submit-result", gameController.submitResult)

gameRouter.get("/leaderboard", gameController.getLeaderboard)

export default gameRouter