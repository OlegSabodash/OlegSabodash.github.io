import ServerAnsver from './request.js';
import DOM from './createDOM';
import './css/style.css';

const body = document.getElementById('body');
body.innerHTML = `<div id="slider"><div id="search"><div class="wrapButton"><button id="searchIcon"><i class="fa fa-search" aria-hidden="true"></i></button></div><div class="wrapInput"><input type="text" value="java" id="inputSearch"></div></div></div>${  body.innerHTML}`;

const dom = new DOM(new ServerAnsver());
dom.start();