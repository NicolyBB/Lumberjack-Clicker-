// Variáveis iniciais
let letScore = 0; // Score inicial
let letBaseValue = 1; // Valor base inicial do clique
let letWoodPickerBaseValue = 0; // Valor inicial passivo do WoodPicker
let letWoodPickerInterval = 1000; // Intervalo do WoodPicker em milissegundos
let letFinalScore = 500;
// Custos e bônus dos upgrades
let letWoodPickerCost = 0.5;
let letWoodPickerBaseBoost = 10;

let letStrongPunchCost = 50;
let letStrongPunchBaseBoost = 1;

let letAxeCost = 100;
let letAxeBaseBoost = 8;

let letChainsawCost = 300;
let letChainsawBaseBoost = 32;

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

// Função chamada ao clicar na árvore.
function funcaoTree() {
  if (letScore < letFinalScore)
  {
  // Adiciona o valor do clique ('LetBaseValue') à pontuação total ('LetScore').
  letScore += letBaseValue;
  // Atualiza o texto do elemento com id "IdScore" no HTML para mostrar a nova pontuação.
  document.getElementById("IdScore").innerHTML = letScore;
  
  // Toca som sempre que clica e mantém a música de fundo
  audioTreeHit.currentTime = 0;
  audioTreeHit.play();
  if (!isBacksongPlaying) {
    audioBacksong.play();
    isBacksongPlaying = true;
  }} else {window.alert("Você venceu!")}
}

// Função passiva do WoodPicker
function funcaoWoodPicker() {
    letScore += letWoodPickerBaseValue;
    document.getElementById("IdScore").innerHTML = letScore;
    document.getElementById("IdBaseValue").innerHTML = letBaseValue;
    document.getElementById("IdBuyWoodPicker").innerHTML = "WoodPicker (Custo: " + letWoodPickerCost + ")";
}

// Função de compra do WoodPicker
function funcaoBuyWoodPicker(){
  if (letScore < letWoodPickerCost) {
    window.alert("Not enough wood");
  } else {
    letScore -= letWoodPickerCost;
    letWoodPickerBaseValue += letWoodPickerBaseBoost;
    document.getElementById("IdScore").innerHTML = letScore;
    letWoodPickerCost += letWoodPickerCost;
    document.getElementById("IdWoodPickerBaseValue").innerHTML = letWoodPickerBaseValue;
    if (!isWoodpickerGifShown) { // mostra o woodpicker
      const centerPanel = document.querySelector('.center-panel');
      const woodpickerGif = document.createElement('img');
      woodpickerGif.src = 'assets/images/woodpicker.gif';
      woodpickerGif.alt = 'WoodPicker Animado';
      woodpickerGif.className = 'woodpicker-animation';
      centerPanel.appendChild(woodpickerGif);
      isWoodpickerGifShown = true;
    }
    
  }
}

//    Garante que o HTML carregou antes de adicionar os cliques
document.addEventListener('DOMContentLoaded', () => {
  setInterval(funcaoWoodPicker, letWoodPickerInterval);
  document.getElementById("IdTree").addEventListener("click", funcaoTree);
  document.getElementById("IdBuyWoodPicker").addEventListener("click", funcaoBuyWoodPicker);
});

document.getElementById("IdStrongPunch").addEventListener("click", funcaoStrongPunch);
  function funcaoStrongPunch(){
    if (letScore < letStrongPunchCost) {
        window.alert("Not enough wood");}
    else {
        letScore -= letStrongPunchCost;
        letBaseValue += letStrongPunchBaseBoost;
        document.getElementById("IdScore").innerHTML = letScore;
        document.getElementById("IdBaseValue").innerHTML = letBaseValue;
        document.getElementById("IdStrongPunch").innerHTML = "Axe (Custo: " + letAxeCost + ")"; // Muda o texto para Axe
        document.getElementById("IdStrongPunch").id = "IdAxe";      // Prepara para o próximo upgrade
        // As compras subsequentes estão dentro uma das outras
        // pois o addEventListener não identificaria o Id novo
        // se eles estivessem fosse fora da função.
        // Compra do Axe
        document.getElementById("IdAxe").addEventListener("click", funcaoAxe);
        function funcaoAxe() {
          letScore += letStrongPunchCost;
          letBaseValue -= letStrongPunchBaseBoost;
            if (letScore < letAxeCost) {
                window.alert("Not enough wood") }
            else {
                letScore -= letAxeCost;
                letBaseValue += letAxeBaseBoost;
                document.getElementById("IdScore").innerHTML = letScore;
                document.getElementById("IdBaseValue").innerHTML = letBaseValue;
                document.getElementById("IdAxe").innerHTML = "Chainsaw (Custo: " + letChainsawCost + ")";
                document.getElementById("IdAxe").id = "IdChainsaw";
                // Compra do Chainsaw
                document.getElementById("IdChainsaw").addEventListener("click", luncaoChainsaw);
                function luncaoChainsaw() {
                    letScore += letAxeCost;
                    letBaseValue -= letAxeBaseBoost;
                    if (letScore < letChainsawCost) {
                        window.alert("Not enough wood") }
                    else {
                        letScore -= letChainsawCost;
                        letBaseValue += letChainsawBaseBoost;
                        document.getElementById("IdScore").innerHTML = letScore;
                        document.getElementById("IdBaseValue").innerHTML = letBaseValue;
                        document.getElementById("IdChainsaw").innerHTML = "Max";
                        document.getElementById("IdChainsaw").disabled = true; // Desativa o botão para sinalizar que é o nível máximo.
                    }
                }
            }
          }   
      }
  }
