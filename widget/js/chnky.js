
/* Dev variant of getting the status. It returns a JSON that has been captured and can be used for development
   to get around CORS
*/
function getChnkyStatusDev() {
    return chnkyStatus;
}   

/*
 This method should be used when the Chnky API allows CORS
*/
async function getChnkyStatus() {
    let options = { 
        method: "GET",
        headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYW5kc3ZlQGdtYWlsLmNvbSIsImNvbXBhbnkiOiJwcml2YXRlIiwiY29tcGFueUlkIjoiNDhhZTM0ZDZiMzgwYzVlYyIsImZpcnN0bmFtZSI6IkFuZGVycyIsImxhc3RuYW1lIjoiU3ZlbnNzb24iLCJzY29wZXMiOlsiY2hhbm5lbHMiLCJjb25maWciXX0sImlhdCI6MTYyMDI0MDQ2NCwiZXhwIjoxNjIwODQ1MjY0fQ.u5yRr65BvgLzOu6HGaR9EVXVJoIrs4SpBYXDMzBrNDA"}
    }       
    return fetch("https://w7bt024bm8.execute-api.eu-central-1.amazonaws.com/prod/getconfigandstatus", options);  
}

function renderWidget(config) {    
    (async () => {
    
    let html = [];

    //let chnky = getChnkyStatusDev();
    let chnky = await (await getChnkyStatus()).json()

    console.log(chnky);

    html.push(`<table id="chnky-status-table">`);
    html.push(`<thead>`);
    html.push(`<tr>`);
    for (let s of chnky.status) {
        let channelName = chnky.config.filter(c => c.ChannelID == s.ChannelID)[0].Name;
        html.push(`<th><div class="channel-name">${channelName}</div></th>`);        
    }
    html.push(`</tr>`);
    html.push(`</thead>`);
    html.push(`<tbody>`);
    html.push(`<tr>`);        
    for (let s of chnky.status) {
        let status = s.Error ? 'chnky-error' : 'chnky-ok';
        let title = s.Error ? 'Error' : 'Ok';
        let channelName = chnky.config.filter(c => c.ChannelID == s.ChannelID)[0].Name;
        if (s.Active) {
            html.push(`<td><div title="${title}" class="${status}"></div></td>`);
        } else {
            html.push(`<td><div title="${title}" class="chnky-inactive"></div></td>`);
        }
    }
    html.push(`</tr>`);
    html.push(`</tbody>`);
    html.push(`</table>`);

    /* Build the HTML table and render it on the target div */
    $(`#widget-container`).html(html.join(''));
})();
}
