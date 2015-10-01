angular.module('templates-shared', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("../app/partials/toasts/comment-toast.html",
    "<md-toast>example notification for when you get a comment</md-toast>");
  $templateCache.put("../app/partials/toasts/post-toast.html",
    "<md-toast><span ng-bind=\"::(('Re: ' + notification.title + '...') | limitTo: 50)\"></span><span ng-if=\"notification.title.length &gt; 49\">...</span><md-action>{{::notification.ephemeral_count}} new notifications</md-action></md-toast>");
  $templateCache.put("../app/partials/shared/createCommunityRule.html",
    "<md-dialog md-dynamic-height=md-dynamic-height style=\"min-height: 300px\" aria-label=\"Create Rule\"><md-toolbar><div class=md-toolbar-tools>Create a community rule<span flex=flex></span><md-button ng-click=hideDialog() class=md-icon-button><i class=\"fa fa-close fa-fw\"></i></md-button></div></md-toolbar><md-content class=md-padding><form><md-input-container><label>Brief Description (e.g. no punchlines in the title)</label><input ng-model=\"newRule.category\"></md-input-container><md-input-container><label>Detailed Explanation of Rule (optional, but encouraged)</label><textarea rows=10 ng-model=newRule.detailed_explanation></textarea></md-input-container><div layout=row><div flex=50><md-input-container><label>Applies to</label></md-input-container><md-checkbox ng-model=newRule.general ng-click=\"setSelectedAppliesTo('general')\">General</md-checkbox><md-checkbox ng-model=newRule.posts ng-click=\"setSelectedAppliesTo('posts')\">Posts</md-checkbox><md-checkbox ng-model=newRule.comments ng-click=\"setSelectedAppliesTo('comments')\">Comments</md-checkbox></div><div flex=50><md-input-container><label>Severity</label></md-input-container><md-checkbox ng-model=newRule.discouraged ng-click=\"setSelectedSeverity('discouraged')\">Discouraged</md-checkbox><md-checkbox ng-model=newRule.removal ng-click=\"setSelectedSeverity('removal')\">Removal</md-checkbox><md-checkbox ng-model=newRule.ban ng-click=\"setSelectedSeverity('ban')\">Ban</md-checkbox></div></div><md-divider></md-divider><div layout=row><span flex=flex></span><md-button ng-click=saveRule() class=\"md-primary md-raised\">Save</md-button><md-button ng-click=cancelSave() class=\"md-warn md-raised\">Cancel</md-button></div></form></md-content></md-dialog>");
  $templateCache.put("../app/partials/shared/discussionPost.html",
    "<div layout=row style=\"height: auto; width: 80%\" layout-align=\"start center\" class=\"post primary-content\"><div hide-sm=true layout=column layout-align=\"start center\" class=vote><md-button flex=flex aria-label=Upvote ng-click=\"ctrl.postService.updateVote(ctrl.post, 1)\" class=\"md-icon-button up\"><i ng-class=\"{'active-up' : (ctrl.post.vote == 1)}\" class=\"icon ion-chevron-up\"></i></md-button><h6 ng-bind=ctrl.post.points></h6><md-button flex=flex aria-label=Downvote ng-click=\"ctrl.postService.updateVote(ctrl.post, -1)\" class=\"md-icon-button down\"><i ng-class=\"{'active-down' : (ctrl.post.vote == -1)}\" class=\"icon ion-chevron-down\"></i></md-button></div><div layout=row flex=true class=main><div layout=column class=middle><div class=top><div class=title><a ng-bind=ctrl.post.title href=/c/{{ctrl.post.community_slug}}/{{ctrl.post.slug}} class=\"link-color md-title\"></a></div></div><div class=\"tagline color-light\"><span class=submitted-by-text>submitted</span><span am-time-ago=ctrl.post.created_at class=time-ago></span><span>by</span><a ng-bind=ctrl.post.username ui-sref=\"user.overview({username: ctrl.post.username})\" class=link-color></a><span>to</span><a ng-bind=\"'/c/' + ctrl.post.community_slug\" ui-sref=\"frontpage.community.hot({community: ctrl.post.community_slug})\" class=link-color></a></div><div marked=ctrl.post.body class=body></div><div layout=row class=post-footer><a href=/c/{{ctrl.post.community_slug}}/{{ctrl.post.slug}} ng-bind=\"ctrl.post.comments_count + ' comments'\"></a><a ng-if=!ctrl.post.saved ng-click=ctrl.postService.toggleSave(ctrl.post)>save</a><a ng-if=ctrl.post.saved ng-click=ctrl.postService.toggleSave(ctrl.post)>unsave</a><a ng-if=!ctrl.post.reported ng-click=ctrl.postService.report(ctrl.post)>report</a><a ng-if=ctrl.post.reported class=disabled>reported</a><a ng-click=ctrl.postService.moderate(ctrl.post) ng-if=\"ctrl.post.moderates &amp;&amp; !ctrl.post.restricted_from_removing_posts\">mod</a></div></div></div></div>");
  $templateCache.put("../app/partials/shared/mainToolbar.html",
    "<div ng-hide=\"user &amp;&amp; user.id\" layout=row flex=100 layout-align=\"space-between center\" class=md-toolbar-tools><div layout=row layout-align=\"center center\" class=toolbar-container><div hide-sm=true class=nav-list-item><md-button style=\"background-color: transparent\" ui-sref=home.all.hot layout=column layout-align=\"center center\" id=logo><img ng-src=\"../img/logo.png\"></md-button></div><md-button aria-label=\"toggle left\" hide-gt-sm=true ng-click=toggleLeft() class=md-icon-button><i class=\"icon ion-navicon\"></i></md-button></div><div hide-gt-sm=true flex=true layout=row layout-align=\"center center\"><md-button aria-label=home class=md-icon-button><md-icon md-svg-src=../img/character.svg style=\"height: 40px; width: 40px; fill: #000\"></md-icon></md-button></div><div layout=row layout-align=\"end end\" class=\"toolbar-container md-margin\"><md-button aria-label=\"sign in\" ng-click=signIn()>Sign In</md-button></div></div><div ng-show=\"user &amp;&amp; user.id\" layout=row flex=100 layout-align=\"space-between center\" class=md-toolbar-tools><div layout=row layout-align=\"center center\" class=toolbar-container><div class=nav-list-item><md-button style=\"background-color: transparent\" href=\"/\" layout=column layout-align=\"center center\" id=logo><img ng-src=../img/logo.png hide-sm=\"true\"></md-button></div></div><div hide-sm=hide-sm hide-md=hide-md layout=row layout-align=\"end center\" class=\"toolbar-container md-margin\"><md-button aria-label=moderation ng-if=user.moderator href=/moderation target=_self>Moderation</md-button><md-button aria-label=management ng-if=user.manager href=/management target=_self>Management</md-button><md-menu class=theme-menu><md-button aria-label=\"change theme\" ng-click=$mdOpenMenu($event) class=md-icon-button><div class=\"icon ion-android-color-palette\"></div></md-button><md-menu-content class=theme-list><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutter')\"><div class=theme-chutter>Chutter</div></md-button><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutterDark')\"><div class=theme-chutter-dark>Chutter Dark</div></md-button><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutterTeal')\"><div class=theme-chutter-teal>Chutter Teal</div></md-button><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutterOrange')\"><div class=theme-chutter-orange>Chutter Orange</div></md-button><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutterPink')\"><div class=theme-chutter-pink>Chutter Pink</div></md-button></md-menu-content></md-menu><md-button aria-label=notifications href=/me/notifications target=_self>{{::user.username}}</md-button><md-button aria-label=messages href=/me/conversations target=_self hide-sm=hide-sm class=md-icon-button><i class=\"icon ion-android-mail\"></i><md-tooltip>Messages</md-tooltip></md-button><md-button aria-label=logout ng-click=logout() hide-sm=hide-sm class=md-icon-button><i class=\"icon ion-log-out\"></i><md-tooltip>Log out</md-tooltip></md-button></div></div>");
  $templateCache.put("../app/partials/shared/mediaPlayerContent.html",
    "<div ng-switch=currentMedia.format layout=column layout-align=\"start center\" id=media-player-wrapper><md-toolbar class=\"md-primary md-hue-2\"><div class=md-toolbar-tools><md-button class=md-icon-button id=close-button><i class=\"icon ion-close\"></i></md-button><span flex=true></span><md-button class=md-icon-button id=fill-button><i class=\"icon ion-android-expand\"></i></md-button></div></md-toolbar><iframe ng-switch-when=video ng-src={{currentMedia.trusted_stream_link}} autoplay width=100% height=100%></iframe><img ng-switch-when=image ng-src={{currentMedia.image_link}} id=\"image-view\"><div id=webpage-view><img ng-switch-when=webpage ng-src=\"{{currentMedia.image_link}}\"></div><md-content ng-switch-default=true layout=column layout-fill=true id=discussion-view><div marked=body class=md-padding></div></md-content><div id=progress-place-holder><md-progress-circular md-mode=indeterminate class=md-hue-2></md-progress-circular></div></div>");
  $templateCache.put("../app/partials/shared/mediaPlayerSheet.html",
    "<md-bottom-sheet id=mobileMediaPlayer></md-bottom-sheet>");
  $templateCache.put("../app/partials/shared/modSheet.html",
    "<md-bottom-sheet layout=column layout-fill=true><md-toolbar><div class=md-toolbar-tools><h3>Moderation</h3><span flex=flex></span><md-button ng-click=closeSheet() class=\"md-icon-button large-icon\"><i class=\"ion ion-android-close\"></i></md-button></div></md-toolbar><md-content><md-tabs md-dynamic-height=true flex=true><md-tab label=\"Remove Post\" ng-if=post><div><div ng-include=\"'/partials/shared/postEmbed.html'\"></div><form name=explanationForm><md-subheader>Rule Violation</md-subheader><md-radio-group ng-model=activityLogEntry.rule_id><md-radio-button ng-repeat=\"rule in communityRules\" ng-value=rule.id class=md-primary>{{rule.category}}</md-radio-button></md-radio-group><md-input-container flex=flex><label>Detailed Explanation</label><textarea ng-model=activityLogEntry.detailed_explanation type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitEntityableForm() class=md-raised>Submit</md-button></div></form></div></md-tab><md-tab label=\"Remove Comment\" ng-if=comment><div><div ng-include=\"'/partials/shared/comments/commentEmbed.html'\"></div><form name=explanationForm><md-subheader>Rule Violation</md-subheader><md-radio-group ng-model=activityLogEntry.rule_id><md-radio-button ng-repeat=\"rule in communityRules\" ng-value=rule.id class=md-primary>{{rule.category}}</md-radio-button></md-radio-group><md-input-container flex=flex><label>Detailed Explanation</label><textarea ng-model=activityLogEntry.detailed_explanation type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitEntityableForm() class=md-raised>Submit</md-button></div></form></div></md-tab><md-tab ng-if=false label=User><form name=explanationForm><h3 ng-bind=entityable.username></h3><md-subheader>Ban From</md-subheader><md-input-container><md-select ng-model=communityId placeholder=Community><md-option ng-repeat=\"community in user.moderated_communities\" ng-bind=community.name></md-option></md-select></md-input-container><md-subheader>Ban Length</md-subheader><md-slider flex=50 ng-model=myValue min=0 max=5 class=md-primary></md-slider><md-subheader>Rule Violation</md-subheader><md-radio-group ng-model=activityLogEntry.rule_id><md-radio-button ng-repeat=\"rule in community_rules | filter:{general: true} \" ng-value=rule.id class=md-primary>{{rule.category}}</md-radio-button></md-radio-group><md-input-container flex=flex><label>Detailed Explanation</label><textarea ng-model=activityLogEntry.detailed_explanation type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitUserForm() class=md-raised>Submit</md-button></div></form></md-tab></md-tabs></md-content></md-bottom-sheet>");
  $templateCache.put("../app/partials/shared/post.html",
    "<div layout=row md-item-size=75 layout-align=\"start center\" class=\"post primary-content\"><div hide-sm=true layout=column layout-align=\"start center\" class=vote><md-button flex=flex aria-label=Upvote ng-click=\"ctrl.postService.updateVote(ctrl.post, 1)\" class=\"md-icon-button up\"><i ng-class=\"{'active-up' : (ctrl.post.vote == 1)}\" class=\"icon ion-chevron-up\"></i></md-button><h6 ng-bind=ctrl.post.points></h6><md-button flex=flex aria-label=Downvote ng-click=\"ctrl.postService.updateVote(ctrl.post, -1)\" class=\"md-icon-button down\"><i ng-class=\"{'active-down' : (ctrl.post.vote == -1)}\" class=\"icon ion-chevron-down\"></i></md-button></div><div ng-click=\"ctrl.mediaPlayer.toggle(ctrl.post, $event)\" ng-style=\"{'background-image': ctrl.postService.getBackgroundImage(ctrl.post)}\" id={{$index}} class=\"postcontent md-whiteframe-z1\"><i ng-hide=\"ctrl.post.media.length &gt; 0\" class=\"icon ion-ios-paper\"></i><span ng-switch=ctrl.post.media[0].format><i ng-switch-when=image class=\"icon ion-ios-search-strong\"></i><i ng-switch-when=webpage class=\"icon ion-ios-search-strong\"></i><i ng-switch-when=video class=\"icon ion-ios-play\"></i><i ng-switch-default=true class=\"icon ion-ios-glasses-outline\"></i></span></div><div layout=row flex=true class=main><div layout=column class=middle><div layout=row layout-align=\"start end\" class=top><div ng-if=\"ctrl.postService.hasMedia(ctrl.post) &amp;&amp; ctrl.post.media[0].favicon\" class=favicon><img ng-src={{ctrl.post.media[0].favicon}} title=\"{{ctrl.post.media[0].attribution}}\"></div><div class=title><a ng-bind=ctrl.post.title href={{ctrl.post.media[0].link}} class=\"link-color md-title\"></a><span ng-if=\"false &amp;&amp; ctrl.post.media[0] &amp;&amp; ctrl.post.media[0].attribution\" ng-bind=\"'('+ctrl.post.media[0].attribution+')'\" class=attribution></span></div></div><div class=\"tagline color-light\"><span class=submitted-by-text>submitted</span><span am-time-ago=ctrl.post.created_at class=time-ago></span><span>by</span><a ng-bind=ctrl.post.username ui-sref=\"user.overview({username: ctrl.post.username})\" class=link-color></a><span>to</span><a ng-bind=\"'/c/' + ctrl.post.community_slug\" ui-sref=\"frontpage.community.hot({community: ctrl.post.community_slug})\" class=link-color></a></div><div layout=row class=post-footer><a href=/c/{{ctrl.post.community_slug}}/{{ctrl.post.slug}} ng-bind=\"ctrl.post.comments_count + ' comments'\"></a><a ng-if=!ctrl.post.saved ng-click=ctrl.postService.toggleSave(ctrl.post)>save</a><a ng-if=ctrl.post.saved ng-click=ctrl.postService.toggleSave(ctrl.post)>unsave</a><a ng-if=!ctrl.post.reported ng-click=ctrl.postService.report(ctrl.post)>report</a><a ng-if=ctrl.post.reported class=disabled>reported</a><a ng-click=ctrl.postService.moderate(ctrl.post) ng-if=\"ctrl.post.moderates &amp;&amp; !ctrl.post.restricted_from_removing_posts\">mod</a></div></div></div></div>");
  $templateCache.put("../app/partials/shared/postEmbed.html",
    "<div layout=row layout-margin=true style=\"height: 100px\"><div flex=10 ng-show=post.media.length ng-click=post.toggle() style=\"background-image: url('{{post.media[0].thumbnail_link}}'); background-size: cover\" class=media></div><div flex=flex layout=column class=middle><div ng-switch=post.media.length flex=flex class=top><div ng-switch-when=0 layout=row><div flex=75 flex-sm=100 class=title><a ng-bind=post.title ui-sref=\"home.community.comments({id: post.slug, community: post.community_slug})\" class=title-text></a></div><span flex=flex></span><div class=community><a ng-bind=post.community></a></div></div><div ng-switch-default=ng-switch-default layout=row><div flex=75 class=title><a ng-bind=post.title href={{post.media[0].link}} class=title-text></a><span class=attribution><a ng-bind=\"'('+post.media[0].attribution+')'\"></a></span></div><span flex=flex></span></div></div></div></div>");
  $templateCache.put("../app/partials/shared/postList.html",
    "<md-virtual-repeat-container style=\"height: calc(100vh - 32px)\"><div md-virtual-repeat=\"post in ctrl.dynamicItems\" md-on-demand=true layout=row md-item-size=75 layout-align=\"start center\" class=\"post primary-content\"><div hide-sm=true layout=column layout-align=\"start center\" class=vote><md-button flex=flex aria-label=Upvote ng-click=\"ctrl.postService.updateVote(post, 1)\" class=md-icon-button><i ng-class=\"{'active-up' : (post.vote == 1)}\" class=\"icon ion-chevron-up\"></i></md-button><h6 ng-bind=post.points></h6><md-button flex=flex aria-label=Downvote ng-click=\"ctrl.postService.updateVote(post, -1)\" class=md-icon-button><i ng-class=\"{'active-down' : (post.vote == -1)}\" class=\"icon ion-chevron-down\"></i></md-button></div><div ng-click=\"ctrl.mediaPlayer.toggle(post, $event)\" ng-style=\"{'background-image': ctrl.postService.getBackgroundImage(post)}\" id={{$index}} class=\"postcontent md-whiteframe-z1\"><i ng-hide=\"post.media.length &gt; 0\" class=\"icon ion-ios-paper\"></i><span ng-switch=post.media[0].format><i ng-switch-when=image class=\"icon ion-ios-search-strong\"></i><i ng-switch-when=webpage class=\"icon ion-ios-search-strong\"></i><i ng-switch-when=video class=\"icon ion-ios-play\"></i><i ng-switch-when=music class=\"icon ion-music-note\"></i><i ng-switch-default=true class=\"icon ion-ios-glasses-outline\"></i></span></div><div layout=row flex=true class=main><div layout=column class=middle><div layout=row layout-align=\"start end\" class=top><div ng-if=\"ctrl.postService.hasMedia(post) &amp;&amp; post.media[0].favicon\" class=favicon><img ng-src={{post.media[0].favicon}} title=\"{{post.media[0].attribution}}\"></div><div ng-if=!post.media.id class=title><a ng-bind=post.title ui-sref=\"{{applicationSectionNamespace}}.community.comments({id: post.slug, community: post.community_slug})\" class=\"link-color md-title\"></a></div><div ng-if=post.media.id class=title><a ng-bind=post.title href={{post.media[0].link}} class=\"link-color md-title\"></a><span ng-if=\"false &amp;&amp; post.media[0] &amp;&amp; post.media[0].attribution\" ng-bind=\"'('+post.media[0].attribution+')'\" class=attribution></span></div></div><div class=\"tagline color-light\"><span class=submitted-by-text>submitted</span><span am-time-ago=post.created_at class=time-ago></span><span>by</span><a ng-bind=post.username ui-sref=\"user.overview({username: post.username})\" class=link-color></a><span>to</span><a ng-bind=\"'/c/' + post.community_slug\" ui-sref=\"frontpage.community.hot({community: post.community_slug})\" class=link-color></a></div><div layout=row class=post-footer><a ui-sref=\"{{applicationSectionNamespace}}.community.comments({id: post.slug, community: post.community_slug})\" ng-bind=\"post.comments_count + ' comments'\"></a><a ng-if=!post.saved ng-click=ctrl.postService.toggleSave(post)>save</a><a ng-if=post.saved ng-click=ctrl.postService.toggleSave(post)>unsave</a><a ng-if=\"user &amp;&amp; user.id &amp;&amp; (user.id == post.user_id)\" ng-click=ctrl.postService.deletePost(post)>delete</a><a ng-if=!post.reported ng-click=ctrl.postService.report(post)>report</a><a ng-if=post.reported class=disabled>reported</a><a ng-click=ctrl.postService.moderate(post) ng-if=\"post.moderates &amp;&amp; !post.restricted_from_removing_posts\">mod</a></div></div></div></div></md-virtual-repeat-container>");
  $templateCache.put("../app/partials/shared/postListItem.html",
    "<md-virtual-repeat-container style=\"height: calc(100vh - 80px)\"><div md-virtual-repeat=\"post in ctrl.dynamicItems\" md-on-demand=true layout=row layout-align=\"start center\" md-item-size=75 class=\"post primary-content\"><div hide-sm=true layout=column layout-align=\"start center\" class=vote><md-button flex=flex aria-label=Upvote ng-click=\"ctrl.updateVote(post, 1)\" class=\"md-icon-button up\"><i ng-class=\"{'active-up' : (post.vote == 1)}\" class=\"icon ion-chevron-up\"></i></md-button><h6 ng-bind=post.points></h6><md-button flex=flex aria-label=Downvote ng-click=\"ctrl.updateVote(post, -1)\" class=\"md-icon-button down\"><i ng-class=\"{'active-down' : (post.vote == -1)}\" class=\"icon ion-chevron-down\"></i></md-button></div><div ng-click=\"mediaPlayer.toggle(post, $event)\" ng-style=\"{'background-image': ctrl.getBackgroundImage(post)}\" id={{$index}} class=\"postcontent md-whiteframe-z1\"><i ng-hide=\"post.media.length &gt; 0\" class=\"icon ion-ios-paper\"></i><span ng-switch=post.media[0].format><i ng-switch-when=image class=\"icon ion-ios-search-strong\"></i><i ng-switch-when=webpage class=\"icon ion-ios-search-strong\"></i><i ng-switch-when=video class=\"icon ion-ios-play\"></i><i ng-switch-default=true class=\"icon ion-ios-glasses-outline\"></i></span></div><div layout=row flex=true class=main><div layout=column class=middle><div ng-switch=post.media.length class=top><div ng-switch-when=0 class=title><a ng-bind=post.title ui-sref=\"home.community.comments({id: post.slug, community: post.community_slug})\" class=\"color-light md-title\"></a></div><div ng-switch-default=ng-switch-default class=title><a ng-bind=post.title href={{post.media[0].link}} class=\"color-light md-title\"></a><span ng-if=\"false &amp;&amp; post.media[0] &amp;&amp; post.media[0].attribution\" ng-bind=\"'('+post.media[0].attribution+')'\" class=attribution></span></div></div><div class=tagline><span ng-bind=\"(post.points || 0) + ' points'\" class=votes></span><span class=submitted-by-text>submitted by</span><a ng-bind=post.username ui-sref=\"user.overview({username: post.username})\" class=user-link></a><span am-time-ago=post.created_at class=time-ago></span></div><div layout=row class=footer><a ui-sref=\"home.community.comments({id: post.slug, community: post.community_slug})\" ng-bind=\"post.comments_count + ' comments'\"></a><a ng-if=!post.saved ng-click=post.toggleSave()>save</a><a ng-if=post.saved ng-click=post.toggleSave()>unsave</a><a ng-if=!post.reported ng-click=ctrl.report(post)>report</a><a ng-if=post.reported class=disabled>reported</a><a ng-click=ctrl.moderate(post) ng-if=\"post.moderates &amp;&amp; !post.restricted_from_removing_posts\">mod</a></div></div></div></div></md-virtual-repeat-container>");
  $templateCache.put("../app/partials/shared/reportSheet.html",
    "<md-bottom-sheet layout=column layout-fill=true><md-toolbar class=md-warn><div class=md-toolbar-tools><h3>Report</h3><span flex=flex></span><md-button ng-click=closeSheet(false) class=\"md-icon-button large-icon\"><i class=\"ion ion-android-close\"></i></md-button></div></md-toolbar><div ng-if=post><div ng-include=\"'/partials/shared/postEmbed.html'\"></div><form name=explanationForm><md-subheader>Rule Violation</md-subheader><md-radio-group ng-model=activityLogEntry.rule_id><md-radio-button ng-repeat=\"rule in communityRules\" ng-value=rule.id class=md-primary>{{rule.category}}</md-radio-button></md-radio-group><md-input-container flex=flex><label>Detailed Explanation</label><textarea ng-model=activityLogEntry.detailed_explanation type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitEntityableForm() class=md-raised>Submit</md-button></div></form></div><div ng-if=comment><div ng-include=\"'/partials/shared/comments/commentEmbed.html'\"></div><form name=explanationForm><md-subheader>Rule Violation</md-subheader><md-radio-group ng-model=activityLogEntry.rule_id><md-radio-button ng-repeat=\"rule in communityRules\" ng-value=rule.id class=md-primary>{{rule.category}}</md-radio-button></md-radio-group><md-input-container flex=flex><label>Detailed Explanation</label><textarea ng-model=activityLogEntry.detailed_explanation type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitEntityableForm() class=md-raised>Submit</md-button></div></form></div></md-bottom-sheet>");
  $templateCache.put("../app/partials/shared/subscriptionDialog.html",
    "<md-dialog style=\"width: 50%\"><md-toolbar class=md-accent><div class=md-toolbar-tools>Help keep Chutter.co online<span flex=flex></span><md-button ng-click=hideDialog() class=md-icon-button><i class=\"fa fa-close fa-fw\"></i></md-button></div></md-toolbar><md-dialog-content ng-if=false><section id=subscription-section><md-list><md-list-item class=md-2-line><md-icon layout=row layout-align=\"center center\"><i class=\"icon ion-ribbon-a\"></i></md-icon><div class=md-list-item-text><h3>Gild up to 10 users a month</h3><p>Award the best comments / posts and the user gets a free month of chutter pro.</p></div></md-list-item><md-list-item class=md-2-line><md-icon layout=row md-svg-src=/img/character.svg></md-icon><div class=md-list-item-text><h3>Support Chutter</h3><p>You can pay for a meaningful chunk of server time for only 4 quarters a month.</p></div></md-list-item><md-list-item class=md-2-line><md-icon layout=row layout-align=\"center center\"><i class=\"icon ion-android-notifications-off\"></i></md-icon><div class=md-list-item-text><h3>Mute post / comment notifications</h3><p>No more \"R.I.P inbox\". Easily mute comment / post / message notifications</p></div></md-list-item><md-list-item class=md-2-line><md-icon layout=row layout-align=\"center center\"><i class=\"icon ion-android-funnel\"></i></md-icon><div class=md-list-item-text><h3>Saved categories</h3><p>All of your saved posts will automatically be categorized (e.g. \"music\", \"videos\", etc...).</p></div></md-list-item></md-list></section></md-dialog-content><md-dialog-content><p>Chutter costs quite a bit to run, donations are currently the only way we have to pay for server costs! Your donations will immediately support server costs, mobile app development and allow chutter to grow into something big.</p><form action=https://www.paypal.com/cgi-bin/webscr method=post target=_top><input type=hidden name=cmd value=_s-xclick> <input type=hidden name=hosted_button_id value=9DHHFNE2GQCTG> <input type=image src=https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif border=0 name=submit alt=\"PayPal - The safer, easier way to pay online!\"> <img alt=\"\" border=0 src=https://www.paypalobjects.com/en_US/i/scr/pixel.gif width=1 height=1></form></md-dialog-content></md-dialog>");
  $templateCache.put("../app/partials/shared/toolbar.html",
    "<md-toolbar ng-class=page.mainToolbar md-scroll-shrink=true id=main-toolbar><div layout=row flex=100 layout-align=\"space-between center\" class=md-toolbar-tools><div layout=row class=toolbar-continer><md-button style=\"background-color: transparent\" href=\"/\" layout=row layout-align=\"center center\" id=logo><img ng-src=\"/img/logo.png\"></md-button><a ng-bind=secondaryTitle id=secondary-header></a></div><div ng-hide=\"user &amp;&amp; user.id\" layout=row layout-align=\"end end\" class=toolbar-container id=auth-container><md-button aria-label=\"sign in\" ng-click=logIn()>log in</md-button><md-button aria-label=\"sign in\" ui-sref=register.welcome>sign up</md-button></div><div ng-show=\"user &amp;&amp; user.id\" hide-sm=hide-sm hide-md=hide-md layout=row layout-align=\"end center\" class=toolbar-container><md-button aria-label=moderation ng-if=user.moderator href=/moderation target=_self>Moderation</md-button><md-button aria-label=management ng-if=user.manager href=/management target=_self>Management</md-button><md-menu><md-button aria-label=\"change theme\" ng-click=$mdOpenMenu($event) class=md-icon-button><div class=\"icon ion-android-color-palette\"></div></md-button><md-menu-content class=theme-list><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutter')\"><div class=theme-chutter>Chutter</div></md-button><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutterDark')\"><div class=theme-chutter-dark>Chutter Dark</div></md-button><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutterTeal')\"><div class=theme-chutter-teal>Chutter Teal</div></md-button><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutterOrange')\"><div class=theme-chutter-orange>Chutter Orange</div></md-button><md-button aria-label=\"change theme\" ng-click=\"switchTheme('chutterPink')\"><div class=theme-chutter-pink>Chutter Pink</div></md-button></md-menu-content></md-menu><md-button aria-label=notifications href=/me/notifications target=_self>{{user.username}}</md-button><span>({{user.post_points}} · {{user.comment_points}})</span><md-button aria-label=messages href=/me/conversations target=_self hide-sm=hide-sm class=md-icon-button><i class=\"icon ion-android-mail\"></i><md-tooltip>Messages</md-tooltip></md-button><md-button aria-label=logout ng-click=logout() hide-sm=hide-sm class=md-icon-button><i class=\"icon ion-log-out\"></i><md-tooltip>Log out</md-tooltip></md-button></div></div></md-toolbar><md-toolbar ng-class=page.mainToolbar id=networks-bar><div class=md-toolbar-tools><md-menu-bar id=network-menu-bar><md-menu><md-button ng-click=$mdOpenMenu()><span>My Networks</span><md-icon><i class=\"icon ion-android-arrow-dropdown\"></i></md-icon></md-button><md-menu-content><md-menu-item><md-button aria-label=\"view all networks\" ui-sref=frontpage.hot>Front Page</md-button></md-menu-item><md-menu-item ng-repeat=\"network in networks\"><md-button aria-label=\"view network\" ui-sref=\"network_frontpage.hot({network: network.slug})\">{{network.name}}</md-button></md-menu-item><md-menu-divider></md-menu-divider><md-menu-item ng-click=editNetworks()><md-button>Find new networks</md-button></md-menu-item></md-menu-content></md-menu></md-menu-bar><md-tabs md-selected=page.selectedCommunityTab flex=true ng-class=page.mainToolbar class=md-primary><md-tab ui-sref={{applicationSectionNamespace}}.hot><md-tab-label><span>All</span></md-tab-label></md-tab><md-tab ng-repeat=\"community in communities\" ui-sref=\"{{applicationSectionNamespace}}.community.hot({community: community.slug})\"><md-tab-label layout=row layout-align=\"space-between center\"><span ng-bind=community.name></span></md-tab-label></md-tab></md-tabs><md-button ng-if=\"page.scope != 'all' &amp;&amp; user &amp;&amp; user.id\" ng-click=editNetworkCommunities(page.network) class=md-icon-button><i class=\"icon ion-plus-round\"></i></md-button><md-button class=md-icon-button><i class=\"icon ion-android-funnel\"></i></md-button></div></md-toolbar><md-progress-linear md-mode=indeterminate ng-if=loading class=md-hue-2 id=loading></md-progress-linear>");
  $templateCache.put("../app/partials/shared/comments/comment.html",
    "<div ng-click=comment.toggle() class=border><div class=line></div></div><div layout-fill=layout-fill layout=column class=collapsed><div layout=row class=\"header secondary-content\"><md-button aria-label=\"toggle comment\" ng-click=comment.toggle() class=md-icon-button><div class=\"icon ion-ios-plus-outline\"></div></md-button><span><md-button md-no-ink=md-no-ink ng-bind=comment.username ui-sref=\"user.overview({username: comment.username})\" aria-label=username class=\"md-primary button-link username\"></md-button><span ng-bind=\"comment.points + ' points'\" class=points></span></span><span flex=flex></span><span am-time-ago=comment.created_at class=time></span></div></div><div layout=row flex=true class=main><div layout=column layout-align=\"space-between center\" class=left-controls><div hide-sm=true layout=column layout-align=\"start center\" class=vote><md-button flex=flex aria-label=Upvote ng-click=\"commentListCtrl.updateVote(comment, 1)\" class=md-icon-button><i ng-class=\"{'active-up' : (comment.vote == 1)}\" class=\"icon ion-chevron-up\"></i></md-button><md-button flex=flex aria-label=Downvote ng-click=\"commentListCtrl.updateVote(comment, -1)\" class=md-icon-button><i ng-class=\"{'active-down' : (comment.vote == -1)}\" class=\"icon ion-chevron-down\"></i></md-button></div><md-button ng-click=comment.toggle() flex=30 aria-label=\"toggle comment\" layout-align=\"end center\" class=md-icon-button><div class=\"icon ion-ios-minus-outline\"></div></md-button></div><div layout=column layout-fill=layout-fill layout-align=\"space-between start\" class=content><div layout=row layout-align=\"start center\" class=header><md-button aria-label=username md-no-ink=md-no-ink ng-bind=comment.username ui-sref=\"user.overview({username: comment.username})\" class=\"md-primary button-link username\"></md-button><span ng-bind=\"comment.points + ' points'\" class=points></span><span layout-align=end am-time-ago=comment.created_at class=time></span></div><div marked=comment.body class=body></div><div class=footer><a>permalink</a><a ng-click=comment.moderate() ng-if=\"comment.moderates &amp;&amp; !comment.restricted_from_removing_comments\">mod</a><a>save</a><a>report</a><a ng-if=\"::(commentListCtrl.user &amp;&amp; commentListCtrl.user.id &amp;&amp; (commentListCtrl.user.id == comment.user_id))\" ng-click=commentListCtrl.edit(comment)>edit</a><a ng-click=\"resource.delete({id: post.id})\">delete</a><a ng-click=commentListCtrl.reply(comment)>reply</a></div><div ng-if=false layout=row layout-align=\"start center\" class=load-more><a ng-click=commentListCtrl.children(comment) ng-if=!comment.loadingChildren>load more comments</a><md-progress-circular md-diameter=15 md-mode=indeterminate ng-if=comment.loadingChildren></md-progress-circular></div></div></div>");
  $templateCache.put("../app/partials/shared/comments/commentEmbed.html",
    "<div layout=row flex=true class=main><div layout=column layout-fill=layout-fill layout-align=\"space-between start\" class=content><div layout=row layout-align=\"start center\" class=header><md-button aria-label=username md-no-ink=md-no-ink ng-bind=ctrl.comment.username ui-sref=\"user.overview({username: ctrl.comment.username})\" class=\"md-primary button-link username\"></md-button><span ng-bind=\"ctrl.comment.points + ' points'\" class=points></span><span layout-align=end am-time-ago=ctrl.comment.created_at class=time></span></div><div marked=ctrl.comment.body class=body></div><div class=footer><a>permalink</a><a ng-click=ctrl.comment.moderate() ng-if=\"ctrl.comment.moderates &amp;&amp; !ctrl.comment.restricted_from_removing_comments\">mod</a><a>save</a><a ng-if=\"::(commentListCtrl.user &amp;&amp; commentListCtrl.user.id &amp;&amp; (commentListCtrl.user.id == ctrl.comment.user_id))\" ng-click=commentListCtrl.edit(comment)>edit</a><a ng-click=\"resource.delete({id: post.id})\">delete</a></div></div></div>");
  $templateCache.put("../app/partials/shared/comments/editPanel.html",
    "<md-bottom-sheet id=edit><md-toolbar><div class=md-toolbar-tools><h3>Edit Comment</h3><span flex=flex></span><md-button class=\"md-icon-button large-icon\"><i class=\"ion ion-android-close\"></i></md-button></div></md-toolbar><md-content layout-padding=layout-padding layout-margin=layout-margin layout=column class=primary-content><comment-embed ng-if=comment.id layout=column id=c{{comment.path}} comment=page.commentSelectedForReply></comment-embed><md-divider></md-divider><form name=replyForm><md-input-container flex=flex><label>Comment</label><textarea ng-model=newComment.body type=text rows=10></textarea></md-input-container></form><div layout=row class=footer><span flex=flex></span><md-button ng-click=\"create(newComment, comment)\" class=md-raised>Reply</md-button><md-button class=md-raised>Cancel</md-button></div></md-content></md-bottom-sheet>");
  $templateCache.put("../app/partials/shared/comments/replyPanel.html",
    "<md-bottom-sheet id=reply><md-toolbar><div class=md-toolbar-tools><h3 ng-bind=\"'reply to ' + comment.user.username\"></h3><span flex=flex></span><md-button aria-label=\"close comment reply\" ng-click=closeSheet() class=\"md-icon-button large-icon\"><i class=\"ion ion-android-close\"></i></md-button></div></md-toolbar><md-content layout-padding=layout-padding layout-margin=layout-margin layout=column class=primary-content><comment-embed ng-if=comment.id layout=column id=c{{comment.path}} comment=page.commentSelectedForReply></comment-embed><md-divider></md-divider><form name=replyForm><md-input-container flex=flex><label>Comment</label><textarea ng-model=newComment.body type=text rows=10></textarea></md-input-container></form><div layout=row class=footer><span flex=flex></span><md-button ng-click=\"create(newComment, comment)\" class=md-raised>Reply</md-button><md-button ng-click=closeSheet() class=md-raised>Cancel</md-button></div></md-content></md-bottom-sheet>");
}]);
