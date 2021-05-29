fetch('/nodes/nodesFetch').then((response) => {
    return response.json()
}).then(function(json) {
    data = json;
    let form = document.querySelector('form.nodes');
    form.addEventListener('submit', e => {
        e.preventDefault()
        let nodeName = document.querySelector('input[name="name"]').value;
        let nodeCellId = document.querySelector('input[name="cellId"]').value;
        let error = false
        data.forEach(node => {
            if (node.name == nodeName || node.cellId == nodeCellId.toUpperCase()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El nodo ya existe!',
                })
                error = true
            }
        });
        if (error == false) {
            form.submit();
        }
    });
})