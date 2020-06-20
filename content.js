console.log('Quora Theme Extension is running!')

document.documentElement.style.opacity = 0
chrome.runtime.onMessage.addListener(gotMessage)

const colorSchemes = {
	dark: {
		primary: '#212121',
		secondary: '#303030',
	},
	clairvoyant: {
		primary: '#39065a',
		secondary: '#6a0572',
	},
}

function gotMessage(message, sender, sendResponse) {
	console.log('msg', message);
	
	sendResponse({ txt: 'ok' })

	if (message.for != 'bg' && message.theme == 'light') unloadCSS()
	else loadCSS(message.theme)
}

function loadCSS(file) {
	unloadCSS()

	var link = document.createElement('link')
	link.href = chrome.extension.getURL('css/custom.css')
	link.id = file
	link.type = 'text/css'
	link.rel = 'stylesheet'

	document.getElementsByTagName('body')[0].appendChild(link)

	document.documentElement.style.setProperty(
		'--primary-bg-color',
		colorSchemes[file].primary
	)
	document.documentElement.style.setProperty(
		'--secondary-bg-color',
		colorSchemes[file].secondary
	)
}

function unloadCSS() {
	//dark
	var cssNode = document.getElementById('dark')
	cssNode && cssNode.parentNode.removeChild(cssNode)

	//clairvoyant
	cssNode = document.getElementById('clairvoyant')
	cssNode && cssNode.parentNode.removeChild(cssNode)
}

document.addEventListener('DOMContentLoaded', function() {
	chrome.storage.sync.get(['currTheme'], function(result) {
		console.log(result)
		if (result.currTheme == 'light' || !result.currTheme) unloadCSS()
		else loadCSS(result.currTheme)
	})

	//changing opacity back to normal
	document.documentElement.style.opacity = 1
})
