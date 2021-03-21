window.onload = () => {
    console.log("betöltődött")
    var faktoriálisR = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * faktoriálisR(n - 1)
        }
    }

    for (var sor = 0; sor < 10; sor++) {
        var sdiv = document.createElement("div");
        sdiv.classList.add("sor");
        document.getElementById("pascal").appendChild(sdiv);

        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            var ediv = document.createElement("div");
            sdiv.appendChild(ediv);
            ediv.classList.add("elem")
            ediv.innerText = faktoriálisR(sor) / (faktoriálisR(oszlop) * faktoriálisR(sor - oszlop));
            ediv.style.background = `rgb(${(255 * 2 / ediv.innerText) + 100 }, 200, 50)`;
        }
    }
}
