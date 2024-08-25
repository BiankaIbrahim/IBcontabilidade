// Inicializa o IndexedDB
let db;

const request = indexedDB.open("trabalheConoscoDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("candidatos", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("nome", "nome", { unique: false });
    objectStore.createIndex("sobrenome", "sobrenome", { unique: false });
    objectStore.createIndex("celular", "celular", { unique: false });
    objectStore.createIndex("email", "email", { unique: false });
    objectStore.createIndex("linkedin", "linkedin", { unique: false });
    objectStore.createIndex("curriculo", "curriculo", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onerror = function(event) {
    console.error("Erro ao abrir o banco de dados:", event.target.error);
};

// Função para adicionar dados ao banco de dados
function adicionarDados(nome, sobrenome, celular, email, linkedin, curriculo) {
    const transaction = db.transaction(["candidatos"], "readwrite");
    const objectStore = transaction.objectStore("candidatos");

    const candidato = {
        nome: nome,
        sobrenome: sobrenome,
        celular: celular,
        email: email,
        linkedin: linkedin,
        curriculo: curriculo
    };

    const request = objectStore.add(candidato);

    request.onsuccess = function() {
        limparFormulario();
        console.log("Dados adicionados com sucesso!");
    };

    request.onerror = function() {
        console.error("Erro ao adicionar os dados:", request.error);
    };
}

// Função para limpar os campos do formulário
function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("email").value = "";
    document.getElementById("linkedin").value = "";
    document.getElementById("curriculo").value = ""; // Limpa o campo de arquivo
}

// Adiciona um listener ao formulário
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede o envio do formulário até que a validação seja concluída

        try {
            // Validação do nome
            const nome = document.getElementById("nome").value.trim();
            if (!nome) {
                throw new Error("O campo Nome é obrigatório.");
            }
            if (!nome.match(/^[a-zA-ZÀ-ÿ\s]{2,}$/)) {
                throw new Error("Nome inválido. Deve conter apenas letras e ter no mínimo 2 caracteres.");
            }

            // Validação do sobrenome
            const sobrenome = document.getElementById("sobrenome").value.trim();
            if (!sobrenome) {
                throw new Error("O campo Sobrenome é obrigatório.");
            }
            if (!sobrenome.match(/^[a-zA-ZÀ-ÿ\s]{2,}$/)) {
                throw new Error("Sobrenome inválido. Deve conter apenas letras e ter no mínimo 2 caracteres.");
            }

            // Validação do celular
            const celular = document.getElementById("celular").value.trim();
            if (!celular) {
                throw new Error("O campo Celular é obrigatório.");
            }
            if (!celular.match(/^\(\d{2}\)\d{5}-\d{4}$/)) {
                throw new Error("Número de celular inválido. Use o formato (xx)xxxxx-xxxx.");
            }

            // Validação do email
            const email = document.getElementById("email").value.trim();
            if (!email) {
                throw new Error("O campo Email é obrigatório.");
            }
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                throw new Error("Email inválido. Verifique o formato.");
            }

            // Validação do LinkedIn 
            const linkedin = document.getElementById("linkedin").value.trim();
            if (!linkedin) {
                throw new Error("O campo LinkedIn é obrigatório.");
            }
            if (!linkedin.match(/^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.+$/)) {
                throw new Error("URL do LinkedIn inválida.");
            }

            // Validação do arquivo de currículo
            const curriculo = document.getElementById("curriculo").files[0];
            if (!curriculo) {
                throw new Error("Por favor, envie seu currículo.");
            }

            // Se todas as validações passarem, adiciona os dados ao banco de dados
            adicionarDados(nome, sobrenome, celular, email, linkedin, curriculo);

            // Exibe mensagem de sucesso
            alert("Formulário enviado com sucesso!");

        } catch (error) {
            alert(error.message);
        }
    });
});
