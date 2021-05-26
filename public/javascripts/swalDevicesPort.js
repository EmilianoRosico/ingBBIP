window.addEventListener('load', () => {
    let forms = document.querySelectorAll('form.deleteForm');
    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault()
            Swal.fire({
                title: 'Estas seguro?',
                text: "El puerto quedara libre!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Liberar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Liberado!',
                        'El puerto fue Liberado.',
                        'success'
                    )
                    form.submit();
                }
            })
        });
    });
})