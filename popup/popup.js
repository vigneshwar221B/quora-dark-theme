function handleChange(event) {
	console.log('handle change')
	console.log(event.currentTarget.getAttribute('value'))
	chrome.runtime.sendMessage(
		{ theme: event.currentTarget.getAttribute('value'), for: 'bg' },
		function(response) {
			reRender()
		}
	)
}

function reRender() {
	chrome.storage.sync.get(['currTheme'], function(result) {
		//console.log(result)
		if (result) console.log(result.theme)

		document.getElementById('dark').style.backgroundColor = '#fff8dc'
		document.getElementById('light').style.backgroundColor = '#fff8dc'
		document.getElementById('clairvoyant').style.backgroundColor = '#fff8dc'

		document.getElementById(result.currTheme).style.backgroundColor = '#a9a9a9'
	})
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('dark').addEventListener('click', handleChange)
	document.getElementById('light').addEventListener('click', handleChange)
	document.getElementById('clairvoyant').addEventListener('click', handleChange)

	reRender()
})
