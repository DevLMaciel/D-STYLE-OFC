// Carrinho de compras (array simples)
let carrinho = [];

// Selecionar o ícone do carrinho, a aba lateral e o formulário de checkout
const cartIcon = document.getElementById('cartIcon');
const cartPopup = document.getElementById('cartPopup');
const closeCartButton = document.getElementById('closeCartButton');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const cartItemCount = document.getElementById('cartItemCount');

// Selecionar o formulário de checkout
const finalizeOrderButton = document.getElementById('finalizeOrderButton');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');

// Adicionar evento de clique para cada botão "Adicionar ao Carrinho"
const botoesAdicionar = document.querySelectorAll('.btn-adicionar');
botoesAdicionar.forEach((botao) => {
    botao.addEventListener('click', (evento) => {
        const produto = evento.target.closest('.produto');
        const nomeProduto = produto.querySelector('h3').innerText;
        const precoProduto = parseFloat(produto.querySelector('p').innerText.replace('Preço: R$ ', '').replace(',', '.'));

        // Adiciona o produto ao carrinho
        carrinho.push({ nome: nomeProduto, preco: precoProduto });

        // Atualiza o contador de itens no ícone do carrinho
        cartItemCount.innerText = carrinho.length;

        // Atualiza a lista de itens no carrinho
        updateCartPopup();

        alert(`${nomeProduto} adicionado ao carrinho! Preço: R$ ${precoProduto.toFixed(2)}`);
    });
});

// Função para atualizar o conteúdo do carrinho na aba lateral
function updateCartPopup() {
    cartItems.innerHTML = '';
    let totalPrice = 0;

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        cartItems.appendChild(li);
        totalPrice += item.preco;
    });

    totalPriceElement.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
}

// Evento para abrir o carrinho ao clicar no ícone
cartIcon.addEventListener('click', () => {
    cartPopup.style.display = 'block';
});

// Evento para fechar o carrinho
closeCartButton.addEventListener('click', () => {
    cartPopup.style.display = 'none';
});

// Evento para finalizar o pedido
finalizeOrderButton.addEventListener('click', () => {
    // Verifica se os campos estão preenchidos
    if (nameInput.value === '' || emailInput.value === '' || addressInput.value === '') {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
    }

    // Monta a mensagem para o WhatsApp
    let mensagem = `*Pedido de Compra*\n\n`;
    mensagem += `*Nome*: ${nameInput.value}\n`;
    mensagem += `*Email*: ${emailInput.value}\n`;
    mensagem += `*Endereço*: ${addressInput.value}\n\n`;
    mensagem += `*Itens do Carrinho:*\n`;

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} | R$ ${item.preco.toFixed(2)}\n`;
    });

    // Adiciona o total no final da mensagem
    let totalPrice = carrinho.reduce((total, item) => total + item.preco, 0);
    mensagem += `\n*Total*: R$ ${totalPrice.toFixed(2)}`;

    // Codifica a mensagem para garantir que ela possa ser usada na URL
    let mensagemCodificada = encodeURIComponent(mensagem);

    // Número de telefone do vendedor (insira o número de WhatsApp do vendedor)
    const numeroWhatsapp = '5593984093828'; // Substitua por um número válido

    // Redireciona para o WhatsApp com a mensagem
    window.location.href = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${mensagemCodificada}`;

    // Limpar o carrinho e atualizar a interface
    carrinho = [];
    cartItemCount.innerText = '0';
    updateCartPopup();

    // Fechar o carrinho após o pedido
    cartPopup.style.display = 'none';
});