// sessão
function validarSessao() {

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var NomeUsuario = document.getElementById("nome_usuario");
    var divUsuario = document.getElementById("link-login-cadastro-access");
    var divLoginCadastro = document.getElementById("linkLoginCadastro");
    var divNav = document.getElementById("link");

    if (email != null && nome != null) {
        divLoginCadastro.style.display = "none";
        NomeUsuario.innerHTML = nome;
        divUsuario.style.display = "block"
        divNav.style.display = "block"

    } else {
        //window.location = "../index.html";
        divUsuario.style.display = "none"
        divNav.style.display = "none"
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

