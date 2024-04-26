export default function decorate(block) {
    const rows = [...block.children];
    var inputfields = [];
    [...block.children].forEach((row,r)=>{
        [...row.children].forEach((col,i)=>{
             if(i==0 && r<rows.length-1) {
                inputfields.push(col.innerHTML.replace(/ /g, ""));
                const outDiv = document.createElement('div');
                outDiv.classList.add('inputField');
                var input = null;
                 if(col.innerHTML === 'Comments') {
                   input = document.createElement('textarea');
                   input.classList.add('inputtext');
                    input.setAttribute('rows', '5');
                    input.setAttribute('cols', '55');
                 } else {
                    input = document.createElement('INPUT');
                    input.classList.add('input');
                    input.setAttribute('type', 'text');
                 }
                 input.setAttribute("placeholder", col.innerHTML);
                 input.setAttribute("id", "in-"+col.innerHTML.replace(/ /g, ""));
                 const inputName = document.createElement('label');
                 inputName.classList.add('inputFieldName');
                 inputName.innerHTML=col.innerHTML;
                 outDiv.appendChild(inputName);
                 outDiv.appendChild(input)
                 col.replaceWith(outDiv);
             } else if (i==0 && r==rows.length-1) {
                const lastDiv = document.createElement('div');
                const submitButton = document.createElement('button');
                submitButton.classList.add('submitbtn');
                submitButton.setAttribute("id", 'submit');
                const node = document.createTextNode(col.innerHTML);
                const msg = document.createElement('div');
                msg.classList.add('showMessage');
                submitButton.append(node);
                lastDiv.appendChild(submitButton);
                lastDiv.appendChild(msg);
                col.replaceWith(lastDiv);
             }
            //  if(i==1 && r==rows.length-1) {
            //     col.classList.add("showMessage");
            //  }
        });
     });
     
     document.getElementsByClassName('formstoken')[0].setAttribute('align','center');

     document.getElementById('submit').addEventListener('click', ()=>{
        const data = {};
        inputfields.forEach(i=>{
            var value = document.getElementById("in-"+i).value;
            data[i] = value;
        });
        sendPostRequest(data);
     });

     function sendPostRequest(data) {
        const apiUrl = 'https://franklin.free.beeceptor.com/contactus';
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
        };

        fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementsByClassName('showMessage')[0].innerHTML = JSON.stringify(data.message, null, 2);
        })
        .catch(error => {
            console.error

        ('Error:', error);
        });
     }
}