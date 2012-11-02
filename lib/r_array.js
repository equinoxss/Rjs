
Array.prototype.each = function(callback) {
  if (callback == void 0) return;
  for (var i=0, len=this.length; i<len; i++) {
    callback( this[i] );
  }
}
