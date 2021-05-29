fetch('/devices/devicesFetch').then((response) => {
    return response.json()
}).then(function(json) {
    data = json;
    let form = document.querySelector('form.devices');
    form.addEventListener('submit', e => {
        e.preventDefault()
        let deviceName = document.querySelector('input[name="name"]').value;
        let ipMgmt = document.querySelector('input[name="ipMgmt"]').value;
        let error = false
        data.forEach(device => {
            if (device.name == deviceName.toUpperCase()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El equipo ya existe!',
                })
                error = true
            } else if (device.ipMgmt == ipMgmt) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El IP de MGMT ya existe!',
                })
                error = true
            }
        });
        if (error == false) {
            form.submit();
        }
    });
})