class Alcancia {
    constructor() {
        this.movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
        this.saldo = this.calcularSaldo();
    }

    calcularSaldo() {
        let total = 0;
        this.movimientos.forEach(m => {
            if (m.tipo === "ahorro") {
                total += m.cantidad;
            } else if (m.tipo === "retiro") {
                total -= m.cantidad;
            }
        });
        return total;
    }

    guardarMovimiento(tipo, cantidad) {
        this.movimientos.push({ tipo: tipo, cantidad: cantidad });
        localStorage.setItem("movimientos", JSON.stringify(this.movimientos));
        this.saldo = this.calcularSaldo();
    }

    mostrarMovimientos() {
        let tabla = "";

        this.movimientos.forEach(m => {
            tabla += `
                <tr>
                    <td>${m.tipo.toUpperCase()}</td>
                    <td>$${m.cantidad}</td>
                </tr>
            `;
        });

        document.getElementById("listaMovimientos").innerHTML = tabla;
    }
}

const alcancia = new Alcancia();

document.querySelector(".saldo").innerHTML = `<strong>$${alcancia.saldo}</strong>`;
document.querySelector(".saldoRestante").innerHTML = `<strong>$${alcancia.saldo}</strong>`;

alcancia.mostrarMovimientos();

const botones = document.querySelectorAll(".boton");

botones.forEach(boton => {
    boton.addEventListener("click", function () {
        const cantidad = Number(this.innerText);

        alcancia.guardarMovimiento("ahorro", cantidad);

        document.querySelector(".saldo").innerHTML = `<strong>$${alcancia.saldo}</strong>`;
        document.querySelector(".saldoRestante").innerHTML = `<strong>$${alcancia.saldo}</strong>`;

        alcancia.mostrarMovimientos();
    });
});

document.querySelector(".retirar").addEventListener("click", function () {
    const cantidadRetiro = Number(document.getElementById("tasa").value);

    if (cantidadRetiro <= 0 || isNaN(cantidadRetiro)) {
        alert("INGRESA UNA CANTIDAD VÁLIDA.");
        return;
    }

    if (cantidadRetiro > alcancia.saldo) {
        alert("NO PUEDES RETIRAR MÁS DINERO DEL QUE TIENES EN LA ALCANCÍA");
        return;
    }

    alcancia.guardarMovimiento("retiro", cantidadRetiro);

    document.querySelector(".saldoRestante").innerHTML = `<strong>$${alcancia.saldo}</strong>`;
    document.querySelector(".saldo").innerHTML = `<strong>$${alcancia.saldo}</strong>`;

    alcancia.mostrarMovimientos();
});
