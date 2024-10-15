const tableHeadContainer = document.getElementById("billionaire-table");
const tableContainer = document.getElementById("billionaire-list");

const fetchAllData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.log("ERROR: ", error);
  } finally {
    console.log("All Data Fetched");
  }
};

fetchAllData("https://forbes400.onrender.com/api/forbes400");

const displayData = (data) => {
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

  // work start
  tableContainer.innerHTML = "";
  data.forEach((element) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="py-2 px-4 border-b"> <button onclick="showPerson(event)" class="text-gray-600 hover:text-gray-400">
        <i id="${element.uri}" class="fas fa-eye"></i>
        </button> ${element.personName}</td>
        <td class="py-2 px-4 border-b">${element.countryOfCitizenship}</td>
        <td class="py-2 px-4 border-b">${element.industries}</td>
        <td class="py-2 px-4 border-b">${element.rank}</td>
        <td class="py-2 px-4 border-b">$${element.finalWorth}B</td>
        `;
    tableContainer.appendChild(tr);
  });
};

const showPerson = (event) => {
  const id = event.target.id;

  const personData = async () => {
    try {
      const response = await fetch(
        "https://forbes400.onrender.com/api/forbes400"
      );
      const data = await response.json();
      data.forEach((per) => {
        if (per.uri === id) {
          console.log(per.person, per);

          let div = document.createElement("div");

          div.innerHTML = `
                          <div class="bg-white w-full max-w-3xl p-5 rounded-lg relative">
                              <button onclick="closeModal()" id="close-modal" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
                                <i class="fas fa-times text-xl"></i>
                              </button>
                              <div class="flex items-center space-x-6 mb-2">
                                <img src="${
                                  per.person.squareImage
                                }" alt="Billionaire Image" class="w-32 h-32 rounded-full" />
                                <div>
                                  <h2 class="text-3xl font-bold" id="billionaire-name">
                                  ${per.person.name}
                                  </h2>
                                  <p class="text-gray-500 text-sm" id="billionaire-short-description">
                                  ${per.industries}
                                  </p>
                                </div>
                              </div>
                              <div class="mb-2">
                                <h3 class="text-xl font-semibold">About ${
                                  per.lastName
                                }</h3>
                                <p class="text-gray-700" id="billionaire-biography">
                                ${per.abouts || per.bios}
                                </p>
                              </div>
                              <div class="mb-2">
                                <h3 class="text-xl font-semibold mb-2">General Info</h3>
                                <div class="grid grid-cols-2 gap-1">
                                  <div>
                                    <strong>Citizenship:</strong>
                                    <span id="billionaire-citizenship">${
                                      per.countryOfCitizenship
                                    }</span>
                                  </div>
                                  <div>
                                    <strong>State:</strong>
                                    <span id="billionaire-state">${
                                      per.state
                                    }</span>
                                  </div>
                                  <div>
                                    <strong>City:</strong>
                                    <span id="billionaire-city">${
                                      per.city
                                    }</span>
                                  </div>
                                  <div>
                                    <strong>Birthday:</strong>
                                    <span id="billionaire-birthday">${
                                      per.birthDate
                                    }</span>
                                  </div>
                                  <div>
                                    <strong>Gender:</strong>
                                    <span id="billionaire-gender">${
                                      per.gender === "M" ? "Male" : "Female"
                                    }</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 class="text-xl font-semibold mb-2">Financial Info</h3>
                                <div class="grid grid-cols-2 gap-1">
                                  <div>
                                    <strong>Exchange:</strong>
                                    <span id="billionaire-exchange">${
                                      per.financialAssets[0].exchange
                                    }</span>
                                  </div>
                                  <div>
                                    <strong>Ticker:</strong>
                                    <span id="billionaire-ticker">${
                                      per.financialAssets[0].ticker
                                    }</span>
                                  </div>
                                  <div>
                                    <strong>Total Share:</strong>
                                    <span id="billionaire-total-share">${
                                      per.financialAssets[0].numberOfShares
                                    }</span>
                                  </div>
                                  <div>
                                    <strong>Share Price:</strong>
                                    <span id="billionaire-share-price">$${
                                      per.financialAssets[0].numberOfShares *
                                      per.financialAssets[0].currentPrice
                                    }</span>
                                  </div>
                                </div>
                              </div>
                              <div class="mt-2 text-gray-500">
                                <strong>Source:</strong> ${per.source}
                              </div>
                            </div>
                          `;

          const modalContainer = document.getElementById("billionaire-modal");
          modalContainer.innerHTML = "";
          modalContainer.appendChild(div);
          modalContainer.classList.remove("hidden");
          modalContainer.classList.add("flex");
        }
      });
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      console.log("All Data Fetched");
    }
  };
  personData();
};

const closeModal = () => {
  const modalContainer = document.getElementById("billionaire-modal");
  modalContainer.classList.add("hidden");
  modalContainer.classList.remove("flex");
};

const callAllBillon = () => {
  tableContainer.innerHTML = "";
  tableHeadContainer.innerHTML = "";
  document.getElementById("loaderBox").classList.remove("hidden");
  setTimeout(() => {
    fetchAllData(
      `https://forbes400.onrender.com/api/forbes400/getAllBillionaires`
    );
  }, 3000);
};
