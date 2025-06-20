// document.querySelector('button').addEventListener('click', () => {
//     document.querySelector('#output').innerHTML = 'Click event fired!';
//     });
// const socks = {
//     "size": "Medium",
//     "color": "Blue",
//     "pattern": "Striped",
//     "material": "Cotton",
//     "condition": "New",
//     "forFoot": "Left"
// }
// document.querySelector('#size').innerHTML = 'Size: ' + socks.size;
// document.querySelector('#color').innerHTML = 'Color: ' + socks.color;
// document.querySelector('#pattern').innerHTML = 'Pattern: ' + socks.pattern;
// document.querySelector('#material').innerHTML = 'Material: ' + socks.material;
// document.querySelector('#condition').innerHTML = 'Condition: ' + socks.condition;
// document.querySelector('#forFoot').innerHTML = 'Foot: ' + socks.forFoot;
counter=1
table=false
table_str = ''
async function getData() {
    // Use fetch to retrieve data over the network from an API endpoint
    // counter = 1
    const socks = await fetch('http://localhost:9000/api/socks/'+counter.toString()+'/10').then(res => res.json());
    updateHTML(socks); // Update HTML after data is fetched
    counter += 1
};
// function updateHTML(socks) {
//     // Now we are sure that socks is defined and contains the data
//     document.querySelector('#size').innerHTML = 'Size: ' + socks.size;
//     document.querySelector('#color').innerHTML = 'Color: ' + socks.color;
//     document.querySelector('#pattern').innerHTML = 'Pattern: ' +
//         socks.pattern;
//     document.querySelector('#material').innerHTML = 'Material: ' +
//         socks.material;
//     document.querySelector('#condition').innerHTML = 'Condition: ' +
//         socks.condition;
//     document.querySelector('#forFoot').innerHTML = 'For Foot: ' +
//         socks.forFoot;
//     if (socks.color != null) {
//         if (socks.color === 'Blue') {
//             document.querySelector('#color').style.backgroundColor = 'lightblue';
//         }
//         if (socks.color === 'Pink') {
//             document.querySelector('#color').style.backgroundColor = 'pink';
//         }
//     }
// }
function updateHTML(socks) {
    // console.log(socks);
    document.getElementById('data').innerHTML = null;
    
    for (let i = 0; i < socks.length; i++) {
        let sock = socks[i].sockDetails;
        if (socks[i] == []) {
            alert("No more data to fetch!");
        } else {
        var sockDiv = document.createElement('div');
        if (i == 0 ) {//&& table == false) {
            table_str = `<table class="table"><thead><tr><th scope="col">Color: </th><th scope="col">Size: </th><th scope="col">Pattern: </th><th scope="col">Material: </th><th scope="col">Condition: </th><th scope="col">Foot: </th></tr></thead><tbody>`;
           // table = true;
        } 
       table_str += `<tr><th scope="row">${sock.color}</th><td>${sock.size}</td><td>${sock.pattern}</td><td>${sock.material}</td><td>${sock.condition}</td><td>${sock.forFoot}</td></tr>`;
        
        //     - Tablestring = "<table><tr><th>Name:</th><th>Score:</th></tr>
        //     - For ( let counter = 0;counter < students.lenght; counter ++)  // only want it for duration of loop
        //     - { 
        //     - Tablestring += '<tr><td class='student'>${students[counter]}</td><td class='scores'>${scores[counter]}</td></tr>
        //     - }
        // Tablestring += "</table>"
        // if ( i == socks.length-1) {
        //     // console.log("help");
        //     sockDiv.innerHTML += `</tbody></table>`;
        // }
        // console.log(sockDiv.innerHTML);
        // document.getElementById('data').appendChild(sockDiv);
    }
    }
    // table_str += `</tbody></table>`;
    console.log(table_str)
    if (socks.length == 0) {
        alert("No more data to fetch!");
    } else {
    sockDiv.innerHTML = table_str;
    console.log(sockDiv.innerHTML);
    document.getElementById('data').appendChild(sockDiv);
    table_str = ''
    }
    // table_str = '';

}
// Call the function to fetch and update data
getData();