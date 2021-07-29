let allPurchase = [];

let valInputAddText = ''
let inputAddTest = null;

let valInputAddCost = ''
let inputAddCost = null;

const now = new Date();
const dd = String(now.getDate()).padStart(2, '0');
const mm = String(now.getMonth() + 1).padStart(2, '0');
const yyyy = now.getFullYear();
const today = mm + '/' + dd + '/' + yyyy;

let allCost = 0;
let blockAllCost = '';
let allCostText = '';

window.onload = async () => {
  inputAddTest = document.getElementById('input-id-1');
  inputAddTest.addEventListener('change', updateValue1);

  inputAddCost = document.getElementById('input-id-2');
  inputAddCost.addEventListener('change', updateValue2);

  blockAllCost = document.getElementsByClassName('block-cost-all')[0];
  allCostText = document.createElement('p');
  allCostText.innerText = `Итого: ${allCost} р.`;
  blockAllCost.appendChild(allCostText);

  const responseGet = await fetch('http://localhost:4000/getAllPurchase', {
    method: 'GET'
  });
  const result = await responseGet.json();
  allPurchase = result.data;

  render(-1, -1);
}

const updateValue1 = (event) => {
  valInputAddText = event.target.value;
}

const updateValue2 = (event) => {
  valInputAddCost = Number(event.target.value);
}

const updateValueText = async (event, index) => {
  if (event.target.value) {
    const responsePatch = await fetch('http://localhost:4000/editPurchase', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allaw-Origin': '*'
      },
      body: JSON.stringify({
        _id: allPurchase[index]._id,
        text: event.target.value
      })
    });
    const result = await responsePatch.json();
    allPurchase = result.data;

    render(-1, -1);
  } else {
    alert('Заполните поле!');
  }
}

const updateValueDate = async (event, index) => {
  if (event.target.value) {
    const responsePatch = await fetch('http://localhost:4000/editPurchase', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allaw-Origin': '*'
      },
      body: JSON.stringify({
        _id: allPurchase[index]._id,
        date: event.target.value
      })
    });
    const result = await responsePatch.json();
    allPurchase = result.data;

    render(-1, -1);
  } else {
    alert('Заполните поле!');
  }
}

const updateValueCost = async (event, index) => {
  if (event.target.value) {
    const responsePatch = await fetch('http://localhost:4000/editPurchase', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allaw-Origin': '*'
      },
      body: JSON.stringify({
        _id: allPurchase[index]._id,
        cost: event.target.value
      })
    });
    const result = await responsePatch.json();
    allPurchase = result.data;

    render(-1, -1);
  } else {
    alert('Заполните поле!');
  }
}

const onClickAddPurchase = async () => {
  if (!valInputAddText || !valInputAddCost) {
    alert('Заполните все поля!');
  } else {
    const responsePost = await fetch('http://localhost:4000/addNewPurchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allaw-Origin': '*'
      },
      body: JSON.stringify({
        text: valInputAddText,
        date: today,
        cost: valInputAddCost
      })
    });
    const result = await responsePost.json();
    allPurchase = result.data;

    valInputAddText = '';
    inputAddTest.value = '';
    valInputAddCost = '';
    inputAddCost.value = '';
  
    render(-1, -1);
  }
}


const onClickEdit = (index) => {
  render(index);
}

const onClickDelete = async (index) => {
  const responseDelete = await fetch(`http://localhost:4000/deletePurchase?_id=${allPurchase[index]._id}`, {
    method: 'DELETE'
  });
  const result = await responseDelete.json();
  allPurchase = result.data;

  render(-1, -1);
}

const onClickDone = async (index) => {
  const inputEditText = document.getElementById('id-main-inf-input');
  const inputEditDate = document.getElementById('id-main-inf-input-date');
  const inputEditCost = document.getElementById('id-cost-one-input');

  if (!inputEditText.value || !inputEditDate.value || !inputEditCost.value || inputEditCost.value < 0) {
    alert('Заполните все поля или введите правильные значения!');
  } else {
    const responsePatch = await fetch('http://localhost:4000/editPurchase', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allaw-Origin': '*'
      },
      body: JSON.stringify({
        _id: allPurchase[index]._id,
        text: inputEditText.value,
        date: inputEditDate.value,
        cost: Number(inputEditCost.value)
      })
    });
    const result = await responsePatch.json();
    allPurchase = result.data;

    render(-1, -1);
  }
}

const onClickClose = () => {
  render(-1, -1);
}

const onDblClickText = (index) => {
  const editTextInd = 'text';
  render(-1, editTextInd, index);
}

const onDblClickDate = (index) => {
  const editDateInd = 'date';
  render(-1, editDateInd, index);
}

const onDblClickCost = (index) => {
  const editCostInd = 'cost';
  render(-1, editCostInd, index);
}

const render = (indInput, editOneFlag, editOneInd) => {
  allCost = 0;

  allPurchase.forEach(element => allCost += element.cost);

  const list = document.getElementsByClassName('block-list')[0];

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  allCostText.innerText = `Итого: ${allCost} р.`;

  allPurchase.forEach((element, index) => {
    const purchase = document.createElement('div');
    purchase.className = 'block-purchase';

    const blockImg = document.createElement('div');
    blockImg.className = 'block-img';

    if (index === indInput) {
      const mainTextInput = document.createElement('input');
      mainTextInput.type = 'text';
      mainTextInput.className = 'main-inf-input';
      mainTextInput.id = 'id-main-inf-input';
      mainTextInput.value = allPurchase[index].text;

      const dateTextInput = document.createElement('input');
      dateTextInput.type = 'text';
      dateTextInput.className = 'main-inf-input-date';
      dateTextInput.id = 'id-main-inf-input-date';
      dateTextInput.value = allPurchase[index].date;

      const costTextInput = document.createElement('input');
      costTextInput.type = 'number';
      costTextInput.className = 'cost-one-input';
      costTextInput.id = 'id-cost-one-input';
      costTextInput.value = allPurchase[index].cost;

      const imageDone = document.createElement('img');
      imageDone.src = 'Images/tick.png';
      imageDone.onclick = () => onClickDone(index);

      const imageClose = document.createElement('img');
      imageClose.src = 'Images/close.png';
      imageClose.onclick = () => onClickClose();

      blockImg.appendChild(imageDone);
      blockImg.appendChild(imageClose);

      purchase.appendChild(mainTextInput);
      purchase.appendChild(dateTextInput);
      purchase.appendChild(costTextInput);
    } else {
      let mainText = '';
      if (editOneFlag === 'text' && index === editOneInd) {
        mainText = document.createElement('input');
        mainText.type = 'text';
        mainText.className = 'main-inf-input';
        mainText.id = 'id-main-inf-input-edit';
        mainText.value = allPurchase[index].text;
 
        mainText.addEventListener('blur', (e) => updateValueText(e, index)); 
      } else {
        mainText = document.createElement('p');
        mainText.className = 'main-inf';
        mainText.innerText = `${index + 1}) ${element.text}`;
        mainText.ondblclick = () => onDblClickText(index);
      }

      let dateText = '';
      if (editOneFlag === 'date' && index === editOneInd) {
        dateText = document.createElement('input');
        dateText.type = 'text';
        dateText.className = 'main-inf-input-date';
        dateText.id = 'id-main-inf-input-date-edit';
        dateText.value = allPurchase[index].date;

        dateText.addEventListener('blur', (e) => updateValueDate(e, index));

      } else {
        dateText = document.createElement('p');
        dateText.className = 'date';
        dateText.innerText = `${element.date}`;
        dateText.ondblclick = () => onDblClickDate(index);
      }

      let costText = '';
      if (editOneFlag === 'cost' && index === editOneInd) {
        costText = document.createElement('input');
        costText.type = 'number';
        costText.className = 'cost-one-input';
        costText.id = 'id-cost-one-input-edit';
        costText.value = allPurchase[index].cost;

        costText.addEventListener('blur', (e) => updateValueCost(e, index));

      } else {
        costText = document.createElement('p');
        costText.className = 'cost-one';
        costText.innerText = `${element.cost} р.`;
        costText.ondblclick = () => onDblClickCost(index);
      }

      const imageEdit = document.createElement('img');
      imageEdit.src = 'Images/pencil.png';
      imageEdit.onclick = () => onClickEdit(index);

      const imageDelete = document.createElement('img');
      imageDelete.src = 'Images/delete.png';
      imageDelete.onclick = () => onClickDelete(index);

      blockImg.appendChild(imageEdit);
      blockImg.appendChild(imageDelete);

      purchase.appendChild(mainText);
      purchase.appendChild(dateText);
      purchase.appendChild(costText);
    }

    purchase.appendChild(blockImg);

    list.appendChild(purchase);
  });
}