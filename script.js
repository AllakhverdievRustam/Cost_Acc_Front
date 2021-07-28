let allPurchase = JSON.parse(localStorage.getItem('purchase')) || [];

let valInputAddText = ''
let inputAddTest = null;

let valInputAddCost = ''
let inputAddCost = null;

const now = new Date();
const dd = String(now.getDate()).padStart(2, '0');
const mm = String(now.getMonth() + 1).padStart(2, '0');
const yyyy = now.getFullYear();
const today = mm + '/' + dd + '/' + yyyy;

let allCost = JSON.parse(localStorage.getItem('allCost')) || 0;
let blockAllCost = '';
let allCostText = '';

window.onload = () => {
  inputAddTest = document.getElementById('input-id-1');
  inputAddTest.addEventListener('change', updateValue1);

  inputAddCost = document.getElementById('input-id-2');
  inputAddCost.addEventListener('change', updateValue2);

  localStorage.setItem('allCost', JSON.stringify(allCost));
  localStorage.setItem('purchase', JSON.stringify(allPurchase));

  blockAllCost = document.getElementsByClassName('block-cost-all')[0];
  allCostText = document.createElement('p');
  allCostText.innerText = `Итого: ${allCost} р.`;
  blockAllCost.appendChild(allCostText);

  render(-1);
}

const updateValue1 = (event) => {
  valInputAddText = event.target.value;
}

const updateValue2 = (event) => {
  valInputAddCost = Number(event.target.value);
}

const onClickAddPurchase = () => {
  if (!valInputAddText || !valInputAddCost) {
    alert('Заполните все поля!');
  } else {
    allCost += valInputAddCost;

    allPurchase.push({
      text: valInputAddText,
      date: today,
      cost: valInputAddCost
    });

    localStorage.setItem('allCost', JSON.stringify(allCost));
    localStorage.setItem('purchase', JSON.stringify(allPurchase));
  
    valInputAddText = '';
    inputAddTest.value = '';
    valInputAddCost = '';
    inputAddCost.value = '';
  
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
  const inputEditText = document.getElementById('id-main-inf-input');
  const inputEditDate = document.getElementById('id-main-inf-input-date');
  const inputEditCost = document.getElementById('id-cost-one-input');
  allCost -= allPurchase[index].cost;

  if (!inputEditText.value || !inputEditDate.value || !inputEditCost.value || inputEditCost.value < 0) {
    alert('Заполните все поля или введите правильные значения!');
  } else {
    allPurchase[index] = {
      text: inputEditText.value,
      date: inputEditDate.value,
      cost: Number(inputEditCost.value)
    };

    allCost += Number(inputEditCost.value);

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

  allCost ? allCostText.innerText = `Итого: ${allCost || 0} р.` : allCostText.innerText = 'Итого: 0 р.';

  allPurchase.forEach((element, index) => {
    const purchase = document.createElement('div');
    purchase.className = 'block-purchase';

    let mainText = '';
    let dateText = '';
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
      imageDone.onclick = () => onClickDone(index);

      imageClose = document.createElement('img');
      imageClose.src = 'Images/close.png';
      imageClose.onclick = () => onClickClose();

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
      mainText.innerText = `${index + 1}) ${element.text}`;

      dateText = document.createElement('p');
      dateText.className = 'date';
      dateText.innerText = `${element.date}`;

      costText = document.createElement('p');
      costText.className = 'cost-one';
      costText.innerText = `${element.cost} р.`

      blockImg = document.createElement('div');
      blockImg.className = 'block-img';

      imageEdit = document.createElement('img');
      imageEdit.src = 'Images/pencil.png';
      imageEdit.onclick = () => onClickEdit(index);

      imageDelete = document.createElement('img');
      imageDelete.src = 'Images/delete.png';
      imageDelete.onclick = () => onClickDelete(index);

      blockImg.appendChild(imageEdit);
      blockImg.appendChild(imageDelete);

      purchase.appendChild(mainText);
      purchase.appendChild(dateText);
      purchase.appendChild(costText);
      purchase.appendChild(blockImg);

      list.appendChild(purchase);

      blockAllCost.appendChild(allCostText);
    }
  });
}