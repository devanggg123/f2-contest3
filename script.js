function fetchDataWithThen() {
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((coin) => {
        const { name, id, image, symbol, current_price, total_volume, market_cap } = coin;
        addingDataToTable(name, id, image, symbol, current_price, total_volume, market_cap);
      });
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
    const data = await response.json();

    const sortedData = data.sort((a, b) => b.market_cap - a.market_cap);
    sortedData.forEach((coin) => {
      const { name, id, image, symbol, current_price, total_volume, market_cap } = coin;
      addingDataToTable(name, id, image, symbol, current_price, total_volume, market_cap);
    });
  } catch (error) {
    console.log('Error:', error);
  }
}

function addingDataToTable(name, id, image, symbol, current_price, total_volume, market_cap) {
  let table = document.getElementById('data');
  let row = document.createElement('tr');

  let nameCell = document.createElement('td');
  nameCell.textContent = name;
  row.appendChild(nameCell);

  let idCell = document.createElement('td');
  idCell.textContent = id;
  row.appendChild(idCell);

  let imageCell = document.createElement('td');
  let imageElement = document.createElement('img');
  imageElement.className = "imgsize";
  imageElement.src = image;
  imageCell.appendChild(imageElement);
  row.appendChild(imageCell);

  let symbolCell = document.createElement('td');
  symbolCell.textContent = symbol;
  row.appendChild(symbolCell);

  let priceCell = document.createElement('td');
  priceCell.textContent = current_price;
  row.appendChild(priceCell);

  let volumeCell = document.createElement('td');
  volumeCell.textContent = total_volume;
  row.appendChild(volumeCell);

  let marketCell = document.createElement('td');
  marketCell.textContent = market_cap; 
  row.appendChild(marketCell);

  table.appendChild(row);
}

function addfilter() {
let inputValue = document.getElementById('searchInput').value.toLowerCase();
  let table = document.getElementById('data');
  let rows = table.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    let nameCell = rows[i].getElementsByTagName('td')[0];
    if (nameCell) {
      let name = nameCell.textContent || nameCell.innerText;
      if (name.toLowerCase().includes(inputValue)) { 
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  }
}
function sortByMarketCap() {
  data.sort((a, b) => b.market_cap - a.market_cap);
  // renderTable();
}

function sortByPercentageChange(){
  data.sort((a, b) => b.price_change_percentage - a.price_change_percentage);
  // renderTable();
}

// fetchDataWithThen();

fetchDataWithAsyncAwait().catch((error) => {
  console.log('Error:', error);
});
