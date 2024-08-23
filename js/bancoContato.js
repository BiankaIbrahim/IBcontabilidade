document.addEventListener("DOMContentLoaded", function() {
    let db;

    // Abrir conexão com o IndexedDB
    const request = indexedDB.open("ContatoDB", 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;

        // Criar Object Store
        const objectStore = db.createObjectStore("contatos", { keyPath: "id", autoIncrement: true });
        
        // Criar índices
        objectStore.createIndex("nome", "nome", { unique: false });
        objectStore.createIndex("sobrenome", "sobrenome", { unique: false });
        objectStore.createIndex("email", "email", { unique: false });
        objectStore.createIndex("telefone", "telefone", { unique: false });
        objectStore.createIndex("assunto", "assunto", { unique: false });
        objectStore.createIndex("motivo", "motivo", { unique: false });
    };

    request.onerror = function(event) {
        console.error("Erro ao abrir o IndexedDB:", event.target.error);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("IndexedDB aberto com sucesso.");
    };

    // Função para adicionar dados ao banco de dados
    function adicionarDados(event) {
        event.preventDefault(); // Previne o envio tradicional do formulário

        const nome = document.getElementById("nome").value;
        const sobrenome = document.getElementById("sobrenome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const assunto = document.getElementById("escolhaumassunto").value;
        const motivo = document.getElementById("motivodocontato").value;

        const transaction = db.transaction(["contatos"], "readwrite");
        const objectStore = transaction.objectStore("contatos");

        const dados = { nome, sobrenome, email, telefone, assunto, motivo };

        const request = objectStore.add(dados);

        request.onsuccess = function() {
            console.log("Dados adicionados com sucesso!");
            limparFormulario(); // Limpa os campos do formulário
        };

        request.onerror = function() {
            console.error("Erro ao adicionar os dados:", request.error);
        };
    }

    // Função para limpar os campos do formulário
    function limparFormulario() {
        document.getElementById("nome").value = "";
        document.getElementById("sobrenome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("escolhaumassunto").value = "";
        document.getElementById("motivodocontato").value = "";
    }

    document.querySelector("form").addEventListener("submit", adicionarDados);
});