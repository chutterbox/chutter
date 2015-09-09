angular.module('templates-me', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("../app/partials/me/index.html",
    "<!DOCTYPE html><html lang=en ng-app=MeApp xmlns:ng=http://angularjs.org><head><base href=\"/me/\"><link rel=icon type=image/png href=\"favicon.ico\"><link rel=\"shortcut icon\" type=image/png href=\"favicon.ico\"><meta name=fragment content=\"!\"><meta charset=\"utf-8\"><meta content=\"telephone=no\" name=\"format-detection\"><meta content=\"width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no\" name=\"viewport\"><meta content=ZYCtjzD0MQsstNXtDL7ZQyRzkj61deTZWYgEeMmCGdY name=\"google-site-verification\"><link href=\"https://www.chutter.co/\" rel=\"canonical\"><link href=/vendor/ionicons/css/ionicons.min.css rel=stylesheet><link href=/vendor/angular-chart.js/dist/angular-chart.css rel=stylesheet><link href=/css/compiled/application.css rel=stylesheet><link href=/css/me.css rel=stylesheet><title>Chutter &mdash;</title></head><body layout=row layout-fill=layout-fill><ui-view layout=column layout-fill=layout-fill></ui-view><script src=/js/compiled/application.min.js></script><script src=/js/compiled/me.min.js></script><script src=//platform.twitter.com/widgets.js></script></body></html>");
  $templateCache.put("../app/partials/me/layout.html",
    "<md-content layout=row flex=flex layout-align=\"end end\"><md-toolbar class=\"md-whiteframe-z1 md-tall\" id=main-toolbar><div ng-hide=\"user &amp;&amp; user.id\" layout=row class=md-toolbar-tools><div layout=row layout-align=\"center center\" class=toolbar-container><div class=nav-list-item><md-button aria-label=Home style=\"background-color: transparent\" href=\"/\" layout=column layout-align=\"center center\" id=logo><img ng-src=/img/logo.png hide-sm=\"true\"></md-button></div></div><span flex=flex></span><div layout=row layout-align=\"end end\" class=toolbar-container><md-button ng-click=signIn()>Sign In</md-button></div></div><div ng-show=\"user &amp;&amp; user.id\" layout=row flex=100 class=md-toolbar-tools><div layout=row layout-align=\"center center\" class=\"toolbar-container no-padding\"><div class=nav-list-item><md-button aria-label=Home style=\"background-color: transparent\" href=\"/\" layout=column layout-align=\"center center\" id=logo><img ng-src=/img/logo.png hide-sm=\"true\"></md-button></div></div><span flex=flex></span><div hide-sm=hide-sm hide-md=hide-md layout=row layout-align=\"end end\" class=toolbar-container><md-button aria-label=Moderation ng-if=user.moderator href=/moderation target=_self>moderation</md-button><md-button aria-label=Management ng-if=user.manager href=/management target=_self>management</md-button><md-button aria-label=Me href=/me/notifications ng-bind=user.username target=_self></md-button><md-button href=/me/conversations target=_self hide-sm=hide-sm><i class=\"fa fa-envelope-o fa-fw\"></i><md-tooltip>Messages</md-tooltip></md-button><md-button ng-click=logout() hide-sm=hide-sm><i class=\"fa fa-sign-out fa-fw\"></i><md-tooltip>Log out</md-tooltip></md-button></div></div><div layout=row class=\"md-toolbar-tools md-toolbar-tools-bottom\"><div layout=row layout-align=\"center center\" class=toolbar-container><span ng-bind=::user.username flex=flex></span><span flex=flex></span></div><span flex=flex></span><div layout=row layout-align=\"center center\" ng-if=\"$state.current.name.indexOf('conversations') &gt; -1\" class=toolbar-container><div layout=row class=nav-list-item><md-button layout=row layout-align=\"center start\" ui-sref=home.conversations><p>Conversations</p></md-button><md-button layout=row layout-align=\"center center\" ui-sref=home.conversations.compose class=\"secondary-action md-icon-button\"><span aria-controls=compose aria-label=\"compose message\" class=ion-ios-compose></span></md-button></div></div><div layout=row layout-align=\"center center\" ng-if=\"$state.current.name.indexOf('notifications') &gt; -1\" class=toolbar-container><div layout=row class=nav-list-item><md-button layout=row layout-align=\"center start\"><p>Notifications</p></md-button></div></div></div></md-toolbar><md-sidenav md-component-id=left md-is-locked-open=\"$mdMedia('gt-md')\" class=md-sidenav-left><md-content flex=flex role=navigation layout-fill=layout-fill layout=column class=nav-list><div class=nav-list-item><md-button aria-label=Inbox ui-sref=home.notifications ui-sref-active=md-primary layout=row layout-align=\"center center\">Notifications</md-button></div><div class=nav-list-item><md-button aria-label=Inbox ui-sref=home.conversations ui-sref-active=md-primary layout-align=\"center start\">Inbox</md-button></div><div class=nav-list-item><md-button aria-label=Inbox ui-sref=home.submissions ui-sref-active=md-primary layout-align=\"center start\">Submissions</md-button></div><div class=nav-list-item><md-button aria-label=Saved ui-sref=home.saved_posts ui-sref-active=md-primary layout-align=\"center start\">Saved Posts</md-button></div><div class=nav-list-item><md-button aria-label=Preferences ui-sref=home.preferences ui-sref-active=md-primary layout-align=\"center start\">Preferences</md-button></div><div class=nav-list-item><md-button aria-label=Stats ui-sref=home.stats ui-sref-active=md-primary layout-align=\"center start\">Stats</md-button></div></md-content></md-sidenav><md-content flex=flex layout=row class=md-whiteframe-z1 id=content><ui-view layout=column layout-fill=true></ui-view></md-content><md-sidenav md-component-id=right md-is-locked-open=\"$mdMedia('gt-md')\" class=md-sidenav-right><div layout=column ui-view=right-rail></div></md-sidenav></md-content>");
  $templateCache.put("../app/partials/me/preferences.html",
    "");
  $templateCache.put("../app/partials/me/saved.html",
    "<md-toolbar md-scroll-shrink=true layout-align=center layout=column class=\"md-primary md-hue-2\"><div class=md-toolbar-tools><md-tabs flex=flex md-no-pagination=true class=\"md-primary md-hue-2\"><md-tab ui-sref=home.saved_posts.all><md-tab-label>all</md-tab-label></md-tab><md-tab ui-sref=\"home.saved_posts.filtered({format: 'image'})\"><md-tab-label>image</md-tab-label></md-tab><md-tab ui-sref=\"home.saved_posts.filtered({format: 'video'})\"><md-tab-label>video</md-tab-label></md-tab><md-tab ui-sref=\"home.saved_posts.filtered({format: 'music'})\"><md-tab-label>music</md-tab-label></md-tab><md-tab ui-sref=\"home.saved_posts.filtered({format: 'webpage'})\"><md-tab-label>webpage</md-tab-label></md-tab><md-tab ui-sref=\"home.saved_posts.filtered({format: 'disucssion'})\"><md-tab-label>discussion</md-tab-label></md-tab></md-tabs></div></md-toolbar><md-content ui-view=posts class=primary-content></md-content>");
  $templateCache.put("../app/partials/me/stats.html",
    "<md-toolbar md-scroll-shrink=true layout-align=center layout=column class=\"md-primary md-hue-2\"><div class=md-toolbar-tools>Stats for {{user.username}}</div></md-toolbar><md-content class=primary-content><div layout-margin=true layout=row flex=100><div layout=column flex=true ng-if=submission_distribution class=\"md-whiteframe-z1 md-padding\"><div layout=row layout-align=\"center space-between\"><div flex=90 layout-align=\"start center\" layout=row><h6>Post Distribution</h6></div><md-button flex=10 class=md-icon-button><i class=\"icon ion-eye\"></i><md-tooltip>Make private</md-tooltip></md-button></div><md-divider></md-divider><div layout=row layout-fill=true layout-align=\"center center\" class=md-padding><canvas click=onClick data=submission_distribution.data labels=submission_distribution.labels legend=true class=\"chart chart-doughnut\" id=doughnut></canvas></div></div><div layout=column flex=true ng-if=comment_distribution class=\"md-whiteframe-z1 md-padding\"><div layout=row layout-align=\"center space-between\"><div flex=90 layout-align=\"start center\" layout=row><h6>Comment Distribution</h6></div><md-button flex=10 class=md-icon-button><i class=\"icon ion-eye\"></i><md-tooltip>Make private</md-tooltip></md-button></div><md-divider></md-divider><div layout=row layout-fill=true layout-align=\"center center\" class=md-padding><canvas click=onClick data=comment_distribution.data labels=comment_distribution.labels legend=true class=\"chart chart-doughnut\" id=doughnut></canvas></div></div><div layout=column flex=true ng-if=domain_distribution class=\"md-whiteframe-z1 md-padding\"><div layout=row layout-align=\"center space-between\"><div flex=90 layout-align=\"start center\" layout=row><h6>Domain Distribution</h6></div><md-button flex=10 class=md-icon-button><i class=\"icon ion-eye\"></i><md-tooltip>Make private</md-tooltip></md-button></div><md-divider></md-divider><div layout=row layout-fill=true layout-align=\"center center\" class=md-padding><canvas click=onClick data=domain_distribution.data labels=domain_distribution.labels legend=true class=\"chart chart-doughnut\" id=doughnut></canvas></div></div></div><div layout-margin=true layout=row flex=100><div layout=column flex=true ng-if=point_distribution class=\"md-whiteframe-z1 md-padding\"><div layout=row layout-align=\"center space-between\"><div flex=90 layout-align=\"start center\" layout=row><h6>Point Distribution</h6></div><md-button flex=10 class=md-icon-button><i class=\"icon ion-eye\"></i><md-tooltip>Make private</md-tooltip></md-button></div><md-divider></md-divider><div layout=row layout-fill=true layout-align=\"center center\" class=md-padding><canvas data=point_distribution.data labels=point_distribution.labels class=\"chart chart-bar\" id=bar></canvas></div></div><div layout=column flex=true class=\"md-whiteframe-z1 md-padding\"><div layout=row layout-align=\"center space-between\"><div flex=90 layout-align=\"start center\" layout=row><h6>Submission Distribution</h6></div><md-button flex=10 class=md-icon-button><i class=\"icon ion-eye\"></i><md-tooltip>Make private</md-tooltip></md-button></div><md-divider></md-divider><div layout=row layout-fill=true layout-align=\"center center\" class=md-padding><canvas click=onClick data=data labels=labels class=\"chart chart-doughnut\" id=doughnut></canvas></div></div></div></md-content>");
  $templateCache.put("../app/partials/me/submissions.html",
    "<md-toolbar md-scroll-shrink=true layout-align=center layout=column class=\"md-primary md-hue-2\"><div class=md-toolbar-tools><md-tabs flex=flex class=\"md-primary md-hue-2\"><md-tab><md-tab-label><h3>hot</h3></md-tab-label></md-tab><md-tab><md-tab-label><h3>new</h3></md-tab-label></md-tab><md-tab><md-tab-label><h3>top</h3></md-tab-label></md-tab></md-tabs></div></md-toolbar><md-content infinite-scroll=myPagingFunction() infinite-scroll-distance=3 class=primary-content><post ng-repeat=\"post in page.posts track by post.id\" post=post post-index=$index layout=row layout-sm=column flex=flex id=post-{{post.id}} class=post></post></md-content>");
  $templateCache.put("../app/partials/me/conversations/compose.html",
    "<md-toolbar class=md-hue-2><div class=md-toolbar-tools><div class=toolbar-container>Start a conversation</div><span flex=flex></span></div></md-toolbar><div><div layout=column layout-padding=layout-padding><form ng-submit=submit()><div layout=row><md-input-container flex=flex><label>recipient's username</label><input ng-model=newConversation.recipient_username required></md-input-container></div><div layout=row><md-input-container flex=flex><label>Say something nice...</label><textarea ng-model=newConversation.messages_attributes[0].body type=text rows=10></textarea></md-input-container></div><div layout=row><span flex=flex></span><md-button type=submit class=\"md-raised md-priary\">Submit</md-button></div></form></div></div>");
  $templateCache.put("../app/partials/me/conversations/conversation.html",
    "<md-toolbar md-scroll-shrink=true class=\"md-primary md-hue-2\"><div class=md-toolbar-tools><p class=chatting>Chatting with<span ng-bind=::conversation.otherUser class=username></span></p></div></md-toolbar><div infinite-scroll=myPagingFunction() infinite-scroll-distance=3 id=content><md-content class=primary-content id=conversation><div ng-repeat=\"message in messages\" ng-class=\"message.other_participant? 'other-participant': 'you'\" class=item><div layout-padding=layout-padding flex=flex layout=row ng-attr-layout-align=\"{{message.other_participant ? '': 'end start'}}\" class=wrap><div layout-padding=layout-padding layout=column class=message><div flex=flex layout=column class=body><p ng-bind=::message.body class=text></p><p class=time><span ng-bind=\"::message.created_at | date:'shortTime'\"></span><md-tooltip ng-bind=\"::message.created_at | date:'medium'\"></md-tooltip></p></div></div></div></div></md-content></div><md-divider></md-divider><div class=md-padding id=reply><form ng-submit=reply() layout=row class=reply><md-input-container flex=flex><label>Reply</label><textarea ng-model=replyText type=text></textarea></md-input-container><md-button type=submit class=\"md-raised md-primary\">Send</md-button></form></div>");
  $templateCache.put("../app/partials/me/conversations/conversationList.html",
    "<md-content flex=flex role=navigation layout-fill=layout-fill layout=column class=detailed-list><div ng-repeat=\"convo in conversations\" layout=row class=detailed-list-item><md-button aria-label=\"Open conversation\" ui-sref=\"home.conversations.conversation({id: convo.id})\" ui-sref-active=md-primary layout=column layout-align=\"center start\"><p ng-bind=::convo.recipient_name></p><span ng-bind=\"::((convo.lru_message.body | limitTo: 30) + '...')\"></span></md-button></div></md-content>");
  $templateCache.put("../app/partials/me/notifications/commentNotifications.html",
    "<md-toolbar md-scroll-shrink=true class=\"md-primary md-hue-2\"><div class=md-toolbar-tools><md-tabs class=\"md-primary md-hue-2\"><md-tab label=hot></md-tab><md-tab label=new></md-tab><md-tab><md-tab-label>top</md-tab-label></md-tab></md-tabs></div></md-toolbar><md-content id=comments><comment layout=column ng-repeat=\"child in page.comments\" id=c{{child.path}} comment=child></comment></md-content>");
  $templateCache.put("../app/partials/me/notifications/notificationList.html",
    "<md-content flex=flex role=navigation layout-fill=layout-fill layout=column class=detailed-list><div ng-repeat=\"subscription in page.notificationSubscriptions\" ng-switch=subscription.entityable layout=row class=detailed-list-item><md-button ui-sref=\"home.notifications.{{subscription.entityable}}Notifications({id: subscription.id})\" ui-sref-active=md-primary layout=column layout-align=\"center start\"><p ng-bind=\"::(('Re: ' + subscription.title | limitTo: 30) + '...')\"></p><span ng-bind=\"(subscription.unread_count || 0) + ' unread notifications' \"></span></md-button></div></md-content>");
  $templateCache.put("../app/partials/me/notifications/postNotifications.html",
    "<md-toolbar class=\"md-primary md-hue-2\"><div class=md-toolbar-tools><md-tabs class=\"md-primary md-hue-2\"></md-tabs></div></md-toolbar><post post=page.post layout=row class=post></post><md-toolbar layout=row class=\"md-hue-2 md-whiteframe-z1\" id=comment-toolbar><div class=md-toolbar-tools><span flex=5></span><span ng-bind=\"notifications.length + ' notifications'\"></span><span flex=flex></span><md-button ng-click=reply() class=md-hue-2>leave a comment</md-button><md-button class=\"md-warn md-icon-button\"><i class=\"fa fa-trash fa-fw\"></i></md-button></div></md-toolbar><md-content><div infinite-scroll=fetchMoreComments() infinite-scroll-container=\"'#comments'\" infinite-scroll-distance=1 id=comment-wrapper><div ng-repeat=\"notification in notifications\" ng-switch=notification.entityable><comment ng-switch-when=comment layout=column id=c{{child.path}} comment=notification></comment></div></div></md-content>");
}]);
