angular.module('templates-shared', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("../app/partials/toasts/comment-toast.html",
    "<md-toast>example notification for when you get a comment</md-toast>");
  $templateCache.put("../app/partials/toasts/post-toast.html",
    "<md-toast><span ng-bind=\"::(('Re: ' + notification.title + '...') | limitTo: 50)\"></span><span ng-if=\"notification.title.length &gt; 49\">...</span><md-action>{{::notification.ephemeral_count}} new notifications</md-action></md-toast>");
  $templateCache.put("../app/partials/shared/createCommunityRule.html",
    "<md-dialog md-dynamic-height=md-dynamic-height style=\"min-height: 300px\" aria-label=\"Create Rule\"><md-toolbar><div class=md-toolbar-tools>Create a community rule<span flex=flex></span><md-button ng-click=hideDialog() class=md-icon-button><i class=\"fa fa-close fa-fw\"></i></md-button></div></md-toolbar><md-content class=md-padding><form><md-input-container><label>Brief Description (e.g. no punchlines in the title)</label><input ng-model=\"newRule.category\"></md-input-container><md-input-container><label>Detailed Explanation of Rule (optional, but encouraged)</label><textarea rows=10 ng-model=newRule.detailed_explanation></textarea></md-input-container><div layout=row><div flex=50><md-input-container><label>Applies to</label></md-input-container><md-checkbox ng-model=newRule.general ng-click=\"setSelectedAppliesTo('general')\">General</md-checkbox><md-checkbox ng-model=newRule.posts ng-click=\"setSelectedAppliesTo('posts')\">Posts</md-checkbox><md-checkbox ng-model=newRule.comments ng-click=\"setSelectedAppliesTo('comments')\">Comments</md-checkbox></div><div flex=50><md-input-container><label>Severity</label></md-input-container><md-checkbox ng-model=newRule.discouraged ng-click=\"setSelectedSeverity('discouraged')\">Discouraged</md-checkbox><md-checkbox ng-model=newRule.removal ng-click=\"setSelectedSeverity('removal')\">Removal</md-checkbox><md-checkbox ng-model=newRule.ban ng-click=\"setSelectedSeverity('ban')\">Ban</md-checkbox></div></div><md-divider></md-divider><div layout=row><span flex=flex></span><md-button ng-click=saveRule() class=\"md-primary md-raised\">Save</md-button><md-button ng-click=cancelSave() class=\"md-warn md-raised\">Cancel</md-button></div></form></md-content></md-dialog>");
  $templateCache.put("../app/partials/shared/modSheet.html",
    "<md-bottom-sheet md-theme=moderator layout=column layout-fill=true><md-toolbar><div class=md-toolbar-tools><h3>Moderation</h3><span flex=flex></span><md-button ng-click=closeModSheet() class=\"md-icon-button large-icon\"><i class=\"ion ion-android-close\"></i></md-button></div></md-toolbar><md-tabs layout=row layout-fill=true><md-tab label=\"Remove Post\" ng-if=post><div><div ng-include=\"'/partials/shared/postEmbed.html'\"></div><form name=explanationForm><md-subheader>Rule Violation</md-subheader><md-radio-group ng-model=activityLogEntry.rule_id><md-radio-button ng-repeat=\"rule in communityRules\" ng-value=rule.id class=md-primary>{{rule.category}}</md-radio-button></md-radio-group><md-input-container flex=flex><label>Detailed Explanation</label><textarea ng-model=activityLogEntry.detailed_explanation type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitEntityableForm() class=md-raised>Submit</md-button><md-button class=md-raised>Cancel</md-button></div></form></div></md-tab><md-tab label=\"Remove Comment\" ng-if=comment><div><div ng-include=\"'/partials/shared/comments/commentEmbed.html'\"></div><form name=explanationForm><md-subheader>Rule Violation</md-subheader><md-radio-group ng-model=activityLogEntry.rule_id><md-radio-button ng-repeat=\"rule in communityRules\" ng-value=rule.id class=md-primary>{{rule.category}}</md-radio-button></md-radio-group><md-input-container flex=flex><label>Detailed Explanation</label><textarea ng-model=activityLogEntry.detailed_explanation type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitEntityableForm() class=md-raised>Submit</md-button><md-button class=md-raised>Cancel</md-button></div></form></div></md-tab><md-tab label=User><form name=explanationForm><h3 ng-bind=entityable.username></h3><md-subheader>Ban From</md-subheader><md-input-container><md-select ng-model=communityId placeholder=Community><md-option ng-repeat=\"community in user.moderated_communities\" ng-bind=community.name></md-option></md-select></md-input-container><md-subheader>Ban Length</md-subheader><md-slider flex=50 ng-model=myValue min=0 max=5 class=md-primary></md-slider><md-subheader>Rule Violation</md-subheader><md-radio-group ng-model=activityLogEntry.rule_id><md-radio-button ng-repeat=\"rule in community_rules | filter:{general: true} \" ng-value=rule.id class=md-primary>{{rule.category}}</md-radio-button></md-radio-group><md-input-container flex=flex><label>Detailed Explanation</label><textarea ng-model=activityLogEntry.detailed_explanation type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitUserForm() class=md-raised>Submit</md-button><md-button class=md-raised>Cancel</md-button></div></form></md-tab></md-tabs></md-bottom-sheet>");
  $templateCache.put("../app/partials/shared/post.html",
    "<div style=\"position: absolute; top: 5.5vw; width: 4vw\" layout=column layout-align=\"start center\" layout-fill=true ng-if=post.toggled class=controls><md-button aria-label=close ng-click=post.toggle() class=md-icon-button><i class=\"icon ion-close\"></i></md-button><md-button aria-label=close ng-click=post.currentMedia.audio.toggle() ng-if=post.currentMedia.audio ng-switch=post.currentMedia.audio.audioElement.paused class=md-icon-button><i ng-switch-when=false class=\"icon ion-pause\"></i><i ng-switch-when=true class=\"icon ion-play\"></i></md-button><md-button aria-label=expand ng-click=post.toggleExpand() ng-if=\"post.currentMedia.format != 'music'\" ng-switch=post.zoomValue class=md-icon-button><i ng-switch-default=true class=\"icon ion-android-expand\"></i><i ng-switch-when=10 class=\"icon ion-android-contract\"></i></md-button></div><div hide-sm=true layout=column layout-fill=layout-fill class=vote><md-button flex=flex aria-label=Upvote ng-click=post.updateVote(1)><i ng-class=\"{'active-up' : (post.vote == 1)}\" class=\"icon ion-chevron-up\"></i></md-button><md-button flex=flex aria-label=Downvote ng-click=post.updateVote(-1)><i ng-class=\"{'active-down' : (post.vote == -1)}\" class=\"icon ion-chevron-down\"></i></md-button></div><div class=main><div layout=column class=middle><div ng-switch=post.media.length class=top><div ng-switch-when=0><div class=title><a ng-bind=::post.title ui-sref=\"home.community.comments({id: post.slug, community: post.community_slug})\" class=title-text></a></div></div><div ng-switch-default=ng-switch-default><div class=title><a ng-bind=::post.title href={{::post.media[0].link}} class=title-text></a><span ng-bind=\"'('+post.media[0].attribution+')'\" class=attribution></span></div></div></div><div class=tagline><span ng-bind=\"(post.points || 0) + ' points'\" class=votes></span><span class=submitted-by-text>submitted by</span><a ng-bind=::post.username ui-sref=\"user.overview({username: post.username})\" class=user-link></a><span class=time-ago>about 34 minutes ago</span></div><div layout=row class=footer><a ui-sref=\"home.community.comments({id: post.slug, community: post.community_slug})\" ng-bind=\"post.comments_count + ' comments'\"></a><a ng-if=!post.saved ng-click=post.toggleSave()>save</a><a ng-if=post.saved ng-click=post.toggleSave()>unsave</a><a ng-click=post.report()>report</a><a ng-click=post.moderate() ng-if=\"post.moderates &amp;&amp; !post.restricted_from_removing_posts\">mod</a></div></div><div layout=column layout-align=\"center center\" ng-click=post.toggle($event) class=postcontent><embed-video ng-if=\"post.currentMedia.format == 'video' &amp;&amp; post.zoomValue &gt; 1\" data-ng-href={{post.media[0].stream_link}} autoplay width=100% height=100% class=md-whiteframe-z3></embed-video><img ng-if=\"(post.currentMedia.format != 'video') &amp;&amp; post.zoomValue &gt; 1\" ng-src={{post.currentMedia.image_link}} class=\"md-whiteframe-z3\"><div ng-if=\"post.currentMedia.format == 'body'\" layout=column class=\"body md-whiteframe-z3\"><md-content class=\"md-whiteframe-z1 md-padding\"><div marked=::post.body class=md-padding></div></md-content></div></div></div>");
  $templateCache.put("../app/partials/shared/postEmbed.html",
    "<div layout=row layout-margin=true style=\"height: 100px\"><div flex=10 ng-show=post.media.length ng-click=post.toggle() style=\"background-image: url('{{post.media[0].thumbnail_link}}'); background-size: cover\" class=media></div><div flex=flex layout=column class=middle><div ng-switch=post.media.length flex=flex class=top><div ng-switch-when=0 layout=row><div flex=75 flex-sm=100 class=title><a ng-bind=post.title ui-sref=\"home.community.comments({id: post.slug, community: post.community_slug})\" class=title-text></a></div><span flex=flex></span><div class=community><a ng-bind=post.community></a></div></div><div ng-switch-default=ng-switch-default layout=row><div flex=75 class=title><a ng-bind=post.title href={{post.media[0].link}} class=title-text></a><span class=attribution><a ng-bind=\"'('+post.media[0].attribution+')'\"></a></span></div><span flex=flex></span></div></div></div></div>");
  $templateCache.put("../app/partials/shared/postListItem.html",
    "<post ng-repeat=\"post in page.posts track by post.id\" post=post post-index=$index layout=row layout-sm=column flex=flex id=post-{{post.id}} class=post></post>");
  $templateCache.put("../app/partials/shared/reportSheet.html",
    "<md-bottom-sheet md-theme=moderator><md-toolbar class=md-warn><div class=md-toolbar-tools><h3>Report</h3><span flex=flex></span><md-button ng-click=closeReportSheet() class=\"md-icon-button large-icon\"><i class=\"ion ion-android-close\"></i></md-button></div></md-toolbar><md-content layout-padding=layout-padding layout-margin=layout-margin layout=column><md-tabs><md-tab label=Content><md-content><div ng-include=\"'/partials/shared/postEmbed.html'\"></div><form name=explanationForm><md-subheader>Rule Violation</md-subheader><md-radio-group ng-model=activityLogEntry.rule_id><md-radio-button ng-repeat=\"rule in community_rules | filter:{posts: true} \" ng-value=rule.id class=md-primary>{{rule.category}}</md-radio-button></md-radio-group><md-input-container><label>Detailed Explanation</label><textarea ng-model=activityLogEntry.detailed_explanation type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitEntityableForm() class=md-raised>Submit</md-button><md-button class=md-raised>Cancel</md-button></div></form></md-content></md-tab><md-tab label=User><form name=explanationForm><h3 ng-bind=entityable.username></h3><md-radio-group><md-radio-button ng-repeat=\"rule in community_rules | filter:{general: true} \" ng-value=rule.id class=md-primary></md-radio-button></md-radio-group><md-input-container flex=flex><label>Detailed Explanation</label><textarea ng-model=newComment.body type=text rows=5></textarea></md-input-container><div layout=row class=footer><span flex=flex></span><md-button ng-click=submitUserForm() class=md-raised>Submit</md-button><md-button class=md-raised>Cancel</md-button></div></form></md-tab></md-tabs></md-content></md-bottom-sheet>");
  $templateCache.put("../app/partials/shared/subscriptionDialog.html",
    "<md-dialog style=\"width: 50%\"><md-toolbar class=md-accent><div class=md-toolbar-tools>Help keep Chutter.co online<span flex=flex></span><md-button ng-click=hideDialog() class=md-icon-button><i class=\"fa fa-close fa-fw\"></i></md-button></div></md-toolbar><md-dialog-content><section id=subscription-section><md-list><md-list-item class=md-2-line><md-icon layout=row layout-align=\"center center\"><i class=\"icon ion-ribbon-a\"></i></md-icon><div class=md-list-item-text><h3>Gild up to 10 users a month</h3><p>gild the best comments / posts and the user gets a free month of chutter pro.</p></div></md-list-item><md-list-item class=md-2-line><md-icon layout=row md-svg-src=/img/character.svg></md-icon><div class=md-list-item-text><h3>Support Chutter</h3><p>You can pay for a meaningful chunk of server time for only 4 quarters a month.</p></div></md-list-item><md-list-item class=md-2-line><md-icon layout=row layout-align=\"center center\"><i class=\"icon ion-android-notifications-off\"></i></md-icon><div class=md-list-item-text><h3>Mute post / comment notifications</h3><p>No more \"R.I.P inbox\". Easily mute comment / post / message notifications</p></div></md-list-item><md-list-item class=md-2-line><md-icon layout=row layout-align=\"center center\"><i class=\"icon ion-android-funnel\"></i></md-icon><div class=md-list-item-text><h3>Saved categories</h3><p>All of your saved posts will automatically be categorized (e.g. \"music\", \"videos\", etc...).</p></div></md-list-item></md-list></section></md-dialog-content></md-dialog>");
  $templateCache.put("../app/partials/shared/comments/comment.html",
    "<div ng-click=toggle() class=border><div class=line></div></div><div layout-fill=layout-fill layout=column class=collapsed><div layout=row class=header><md-button aria-label=\"toggle comment\" ng-click=toggle() class=md-button-toggle><span class=md-toggle-icon><i class=ion-ios-plus-outline></i></span></md-button><span><a ng-bind=comment.username ui-sref=\"user.overview({username: comment.username})\" class=username></a><span ng-bind=\"comment.points + ' points'\" class=points></span></span><span flex=flex></span><span layout-align=end class=time>42 minutes ago</span></div></div><div layout=row class=main><div layout=column layout-fill=layout-fill class=vote><md-button flex=30 aria-label=Upvote ng-click=comment.updateVote(1)><i ng-class=\"{'active-up' : (comment.vote == 1)}\" class=\"icon ion-chevron-up\"></i></md-button><md-button flex=30 aria-label=Downvote ng-click=comment.updateVote(-1)><i ng-class=\"{'active-down' : (comment.vote == -1)}\" class=\"icon ion-chevron-down\"></i></md-button><span flex=flex></span><md-button ng-click=toggle() flex=30 aria-label=\"toggle comment\" layout-align=\"end center\" class=md-button-toggle><span><i class=ion-ios-minus-outline></i></span></md-button></div><div layout=column layout-fill=layout-fill class=content><div layout=row class=header><div class=wrap><a ng-bind=comment.username ui-sref=\"user.overview({username: comment.username})\" class=username></a><span ng-bind=\"comment.points + ' points'\" class=points></span></div><span flex=flex></span><span layout-align=end class=time>42 minutes ago</span></div><div marked=comment.body class=body></div><div class=footer><a ng-click=comment.reply()>reply</a><a>save</a><a>report</a><a ng-click=\"resource.delete({id: post.id})\">delete</a><a ng-click=comment.moderate() ng-if=\"comment.moderates &amp;&amp; !comment.restricted_from_removing_comments\">mod</a></div></div></div>");
  $templateCache.put("../app/partials/shared/comments/commentEmbed.html",
    "<div layout=row class=main><div layout=column layout-fill=layout-fill hide-md=hide-md hide-sm=hide-sm class=vote><md-button flex=flex aria-label=Upvote><i class=\"fa fa-caret-up\"></i></md-button><md-button flex=flex aria-label=Downvote><i class=\"fa fa-caret-down\"></i></md-button></div><div flex=75 layout=column class=content><div class=header><a ng-bind=comment.user.username ui-sref=\"user.overview({username: comment.user.username})\" class=username></a></div><div ng-bind=comment.body class=body></div></div><div flex=5 class=options></div></div>");
  $templateCache.put("../app/partials/shared/comments/replyPanel.html",
    "<md-bottom-sheet id=reply><md-toolbar><div class=md-toolbar-tools><h3 ng-bind=\"'reply to ' + comment.user.username\"></h3><span flex=flex></span><md-button class=\"md-icon-button large-icon\"><i class=\"ion ion-android-close\"></i></md-button></div></md-toolbar><md-content layout-padding=layout-padding layout-margin=layout-margin layout=column class=primary-content><comment-embed ng-if=comment.id layout=column id=c{{comment.path}} comment=page.commentSelectedForReply></comment-embed><md-divider></md-divider><form name=replyForm><md-input-container flex=flex><label>Comment</label><textarea ng-model=newComment.body type=text rows=10></textarea></md-input-container></form><div layout=row class=footer><span flex=flex></span><md-button ng-click=\"create(newComment, comment)\" class=md-raised>Reply</md-button><md-button class=md-raised>Cancel</md-button></div></md-content></md-bottom-sheet>");
}]);
