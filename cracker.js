$(document).ready(function() {
    var textarea = document.getElementById('consl');
    var cycles = 0;
    //password follows format:
    /*
     * u: uppercase char
     * l: lowercase char
     * n: number
     */
    var randomPass = [];
    var target = document.getElementById("target");
    
    function genRandomPass() {
        $("#format").css("background-color", "white");
        for (var i = 0; i < pass.length; i++) {
            if (pass[i] === 'l') {
                startCracking($("#rate").val());
                $("#format").css("background-color", "lightgreen");
                randomPass[i] = alphabetLower[Math.ceil(Math.random() * 26)];
            } else if (pass[i] === 'u') {
                startCracking($("#rate").val());
                $("#format").css("background-color", "lightgreen");
                randomPass[i] = alphabetUpper[Math.ceil(Math.random() * 26)];
            } else if (pass[i] === 'n') {
                startCracking($("#rate").val());
                $("#format").css("background-color", "lightgreen");
                randomPass[i] = Math.floor(Math.random() * 10);
            } else {
                $("#format").css("background-color", "#ff7575");
                $("#target").css("color", "#ff7575");
                target.innerHTML = "Invalid format!";
                return;
            }
        }
        $("#target").css("color", "lightgreen");
        target.innerHTML = "target: " + randomPass.join("");
    }
    
    //Refresh button (more convenient)
    $("#refresh").click(function() {
        document.location.reload(true);
    });
    
    //Allows modification of how many guesses per second.
    var rate;
    
    //Retrieving user's password generation preferences.
    $("#genShit").click(function() {
        assignFormat();
    });
    var pass;
    function assignFormat() {
        pass = $("#format").val();
        genRandomPass(pass);
    }
    
    //cracking variables and function
    var guess = [];
    var tries = [];
    var cracked = false;
    
    var cycler;
    function startCracking(r) {
        cycler = setInterval(crackPass, 1000 / r);
    }
    function crackPass() {
        if (cracked) {return;}
        cycles++;
        document.getElementById('cycles').innerHTML = "cycles: " + cycles;
        for (var i = 0; i < pass.length; i++) {
            if (pass[i] === 'u') {
                guess[i] = alphabetUpper[Math.ceil(Math.random() * 26)];
            } else if (pass[i] === 'l') {
                guess[i] = alphabetLower[Math.ceil(Math.random() * 26)];
            } else if (pass[i] === 'n') {
                guess[i] = Math.floor(Math.random() * 10);
            }
        }
        
        textarea.scrollTop = textarea.scrollHeight;
        document.getElementById("guess").innerHTML = "guess: " + guess.join("");
        
        for (var i in tries) {
            if (tries[i] === guess.join("")) {
                return;
            } else {
                continue;
            }
        }
        if (randomPass.join("") === guess.join("")) {
            textarea.append(guess.join("") + "\n");
            textarea.append("--CRACKED--");
            cracked = true;
            clearInterval(cycler);
        } else {
            tries.push(guess.join(""));
            textarea.append(guess.join("") + "\n");
        }
    }
});