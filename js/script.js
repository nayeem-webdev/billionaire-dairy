const tableHeadContainer = document.getElementById("billionaire-table");
const tableContainer = document.getElementById("billionaire-list");

const fetchAllData = async () => {
  try {
    const response = await fetch(
      "https://forbes400.onrender.com/api/forbes400"
    );
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.log("ERROR: ", error);
  } finally {
    console.log("All Data Fetched");
  }
};
fetchAllData();
const displayData = (data) => {
  console.log(data);
  document.getElementById("loaderBox").classList.add("hidden");
  const tr = document.createElement("tr");
  tr.innerHTML = `
  <th class="py-2 px-4 border-b-2 text-left">Rank</th>
  <th class="py-2 px-4 border-b-2 text-left">Name</th>
  <th class="py-2 px-4 border-b-2 text-left">Country</th>
  <th class="py-2 px-4 border-b-2 text-left">Industry</th>
  <th class="py-2 px-4 border-b-2 text-left">Wealth</th>
  `;
  tableHeadContainer.appendChild(tr);

  // wok start
  tableContainer.innerHTML = "";
  data.forEach((element) => {
    const tr = document.createElement("tr");
    console.log(element.uri + "-" + element.rank);
    tr.innerHTML = `
    <td class="py-2 px-4 border-b text-center">${
      element.rank + element.version
    }</td>
        <td class="py-2 px-4 border-b"> <button onclick="showDetails(event)" id="${
          element.uri + "-" + element.rank
        }" class="text-gray-600 hover:text-gray-400">
        <i class="fas fa-eye"></i>
        </button> ${element.personName}</td>
        <td class="py-2 px-4 border-b">${element.countryOfCitizenship}</td>
        <td class="py-2 px-4 border-b">${element.industries}</td>
        <td class="py-2 px-4 border-b">$${element.finalWorth}B</td>
        `;
    tableContainer.appendChild(tr);
  });
};

const showDetails = (e) => {
  console.log(e.id);
};

document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("billionaire-modal").classList.remove("flex");
  document.getElementById("billionaire-modal").classList.add("hidden");
});
