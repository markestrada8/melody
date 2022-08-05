export const generateGrid = () => {
  const grid = [];

  for (let i = 0; i < 16; i++) {
    const column = [
      // 1
      { note: 'C5', isActive: false },
      // 2
      { note: 'B4', isActive: false },
      // 3
      { note: 'A4', isActive: false },
      // 4
      { note: 'G4', isActive: false },
      // 5
      { note: 'F4', isActive: false },
      // 6
      { note: 'E4', isActive: false },
      // 7
      { note: 'D4', isActive: false },
      // 8
      { note: 'C4', isActive: false },
      // 9
      { note: 'B3', isActive: false },
      // 10
      { note: 'A3', isActive: false },
      // 11
      { note: 'G3', isActive: false },
      // 12
      { note: 'F3', isActive: false },
      // 13
      { note: 'E3', isActive: false },
      // 14
      { note: 'D3', isActive: false },
      // 15
      { note: 'C3', isActive: false },
    ];
    grid.push(column);
  }
  return grid;
};