fetch('/devices/devicesFetch').then((response) => {
    return response.json()
}).then(function(json) {
    data = json;
    let form = document.querySelector('form.devices');
    form.addEventListener('submit', e => {
        e.preventDefault()

        function ValidateIPaddress(ipaddress) {
            if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
                return (true)
            }
            return (false)
        }
        let deviceName = document.querySelector('input[name="name"]').value;
        let ipMgmt = document.querySelector('input[name="ipMgmt"]').value;
        let ipIGP = document.querySelector('input[name="ipIGP"]').value;
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
            } else if (!ValidateIPaddress(ipMgmt)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El IP de MGMT ingresado es invalido.',
                })
                error = true
            } else if (!ValidateIPaddress(ipIGP)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El IP de IGP ingresado es invalido.',
                })
                error = true
            }
        });
        if (error == false) {
            form.submit();
        }
    });
})