export default function decorate(block) {
    const rows = [...block.children];
    [...block.children].forEach((row,r)=>{
        [...row.children].forEach((col,i)=>{
             if(i==0 && r<rows.length-1) {
                 const input = document.createElement('INPUT');
                 input.classList.add('input');
                 input.setAttribute("id", "in-"+col.innerHTML.replace(/ /g, ""));
                 input.setAttribute("placeholder", col.innerHTML);
                 col.replaceWith(input);
             } else if (i==0 && r==rows.length-1) {
                const submitButton = document.createElement('button');
                submitButton.classList.add('submitbtn');
                submitButton.setAttribute("id", 'submit');
                //nextbtn.classList.add('btn-next');
                const node = document.createTextNode(col.innerHTML);
                submitButton.append(node);
                col.replaceWith(submitButton);
             }
             if(i==1 && r==rows.length-1) {
                col.classList.add("showMessage");
             }
        });
     });
     document.getElementsByClassName('form')[0].setAttribute('align','center');
     document.getElementById('submit').addEventListener('click', ()=>{
        var firstName = document.getElementById("in-FirstName").value;
        var email= document.getElementById("in-Emailid").value;
        sendPostRequest(firstName, email);
     });

     function sendPostRequest(firstName, email) {
        const apiUrl = 'https://franklin.free.beeceptor.com/userData';
        const data = {
        firstName: firstName,
        email: email,
        };

        const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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