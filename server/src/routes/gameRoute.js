import express from 'express'
import gameController from '../controllers/gameController.js'

const gameRouter = express.Router()

gameRouter.post("/start-game", gameController.startGame)
gameRouter.post("/inc-score", gameController.incScore)
gameRouter.get("/leaderboard", gameController.getLeaderboard)

export default gameRouter