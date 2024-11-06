document.getElementById('login--form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch('/.sam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObject)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            //window.location.replace('../server/'); 
        } else {  
           erro_p();
           limparInputs(); 
        }

        function erro_p(){
            document.getElementById('divErrorI').style.display = "block";
            document.getElementById('divErrorI23').style.display = "block";
            time();
        }
        function remover_p(){
            document.getElementById('divErrorI').style.display = "none";
            document.getElementById('divErrorI23').style.display = "none";
          }

    function limparInputs() {
        document.querySelectorAll('#loginForm input').forEach(input => input.value = '');
    }

    function time(){
      var tempoEspera = 4000; 
      setTimeout(remover_p, tempoEspera);}
    })
    .catch(error => {
        console.error('Erro ao autenticar:', error);
    });
});