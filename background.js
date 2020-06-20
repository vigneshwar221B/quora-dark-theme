console.log('background running')

chrome.storage.sync.set({ currTheme: 'dark' }, function() {
	console.log('Value is set')
})

//for listening any message which comes from runtime
chrome.runtime.onMessage.addListener(messageReceived)

function messageReceived(msg, msgsender, sendResponse) {
	sendResponse({ txt: 'ok' })
	if (msg.theme) {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { theme: msg.theme }, function (
				response
			) {})
		})

		//save to local storage
		chrome.storage.sync.set({ currTheme: msg.theme }, function () {
			console.log('Value is set')
		})
	}
}
