(function(){
    function loadJS(url, success) {
      var domScript = document.createElement('script');
      domScript.src = url;
      success = success || function () {};
      domScript.onload = domScript.onreadystatechange = function () {
          if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
              success();
              this.onload = this.onreadystatechange = null;
              this.parentNode.removeChild(this);
          }
      }
      document.getElementsByTagName('head')[0].appendChild(domScript);
    }

    loadJS('//static001.geekbang.org/static/infoq/www/js/manifest.ed53a0f8bcd91f15efd5.js', function () {
      loadJS('//static001.geekbang.org/static/infoq/www/js/vendor.4b47c3c2bd0c96ecce5c.js', function () {
        loadJS('//static001.geekbang.org/static/infoq/www/js/app.e756556a6ec0ac640337.js');
      });
    });
  })();