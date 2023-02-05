// Returns array of coordinates
function coordinates(position = [0, 0], array = []) {
  if (position[1] === 7) {
    // If at end of row
    array.push(position);

    // Base case, if at end of final row
    if (position[0] === 7) return array;

    // Add row
    return coordinates([(position[0] + 1), 0], array);

  } else {
    // Add square to row
    array.push(position);
    return coordinates([position[0], (position[1] + 1)], array);
  }
}

// Get array of all coordinates
const board = coordinates();

// Main function, returns shortest path with amount of moves
function knightMoves(origin, destination) {

  // Returns all possible moves from given position
  function possibleMoves(position) {

    // All possible knight moves
    const knight = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    
    // Possible moves
    const possible = [];

    // Stringify board for comparison
    const coordinateString = JSON.stringify(board);

    knight.forEach((move) => {
      // Get move coordinate and stringify
      const coordinate = [(position[0] + move[0]), (position[1] + move[1])];
      const string = JSON.stringify(coordinate);

      // Check if move is on the board (compare stringified board with coordinate)
      if (coordinateString.includes(string)) {
        possible.push(coordinate);
      }
    });

    return possible;
  }

  // Initialize queue with origin
  let queue = [[origin, origin]];

  // All possible paths
  let paths = [];
  
  // Previously visited squares
  let visited = [];

  while (queue.length > 0) {
    // Set position and path to first in queue coordinate
    let [position, path] = queue.shift();

    // If position is destination, add path to paths array
    if (position[0] === destination[0] && position[1] === destination[1]) {
      paths.push(path);
    }

    // Add position to visited, stringify visited for comparison
    visited.push(position);
    const visitedStr = JSON.stringify(visited);

    // Get next possible moves
    const moves = [...possibleMoves(position)]

    // If square not was previously visited, queue move and add to path
    for (const move of moves) {
      // Stringify for comparison
      const moveStr = JSON.stringify(move);
      if (!visitedStr.includes(moveStr)) {
        queue.push([move, [path, move]]);
      }
    }
  }

  // Converts nested arrays into a single array
  function reformatPaths(path, position = path, array = []) {

    // Base case, find "bottom" of nested arrays
    if (!Array.isArray(position[0])) {
      array.push(position);
      return array;

    // Push second element in each sub-array
    } else {
      reformatPaths(path, position[0], array);
      array.push(position[1]);
      return array;
    }
  }

  // Get unnested paths
  const readablePaths = [];
  paths.forEach((element) => {
    readablePaths.push(reformatPaths(element));
  });

  // Sort paths, shortest first
  readablePaths.sort((a, b) => a.length < b.length ? -1 : 1)

  // Log moves
  if (readablePaths[0].length === 2) {
    console.log(`Reached destination in ${readablePaths[0].length - 1} move`);
  } else {
    console.log(`Reached destination in ${readablePaths[0].length - 1} moves`);
  }

  // Create string of full path
  let string = '';
  readablePaths[0].forEach(move => {
    string += `(${move}) `;
  });

  // Log shortest path string
  console.log(`Shortest path: ${string}`);
}
