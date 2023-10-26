const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const gravity = 0.99;
let airFriction = 0.95;
let groundFriction = 0.9;

const keys = {};

let level = new Level(
    new Vector(window.innerWidth + 200, window.innerHeight + 500)
);

const scale = 3;

let cellSize = new Vector(level.size.x / (16 * scale), level.size.y / (9 * scale));
let maxCells = new Vector(
    level.size.x / (level.size.x / (16 * scale)),
    level.size.y / (level.size.y / (9 * scale))
);

let camera = {
    position: new Vector(0, 500),
    size: new Vector(width, height),
};

function colCheck(shapeA, shapeB, moveShape = true) {
    // get the vectors to check against
    var vX =
            shapeA.position.x +
            shapeA.size.x / 2 -
            (shapeB.position.x + shapeB.size.x / 2),
        vY =
            shapeA.position.y +
            shapeA.size.y / 2 -
            (shapeB.position.y + shapeB.size.y / 2),
        // add the half widths and half heights of the objects
        hWidths = shapeA.size.x / 2 + shapeB.size.x / 2,
        hHeights = shapeA.size.y / 2 + shapeB.size.y / 2,
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) <= hWidths && Math.abs(vY) <= hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                if (moveShape) shapeA.position.y += oY;
            } else {
                colDir = "b";
                if (moveShape) shapeA.position.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if (moveShape) shapeA.position.x += oX;
            } else {
                colDir = "r";
                if (moveShape) shapeA.position.x -= oX;
            }
        }
    }
    return colDir;
}

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
}

function rotatePoint(point, center, angle) {
    angle = angle * (Math.PI / 180); // Convert to radians
    var rotatedX =
        Math.cos(angle) * (point.x - center.x) -
        Math.sin(angle) * (point.y - center.y) +
        center.x;
    var rotatedY =
        Math.sin(angle) * (point.x - center.x) +
        Math.cos(angle) * (point.y - center.y) +
        center.y;
    return new Vector(rotatedX, rotatedY);
}

// function rotatePoint(x1, y1, c1, c2, angle) {
//     angle = angle * (Math.PI / 180); // Convert to radians
//     var rotatedX =
//         Math.cos(angle) * (x1 - c1) -
//         Math.sin(angle) * (y1 - c2) +
//         c1;
//     var rotatedY =
//         Math.sin(angle) * (x1 - c1) +
//         Math.cos(angle) * (y1 - c2) +
//         c2;
//     return "(" + rotatedX.toFixed(2) + ", " + rotatedY.toFixed(2) + ")";
// }

// /**
//  * Helper function to determine whether there is an intersection between the two polygons described
//  * by the lists of vertices. Uses the Separating Axis Theorem
//  *
//  * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
//  * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
//  * @return true if there is any intersection between the 2 polygons, false otherwise
//  */
// function doPolygonsIntersect (a, b) {
//     var polygons = [a, b];
//     var minA, maxA, projected, i, i1, j, minB, maxB;

//     for (i = 0; i < polygons.length; i++) {

//         // for each polygon, look at each edge of the polygon, and determine if it separates
//         // the two shapes
//         var polygon = polygons[i];
//         for (i1 = 0; i1 < polygon.length; i1++) {

//             // grab 2 vertices to create an edge
//             var i2 = (i1 + 1) % polygon.length;
//             var p1 = polygon[i1];
//             var p2 = polygon[i2];

//             // find the line perpendicular to this edge
//             var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

//             minA = maxA = undefined;
//             // for each vertex in the first shape, project it onto the line perpendicular to the edge
//             // and keep track of the min and max of these values
//             for (j = 0; j < a.length; j++) {
//                 projected = normal.x * a[j].x + normal.y * a[j].y;
//                 if (isUndefined(minA) || projected < minA) {
//                     minA = projected;
//                 }
//                 if (isUndefined(maxA) || projected > maxA) {
//                     maxA = projected;
//                 }
//             }

//             // for each vertex in the second shape, project it onto the line perpendicular to the edge
//             // and keep track of the min and max of these values
//             minB = maxB = undefined;
//             for (j = 0; j < b.length; j++) {
//                 projected = normal.x * b[j].x + normal.y * b[j].y;
//                 if (isUndefined(minB) || projected < minB) {
//                     minB = projected;
//                 }
//                 if (isUndefined(maxB) || projected > maxB) {
//                     maxB = projected;
//                 }
//             }

//             // if there is no overlap between the projects, the edge we are looking at separates the two
//             // polygons, and we know there is no overlap
//             if (maxA < minB || maxB < minA) {
//                 CONSOLE("polygons don't intersect!");
//                 return false;
//             }
//         }
//     }
//     return true;
// };
