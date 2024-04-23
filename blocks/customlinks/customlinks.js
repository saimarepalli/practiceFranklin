export default function decorate(block) {
    const rows = [...block.children];
    const links = ["https://1ab1328fe033423aaa701e124409f13a.api.mockbin.io/", 
    "https://3f76046ae4264580bb6fff6115ca0241.api.mockbin.io/",
    "https://d8cf5f6ebb064bf9a13ca8e8e58696b9.api.mockbin.io/"];
    //console.log("rows tabs" , rows);
    const tabsButtons = document.createElement('div');
    [...block.children].forEach((row,r)=>{
       [...row.children].forEach((col,i)=>{
            if(i==0) {
                const linkButton = document.createElement('button');
                linkButton.classList.add('linkbtn');
                linkButton.setAttribute("id", r);
                //nextbtn.classList.add('btn-next');
                const node = document.createTextNode(col.innerHTML);
                linkButton.append(node);
                col.replaceWith(linkButton);
            } else {
                col.classList.add("message"+r);
            }
       });
    });

    document.getElementsByClassName('customlinks')[0].addEventListener('click', (event)=>{
        //console.log("aa", event.target);
        if(event.target.classList.value == "linkbtn") {
            var id = event.target.id;
            const fetchCall = fetch(links[id]);

            fetchCall
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.message);
                    document.getElementsByClassName("message"+id)[0].innerHTML = data.message;
                });
                }
    });
}