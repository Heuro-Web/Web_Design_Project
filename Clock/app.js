let h = document.getElementById('hour')
let m = document.getElementById('minute')
let s = document.getElementById('sec')

setInterval(() => {
    let currentTime = new Date()
    h.textContent = (currentTime.getHours() < 10 ? "0" : '') + currentTime.getHours()
    m.textContent = (currentTime.getMinutes() < 10 ? "0" : '') + currentTime.getMinutes()
    s.textContent = (currentTime.getSeconds() < 10 ? "0" : '') + currentTime.getSeconds()
}, 1000);
