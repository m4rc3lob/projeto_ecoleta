function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") 
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => { 

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]") 

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then( res => res.json() )
    .then( cities => { 

        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
        
    } )
}

document
.querySelector("select[name=uf]") 
.addEventListener("change", getCities)

//itens de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li") 

for ( const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem) 
    // faz uma varredura dos itens dentro de items-grid e espera algum evento de "click"
    // se ocorrer um click em algum objeto do array, então chama a função handleSelectedItem
}

const collectedItems = document.querySelector("input[name=items]")

//let é uma variável, pode mudar de valor depois
let selectedItems = [] // array para receber os itens selecionados que serão enviados no cadastro

function handleSelectedItem(event) {
    //função para adicionar ou remover uma classe com javascript
    const itemLi = event.target
    itemLi.classList.toggle("selected") //o . toggle adiciona ou retira a classe "selected" da li quando click é acionado
    const itemId = event.target.dataset.id //  itemId recebe o dataset do tipo id quando houver um evento de seleção

    
    
    //verificar se existem itens selecionados, 
    //caso sim, pegar os itens elecionados

    const alreadySelected = selectedItems.findIndex( item => {           //.findIndex vai procurar por indices, e se a função anonima retornar verdadeiro, o indice vai p/ o array (selectedItems)
        const itemFound = item == itemId //itemFound recebe verdadeiro ou falso
        return itemFound // retorna verdadeiro ou falso
    })  // no final a const alreadySelected vai apenas receber o id caso o botão esteja selecionado.

    
    //se tiver selecionado
    if (alreadySelected >= 0) {
        // tirar seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        
        selectedItems = filteredItems

    } else {
      //se tiver selecionado, adicionar a seleção
      selectedItems.push(itemId)  

    }


    collectedItems.value = selectedItems
    
}