fetch('/api/capexData').then((response) => {
    return response.json()
}).then(function (json) {
    let data = json;
    let puertosElectricos = 0
    let puertosOpticos1 = 0
    let puertosOpticos10 = 0
    let puertosOpticos100 = 0
    let solicitudPorNodo = []
    let solicitudPorArea = []
    data.forEach(element => {
        puertosElectricos += element.puertosElectricos
        if (element.puertosOpticos != 0) {
            if (element.capacidadPuerto == "1Gb") {
                puertosOpticos1 += element.puertosOpticos;
            }
            else if (element.capacidadPuerto == "10Gb") {
                puertosOpticos10 += element.puertosOpticos;

            }
            else if (element.capacidadPuerto == "100Gb") {
                puertosOpticos100 += element.puertosOpticos;
            }
        }
        solicitudPorNodo.push(element.cellId)
        solicitudPorArea.push(element.areaSolicitante)

    });
    function addRow(cellId, count,divId) {
        const div = document.createElement('div');
        div.className = 'col-lg-6 mb-4';
        div.innerHTML = `
                    <div class="card bg-info text-white shadow">
                      <div class="card-body d-flex justify-content-between">
                        <span id="cellId">${cellId}</span>
                        <span id="count">${count}</span>
                      </div>
                    </div>
        `;

        document.getElementById(divId).appendChild(div);
    }
    const nodos = {};
    for (const node of solicitudPorNodo) {
        nodos[node] = nodos[node] ? nodos[node] + 1 : 1;
    }

    const areas = {};
    for (const area of solicitudPorArea) {
        areas[area] = areas[area] ? areas[area] + 1 : 1;
    }
    document.querySelector('#solicitudes').innerText = data.length
    document.querySelector('#puertosElectricos').innerText = puertosElectricos
    document.querySelector('#puertosOpticos10').innerText = puertosOpticos10
    document.querySelector('#puertosOpticos100').innerText = puertosOpticos100

    Object.entries(nodos).forEach(entry => {
        const [key, value] = entry;
        addRow(key, value, 'solxNodo')
    })
    Object.entries(areas).forEach(entry => {
        const [key, value] = entry;
        addRow(key, value, 'solxArea')
    })
})