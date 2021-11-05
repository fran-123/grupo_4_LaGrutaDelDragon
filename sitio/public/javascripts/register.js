const $ = id => document.getElementById(id);
let regExLetter = /^[A-Z]+$/i; //para validar que solo se ingresen letras
let regExEmail =  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/; //para email valido
let regExPass = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/; // validar contraseña. Debe contener mayuscula, numero, caracter especial y de 8 a 16 caracteres

window.addEventListener('load', function(){
    $('name').addEventListener('blur', () =>{
        $('nameErrors').innerText = null
        switch(true){
            case !$('name').value.trim():
                $('nameErrors').innerText = "Debes ingresar tu nombre y apellido"
                $('name').classList.add('is-invalid')
                break;
            case !regExLetter.test($('name').value.trim()):
                $('nameErrors').innerText = "Solo se admiten letras"
                $('name').classList.add('is-invalid')
                break;
            case $('name').value.trim().length < 2 || $('name').value.trim().length > 100 :
                 $('nameErrors').innerText = "Debe tener un mínimo 2 caracteres y un máximo de 100"
                 $('name').classList.add('is-invalid')
                 break;
            default:
                $('name').classList.remove('is-invalid')
                $('name').classList.add('is-valid')
                $('nameErrors').innerText = null
                break;
        } 
    })
    

    $('email').addEventListener('blur', () =>{
        $('emailErrors').innerText = null
        switch(true){
            case !$('email').value.trim():
                $('emailErrors').innerText = "Debes ingresar un correo electrónico";
                $('email').classList.add('is-invalid')
                break;
            case !regExEmail.test($('email').value):
                $('emailErrors').innerText = "El correo ingresado no es válido";
                $('email').classList.add('is-invalid')
                break;         
            default:
                $('email').classList.remove('is-invalid')
                $('email').classList.add('is-valid')
                $('emailErrors').innerText = null
                break;
        }   
    })
  

    $('password').addEventListener('blur', () =>{
        $('passwordErrors').innerText = null
        switch(true){
            case !$('password').value.trim():
                $('passwordErrors').innerText = "Debes ingresar una contraseña"
                $('password').classList.add('is-invalid')
                break;
            case !regExPass.test($('password').value):
                $('passwordErrors').innerText = "La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, un número y un caracter especial";
                $('password').classList.add('is-invalid')
                break; 
            default:
                $('password').classList.remove('is-invalid')
                $('password').classList.add('is-valid')
                $('passwordErrors').innerText = null
                break;
        }   

    })

    
    $('passwordConfirm').addEventListener('blur',() => {
        if($('password').value !== $('passwordConfirm').value){
            $('passwordConfirmErrors').innerText = "Las contraseñas no coinciden"
            $('passwordConfirm').classList.add('is-invalid')
        }else if($('password').value == ""){
            $('passwordConfirmErrors').innerText = "Debes ingresar tu contraseña nuevamente"
            $('passwordConfirm').classList.add('is-invalid')
        }else{
            $('passwordConfirmErrors').innerText = null
            $('passwordConfirm').classList.remove('is-invalid')
            $('passwordConfirm').classList.add('is-valid')            
        }
    })

    $('terminos').addEventListener('click', () =>{
        $('terminos').classList.toggle('is-valid')
        $('terminos').classList.remove('is-invalid')
        $('terminosErrors').innerHTML = null
    })

    $('form-register').addEventListener('submit', event => {
        event.preventDefault();

        let elementsForm = $('form-register').elements;
        
        let error = false;

        for (let i = 0; i < elementsForm.length - 2; i++) {
            
            if(!elementsForm[i].value){
                elementsForm[i].classList.add('is-invalid')
                $('error-empty').innerHTML = "Los campos señalados con * son obligatorios";
                error = true
            }
        }

        if(!$('terminos').checked) {
            
            $('terminos').classList.add('is-invalid')
            $('terminosErrors').innerText = "Debes aceptar los términos y condiciones";
            error = true
        }

        for (let i = 0; i < elementsForm.length - 2; i++) {
            
            if(elementsForm[i].classList.contains('is-invalid')){
                error = true
            }
        }

        if(!error){
            $('form-register').submit()
        }
    })

    $('imgUser').addEventListener('change', (e) => {
        let extPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
        let reader = new FileReader(); 
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => imgUser.src = reader.result

    })





    
})
