import Piece from "./Piece";

export default class Bishop extends Piece {
  constructor(player){
    super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
  }

  isMovePossible(src, dest){
    const [x1, y1] = this.convertToXY(src);
    const [x2, y2] = this.convertToXY(dest);
    let legality = Math.abs(x2 - x1) == Math.abs(y2 - y1);
    return (Math.abs(src - dest) % 10 === 0 || Math.abs(src - dest) % 8 === 0) && legality;
  }

  getSrcToDestPath(src, dest){
    let path = [], pathStart, pathEnd, incrementBy;
    if(src > dest){
      pathStart = dest;
      pathEnd = src;
    }
    else{
      pathStart = src;
      pathEnd = dest;
    }
    if(Math.abs(src - dest) % 10 === 0){
      incrementBy = 10;
      pathStart += 10;
    }
    else{
      incrementBy = 8;
      pathStart += 8;
    }

    for(let i = pathStart; i < pathEnd; i+=incrementBy){
      path.push(i);
    }
    console.log(path);
    return path;
  }
}