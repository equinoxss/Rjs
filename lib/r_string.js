	//
	//	Ruby String methods
	//

(function (proto) {

	/** CONSTUCTION */

	proto.times = function() {
		if (arguments.length == 0) return this;
		var ar = [], t = arguments[0];
		while (t-- > 0) ar.push(this);
		return ar.join("");
	}

	proto.gsub = function() {
		if (arguments.length < 2) {
			throw "missing argument(s)";
		} else {
			var pattern;
			if (typeof arguments[0] == "string") {
				pattern = arguments[0];
			} else if (typeof arguments[0] == "object") {
				pattern = arguments[0].source;
			}
			return this.replace(new RegExp(pattern, "g"), arguments[1]);
		}
	}

	//  TODO: move to Set
	// proto.intersection = function() {
	// 	var dictionary = {},
	// 			buffer = this + Array.prototype.slice.call(arguments).join(""),
	// 			result = "";
	// 	buffer.chars(function(c) {
	// 		dictionary[c] |= 0;
	// 		dictionary[c]++;
	// 	});
	// 	for (key in dictionary) {
	// 		if (dictionary[key] > 1) {
	// 			result += key
	// 		}
	// 	}
	// 	return result;
	// }


	// proto.union = function() {
	// 	var dictionary = {},
	// 			setCount = 1 + arguments.length,
	// 			buffer = this + Array.prototype.slice.call(arguments).join(""),
	// 			result = "";
	// 	buffer.chars(function(c) {
	// 		dictionary[c] |= 0;
	// 		dictionary[c]++;
	// 	});
	// 	for (key in dictionary) {
	// 		result += key.times(dictionary[key] / setCount);
	// 	}
	// 	return result;
	// }
	

	/** IDENTITY */

	// Apache Harmony
	proto.hash_code = function() {
		var hash = 0;
		if (this.length == 0) return hash;
		var buffer = this.reverse()
				multiplier = 1;
		for (var i=0, len=buffer.length; i<len; i++) {
	    hash += buffer[i].charCodeAt(0) * multiplier;
	    multiplier = (multiplier << 5) - multiplier;
		}
		return hash;
	}

	/** COMPARISON */

	proto.compare = function(that) {
		if (this < that) {
			return -1;
		} else if (this > that) {
			return 1;
		} else {
			return 0;
		}
	}

	proto.casecmp = function(that) {
		return this.downcase().compare( that.downcase() );
	}

	proto.ascii_only = function() {
		var result = true;
		for (var i=0, len=this.length; i<len; i++) {
			result &= this.charCodeAt(i) < 128;
		}
		return result;
	}

	proto.end_with = function() {
		if (arguments.length == 0) {
			return false;
		} else {
			var result = false;
			for (var i=0, len=arguments.length; i<len; i++) {
				if (typeof arguments[i] == "string") {
					result |= (this.indexOf(arguments[i]) == this.length - arguments[i].length);
				}
			}
			return result;
		}
	}

	proto.eql = function() {
		return this.equals.apply(this, arguments);
	}

	proto.equals = function() {
		if (arguments.length == 0) {
			return false;
		} else {
			return (this.length == arguments[0].length) && (this.compare(arguments[0]) == 0);
		}
	}

	proto.include = function() {
		return this.includes.apply(this, arguments);
	}

	proto.includes = function () {
		if (arguments.length == 0) {
			return false;
		}
		return this.indexOf(arguments[0]) >= 0;
	}

	proto.start_with = function() {
		return this.starts_with.apply(this, arguments);
	}

	proto.starts_with = function() {
		var result = false;
		for(var i=0, len=arguments.length; i<len && !result; i++) {
			result |= this.indexOf(arguments[i]) == 0;
		}
		return result;
	}

	/** ACCESSORS/ITERATION */

	proto.bytes = function() {
		if (arguments.length == 1 && typeof arguments[0] == "function") {
			return this._walk(arguments[0], this._byte_accessor)
		} else {
			return this.to_bytes();
		} 
	}

	proto.each_byte = function() {
		return this.bytes.apply(this, arguments);
	}

	proto.chars = function() {
		if (arguments.length == 1 && typeof arguments[0] == "function") {
			return this._walk(arguments[0], this._char_accessor)
		} else {
			return this.to_a();
		} 
	}

	proto.each_char = function() {
		return this.chars.apply(this, arguments);
	}

	proto.each_line = function() {
		var lines = this.split(/\r\n|\r|\n/);
		if (arguments.length == 1 && typeof arguments[0] == "function") {
			lines.each(arguments[0]);
		} else {
			return lines;
		}
	}

	proto.lines = function() {
		return this.each_line.apply(this, arguments);
	}

	proto.count = function() {
		// count character intersection of arguments
		// ^ means invert
	}

	proto.delete = function() {
		// delete intersection of arguments, return remainder
		// ^ means invert -- same as count
	}

	proto.is_empty = function() {
		return this.length == 0;
	}

	proto.index = function() {
		if (arguments.length == 0) {
			throw "missing argument(s)"
		} else {
			var buffer = this,
					offset = 0,
					index = -1;
			if (arguments.length == 2) {
				buffer = this.substr(arguments[1]);
				offset = this.length - buffer.length;
			}
			if (typeof arguments[0] == "object") {
				index = buffer.search(arguments[0]);
			} else if (typeof arguments[0] == "string") {
				index = buffer.indexOf(arguments[0]);
			} 
			return (index == -1) ? null : index + offset;
		}
	}

	proto.rindex = function() {
		if (arguments.length == 0) {
			throw "missing argument(s)"
		} else {
			var buffer = this,
					index = -1;
			if (arguments.length == 2) {
				buffer = this.substr(0, arguments[1] > 0 ? arguments[1] + 1 : this.length + arguments[1] + 1);
			}
			if (typeof arguments[0] == "object") {
				var matches = buffer.match(new RegExp(arguments[0].source, "g"));
				if (matches) {
					index = buffer.lastIndexOf(matches[matches.length-1]);
				}
			} else if (typeof arguments[0] == "string") {
				index = buffer.lastIndexOf(arguments[0]);
			} 
			return (index == -1) ? null : index;
		}
	}

	proto.ord = function() {
		return this.charCodeAt(0);
	}

	proto.partition = function() {
		if (arguments.length == 0) {
			throw "missing argument";
		}
		var pos1 = 0, pos2, pos3;
		if (typeof arguments[0] == "string") {
			pos2 = this.indexOf(arguments[0]);
			pos3 = pos2 + arguments[0].length;
		} else if (typeof arguments[0] == "object") {
			pos2 = this.search(arguments[0]);
			pos3 = pos2 + arguments[0].source.length;
		}
		if (pos2 == -1) {
			return [this, "", ""];
		} else {
			return [this.slice(pos1, pos2), this.slice(pos2, pos3), this.slice(pos3)];
		}
	}

	proto.scan = function() {
		if (arguments.length == 0) {
			throw "missing argument";
		}
		if (typeof arguments[0] != "object") {
			throw "invalid argument";
		}
		var pattern = new RegExp(arguments[0].source, "g");
		if (arguments.length == 2 && typeof arguments[1] == "function") {
			return this.match(pattern).each(arguments[1]);
		}
		return this.match(pattern);
	}


	/** MODIFIERS */

	proto.capitalize = function() {
		return this.slice(0,1).upcase() + this.slice(1).downcase();
	}

	proto.downcase = function() {
		return this.toLowerCase();
	}

	proto.upcase = function() {
		return this.toUpperCase();
	}

	proto.chomp = function() {
		var pattern = /[\r\n]*$/;
		if (arguments.length) {
			pattern = new RegExp(arguments[0]+"$");
		}
		return this.replace(pattern, "");
	}

	proto.chop = function() {
		var pattern = /([\r\n]*|.)$/;
		return this.replace(pattern, "");
	}

	proto.strip = function() {
		return this.lstrip().rstrip();
	}

	proto.lstrip = function() {
		return this.replace(/^[\s\t\n\r]*/,"");
	}

	proto.rstrip = function() {
		return this.replace(/[\s\t\n\r]*$/,"");
	}

	proto.insert = function() {
		if (arguments.length != 2) {
			throw "missing argument(s)";
		}
		if (arguments[0] == 0) {
			return arguments[1] + this;
		} else if (arguments[0] >= this.length) {
			return this + arguments[1];
		} else {
			var seg1, seg2;
			if (arguments[0] > 0) {
				seg1 = this.slice(0,arguments[0]);
				seg2 = this.slice(arguments[0]);
			} else {
				seg1 = this.slice(0, this.length + arguments[0] + 1);
				seg2 = this.slice(this.length + arguments[0] + 1);
			}
			return seg1 + arguments[1] + seg2;
		}
	}

	proto.prepend = function() {
		if (arguments.length < 1) {
			throw "missing argument";
		}
		return arguments[0] + this;
	}

	proto.reverse = function() {
		return this.chars().reverse().join("");
	}

	proto.squeeze = function() {
		return this.replace(/(.)(?=\1)/g, "");
	}

	proto.tr = function() {
		return this.translate.apply(this, arguments);
	}

	proto.translate = function() {
		if (arguments.length < 2) {
			throw "missing arguments";
		}
		if (arguments[1].length == 1) {
			return this.replace(new RegExp("[" + arguments[0] + "]", "g"), arguments[1]);
		}
		var buffer = [],
				subStrLength = arguments[1].length;
		for (var i=0, len=this.length; i<len; i++) {
			var index = arguments[0].indexOf(this[i]);
			if (index == -1) {
				buffer.push( this[i] );
			} else {
				buffer.push( arguments[1].charAt( index > subStrLength - 1 ? subStrLength - 1 : index ) );
			}
		}
		return buffer.join("");
	}


	/** FORMATING */

	proto.ljust = function() {
		if (arguments.length == 0) {
			throw "missing argument(s)";
		}
		return this + (arguments[1] ? arguments[1][0] : " ").times(arguments[0] - this.length);
	}

	proto.rjust = function() {
		return (arguments[1] ? arguments[1][0] : " ").times(arguments[0] - this.length) + this;
	}

	proto.center = function() {
		var leftLen = Math.round((arguments[0] - this.length) / 2),
				rightLen = arguments[0] - this.length - leftLen,
				padding = arguments[1] ? arguments[1][0] : " ";
		return padding.times(leftLen) + this + padding.times(rightLen);
	}


	/** CONVERSION */

	proto.to_a = function() {
		return this._to_array(this._char_accessor);
	}

	proto.to_bytes = function() {
		return this._to_array(this._byte_accessor);
	}

	proto.hex = function () {
		if (this.is_empty()) {
			return NaN;
		} else {
			var buffer = this.lstrip(),
					negative = buffer[0] == "-",
					offset = (negative) ? 1 : 0
					isHex = buffer.indexOf("0x") == offset,
					hexStr = (negative?"-":"") + (isHex?"":"0x") + buffer.substr(offset);
			return parseInt(hexStr);
		}
	}

	proto.to_i = function() {
		return parseInt(this);
	}

	proto.to_f = function() {
		return parseFloat(this);
	}

	/** CLOCKWORKS */

	proto._to_array = function(accessor) {
		var result = [],
				func = accessor();
		for (var i=0, len=this.length; i<len; i++) {
			result.push( this[func](i) );
		}
		return result;
	}

	proto._walk = function(callback, accessor) {
		var func = accessor();
		for (var i=0, len=this.length; i<len; i++) {
			callback( this[func](i), i );
		}
	}

	proto._walk_backwards = function(callback, accessor) {
		var func = accessor();
		for (var i=this.length-1; i>=0; i--) {
			callback( this[func](i), i );
		}
	}

	proto._byte_accessor = function(i) {
		return "charCodeAt";
	}

	proto._char_accessor = function(i) {
		return "charAt";
	}

})(String.prototype);