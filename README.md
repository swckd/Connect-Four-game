# Connect Four
![Connect Four Gameplay](connect-4.gif)
## Overview
This project is a web-based implementation of the Connect Four game, utilizing HTML, CSS, and JavaScript, with responsive design facilitated by Bootstrap.

## Structure
The project's structure is primarily divided into three main files:

### index.html
This file contains the HTML structure of the game, including:
- Initial menu with options for "Player vs Player" and "Game Rules"
- Game board
- Player score indicators
- Modals for game rules and pause functionality

### app.js
The main JavaScript file contains the game logic, organized into several sections:
- Game setup functions (e.g., `setGame`, `setBoard`)
- Game logic functions (e.g., `switchTurn`, `checkWinner`)
- UI update functions (e.g., `printScore`, `printWinner`)
- Game reset functions (e.g., `resetGame`, `restartGame`)
- Timer functions (e.g., `setTimer`, `pauseTimer`)

### assets/styles/styles.css
This CSS file includes styles for various elements of the game, such as:
- Game board
- Player indicators
- Modals
- Animations

## Gameplay
The game board is constructed using a grid layout, and the game logic includes functions to:
- Check for a "connect four" condition
- Switch turns between players
- Determine if the board is full

Additionally, a timer is implemented for each player's turn, which can be paused and resumed as needed.
