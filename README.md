# My PacMan Game

## Overview
A classic PacMan arcade game implementation using HTML Canvas and JavaScript. The game involves controlling PacMan to collect all dots while avoiding ghosts that use intelligent pathfinding.

## Features
- Classic PacMan gameplay
- Intelligent ghost AI with pathfinding
- Power dots that allow PacMan to eat ghosts
- Score tracking and lives system
- Dynamic difficulty scaling - ghosts become smarter as you collect more dots
- Win and loss conditions with game restart option

## File Structure
/My-PacMan-Game ├── pacman.html # Main HTML file with canvas element ├── src/ │ ├── game.js # Core game loop and initialization │ ├── pacman.js # PacMan character implementation │ ├── ghost.js # Ghost AI and behavior │ ├── map.js # Game map generation and rendering │ └── node.js # Node class for A* pathfinding algorithm └── README.md # Project documentation


## How to Run
1. Clone the repository or download the project files.
2. Open `pacman.html` in a web browser to start the game.

## Controls
- **Arrow Keys**: Move PacMan (Up, Down, Left, Right)
- **Click anywhere** to restart the game after winning or losing

## Game Mechanics
- Collect all dots to win the game
- Avoid ghosts or lose lives when they catch you
- Eat power dots to temporarily turn the tables on ghosts
- The difficulty increases after collecting 120 dots (ghosts become more aggressive)
- Game ends when all dots are collected (win) or when all lives are lost (lose)

## Technologies Used
- HTML5 Canvas
- JavaScript (ES6)
- A* pathfinding algorithm for ghost AI

## Future Improvements
- Add more levels
- Add sound effects and background music
- Implement additional power-ups
- Create mobile-friendly controls

Enjoy the game!
