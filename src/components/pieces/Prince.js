import Piece from "./Piece";

const url = `C:/Users/user/WebstormProjects/MyFront/src/img/logo.jpg`
const path = 'D:/Downloads/photo_2023-05-21_14-20-01.svg'
const old = "https://upload.wikimedia.org/wikipedia/commons/b/b0/%D0%A4%D0%B8%D0%B3%D1%83%D1%80%D0%B0_%D0%BA%D0%BD%D1%8F%D0%B6%D0%B8%D1%87%D0%B0_%D0%B2_%D0%B8%D0%B3%D1%80%D0%B5_%D0%91%D0%B5%D0%BB%D0%BE%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B5_%D1%88%D0%B0%D1%85%D0%BC%D0%B0%D1%82%D1%8B_%D0%B4%D0%BB%D1%8F_Windows.png"

export default class Prince extends Piece {
    constructor(player) {
        super(
            player, player === 1
                ? old
                : "https://upload.wikimedia.org/wikipedia/commons/b/b0/%D0%A4%D0%B8%D0%B3%D1%83%D1%80%D0%B0_%D0%BA%D0%BD%D1%8F%D0%B6%D0%B8%D1%87%D0%B0_%D0%B2_%D0%B8%D0%B3%D1%80%D0%B5_%D0%91%D0%B5%D0%BB%D0%BE%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B5_%D1%88%D0%B0%D1%85%D0%BC%D0%B0%D1%82%D1%8B_%D0%B4%D0%BB%D1%8F_Windows.png"
        );
    }

    getSrcToDestPath(src, dest) {
        return [];
    }

  isMovePossible(src, dest) {
    const [x1, y1] = this.convertToXY(src);
    const [x2, y2] = this.convertToXY(dest);
    let legality = Math.abs(x2 - x1) + Math.abs(y2 - y1) < 5;
    return (
      (src - 10 === dest ||
        src - 9 === dest ||
        src - 8 === dest ||
        src - 1 === dest ||
        src + 1 === dest ||
        src + 8 === dest ||
        src + 9 === dest ||
        src + 10 === dest ||
        src - 20 === dest ||
        src - 18 === dest ||
        src - 16 === dest ||
        src - 2 === dest ||
        src + 2 === dest ||
        src + 16 === dest ||
        src + 18 === dest ||
        src + 20 === dest) &&
      legality
    );
  }

  getSrcToDestPath(src, dest) {
    let path = [],
      pathStart,
      pathEnd,
      incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    } else if (Math.abs(src - dest) % 10 === 0) {
      incrementBy = 10;
      pathStart += 10;
    } else if (Math.abs(src - dest) % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    } else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}
