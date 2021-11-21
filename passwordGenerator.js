function generatePassword() {
    let password = "";
    let possible = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";
    
    for (let i = 0; i < 16; i++) {
        password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    if (password.includes("1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0")) {
        if (password.includes("A" || "B" || "C" || "D" || "E" || "F" || "G" || "H" || "I" || "J" || "K" || "L" || "M" || "N" || "O" || "P" || "Q" || "R" || "S" || "T" || "U" || "V" || "W" || "X" || "Y" || "Z")) {
            if (password.includes("a" || "b" || "c" || "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" || "m" || "n" || "o" || "p" || "q" || "r" || "s" || "t" || "u" || "v" || "w" || "x" || "y" || "z")) {
                return password;
            } else {
                return generatePassword();
            }
        } else {
            return generatePassword();
        }
    } else {
        return generatePassword();
    }
}

module.exports.generatePassword = generatePassword;