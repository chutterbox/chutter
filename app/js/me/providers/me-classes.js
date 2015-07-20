(function() {
  var ConversationState, NotificationView, app;

  ConversationState = (function() {
    function ConversationState() {}

    ConversationState.prototype.conversations = [];

    ConversationState.prototype.conversation = [];

    return ConversationState;

  })();

  NotificationView = (function() {
    function NotificationView() {}

    NotificationView.prototype.entity = {};

    NotificationView.prototype.element = {};

    NotificationView.prototype.initialize = function(entity) {
      if (this.entity && this.entity.element) {
        this.entity.element.className = "";
      }
      this.entity = entity;
      return this.notifications = entity.notifications;
    };

    NotificationView.prototype.show = function() {
      var timeoutVal;
      if (this.element.className.indexOf("active") > -1) {
        timeoutVal = 0;
      } else {
        timeoutVal = 0;
      }
      this.element.className = "";
      return setTimeout((function(_this) {
        return function() {
          _this.element.style.cssText += "top: " + _this.entity.offsetTop + "px;";
          _this.element.className = "active";
          _this.entity.element.className = "active";
          _this.entity.loading = true;
          _this.entity.loading = false;
          return _this.element.className = "active";
        };
      })(this), timeoutVal);
    };

    NotificationView.prototype.close = function() {
      if (this.entity && this.entity.element) {
        this.entity.element.className = "";
      }
      return this.element.className = "";
    };

    return NotificationView;

  })();

  app = angular.module("MeApp");

  app.factory("ConversationState", [
    function() {
      return new ConversationState;
    }
  ]);

  app.factory("NotificationView", [
    function() {
      return new NotificationView;
    }
  ]);

}).call(this);
