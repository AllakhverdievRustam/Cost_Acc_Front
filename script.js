let allPurchase = JSON.parse(localStorage.getItem('purchase')) || [];

let valInput1 = ''
let input1 = null;

let valInput2 = ''
let input2 = null;

let valInputText = ''
let inputText = null;
let valInputDate = ''
let inputDate = null;
let valInputCost = ''
let inputCost = null;

let now = new Date();
let dd = String(now.getDate()).padStart(2, '0');
let mm = String(now.getMonth() + 1).padStart(2, '0');
let yyyy = now.getFullYear();
let today = mm + '/' + dd + '/' + yyyy;

let allCost = JSON.parse(localStorage.getItem('allCost'));
let blockAllCost = '';
let allCostText = '';

window.onload = () => {
  input1 = document.getElementById('input-id-1');
  input1.addEventListener('change', updateValue1);

  input2 = document.getElementById('input-id-2');
  input2.addEventListener('change', updateValue2);

  localStorage.setItem('allCost', JSON.stringify(allCost));
  localStorage.setItem('purchase', JSON.stringify(allPurchase));

  blockAllCost = document.getElementsByClassName('block-cost-all')[0];
  allCostText = document.createElement('p');
  allCostText.innerText = `Итого: ${allCost} р.`;
  blockAllCost.appendChild(allCostText);

  render(-1);
}

const updateValue1 = (event) => {
  valInput1 = event.target.value;
}

const updateValue2 = (event) => {
  valInput2 = Number(event.target.value);
}

const onClickAddPurchase = () => {
  if (!valInput1 || !valInput2) {
    alert('Заполните все поля!');
  } else {
    allCost += valInput2;

    allPurchase.push({
      text: valInput1,
      date: today,
      cost: valInput2
    });

    localStorage.setItem('allCost', JSON.stringify(allCost));
    localStorage.setItem('purchase', JSON.stringify(allPurchase));
  
    valInput1 = '';
    input1.value = '';
    valInput2 = '';
    input2.value = '';
  
    render(-1);
  }
}


const onClickEdit = (index) => {
  render(index);
}

const onClickDelete = (index) => {
  allCost -= allPurchase[index].cost;

  allPurchase.splice(index, 1);

  localStorage.setItem('allCost', JSON.stringify(allCost));
  localStorage.setItem('purchase', JSON.stringify(allPurchase));

  render(-1);
}

const onClickDone = (index) => {
  inputText = document.getElementById('id-main-inf-input');
  inputDate = document.getElementById('id-main-inf-input-date');
  inputCost = document.getElementById('id-cost-one-input');
  allCost -= allPurchase[index].cost;

  if (!inputText.value || !inputDate.value || !inputCost.value || inputCost.value < 0) {
    alert('Заполните все поля или введите правильные значения!');
  } else {
    allPurchase[index] = {
      text: inputText.value,
      date: inputDate.value,
      cost: Number(inputCost.value)
    };

    allCost += Number(inputCost.value);

    localStorage.setItem('allCost', JSON.stringify(allCost));
    localStorage.setItem('purchase', JSON.stringify(allPurchase));

    render(-1);
  }
}

const onClickClose = () => {
  render(-1);
}

const render = (indInput) => {
  allCost = JSON.parse(localStorage.getItem('allCost'));
  allPurchase = JSON.parse(localStorage.getItem('purchase'));

  const list = document.getElementsByClassName('block-list')[0];

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  allCost ? allCostText.innerText = `Итого: ${allCost} р.` : allCostText.innerText = 'Итого: 0 р.';

  allPurchase.forEach((element, index) => {
    const purchase = document.createElement('div');
    purchase.className = 'block-purchase';
    purchase.id = `purchase-${index}`;

    let mainText = '';
    let costText = '';
    let blockImg = '';
    let imageEdit = '';
    let imageDelete = '';
    let mainTextInput = '';
    let costTextInput = '';
    let dateTextInput = '';
    let imageClose = '';
    let imageDone = '';

    if (index === indInput) {
      mainTextInput = document.createElement('input');
      mainTextInput.type = 'text';
      mainTextInput.className = 'main-inf-input';
      mainTextInput.id = 'id-main-inf-input';
      mainTextInput.value = allPurchase[index].text;

      dateTextInput = document.createElement('input');
      dateTextInput.type = 'text';
      dateTextInput.className = 'main-inf-input-date';
      dateTextInput.id = 'id-main-inf-input-date';
      dateTextInput.value = allPurchase[index].date;

      costTextInput = document.createElement('input');
      costTextInput.type = 'number';
      costTextInput.className = 'cost-one-input';
      costTextInput.id = 'id-cost-one-input';
      costTextInput.value = allPurchase[index].cost;

      blockImg = document.createElement('div');
      blockImg.className = 'block-img';

      imageDone = document.createElement('img');
      imageDone.src = 'Images/tick.png';
      imageDone.onclick = () => {
        onClickDone(index);
      }

      imageClose = document.createElement('img');
      imageClose.src = 'Images/close.png';
      imageClose.onclick = () => {
        onClickClose();
      }

      blockImg.appendChild(imageDone);
      blockImg.appendChild(imageClose);

      purchase.appendChild(mainTextInput);
      purchase.appendChild(dateTextInput);
      purchase.appendChild(costTextInput);
      purchase.appendChild(blockImg);

      list.appendChild(purchase);

      blockAllCost.appendChild(allCostText);
    } else {
      mainText = document.createElement('p');
      mainText.className = 'main-inf';
      mainText.innerText = `${index + 1}) ${element.text} ${element.date}`

      costText = document.createElement('p');
      costText.className = 'cost-one';
      costText.innerText = `${element.cost} р.`

      blockImg = document.createElement('div');
      blockImg.className = 'block-img';

      imageEdit = document.createElement('img');
      imageEdit.src = 'Images/pencil.png';
      imageEdit.onclick = () => {
        onClickEdit(index);
      }

      imageDelete = document.createElement('img');
      imageDelete.src = 'Images/delete.png';
      imageDelete.onclick = () => {
        onClickDelete(index);
      }

      blockImg.appendChild(imageEdit);
      blockImg.appendChild(imageDelete);

      purchase.appendChild(mainText);
      purchase.appendChild(costText);
      purchase.appendChild(blockImg);

      list.appendChild(purchase);

      blockAllCost.appendChild(allCostText);
    }
  });
}