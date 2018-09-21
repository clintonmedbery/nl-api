'use strict';

exports.getLevelFromExp = function(exp) {

    let thing = exp <= 1000;
    switch (true) {
        case exp <= 50:
            return 1;
        case exp <= 100:
            return 2;
        case exp <= 175:
            return 3;
        case exp <= 275:
            return 4;
        case exp <= 400:
            return 5;
        case exp <= 525:
            return 6;
        case exp <= 700:
            return 7;
        case exp <= 875:
            return 8;
        case exp <= 1100:
            return 9;
        case exp <= 1325:
            return 10;
        case exp <= 1550:
            return 11;
        case exp <= 1850:
            return 12;
        case exp <= 2150:
            return 13;
        case exp <= 2500:
            return 14;
        case exp <= 2850:
            return 15;
        case exp <= 3350:
            return 16;
        case exp <= 3850:
            return 17;
        case exp <= 4500:
            return 18;
        case exp <= 5200:
            return 19;
        case exp <= 6000:
            return 20;
        case exp <= 6800:
            return 21;
        case exp <= 7600:
            return 22;
        case exp <= 8500:
            return 23;
        case exp <= 9500:
            return 24;
        case exp <= 10600:
            return 25;
        case exp <= 11700:
            return 26;
        case exp <= 12900:
            return 27;
        case exp <= 14100:
            return 28;
        case exp <= 15300:
            return 29;
        case exp <= 16500:
            return 30;
        case exp <= 17500:
            return 31;
        case exp <= 19000:
            return 32;
        case exp <= 20500:
            return 33;
        case exp <= 22200:
            return 34;
        case exp <= 25000:
            return 35;
        case exp <= 28000:
            return 36;
        case exp <= 31000:
            return 37;
        case exp <= 34000:
            return 38;
        case exp <= 37000:
            return 39;
        default:
            return 40;
    }

};
