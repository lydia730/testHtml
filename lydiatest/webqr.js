// QRCODE reader Copyright 2011 Lazar Laszlo
// http://www.webqr.com

var gCtx = null;
var gCanvas = null;
var c=0;
var stype=0;
var gUM=false;
var webkit=false;
var moz=false;
var v=null;

var imghtml='<div id="qrfile"><canvas id="out-canvas" width="320" height="240"></canvas>'+
    '<div id="imghelp">drag and drop a QRCode here'+
	'<br>or select a file'+
	'<input type="file" onchange="handleFiles(this.files)"/>'+
	'</div>'+
'</div>';

var vidhtml = '<video id="v" autoplay></video>';

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;
  if(files.length>0)
  {
	handleFiles(files);
  }
  else
  if(dt.getData('URL'))
  {
	qrcode.decode(dt.getData('URL'));
  }
}

function handleFiles(f)
{
	var o=[];
	
	for(var i =0;i<f.length;i++)
	{
        var reader = new FileReader();
        reader.onload = (function(theFile) {
        return function(e) {
            gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

			qrcode.decode(e.target.result);
        };
        })(f[i]);
        reader.readAsDataURL(f[i]);	
    }
}

function initCanvas(w,h)
{
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
}


function captureToCanvas() {
    if(stype!=1)
        return;
    if(gUM)
    {
        try{
            gCtx.drawImage(v,0,0);
            try{
                qrcode.decode();
            }
            catch(e){       
                console.log(e);
                setTimeout(captureToCanvas, 500);
            };
        }
        catch(e){       
                console.log(e);
                setTimeout(captureToCanvas, 500);
        };
    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function read(a)
{
    var html="<br>";
    var el=document.querySelector(".listt");
    var dt=document.querySelector(".outdivv");
    if(a.indexOf("http://") === 0 || a.indexOf("https://") === 0)
        html+="<a href='"+a+"' target='_blank'><button>確認</button></a><br>";
    html+="<b>"+htmlEntities(a)+"</b><br><br>";
    document.getElementById("result").innerHTML=html;
    
    
    if(a=="http://192.168.1.2:10200/NISE3900")
    {
        el.innerHTML = '<li><a href="http://192.168.1.2:10200/main" onclick="openLink(event)"> Home </a></li><li><a href="http://192.168.1.2:10200/NISE3900_1" onclick="openLink(event)"> 履歷明細 </a></li><li><a href="http://192.168.1.2:10200/NISE3900_TS" onclick="openLink(event)"> 交大系統 </a></li><li><a href="http://192.168.1.2:10200/NISE3900_V1" onclick="openLink(event)"> 鎖板VID </a></li><li><a href="http://192.168.1.2:10200/NISE3900_V2" onclick="openLink(event)"> 外殼VID </a></li><li><a href="http://192.168.1.2:10200/NISE3900_V3" onclick="openLink(event)"> 包裝VID </a></li>';
        dt.innerHTML ='<p> Product Name: NISE3900</p><p>Product S/N: M30001CVZDVCG6B</p><p> Product Emissions: 140.28 KgCO2e</p><p> Product Started Time: 2023/1/7 15:51:10</p><p> Product Ended Time: 2023/1/19 06:52:22</p>'
        document.getElementById("myLink").addEventListener("click", function(event) {
            event.preventDefault(); // 阻止默认的链接跳转行为
        });
    }
    else if(a=="http://192.168.1.2:10200/NIFE210-E01")
    {
        el.innerHTML = '<li><a href="http://192.168.1.2:10200/main" target="_blank"> Home </a></li><li><a href="http://192.168.1.2:10200/NIFE210-E01_1" target="_blank"> 履歷明細 </a></li><li><a href="http://192.168.1.2:10200/NIFE210-E01_TS" target="_blank"> 交大系統 </a></li><li><a href="http://192.168.1.2:10200/NIFE210-E01_V1" target="_blank"> 鎖板VID </a></li><li><a href="http://192.168.1.2:10200/NIFE210-E01_V2" target="_blank"> 外殼VID </a></li><li><a href="http://192.168.1.2:10200/NIFE210-E01_V3" target="_blank"> 包裝VID </a></li>';
        dt.innerHTML ='<p> Product Name: NIFE210-E01</p><p> Product S/N: X13301B7THDKQA7</p><p> Product Emissions: 168.42 KgCO2e</p><p> Product Started Time: 2022/11/24 22:50:58</p><p> Product Ended Time: 2022/12/14 16:47:00</p>'
    }
    else if(a=="http://192.168.1.2:10200/IPPC1611-C11")
    {
        el.innerHTML = '<li><a href="http://192.168.1.2:10200/main" onclick="openLink(event)"> Home </a></li><li><a href="http://192.168.1.2:10200/IPPC1611-C11_1"onclick="openLink(event)"> 履歷明細 </a></li><li><a href="http://192.168.1.2:10200/IPPC1611-C11_TS"onclick="openLink(event)"> 交大系統 </a></li><li><a href="http://192.168.1.2:10200/IPPC1611-C11_V1"onclick="openLink(event)"> 鎖板VID </a></li><li><a href="http://192.168.1.2:10200/IPPC1611-C11_V2"onclick="openLink(event)"> 外殼VID </a></li><li><a href="http://192.168.1.2:10200/IPPC1611-C11_V3"onclick="openLink(event)"> 包裝VID </a></li>';
        dt.innerHTML ='<p> Product Name: IPPC1611-C11</p><p> Product S/N: X12400HWMPM9DD9</p><p> Product Emissions: 5.48 KgCO2e</p><p> Product Started Time: 2022/10/18 01:08:59</p><p> Product Ended Time: 2022/10/29 08:57:05</p>'
    }
    else if(a=="http://192.168.1.2:10200/PEAK980VL2")
    {
        el.innerHTML = '<li><a href="http://192.168.1.2:10200/main"onclick="openLink(event)"> Home </a></li><li><a href="http://192.168.1.2:10200/PEAK980VL2_1"onclick="openLink(event)"> 履歷明細 </a></li><li><a href="http://192.168.1.2:10200/PEAK980VL2_TS"onclick="openLink(event)"> 交大系統 </a></li>';
        dt.innerHTML ='<p> Product Name: PEAK980VL2</p><p> Product S/N: X13301B7THDKQA7</p><p> Product Emissions: 131.45 KgCO2e</p><p> Product Started Time: 2022/11/22 06:43:29</p><p> Product Ended Time: 2022/12/21 08:40:01</p>'
    }
    else if(a=="http://192.168.1.2:10200/CPS50-N02")
    {
        el.innerHTML = '<li><a href="http://192.168.1.2:10200/main"onclick="openLink(event)"> Home </a></li><li><a href="http://192.168.1.2:10200/CPS50-N02_1"onclick="openLink(event)"> 履歷明細 </a></li><li><a href="http://192.168.1.2:10200/CPS50-N02_TS"onclick="openLink(event)"> 交大系統 </a></li><li><a href="http://192.168.1.2:10200/CPS50-N02_V1"onclick="openLink(event)"> 鎖板VID </a></li><li><a href="http://192.168.1.2:10200/CPS50-N02_V2"onclick="openLink(event)"> 外殼VID </a></li><li><a href="http://192.168.1.2:10200/CPS50-N02_V3"onclick="openLink(event)"> 包裝VID </a></li>';
        dt.innerHTML ='<p> Product Name: CPS50-N02</p><p> Product S/N: X11301FTCD6JG90</p><p> Product Emissions: 197.18KgCO2e</p><p> Product Started Time: 2022/11/16 19:37:17</p><p> Product Ended Time: 2022/12/21 09:24:39</p>'
    }
}	

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}
function success(stream) 
{

    v.srcObject = stream;
    v.play();

    gUM=true;
    setTimeout(captureToCanvas, 500);
}
		
function error(error)
{
    gUM=false;
    return;
}

function load()
{
	if(isCanvasSupported() && window.File && window.FileReader)
	{
		initCanvas(800, 600);
		qrcode.callback = read;
		document.getElementById("mainbody").style.display="inline";
        setwebcam();
	}
	else
	{
		document.getElementById("mainbody").style.display="inline";
		document.getElementById("mainbody").innerHTML='<p id="mp1">QR code scanner for HTML5 capable browsers</p><br>'+
        '<br><p id="mp2">sorry your browser is not supported</p><br><br>'+
        '<p id="mp1">try <a href="http://www.mozilla.com/firefox"><img src="firefox.png"/></a> or <a href="http://chrome.google.com"><img src="chrome_logo.gif"/></a> or <a href="http://www.opera.com"><img src="Opera-logo.png"/></a></p>';
	}
}

function setwebcam()
{
	
	var options = true;
	if(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
	{
		try{
			navigator.mediaDevices.enumerateDevices()
			.then(function(devices) {
			  devices.forEach(function(device) {
				if (device.kind === 'videoinput') {
				  if(device.label.toLowerCase().search("back") >-1)
					options={'deviceId': {'exact':device.deviceId}, 'facingMode':'environment'} ;
				}
				console.log(device.kind + ": " + device.label +" id = " + device.deviceId);
			  });
			  setwebcam2(options);
			});
		}
		catch(e)
		{
			console.log(e);
		}
	}
	else{
		console.log("no navigator.mediaDevices.enumerateDevices" );
		setwebcam2(options);
	}
	
}

function setwebcam2(options)
{
	console.log(options);
	document.getElementById("result").innerHTML="- scanning -";
    if(stype==1)
    {
        setTimeout(captureToCanvas, 500);    
        return;
    }
    var n=navigator;
    document.getElementById("outdiv").innerHTML = vidhtml;
    v=document.getElementById("v");


    if(n.mediaDevices.getUserMedia)
    {
        n.mediaDevices.getUserMedia({video: options, audio: false}).
            then(function(stream){
                success(stream);
            }).catch(function(error){
                error(error)
            });
    }
    else
    if(n.getUserMedia)
	{
		webkit=true;
        n.getUserMedia({video: options, audio: false}, success, error);
	}
    else
    if(n.webkitGetUserMedia)
    {
        webkit=true;
        n.webkitGetUserMedia({video:options, audio: false}, success, error);
    }

    document.getElementById("qrimg").style.opacity=0.2;
    document.getElementById("webcamimg").style.opacity=1.0;

    stype=1;
    setTimeout(captureToCanvas, 500);
}

function setimg()
{
	document.getElementById("result").innerHTML="";
    if(stype==2)
        return;
    document.getElementById("outdiv").innerHTML = imghtml;
    //document.getElementById("qrimg").src="qrimg.png";
    //document.getElementById("webcamimg").src="webcam2.png";
    document.getElementById("qrimg").style.opacity=1.0;
    document.getElementById("webcamimg").style.opacity=0.2;
    var qrfile = document.getElementById("qrfile");
    qrfile.addEventListener("dragenter", dragenter, false);  
    qrfile.addEventListener("dragover", dragover, false);  
    qrfile.addEventListener("drop", drop, false);
    stype=2;
}

function openLink(event) {
    event.preventDefault(); // 阻止默認的連結行為

    // 獲取連結的 href
    var linkHref = event.target.parentElement.href;

    // 使用 window.open 開啟新的視窗
    window.open(linkHref, '_self'); // '_self' 表示在當前窗口中打開
}
/*function showButton()
{
    var el=document.querySelector(.list);

    //var intext = document.
    var inputText = a;
    var outputDiv = document.getElementById('output');

    // 在這裡進行文字判斷
    if (inputText.includes('關鍵字1')) {
        el.innerHTML = '<li><a href="index.html"> Homeee </a></li>'; 
        
        outputDiv.innerHTML = '<button>按鈕1</button>';
    }
    else if (inputText.includes('關鍵字2')) {
        outputDiv.innerHTML = '<button>按鈕2</button>';
    } 
     else {
         outputDiv.innerHTML = '<p>沒有找到相應的按鈕。</p>';
    }
}*/
