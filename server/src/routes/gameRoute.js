import express from 'express'
import gameController from '../controllers/gameController.js'

const gameRouter = express.Router()

gameRouter.post("/submit-score", gameController.submitScore)

gameRouter.get("/leaderboard", gameController.getLeaderboard)

export default gameRouter