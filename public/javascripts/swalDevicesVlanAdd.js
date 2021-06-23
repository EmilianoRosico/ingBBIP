let form = document.querySelector('form.vlan');
form.addEventListener('submit', e => {
    e.preventDefault()
    let vlan = document.querySelector('input[name="vlan"]').value;
    let error = false
    if (vlan <= 1 || vlan >= 4094) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El rango de vlans es entre 1 y 4094.',
        })
        error = true
    }
    if (error == false) {
        form.submit();
    }
});