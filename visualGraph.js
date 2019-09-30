var container = document.createElement('div');
container.setAttribute('class', 'vGcont');
document.body.appendChild(container);


var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '.vGcont { color: #F00; }';
document.getElementsByTagName('head')[0].appendChild(style);



console.log('Graph Visualizer is activated.')
