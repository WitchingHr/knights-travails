# Knights Travails
A function that finds the shortest path between any two given squares that a Knight in Chess can take.

Example:
Calling `knightMoves([0, 0], [7, 7])` logs:

- `Reached destination in 6 moves`
- `Shortest path: (0,0) (2,1) (4,2) (6,3) (7,5) (5,6) (7,7) `

## Functionality:
The `knightMoves` function is executed by passing `origin` and `destination` coordinates.

The board is created recursively as an array of coordinates representing each square on a chessboard. The array then gets converted to a string using `JSON.stringify`. 

The `queue` array gets initialized with the `origin` coordinates that gets passed to the function. 

Iteration begins with shifting `queue` to set `position` to `queue[0]` and `path` to `queue[1]`. The `position` is checked against `destination` for equality. If equal, the `path` is pushed to the `paths` array for later comparison to subsequent paths. `position` is pushed to the `visited` array.

Next, all possible next moves from `position` are calculated by adding the  coordinates to each of the possible knight moves: 

    const knight = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    
Each move gets compared to the board string to verify that it's a valid square (aka on the board). Once validated, each gets compared to `visited` to check if the squared has been visited before. If it hasn't it gets added to `path` pushed to the `queue`. 

The loop repeats until all possible paths have been added to the `paths` array and the `queue` length is zero. 

Lastly, each path is reformatted by removing all nested sub-arrays and returning a array of coordinates. The paths are sorted by length and the shortest is logged to the console.
