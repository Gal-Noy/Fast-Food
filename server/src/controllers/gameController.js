import gameData from "../data/gameData.js";
import getGender from "../services/genderizeIO.js";
import getUserMockData from "../services/randomUserGenerator.js";

const gameController = {
  // POST /start-game
  startGame: async (req, res) => {
    const { username } = req.body;

    // Validate request
    if (!username) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Validate username
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({ message: "Invalid username, must be between 3 and 20 characters" });
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return res.status(400).json({ message: "Invalid username, must contain only letters and numbers" });
    }

    // Check if user already exists, if not create new user
    if (!gameData[username]) {
      gameData[username] = { username, score: 0, gender: "undetermined", data: {} };

      // Enrich user data
      try {
        // Get gender
        const gender = await getGender(username);
        gameData[username].gender = gender;

        if (gender !== "undetermined") {
          // Get data by gender
          const userData = await getUserMockData(gender);
          gameData[username].data = userData;
        }
      } catch (error) {
        return res.status(500).json({ message: "Failed to enrich user data" });
      }
    }

    return res.status(201).json(gameData[username]);
  },

  // POST /inc-score
  incScore: async (req, res) => {
    const { username } = req.body;

    // Validate request
    if (!username) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Increment user score
    gameData[username].score++;

    return res.status(200).json(gameData[username]);
  },

  // GET /leaderboard
  getLeaderboard: async (req, res) => {
    const leaderboard = Object.values(gameData)
      .sort((a, b) => b.score - a.score)
      .map((user) => ({ username: user.username, score: user.score }));

    return res.status(200).json(leaderboard);
  },
};

export default gameController;
