# Knights Travails
A function that finds the shortest path between any two given squares that a Knight in Chess can take.

Example:

Calling `knightMoves([0, 0], [7, 7])` logs:

- `Reached destination in 6 moves`
- `Shortest path: (0,0) (2,1) (4,2) (6,3) (7,5) (5,6) (7,7) `

## Functionality:
The `knightMoves` function is executed by passing `origin` and `destination` coordinates.

The board is created recursively as an array of coordinates representing each square on a chessboard. The array then gets converted to a string using `JSON.stringify` so that coordinates can be compared to it using `Array.prototype.includes()`.

The `queue` array gets initialized and the `origin` coordinates get enqueued.

Iteration begins with shifting `queue` to set `position` to `queue[0]` and `path` to `queue[1]`. The `position` is pushed to the `visited` array and then  checked against `destination` for equality. If equal, `path` gets pushed to the `paths` array for later length comparison.

Next, all possible next moves from `position` are calculated by adding the  coordinates to each of the possible knight moves: 

    const knight = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
    
Each move gets strigified and compared to the board string to verify that it's a valid square (aka on the board). Once validated, each gets compared to `visited` to check if the squared has been visited before. If it hasn't, `position and `path` get enqueued.

The loop repeats until all possible paths have been added to the `paths` array and the `queue` length is zero. 

After the loop completes, each path in the `paths` array is reformatted by removing all nested sub-arrays and returning a two dimensional array of coordinates. 

Finally, the paths are sorted by length and the shortest is logged to the console.
