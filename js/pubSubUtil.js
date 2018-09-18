// module 
var pubSubUtil = (function() {

	var subscribers = {};

	function subscribe(msg, callback) {
		subscribers[msg] = callback;
	}

	function publish(msg) {
		var args = Array.prototype.slice.call(arguments);
		if(subscribers[msg]){
			subscribers[msg].apply(null, args.slice(1));
		}	
	}
	return {
		subscribe: subscribe,
		publish: publish
	};
})();