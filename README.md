# Fast-Food

## Project Structure

- `server/` - The backend API (Node.js)
- `client/` - The frontend game interface (React with Vite)
  
## Instructions to Play

### 1. Clone The Repository
1. Open a terminal and clone the repository:

   ```bash
   git clone https://github.com/Gal-Noy/Fast-Food.git

2. Navigate to the root folder:

   ```bash
   cd Fast-Food
   
### 2. Install Dependencies
- Install dependencies for both `server` and `client`:
   
   ```bash
   cd server
   npm install
   cd ../client
   npm install

### 3. Set Up Environment Variables
1. In the `client` folder, create a `.env` file.
2. Add the following variable to the `.env` file:
   
   ```bash
   VITE_SERVER_URL=http://localhost:3000

### 4. Run the Application
1. Start the server:
   
   ```bash
   cd ../server
   npm run dev
   
1. Start the client:
   
   ```bash
   cd ../client
   npm run dev

### 5. Play the Game
- Open your browser and go to http://localhost:5173 to start playing!

### 6. Test Leaderboard
- You can test the leaderboard by sending a GET request to the `/leaderboard` endpoint. This will return a list of user names sorted by their scores in descending order.

