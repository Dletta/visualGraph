/* Visual Graph Library / Visualizer
* The library will require d3 to be added into your website.
* License: MIT
* Author: Jachen Duschletta 2019
* Version: 0.1.0
* Please leave any issues in the Github Issues for github.com/dletta/visualGraph, thank you!
*/

var icon = 'data:image/jpeg;base64, ' + "PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9IiNjY2NjY2MiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSI0MDIiIHdpZHRoPSI0MDIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPGxpbmUgc3Ryb2tlLWxpbmVjYXA9InVuZGVmaW5lZCIgc3Ryb2tlLWxpbmVqb2luPSJ1bmRlZmluZWQiIGlkPSJzdmdfNyIgeTI9IjI2Mi40NDk5OTciIHgyPSIzMDEuNSIgeTE9IjMwOS40NDk5OTciIHgxPSIxMDEuNSIgc3Ryb2tlLXdpZHRoPSIxMi41IiBzdHJva2U9IiM2MGJjNjAiIGZpbGw9Im5vbmUiLz4KICA8bGluZSBzdHJva2UtbGluZWNhcD0idW5kZWZpbmVkIiBzdHJva2UtbGluZWpvaW49InVuZGVmaW5lZCIgaWQ9InN2Z184IiB5Mj0iMjY4LjQ0OTk5NyIgeDI9IjMxMy41IiB5MT0iMTYzLjQ0OTk5NyIgeDE9IjE2NS41IiBzdHJva2Utd2lkdGg9IjEyLjUiIHN0cm9rZT0iIzYwYmM2MCIgZmlsbD0ibm9uZSIvPgogIDxsaW5lIHN0cm9rZS1saW5lY2FwPSJ1bmRlZmluZWQiIHN0cm9rZS1saW5lam9pbj0idW5kZWZpbmVkIiBpZD0ic3ZnXzYiIHkyPSIzMDAuNDQ5OTk3IiB4Mj0iOTkuNSIgeTE9IjE3MS40NDk5OTciIHgxPSIxNTUuNSIgc3Ryb2tlLXdpZHRoPSIxMi41IiBzdHJva2U9IiM2MGJjNjAiIGZpbGw9Im5vbmUiLz4KICA8bGluZSBzdHJva2UtbGluZWNhcD0idW5kZWZpbmVkIiBzdHJva2UtbGluZWpvaW49InVuZGVmaW5lZCIgaWQ9InN2Z181IiB5Mj0iMTU3LjQ0OTk5NyIgeDI9IjE3NS41IiB5MT0iODMuNDQ5OTk3IiB4MT0iMzMzLjUiIHN0cm9rZS13aWR0aD0iMTIuNSIgc3Ryb2tlPSIjNjBiYzYwIiBmaWxsPSJub25lIi8+CiAgPGVsbGlwc2Ugcnk9IjMxLjk5OTk5OSIgcng9IjMzLjUwMDAwMSIgaWQ9InN2Z18xIiBjeT0iODQuNDQ5OTk2IiBjeD0iMzMzLjk5OTk5NyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZT0iIzAwMCIgZmlsbD0iIzYwYmM2MCIvPgogIDxlbGxpcHNlIHJ5PSIzMiIgcng9IjMyIiBpZD0ic3ZnXzIiIGN5PSIxNjQuNDQ5OTk3IiBjeD0iMTYyLjUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMwMDAiIGZpbGw9IiM2MGJjNjAiLz4KICA8ZWxsaXBzZSByeT0iMzMiIHJ4PSIzMyIgaWQ9InN2Z18zIiBjeT0iMjY2LjQ0OTk5NyIgY3g9IjMwOS41IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjMDAwIiBmaWxsPSIjNjBiYzYwIi8+CiAgPGVsbGlwc2Ugcnk9IjMzIiByeD0iMzMiIGlkPSJzdmdfNCIgY3k9IjMwNS40NDk5OTciIGN4PSI5OC41IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjMDAwIiBmaWxsPSIjNjBiYzYwIi8+CiA8L2c+Cjwvc3ZnPg=="

var ic = document.createElement('img');
ic.setAttribute('src', icon);
ic.setAttribute('class', 'vGbutton');
ic.addEventListener('click', switchMenu);
document.body.appendChild(ic);

var container = document.createElement('div');
container.setAttribute('class', 'vGcont');
var test = document.createTextNode('Testing');
container.appendChild(test)
document.body.appendChild(container);


var style = document.createElement('style');
style.type = 'text/css';
var str = '.vGcont {';
str += 'color: rgb(255,255,255);';
str += 'background-color: rgba(20,20,20,0.2);';
str += 'position: fixed;';
str += 'z-index: 1;';
str += 'width: 0;';
str += 'height: 100%;';
str += 'overflow-x: hidden;';
str += 'top: 0;';
str += 'left: 0;';
str += 'padding: 20px;';
str += 'transition: 0.5s;';
str += '}';
str += '.vGbutton {';
str += 'color: rgb(255,255,255);';
str += 'background-color: rgba(20,20,20,0.2);';
str += 'position: fixed;';
str += 'z-index: 1;';
str += 'width: 100px;';
str += 'height: 100px;';
str += 'overflow-x: hidden;';
str += 'top: 0;';
str += 'left: 0;';
str += 'padding: 20px;';
str += 'transition: 0.5s;';
str += '}';
style.innerHTML = str;
document.getElementsByTagName('head')[0].appendChild(style);

function switchMenu() {
  var w = document.getElementsByClassName("vGCont").width;
  if(w == '100%') {
    w = 0;
  } else {
    w = '100%';
  }
  console.log('switching menu');
}

console.log('Graph Visualizer is activated.')
