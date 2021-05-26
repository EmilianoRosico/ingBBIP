window.addEventListener('load', () => {
    let forms = document.querySelectorAll('form.deleteForm');
    forms.forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault()
            Swal.fire({
                title: 'Estas seguro?',
                text: "Se borrara el equipo!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrarlo!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Borrado!',
                        'El equipo fue correctamente eliminado.',
                        'success'
                    )
                    form.submit();
                }
            })
        });
    });
})