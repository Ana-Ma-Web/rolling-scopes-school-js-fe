let data = localStorage.getItem("minesweeper-data")
  ? localStorage.getItem("minesweeper-data")
  : {
      minesCurNumber: 10,
      minesInGameNumber: 10,
      fieldSize: "easy 10x10",
      isCellClicked: false,
      fieldArray: [],
      isSoundOn: true,
      isDarkTheme: false,
      timeStart: 0,
      timeEnd: 0,
      clicks: 0,
      latestResults: [
        {
          timeStart: 41234244,
          timeEnd: 51254244,
          clicks: 100,
        },
        {
          timeStart: 51234244,
          timeEnd: 51256744,
          clicks: 50,
        },
      ],
    };

export default data;
