 let produtos = {}; // Objeto para armazenar os produtos
let opcao; // Variável para armazenar a escolha do usuário
let ProdutoCadastrado = [];
let produtosCadastrados = []; // Array para armazenar os produtos cadastrados
let totalVenda=[];

function cadastrarProduto() {
  let nome = prompt("Digite o nome do produto para cadastrar");
  let marca = prompt("Digite o nome da marca deste produto");
  let quantidade = parseInt(prompt("Digite a quantidade de caixas disponíveis"));
  let valor=parseFloat(prompt("Digite o valor do produto cadastrado R$: "));

  let novoProduto = {
    nome: nome,
    marca: marca,
    quantidade: quantidade,
    valor:valor,
    historico: ["A quantidade inicial foi de " + quantidade] // Utilize um array vazio para o histórico
  };
  produtos[nome] = novoProduto;
  ProdutoCadastrado.push(novoProduto);
  produtosCadastrados.push(novoProduto); // Adicione o novo produto ao array de produtos cadastrados
}
function exibirProdutos() {
  let produtosCadastradosString = "Produtos Cadastrados:\n";
  let numeroProdutos = 1;
  for (let nomeProduto in produtos) {
    produtosCadastradosString += numeroProdutos + " Nome: " + nomeProduto + ", Marca: " + produtos[nomeProduto].marca + ", Saldo em Estoque: " + produtos[nomeProduto].quantidade + "\n";
    numeroProdutos++;
  }
  alert(produtosCadastradosString);
}
function adicionarProduto(){
    let nomeProduto=prompt("Digite o nome do produto que deseja buscar ");
     if(produtos[nomeProduto]){
      alert("O saldo atual do produto é " + nomeProduto + "\nMarca:  " + produtos[nomeProduto].marca  + "\nTotal em Estoque: " + produtos[nomeProduto].quantidade + " ")
     let saldoProduto=parseInt(prompt("Digite a quantidade que deseja adicionar no saldo "));
     let confirmacao=confirm("Deseja Adicionar: " + saldoProduto + " mesmo");
     if (confirmacao){
         produtos[nomeProduto].quantidade+=saldoProduto;
         alert("Estoque atualizado com sucesso.." + "\nO saldo atual do produto é " + nomeProduto + "\nMarca:  " + produtos[nomeProduto].marca  + "\nTotal em Estoque: " + produtos[nomeProduto].quantidade + " ")
     }
         
     } else{
         alert("Produto não Cadastrado")
     }
     
}
function exibirProdutosCadastrados() {
  let exibirCadastrados = "Produtos Cadastrados:\n";
  produtosCadastrados.forEach(function (produto, index) {
    exibirCadastrados += (index + 1) + " Nome: " + produto.nome + " , Valor Unitario: R$ " + produto.valor + " , Saldo em Estoque: " + produto.quantidade + "\n";
  });
  alert(exibirCadastrados);
}

function comprarProduto() {
    let nomeProduto = prompt("Digite o nome do produto que deseja comprar");
    let quantidadeProduto;
    let confirmacao;;
    if (produtos[nomeProduto]) {
        alert("O produto " + nomeProduto + " está R$: " + produtos[nomeProduto].valor);
        quantidadeProduto = prompt("Digite quantas caixa você deseja comprar ");
        confirmacao = confirm("Deseja realmente comprar " + quantidadeProduto + " unidades de " + nomeProduto + " ?");
        if(confirmacao){
            let valorVenda = quantidadeProduto * produtos[nomeProduto].valor ;
            produtos[nomeProduto].quantidade-=quantidadeProduto;
            produtos[nomeProduto].historico.push("Foi vendido " + quantidadeProduto + " caixas" + " \nTotal da venda foi de: R$: " + valorVenda);


            alert("O total da venda deu R$: " + valorVenda);
        }

    } else {
        alert("Produto Não Cadastrado! \n Por favor, retorne à opção anterior  ");
    }

}
function exibirHistorico(nomeProduto){
    let historico = produtos[nomeProduto].historico;
    if( historico.length === 0 ){
        alert("Nenhum saida de produto registrada");

    } else{
        alert(historico.join("\n" ) + "\nO saldo atual " + nomeProduto + " " + produtos[nomeProduto].quantidade + " : \n"  )
    }
}
function calcularTotalDeVendas() {
  let totalVendas = 0;

  for (let nomeProduto in produtos) {
    // Para cada produto, verifique se ele tem um histórico de vendas
    if (produtos[nomeProduto].historico && produtos[nomeProduto].historico.length > 0) {
      // Percorra o histórico de vendas
      for (let venda of produtos[nomeProduto].historico) {
        // Divida o histórico em partes com a formatação "Total da venda foi de: R$: "
        let partes = venda.split("Total da venda foi de: R$: ");
        if (partes.length === 2) {
          // A segunda parte deve conter o valor da venda
          let valorVenda = parseFloat(partes[1]);
          if (!isNaN(valorVenda)) {
            // Adicione o valor da venda ao total de vendas
            totalVendas += valorVenda;
          }
        }
      }
    }
  }

  alert("O total de vendas é R$: " + totalVendas.toFixed(2));
}


do {
  opcao = parseInt(prompt(
    "\nDigite a opção que deseja seguir:\n" +
    "[1] - Cadastrar Produtos\n" +
    "[2] - Verificar Saldo em Estoque\n" +
    "[3] - Exibir Produto Cadastrados\n" +
    "[4] - Adicionar Produto no Estoque\n" +
    "[5] - Realizar Compra\n" +
    "[6] - Exibir saida Produto comprados  \n" +
    "[7] - Total de vendas  \n" +
    "[8] - Sair"
  ));

  switch (opcao) {
    case 1:
      cadastrarProduto();
      break;
    case 2:
     let nomeProduto=prompt("Digite o nome do produto que deseja buscar ");
     if(produtos[nomeProduto]){
      alert("O saldo atual do produto é " + nomeProduto + "\nValor Unitario :  " + produtos[nomeProduto].valor  + "\nTotal em Estoque: " + produtos[nomeProduto].quantidade + " ")
     }else{
         alert("Produto não Cadastrado");
     }
      break;
    case 3:
     exibirProdutos();
      break;
    case 4:
     adicionarProduto();
      break;
    case 5:
      exibirProdutosCadastrados();
      comprarProduto();
      break;
    case 6:
     let produtoHistorico = prompt("Digite o nome do produto que deseja ver a saida ");
     if(produtos[produtoHistorico]){
        exibirHistorico(produtoHistorico);
     }else{
        alert("Produto não encontrado");
     }
      break;  
    case 7:
    calcularTotalDeVendas();
      break;
   
    case 8:
      alert("Encerrando o Programa");
      break;
    default:
      alert("Opção inválida. Escolha uma opção de 1 a 8.");
  }
} while (opcao !== 8);