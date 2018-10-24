;
(function () {
  function Wu() {
    this.v = 'v1.1';
    this.canRemove = true;
    this.iosLoading = '<i class="wu-icon wu-loading"></i>';
    return;
  };
  Wu.prototype.addDom = function (el) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(el);
    document.querySelector('#app').appendChild(fragment);
  };
  Wu.prototype.hoverButton = function () {
    var i, len, btns = document.querySelectorAll('.wu-btn');
    for (i = 0, len = btns.length; i < len; i++) {
      btns[i].addEventListener('touchstart', function () {
        this.classList.add('wu-btn-hover')
      });
      btns[i].addEventListener('touchend', function () {
        this.classList.remove('wu-btn-hover')
      });
    }
  };
  Wu.prototype.showLoading = function (title) {
    var load = document.querySelector(".wu-toast");
    if (load) {
      load.parentNode.removeChild(load);
    };
    var $this = this;
    var n = title ? title : '';
    var el = document.createElement("div");
    var span = '<span class="wu-toast-content">' + n + '</span>';
    var h = '<div class="wu-mask-transparent"></div><div class="wu-block">' +
      '<div class="wu-toast-box wu-toast-loading">' +
      $this.iosLoading +
      (title ? span : '') +
      '</div></div>';
    el.innerHTML = h;
    el.className = 'wu-toast';
    this.addDom(el);
    setTimeout(function () {
      el.classList.add('wu-animate-in')
    }, 0)
  };
  Wu.prototype.showLoadingBg = function () {
    wu.hideToast();
    var $this = this;
    var el = document.createElement("div");
    var h = '<div class="wu-mask-transparent bg-white"></div>' +
      '<div class="wu-block"><div class="wu-toast-box wu-toast-box-transparent">' +
      $this.iosLoading +
      '</div></div>';
    el.innerHTML = h;
    el.className = 'wu-toast';
    this.addDom(el);
    setTimeout(function () {
      el.classList.add('wu-animate-in')
    }, 0);
    return false;
  };
  Wu.prototype.hideToast = function () {
    var el = document.querySelector('.wu-toast');
    var $this = this;
    if (el) {
      if ($this.canRemove) {
        $this.canRemove = false;
        el.classList.add('wu-animate-out');
        el.addEventListener('webkitTransitionEnd', function () {
          el.remove();
          $this.canRemove = true;
        });
      };
    };
    return false;
  };
  Wu.prototype.showError = function (title) {
    wu.hideToast();
    var t = title || '网络请求超时，轻触屏幕刷新';
    var el = document.createElement("div");
    el.innerHTML = '<div class="start-box-refresh"><div class="start-box-icon">' +
      '<i class="wu-icon icon-refresh"></i></div>' +
      '<p class="refresh-text">' + t + '<p>' +
      '</div>';
    el.className = 'wu-toast';
    this.addDom(el);
    setTimeout(function () {
      el.classList.add('wu-animate-in')
    }, 0);
    document.querySelector(".start-box-refresh").addEventListener("click", function () {
      location.reload();
    });
    return false;
  };
  Wu.prototype.showToast = function (obj) {
    this.hideToast();
    var title = obj.title,
      ismask = obj.mask ? true : false,
      icon = obj.icon || '',
      duration = obj.duration || 3000;
    if (typeof obj == 'string') {
      title = obj;
    };
    var el = document.createElement("div");
    var mask = '<div class="wu-mask-transparent"></div>';
    var iconLoad = '<i class="wu-icon wu-icon-toast ' + icon + '"></i>';
    var span = '<span class="wu-toast-content">' + title + '</span>';
    var h = (ismask ? mask : '') + '<div class="wu-block">' +
      '<div class="wu-toast-box">' +
      (icon ? iconLoad : '') +
      (title ? span : '') +
      '</div></div>';
    el.innerHTML = h;
    el.className = 'wu-toast';
    this.addDom(el);
    setTimeout(function () {
      el.classList.add('wu-animate-in');
    }, 0);
    setTimeout(function () {
      el.classList.add('wu-animate-out');
      el.addEventListener('webkitTransitionEnd', function () {
        el.remove();
      });
    }, duration);
    return false;
  };
  Wu.prototype.showMessage = function (obj) {
    var is_el = document.querySelector('.wu-message');
    this.hideToast();
    if (!is_el) {
      var el = document.createElement("div");
      var title = obj.title,
        top = obj.top || '0',
        duration = obj.duration || 3000,
        bgColor = obj.backgroundColor || 'rgba(17, 17, 17, 0.9)';
      var h = '<span class="wu-toast-content">' + title + '</span>';
      el.className = 'wu-message';
      el.style.backgroundColor = bgColor;
      el.innerHTML = h;
      this.addDom(el);
      setTimeout(function () {
        el.style.top = top + "px"
      }, 0);
      setTimeout(function () {
        el.style.top = "-44px";
        el.addEventListener('webkitTransitionEnd', function () {
          this.remove()
        });
      }, duration);
    };
    return false;
  };
  Wu.prototype.showDialog = function (ops) {
    var that = this;
    var title = ops.title || '提示',
      desc = ops.content || '',
      showCancel = ops.showCancel ? true : false,
      showInput = ops.showInput ? true : false;
    var el = document.createElement("div");
    var content_text = '<div class="dialog-text">' + desc + '</div>';
    var content_input = '<div class="dialog-input"><input type="text" class="dialog-prompt" autofocus /></div>';
    var h = '<div class="wu-mask-transparent wu-mask-black"></div>' +
      '<div class="dialog-content">' +
      '<div class="dialog-title">' + title + '</div>' +
      '<div class="dialog-body">' +
      (showInput ? content_input : content_text) +
      '</div>' +
      '<div class="dialog-foot">' +
      '<a class="wu-btn dialog-btn-cancel" style="' + (showCancel ? '' : 'display: none') + '">取消</a>' +
      '<a class="wu-btn dialog-btn-confirm">确认</a>' +
      '</div></div>';
    el.className = 'wu-dialog';
    el.innerHTML = h;
    this.addDom(el);
    this.hoverButton();
    if (showInput) {
      document.querySelector('.dialog-prompt').focus();
    };
    setTimeout(function () {
      el.classList.add('wu-animate-in');
    }, 0);
    document.querySelector('.wu-dialog').addEventListener('click', function (e) {
      that.handler(e, ops);
    }, false);
    return;
  };
  Wu.prototype.showAction = function (ops) {
    var that = this;
    var i, len, h = '';
    var title = ops.title || '',
      deleteText = ops.deleteText,
      menuArr = ops.menuArray || [];
    var el = document.createElement("div");
    h += '<div class="wu-mask-transparent wu-mask-black wu-mask-hide wu-mask-action"></div>' +
      '<div class="wu-actionsheet-main">' +
      '<div class="wu-actionsheet-title">' + title + '</div>' +
      '<div class="wu-actionsheet-menu">';
    if (menuArr.length) {
      for (i = 0, len = menuArr.length; i < len; i++) {
        h += '<div class="wu-btn wu-actionsheet-cell" data-value="' + menuArr[i].value + '" style="color: ' + menuArr[i].color + '">' + menuArr[i].title + '</div>';
      };
    };
    h += '</div><div class="wu-btn wu-actionsheet-cancel">取消</div></div>';
    el.className = "wu-actionsheet";
    el.innerHTML = h;
    this.addDom(el);
    this.hoverButton();
    setTimeout(function () {
      el.classList.add('wu-animate-in')
    }, 0);
    document.querySelector('.wu-actionsheet').addEventListener('click', function (e) {
      that.handler(e, ops);
    }, false);
    return;
  };
  Wu.prototype.handler = function (e, ops) {
    var that = this;
    var e = e || window.event;
    var target = e.target || e.srcElement;
    var cls = target.className;
    if (cls.indexOf('dialog-btn-confirm') >= 0) {
      var showInput = ops.showInput ? true : false;
      if (showInput) {
        var input_val = document.getElementsByClassName('dialog-prompt')[0].value;
        if (typeof ops.success == 'function') {
          ops.success({
            value: 'confirm',
            inputValue: input_val
          });
        };
      } else {
        if (typeof ops.success == 'function') {
          ops.success({
            value: 'confirm'
          });
        };
      };
      that.handlerHide('dialog');
      return false;
    };
    if (cls.indexOf('dialog-btn-cancel') >= 0) {
      if (typeof ops.success == 'function') {
        ops.success({
          value: 'cancel'
        });
      };
      that.handlerHide('dialog');
      return false;
    };
    if (cls.indexOf('wu-mask-action') >= 0 || cls.indexOf('wu-actionsheet-cancel') >= 0) {
      that.handlerHide('actionsheet');
      return false;
    }
    if (cls.indexOf('wu-btn wu-actionsheet-cell') >= 0) {
      var val = target.dataset.value,
        val_text = target.innerHTML;
      if (val == "delete") {
        wu.showDialog({
          title: '提示',
          content: ops.deleteText ? ops.deleteText : '确定删除吗？',
          showCancel: true,
          success: function (res) {
            if (res.value == "confirm") {
              ops.success({
                value: val,
                title: val_text
              })
            }
            that.handlerHide('actionsheet');
          }
        })
      } else {
        if (typeof ops.success == "function") {
          ops.success({
            value: val,
            title: val_text
          })
          that.handlerHide('actionsheet');
        }
      };
      return false;
    };
  };
  Wu.prototype.handlerHide = function (type) {
    var that = this;
    if (type == 'dialog') {
      var dialogView = document.querySelector('.wu-dialog');
      dialogView.classList.add('wu-animate-out');
      dialogView.addEventListener('webkitTransitionEnd', function () {
        this.remove()
      });
      document.body.removeEventListener('click', that.handler, false);
      return false;
    };
    if (type == 'actionsheet') {
      var actionSheet = document.querySelector('.wu-actionsheet');
      actionSheet.classList.add('wu-animate-out');
      actionSheet.addEventListener('webkitTransitionEnd', function () {
        this.remove()
      });
      document.body.removeEventListener('click', that.handler, false);
      return false;
    };
  };
  window.Wu = Wu;
})();
var wu = new Wu();