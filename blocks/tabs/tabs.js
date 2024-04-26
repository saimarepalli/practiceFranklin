export default function decorate(block) {
    const rows = [...block.children];
    //console.log("rows tabs" , rows);
    const tabsButtons = document.createElement('div');
    [...block.children].forEach((row,r)=>{
       [...row.children].forEach((col,i)=>{
            if(i==0) {
                const tabbtn = document.createElement('button');
                tabbtn.classList.add('tablinks');
                tabbtn.setAttribute("id", r+1);
                //var methodName = `openType(event, '${col.innerHTML}',${r})`;
                //tabbtn.setAttribute('onclick', methodName);
                tabbtn.innerHTML = col.innerHTML;
                //console.log("tabbtn", tabbtn);
                tabsButtons.appendChild(tabbtn);
            }
        });
    });
    var outer = document.getElementsByClassName('tabs')[0];
    outer.insertBefore(tabsButtons, outer.firstChild);
    var tabcontentonload = document.getElementsByClassName('tabs')[0].children;
    document.getElementsByClassName('tablinks')[0].style.background = "orange";
    for (var i = 1; i < tabcontentonload.length; i++) {
        if(i>1) {
            tabcontentonload[i].style.display = "none";
        }
    }


document.getElementsByClassName('tabs')[0].addEventListener('click', (event)=>{
    var id = event.target.id;
    var elem = event.target.classList.value;
    if(elem == 'tablinks') {
    var tablinksList = document.getElementsByClassName('tablinks');
    for(var j = 0; j<tablinksList.length; j++) {
       var item =  tablinksList[j];
       item.style.background="#035fe6";
    }
    event.target.style.background="orange";
    
        var tabcontent = document.getElementsByClassName('tabs')[0].children;
        for (var i = 1; i < tabcontent.length; i++) {
        if(i==id) {
            tabcontent[i].style.display = "block";
        } else {
            tabcontent[i].style.display = "none";
        }
    }
    }
    
});
}

function openType(event, type, id) {
    console.log("am here ", id);
    var tabcontent = document.getElementsByClassName(tabs);
    for (i = 1; i < tabcontent.length; i++) {
        if(i==id) {
            tabcontent[i].style.display = "block";
        } else {
            tabcontent[i].style.display = "none";
        }
        
    }
} 