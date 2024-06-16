// Agrega un listener y espera a que el documento esté completamente cargado para manipularlo
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene la referencia al formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');

    // Agrega un evento de escucha para el envío del formulario
    loginForm.addEventListener('submit', async (event) => {
        // Previene el comportamiento por defecto del formulario (recargar la página)
        event.preventDefault();

        // Almacena los valores de user y contraseña
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        // Envia la solicitud de inicio de sesión al servidor usando fetch API
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password })
        });

        // Guarda el resultado de la consulta y convierte la respuesta a JSON
        const result = await response.json();
        // Obtiene la referencia al elemento del mensaje
        const messageElement = document.getElementById('message');

        // Muestra mensaje según la respuesta del servidor
        if (response.ok) {
            // Si la respuesta del servidor es exitosa, se muestra un mensaje de éxito
            messageElement.textContent = result.message;
            messageElement.classList.remove('text-danger');
            messageElement.classList.add('text-success');

            // Redirige al registro del usuario después de 3 segundos
            setTimeout(() => {
                window.location.href = `/users/${result.users._id}`;
            }, 3000);

        } else {
            // Si la respuesta del servidor es de error, muestra el mensaje de error
            messageElement.textContent = result.message;
            messageElement.classList.remove('text-success');
            messageElement.classList.add('text-danger');
        }
    });
});
