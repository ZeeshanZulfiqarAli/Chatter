function gatherIceCandidates( lc, onCandidate ) {
    
    console.log('=', lc);

    let t;
    lc.onicecandidate = e =>  {
        console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
        console.log(JSON.stringify(lc.localDescription))
        if (t) {
            clearTimeout(t);
        }
        t = setTimeout(() => {
            onCandidate(lc.localDescription);
        }, 300);
    }

    const sendChannel = lc.createDataChannel("sendChannel");
    sendChannel.onmessage = e =>  console.log("messsage received!!!"  + e.data )
    sendChannel.onopen = e => console.log("open!!!!");
    sendChannel.onclose =e => console.log("closed!!!!!!");

    lc.createOffer().then(o => {
        console.log('____', o);
        lc.setLocalDescription(o)
    })

    return sendChannel;
}

export default gatherIceCandidates;