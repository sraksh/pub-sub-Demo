// module 
var pubSubUtil = (function() {

	var subscribers = {};

	function subscribe(msg, callback) {
		// subscribers[msg] = subscribers[msg] || [];
		subscribers[msg] = callback;
	}

	function publish(msg) {
		console.log(arguments);
		var args = Array.prototype.slice.call(arguments);
		console.log(args.slice(1));
		if(subscribers[msg]){
			//for(var i=0, n=subscribers[msg].length; i < n; i++) {
				subscribers[msg].apply(null, args.slice(1));
			//}
		}	
	}
	return {
		subscribe: subscribe,
		publish: publish
	};
})();