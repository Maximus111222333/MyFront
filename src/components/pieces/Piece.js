

export default class Piece {
    constructor(player, iconUrl) {
        this.player = player;
        this.style = { backgroundImage: `url(` + iconUrl + `)` };
    }
    convertToXY(ind){
        return [ind % 9, Math.floor(ind / 9)];
    };

}
