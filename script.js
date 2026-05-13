let carrinho = [];
const listaProdutos = document.getElementById('listaProdutos');
const contadorCarrinho = document.getElementById('contadorCarrinho');
const itensCarrinho = document.getElementById('itensCarrinho');
const valorTotal = document.getElementById('valorTotal');

function mostrarProdutos(lista = produtos) {
    listaProdutos.innerHTML = '';
    lista.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow p-4 hover:shadow-lg transition';
        card.innerHTML = `
            <img src="${prod.imagem}" alt="${prod.nome}" class="w-full h-48 object-cover rounded mb-3">
            <h4 class="font-bold text-lg mb-1">${prod.nome}</h4>
            <p class="text-green-600 font-semibold mb-2">R$ ${prod.preco.toFixed(2).replace('.', ',')}</p>
            <button onclick="adicionarCarrinho(${prod.id})" class="w-full bg-primary text-white py-2 rounded hover:bg-primary/90">Adicionar</button>
        `;
        listaProdutos.appendChild(card);
    });
}

function adicionarCarrinho(id) {
    const prod = produtos.find(p => p.id === id);
    const existe = carrinho.find(i => i.id === id);
    if (existe) { existe.quantidade++; } else { carrinho.push({...prod, quantidade:1}); }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    contadorCarrinho.innerText = carrinho.reduce((s,i)=>s+i.quantidade,0);
    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = '<p class="text-center text-gray-500">Seu carrinho está vazio</p>';
    } else {
        itensCarrinho.innerHTML = '';
        let total = 0;
        carrinho.forEach(i => {
            total += i.preco * i.quantidade;
            const el = document.createElement('div');
            el.className = 'flex gap-3 mb-3 pb-3 border-b';
            el.innerHTML = `
                <img src="${i.imagem}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <p class="font-medium">${i.nome}</p>
                    <p class="text-sm">Qtd: ${i.quantidade} | R$ ${i.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button onclick="removerItem(${i.id})" class="text-red-500"><i class="fa-solid fa-trash"></i></button>
            `;
            itensCarrinho.appendChild(el);
        });
        valorTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

function removerItem(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById('carrinho').classList.remove('translate-x-full');
    document.getElementById('fundoCarrinho').classList.remove('hidden');
}
function fecharCarrinho() {
    document.getElementById('carrinho').classList.add('translate-x-full');
    document.getElementById('fundoCarrinho').classList.add('hidden');
}

document.querySelectorAll('[data-categoria]').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('[data-categoria]').forEach(b => b.classList.remove('categoria-ativo','text-primary','font-medium'));
        btn.classList.add('categoria-ativo','text-primary','font-medium');
        const cat = btn.dataset.categoria;
        if (cat === 'todos') mostrarProdutos();
        else mostrarProdutos(produtos.filter(p => p.categoria === cat));
    });
});

document.getElementById('buscaProduto')?.addEventListener('input', e => {
    const termo = e.target.value.toLowerCase();
    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    mostrarProdutos(filtrados);
});

mostrarProdutos();
