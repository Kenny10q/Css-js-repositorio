const emails = [
            "movieses@user1.com",
            "movieses@user2.com",
            "movieses@user3.com",
            "movieses@user4.com"
        ];
        const password = "ABCDEF";

        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.querySelector('input[name="pswrd"]');

        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });

        function check(form) {
            if (emails.includes(form.userid.value) && form.pswrd.value === password) {
                const loader = document.getElementById('loader');
                loader.classList.add('show');
                
                setTimeout(() => {
                    window.location.href = "go:home";
                }, 2000);
            } else {
                if (!emails.includes(form.userid.value)) {
                    alert("Usuario no válido. Por favor, usa uno de los usuarios mostrados en 'Solicitar cuenta'");
                } else if (form.pswrd.value !== password) {
                    alert("Contraseña incorrecta. Por favor, verifica la contraseña en 'Solicitar cuenta'");
                }
            }
        }

        function showModal() {
            const modal = document.getElementById('modal');
            const emailList = document.getElementById('emailList');
            const passwordText = document.getElementById('password');
            const modalContent = modal.querySelector('.modal-content');

            emailList.innerHTML = '';
            emails.forEach(email => {
                const li = document.createElement('li');
                li.textContent = email;
                emailList.appendChild(li);
            });

            passwordText.textContent = password;
            
            modal.classList.add('show');
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }

        function closeModal() {
            const modal = document.getElementById('modal');
            const modalContent = modal.querySelector('.modal-content');
            
            modalContent.style.transform = 'scale(0.9)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modal.classList.remove('show');
            }, 200);
        }
    // Agregar manejo de eventos para el teclado virtual
        const inputs = document.querySelectorAll('input');
        const formContainer = document.querySelector('.form-container');
        let viewportHeight = window.visualViewport.height;
        
        window.visualViewport.addEventListener('resize', () => {
            const currentHeight = window.visualViewport.height;
            
            // Si la altura actual es menor que la altura inicial, significa que el teclado está abierto
            if (currentHeight < viewportHeight) {
                document.body.style.height = `${currentHeight}px`;
                formContainer.style.transform = `translateY(-${(viewportHeight - currentHeight) * 0.3}px)`;
            } else {
                document.body.style.height = '';
                formContainer.style.transform = '';
            }
        });

        // Prevenir el scroll del body cuando se enfoca un input
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.preventDefault();
                document.body.style.overflow = 'hidden';
            });
            
            input.addEventListener('blur', () => {
                document.body.style.overflow = '';
            });
        });

        // Cerrar el teclado al hacer submit
        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            inputs.forEach(input => input.blur());
        });