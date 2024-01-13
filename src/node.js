class Node {
    constructor (x, y, g, h) {
        this.x = x;
        this.y = y;
        this.g = g;
        this.h = h;
        this.aGrade = g + h;
        this.moves = [];
    }
}