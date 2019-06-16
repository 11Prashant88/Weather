var address = document.querySelector('#weatherText');
var wForm = document.querySelector('.weatherForm');
var msg1 = document.querySelector('#messageOne');
var msg2 = document.querySelector('#messageTwo');
wForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const address = weatherText.value;
    msg1.innerText = 'Loading...'
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                msg1.textContent = data.error;
                msg2.textContent = '';
            }
            else
            {
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        })
    }, (error)=>{msg1.textContent = 'plese check internet connectivity'})
})
