const sudokuContainer = document.getElementById('sudoku-container');

// Initialize a sample Sudoku puzzle (0 represents empty cells)
let sudokuGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],n
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Generate the Sudoku grid on the webpage
function generateGrid() {
    sudokuContainer.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.type = 'number';
            cell.min = 1;
            cell.max = 9;
            cell.value = sudokuGrid[row][col] === 0 ? '' : sudokuGrid[row][col];
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.oninput = updateGrid;
            cell.onblur = validateCell;
            if (sudokuGrid[row][col] !== 0) {
                cell.disabled = true;
                cell.style.color = '#333'; // Fixed numbers are in darker color
            }
            sudokuContainer.appendChild(cell);
        }
    }
}

// Update the grid with user input
function updateGrid(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    sudokuGrid[row][col] = event.target.value === '' ? 0 : parseInt(event.target.value);
    validateCell(event.target);
}

// Validate cell value
function validateCell(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;
    const value = parseInt(event.target.value);
    if (!isValid(sudokuGrid, row, col, value)) {
        event.target.classList.add('invalid');
    } else {
        event.target.classList.remove('valid');
    }
}

// Solve the Sudoku puzzle
function solveSudoku() {
    if (solve(sudokuGrid)) {
        alert('Sudoku solved!');
        generateGrid();
    } else {
        alert('No solution found.');
    }
}

// Helper function to check if a number can be placed at the given position
function isValid(grid, row, col, num) {
    if (num < 1 || num > 9) return false;
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num && x !== col) return false;
        if (grid[x][col] === num && x !== row) return false;
        const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);
        if (grid[startRow + Math.floor(x / 3)][startCol + (x % 3)] === num &&
            (startRow + Math.floor(x / 3) !== row || startCol + (x % 3) !== col)) return false;
    }
    return true;
}

// Solve the Sudoku using backtracking
function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solve(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Generate the initial Sudoku grid
generateGrid();
