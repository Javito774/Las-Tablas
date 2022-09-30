!function() {
    const timer = 5;
    const numPreg = 10;
    let puntuacion = 0;
    let pregunta = undefined;
    let numPreguntas = numPreg;

    document.querySelector("#start").addEventListener('click', comenzarCuenta);
    function comenzarCuenta() {
        if(document.body.classList.contains("start")) {
            setTimeout(()=>{
                document.querySelector("#preguntasRestantes .modificar").innerHTML=numPreg;
                puntuacion=0;
                document.querySelector("#puntuacion .modificar").innerHTML = puntuacion;
            },2000);
            document.body.classList.remove("start");
        }
        document.querySelector("#start").removeEventListener('click', comenzarCuenta);
        setTimeout(()=>{
            pregunta = crearOperacion();
        },2500); 
    }

    function crearOperacion() {
        let operando1 = Math.floor(Math.random()*11);
        let operando2 = Math.floor(Math.random()*11);
        document.querySelector("#primerFactor").innerHTML=operando1;
        document.querySelector("#segundoFactor").innerHTML=operando2;
        setTimer(timer);
        return (operando1*operando2);
    }

    function setTimer(time) {
        let intervalo = setInterval(calcularIntervalo, 1000);

        function calcularIntervalo() {
            document.querySelector("#timer .modificar").innerHTML = time;
            time--;
            if(time < 0) {
                clearInterval(intervalo);
                lanzarPregunta();
            }
        }
    }

    function lanzarPregunta() {
        document.querySelector("#solucion").innerHTML=pregunta;
        document.body.classList.remove("cerrar-pregunta");
        document.body.classList.add("pregunta"); 
        document.querySelector("#button-no").addEventListener('click', fallarPregunta);
        document.querySelector("#button-si").addEventListener('click', acertarPregunta);

        function fallarPregunta() {
            actualizarMarcador(-5);
        }

        function acertarPregunta() {
            actualizarMarcador(10)
        }

        function actualizarMarcador(cantidad) {
            document.querySelector("#button-no").removeEventListener('click', fallarPregunta);
            document.querySelector("#button-si").removeEventListener('click', acertarPregunta);
            puntuacion+=cantidad;
            document.querySelector("#puntuacion .modificar").innerHTML = puntuacion;
            numPreguntas--;
            document.querySelector("#preguntasRestantes .modificar").innerHTML=numPreguntas;
            document.body.classList.remove("pregunta");
            setTimeout(()=>{document.body.classList.add("cerrar-pregunta");}, 100);
            if(numPreguntas>0)
                setTimeout(comenzarCuenta, 1000);
            else {
                document.body.classList.add("start");
                document.querySelector("#start").addEventListener('click', comenzarCuenta);
            }
            document.querySelector("#solucion").innerHTML="?";
        }
    }

}();