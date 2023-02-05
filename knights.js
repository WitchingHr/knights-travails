// Creates board
function coordinates(position = [0, 0], array = []) {
  // If row is full
  if (position[1] === 7) {
    array.push(position);

    // Base case
    if (position[0] === 7) return array;

    // Add row
    return coordinates([(position[0] + 1), 0], array);
  } else {

    // Fill row
    array.push(position);
    return coordinates([position[0], (position[1] + 1)], array);
  }
}

// Get array of all coordinates
const board = coordinates();

// Main knight function
function knightMoves(origin, destination) {

  function possibleMoves(position) {
    // All possible knight moves
    const knight = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    
    // Possible moves
    const possible = [];

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
    // Set position and path
    let [position, path] = queue.shift();

    // If position is destination
    if (position[0] === destination[0] && position[1] === destination[1]) {

      // Add path to paths
      paths.push(path);
    }

    // Add position to visited, stringify visited for comparison
    visited.push(position);
    const visitedStr = JSON.stringify(visited);

    // Get next moves
    const moves = [...possibleMoves(position)]

    for (const move of moves) {
      const moveStr = JSON.stringify(move);

      // If haven't square hasn't been visited
      if (!visitedStr.includes(moveStr)) {

        // Add move to queue and path
        queue.push([move, [path, move]]);
      }
    }
  }

  // Converts nested arrays into a single array
  function reformatPaths(path, position = path, array = []) {

    // Base case
    if (!Array.isArray(position[0])) {
      array.push(position[1]);
      return array;

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
  console.log(`Reached destination in ${readablePaths[0].length - 1} move(s)`);

  // Create string of full path
  let string = '';
  readablePaths[0].forEach(array => {
    string += `(${array}) `
  });

  // Log shortest path string
  console.log(`Shortest path: ${string}`);
}
