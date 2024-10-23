import gameData from "../data/gameData.js";
import getGender from "../services/genderizeIO.js";
import getUserMockData from "../services/randomUserGenerator.js";

const gameController = {
  // POST /submit-result
  submitResult: async (req, res) => {
    const { username, success } = req.body;

    if (!username || !success) {
      return res.status(400).json({ message: "Invalid request" });
    }

    if (!gameData[username]) {
      gameData[username] = { score: 0, gender: "undetermined", data: {} };

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

    // Update user score
    gameData[username].score += success ? 1 : 0;

    return res.status(200).json({ message: "Result submitted" });
  },

  // GET /leaderboard
  getLeaderboard: async (req, res) => {
    const leaderboard = Object.entries(gameData)
      .sort((a, b) => b[1].score - a[1].score)
      .map(([username, { score }]) => ({ username, score }));

    return res.status(200).json(leaderboard);
  },
};

export default gameController;
