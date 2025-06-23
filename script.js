// Variáveis iniciais
let LetScore = 0; // Score inicial
let LetBaseValue = 1; // Valor base inicial do clique
let LetWoodPickerBaseValue = 0; // Valor inicial passivo do WoodPicker
let letWoodPickerInterval = 1000; // Intervalo do WoodPicker em milissegundos
let LetFinalScore = 500;
// Custos e bônus dos upgrades
let LetWoodPickerCost = 10;
let LetWoodPickerBaseBoost = 0.5;

let LetStrongPunchCost = 50;
let LetStrongPunchBaseBoost = 1;

let LetAxeCost = 100;
let LetAxeBaseBoost = 8;

let LetChainsawCost = 300;
let LetChainsawBaseBoost = 32;

// Variáveis de ativação
let isWoodpickerGifShown = false; // Ativa quando o WoodPicker deve ser exibido


// Música
let isBacksongPlaying = false; // Ativa quando a música deve ser tocada
const audioTreeHit = new Audio('assets/song/treehit.mpeg'); // Som de clique na árvore
const audioBacksong = new Audio('assets/song/backsong.mpeg'); // Música de fundo
audioBacksong.loop = true; // Loop da música de fundo
audioBacksong.volume = 0.3; // Música de fundo alta limitada para 30% do volume

// Cursor customizado
const cursorImage = document.getElementById('cursor-image'); // Armazena o cursor na constante
// Escuta o movimento do mouse e muda o cursor customizado em conformidade
document.addEventListener('mousemove', (event) => {
  cursorImage.style.left = `${event.pageX}px`;
  cursorImage.style.top = `${event.pageY}px`;
  }
);


// ==========================================================
//                   3. FUNÇÕES DE LÓGICA DO JOGO
//            Aqui ficam as regras de como o jogo funciona.
// ==========================================================

// Função chamada ao clicar na árvore.
function FuncaoTree() {
  if (LetScore < LetFinalScore)
  {
  // Adiciona o valor do clique ('LetBaseValue') à pontuação total ('LetScore').
  LetScore += LetBaseValue;
  // Atualiza o texto do elemento com id "IdScore" no HTML para mostrar a nova pontuação.
  document.getElementById("IdScore").innerHTML = LetScore;
  
  // --- Lógica de som ---
  // Reinicia o tempo do som do clique para o início. Isso permite que o som toque novamente mesmo com cliques rápidos.
  audioTreeHit.currentTime = 0;
  // Toca o som do clique.
  audioTreeHit.play();
  
  // Se a música de fundo ainda não estiver tocando...
  if (!isBacksongPlaying) {
    // ...toca a música...
    audioBacksong.play();
    // ...e atualiza a flag para 'true', para que este bloco não seja executado novamente.
    isBacksongPlaying = true;
  }} else {window.alert("Você venceu!")}
}

// Função passiva do WoodPicker
function FuncaoWoodPicker() {
    LetScore += LetWoodPickerBaseValue;
    document.getElementById("IdScore").innerHTML = LetScore;
    document.getElementById("IdBaseValue").innerHTML = LetBaseValue;
}

// Função de compra do WoodPicker
function FuncaoBuyWoodPicker(){
  if (LetScore < LetWoodPickerCost) {
    window.alert("Not enough wood");
  } else {
    LetScore -= LetWoodPickerCost;
    LetWoodPickerBaseValue += LetWoodPickerBaseBoost;
    document.getElementById("IdScore").innerHTML = LetScore;
    // Se o GIF do pica-pau ainda não foi mostrado...
    if (!isWoodpickerGifShown) {
      // ...pega o painel central...
      const centerPanel = document.querySelector('.center-panel');
      // ...cria um novo elemento de imagem...
      const woodpickerGif = document.createElement('img');
      // ...define a origem (o arquivo do GIF)...
      woodpickerGif.src = 'assets/images/woodpicker.gif';
      // ...define um texto alternativo...
      woodpickerGif.alt = 'WoodPicker Animado';
      // ...adiciona a classe CSS para estilização...
      woodpickerGif.className = 'woodpicker-animation';
      // ...e finalmente, adiciona o GIF criado ao painel central.
      centerPanel.appendChild(woodpickerGif);
      // Marca que o GIF já foi mostrado para não repetir a ação.
      isWoodpickerGifShown = true;
    }
    
  }
}



//    Garante que o HTML carregou antes de adicionar os cliques
document.addEventListener('DOMContentLoaded', () => {
  setInterval(FuncaoWoodPicker, letWoodPickerInterval);
  // --- Adiciona os eventos de clique aos botões ---
  // Pega o elemento da árvore e adiciona um "ouvinte de clique". Quando clicado, chama 'FuncaoTree'.
  document.getElementById("IdTree").addEventListener("click", FuncaoTree);
  // Faz o mesmo para o botão de comprar o WoodPicker.
  document.getElementById("IdBuyWoodPicker").addEventListener("click", FuncaoBuyWoodPicker);
  // E para o botão de upgrade inicial, "Strong Punch".
  
});

document.getElementById("IdStrongPunch").addEventListener("click", FuncaoStrongPunch);
  function FuncaoStrongPunch(){
    if (LetScore < LetStrongPunchCost) {
        window.alert("Not enough wood");}
    else {
        LetScore -= LetStrongPunchCost;
        LetBaseValue += LetStrongPunchBaseBoost;
        document.getElementById("IdScore").innerHTML = LetScore;
        document.getElementById("IdBaseValue").innerHTML = LetBaseValue;
        document.getElementById("IdStrongPunch").innerHTML = "Axe"; // Muda o texto para Axe
        document.getElementById("IdStrongPunch").id = "IdAxe";      // Prepara para o próximo upgrade
        // As compras subsequentes estão dentro uma das outras
        // pois o addEventListener não identificaria o Id novo
        // se eles estivessem fosse fora da função.
        // Compra do Axe
        document.getElementById("IdAxe").addEventListener("click", FuncaoAxe);
        function FuncaoAxe() {
          LetScore += LetStrongPunchCost;
          LetBaseValue -= LetStrongPunchBaseBoost;
            if (LetScore < LetAxeCost) {
                window.alert("Not enough wood") }
            else {
                LetScore -= LetAxeCost;
                LetBaseValue += LetAxeBaseBoost;
                document.getElementById("IdScore").innerHTML = LetScore;
                document.getElementById("IdBaseValue").innerHTML = LetBaseValue;
                document.getElementById("IdAxe").innerHTML = "Chainsaw";
                document.getElementById("IdAxe").id = "IdChainsaw";
                // Compra do Chainsaw
                document.getElementById("IdChainsaw").addEventListener("click", FuncaoChainsaw);
                function FuncaoChainsaw() {
                    if (LetScore < LetChainsawCost) {
                      LetBaseValue -= LetAxeBaseBoost;
                      LetScore += LetAxeCost;
                        window.alert("Not enough wood") }
                    else {
                        LetScore -= LetChainsawCost;
                        LetBaseValue += LetChainsawBaseBoost;
                        document.getElementById("IdScore").innerHTML = LetScore;
                        document.getElementById("IdBaseValue").innerHTML = LetBaseValue;
                        document.getElementById("IdChainsaw").innerHTML = "Max";
                        document.getElementById("IdChainsaw").disabled = true; // Desativa o botão para sinalizar que é o nível máximo.
                    }
                }
            }
          }   
      }
  }