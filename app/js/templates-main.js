angular.module('templates-main', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("../app/partials/main/authenticate.html",
    "<md-dialog md-dynamic-height=md-dynamic-height style=\"min-height: 300px\"><md-tabs md-border-bottom=md-border-bottom><md-tab label=\"sign in\" layout-fill=layout-fill><md-content class=md-padding><form name=signIn ng-submit=submitLogin(user)><md-input-container><label>Username</label><input ng-model=user.username required></md-input-container><md-input-container><label>Password</label><input ng-model=user.password type=password required></md-input-container><md-button type=submit>Login</md-button><md-button ng-click=hideDialog()>Cancel</md-button></form></md-content></md-tab><md-tab label=\"sign up\"><md-content class=md-padding><form name=signUp ng-submit=submitRegistration(user)><md-input-container><label>Username</label><input ng-model=user.username required></md-input-container><md-input-container><label>Email</label><input ng-model=\"user.email\"></md-input-container><md-input-container><label>Password</label><input ng-model=user.password type=password required></md-input-container><md-button type=submit>Sign Up</md-button></form></md-content></md-tab></md-tabs></md-dialog>");
  $templateCache.put("../app/partials/main/comments.html",
    "<post post=page.post layout=row class=\"post md-whiteframe-z1\"></post><md-toolbar layout=row class=md-hue-2 id=comment-toolbar><div class=md-toolbar-tools><md-tabs class=md-hue-2><md-tab label=hot></md-tab><md-tab label=new></md-tab><md-tab label=top></md-tab></md-tabs><span flex=flex></span><span ng-bind=\"page.post.comments_count + ' comments'\" class=comments></span></div></md-toolbar><div id=comments><comment layout=column ng-repeat=\"child in page.comments\" id=c{{child.path}} comment=child></comment></div><md-button aria-label=Comment ng-click=reply() class=\"md-fab post-comment\"><span class=\"fa fa-comments fa-fw\"></span><md-tooltip md-direction=left>Comment</md-tooltip></md-button>");
  $templateCache.put("../app/partials/main/communityEdit.html",
    "<md-dialog md-dynamic-height=md-dynamic-height style=\"min-height: 300px\" flex=50><md-toolbar><div class=md-toolbar-tools>Manage Community Subscriptions<span flex=flex></span><md-button ng-click=hideDialog() class=md-icon-button><i class=\"fa fa-close fa-fw\"></i></md-button></div></md-toolbar><md-dialog-content><div layout=row><md-input-container flex=flex><label>Search</label><input ng-model=\"communityFilter\"></md-input-container></div><md-list-item ng-repeat=\"community in communities | filter: communityFilter\"><p ng-bind=community.name></p><span flex=flex></span><md-switch ng-model=community.subscribed aria-label=\"Switch 1\" ng-change=toggle(community)></md-switch></md-list-item></md-dialog-content></md-dialog>");
  $templateCache.put("../app/partials/main/communityPanel.html",
    "<md-bottom-sheet id=community-panel><md-toolbar><div class=md-toolbar-tools><h3 ng-bind=page.community.name></h3><span flex=flex></span><md-button ng-click=close() class=md-icon-button><i class=\"fa fa-close\"></i></md-button></div></md-toolbar><md-list><md-subheader class=md-no-sticky>Description</md-subheader><md-list-item class=md-2-line><div class=md-list-item-text><p>Nothing here is binding, but having a forum for full discussion and different perspectives can help ensure that any action taken is well thought out. It can also help us tie up some existing loose ends that may be overlooked. The more practical and supported a topic is, the better likelihood of it becoming official.</p></div></md-list-item><md-subheader class=md-no-sticky>Rules</md-subheader><md-list-item class=md-2-line><div class=md-list-item-text><p>Nothing here is binding, but having a forum for full discussion and different perspectives can help ensure that any action taken is well thought out. It can also help us tie up some existing loose ends that may be overlooked. The more practical and supported a topic is, the better likelihood of it becoming official.</p></div></md-list-item><md-subheader class=md-no-sticky>Rules</md-subheader><md-list-item class=md-2-line><div class=md-list-item-text><p>Nothing here is binding, but having a forum for full discussion and different perspectives can help ensure that any action taken is well thought out. It can also help us tie up some existing loose ends that may be overlooked. The more practical and supported a topic is, the better likelihood of it becoming official.</p></div></md-list-item><md-subheader class=md-no-sticky>Rules</md-subheader><md-list-item class=md-2-line><div class=md-list-item-text><p>Nothing here is binding, but having a forum for full discussion and different perspectives can help ensure that any action taken is well thought out. It can also help us tie up some existing loose ends that may be overlooked. The more practical and supported a topic is, the better likelihood of it becoming official.</p></div></md-list-item></md-list></md-bottom-sheet>");
  $templateCache.put("../app/partials/main/index.html",
    "<!DOCTYPE html><html lang=en ng-app=MainApp xmlns:ng=http://angularjs.org><head><base href=\"/\"><link rel=icon type=image/png href=\"favicon.ico\"><link rel=\"shortcut icon\" type=image/png href=\"favicon.ico\"><meta name=fragment content=\"!\"><meta charset=\"utf-8\"><meta content=\"telephone=no\" name=\"format-detection\"><meta content=\"width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no\" name=\"viewport\"><meta content=ZYCtjzD0MQsstNXtDL7ZQyRzkj61deTZWYgEeMmCGdY name=\"google-site-verification\"><link href=\"https://www.chutter.co/\" rel=\"canonical\"><link href=/css/compiled/application.min.css rel=stylesheet><link href=/vendor/ionicons/css/ionicons.min.css rel=stylesheet><title>Chutter &mdash;</title></head><body layout=row layout-fill=layout-fill><ui-view layout=column layout-fill=layout-fill></ui-view><script src=/js/compiled/application.min.js></script><script src=/js/compiled/main.min.js></script><script src=//platform.twitter.com/widgets.js></script></body></html>");
  $templateCache.put("../app/partials/main/layout.html",
    "<md-content layout=row flex=flex layout-align=\"end end\"><md-toolbar class=\"md-whiteframe-z1 md-tall\" id=main-toolbar><div ng-hide=\"user &amp;&amp; user.id\" layout=row class=md-toolbar-tools><div class=toolbar-container><img ng-src=vendor/mr-chutter.png style=\"width: 35px\" hide-sm=\"true\"><a ui-sref=home.all flex=flex ng-click=toggleLeft() hide-sm=true id=brand>chutter</a><md-button ng-show=\"$mdMedia('lt-md')\" ng-click=toggleLeft() hide-gt-small=true><i class=\"fa fa-list\"></i></md-button></div><span flex=flex></span><div layout=row layout-align=\"end end\" class=toolbar-container><md-button ng-click=signIn()>Sign In</md-button></div></div><div ng-show=\"user &amp;&amp; user.id\" layout=row flex=100 class=md-toolbar-tools><div class=toolbar-container><img ng-src=vendor/mr-chutter.png style=\"width: 35px\" hide-sm=\"true\"><md-button ng-click=toggleLeft() hide-gt-sm=hide-gt-sm class=md-icon-button><i class=\"fa fa-align-justify fa-fw\"></i></md-button><a ui-sref=home.all flex=flex ng-click=toggleLeft() hide-sm=true id=brand>chutter</a></div><span flex=flex></span><div hide-sm=hide-sm hide-md=hide-md layout=row layout-align=\"end end\" class=toolbar-container><md-button ng-if=user.moderator href=/moderation target=_self>moderation</md-button><md-button ng-if=user.manager href=/management target=_self>management</md-button><md-button href=/me/notifications ng-bind=user.username target=_self></md-button><md-button href=/me/conversations target=_self hide-sm=hide-sm><i class=\"icon ion-android-mail\"></i><md-tooltip>Messages</md-tooltip></md-button><md-button ng-click=logout() hide-sm=hide-sm><i class=\"icon ion-log-out\"></i><md-tooltip>Log out</md-tooltip></md-button></div></div><div layout=row class=\"md-toolbar-tools md-toolbar-tools-bottom\"><div layout=row layout-align=\"center center\" class=toolbar-container><a ui-sref=home.all flex=flex>All</a><span flex=flex></span><md-button ng-click=editNetworks() class=md-icon-button><i class=\"fa fa-sliders fa-fw\"></i></md-button></div><span flex=flex></span><div layout=row layout-align=\"center center\" class=toolbar-container><a href=# ng-bind=page.title.text ng-class=\"{'active': page.secondary_title}\" id=primary-title></a><a ng-if=page.secondary_title ui-sref=\"home.community({id: page.secondary_title.slug})\" ng-bind=page.secondary_title.text id=secondary-title></a><span flex=flex></span><md-fab-speed-dial md-direction=down ng-if=\"page.scope == 'community'\" class=md-scale><md-fab-trigger><md-button aria-label=menu ui-sref=\"home.community.submit({id: page.community.slug})\" class=\"md-fab md-mini\"><i class=\"fa fa-share fa-fw\"></i></md-button></md-fab-trigger><md-fab-actions><md-button aria-label=twitter class=\"md-fab md-raised md-mini md-warn\"><i class=\"fa fa-ban fa-fw\"></i></md-button></md-fab-actions></md-fab-speed-dial></div></div></md-toolbar><md-sidenav md-component-id=left md-is-locked-open=\"$mdMedia('gt-md')\" class=md-sidenav-left><md-content flex=flex role=navigation layout-fill=layout-fill layout=row class=\"nav-menu gray\"><ul flex=flex class=\"menu-nested-list ng-cloak\"><li ng-repeat=\"network in page.networks | orderBy:'name'\" ui-sref-active=active><menu-toggle ng-if=true network=network></menu-toggle></li></ul></md-content></md-sidenav><div flex=flex layout=row class=md-whiteframe-z1 id=content><ui-view layout=column layout-fill=true></ui-view></div><md-sidenav md-component-id=right md-is-locked-open=\"$mdMedia('gt-md')\" class=md-sidenav-right><md-content ng-switch=page.scope layout=column><div ng-switch-when=submit layout-fill=layout-fill><div class=description><md-list><md-list-item><div class=md-list-item-text><p ng-bind=page.community.description></p></div></md-list-item></md-list></div><div class=rules><h5>Submission Rules</h5><md-list><md-list-item ng-repeat=\"rule in page.community.rules\" class=md-2-line><div class=md-list-item-text><h5 ng-bind=rule.brief_description></h5><p ng-bind=rule.detailed_explanation></p></div></md-list-item></md-list></div></div><div ng-switch-when=community layout-fill=layout-fill><div class=description><md-list><md-list-item><div class=md-list-item-text><p ng-bind=page.community.description></p></div></md-list-item></md-list></div><div class=rules><h5>General Rules</h5><md-list><md-list-item ng-repeat=\"rule in page.community.rules\" class=md-2-line><div class=md-list-item-text><h5 ng-bind=rule.brief_description></h5><p ng-bind=rule.detailed_explanation></p></div></md-list-item></md-list></div><div class=moderators></div></div><div ng-switch-when=all layout=column layout-fill=layout-fill><div class=description><h5>Monthly Sub Goal</h5><div><md-progress-linear md-mode=determinate value=33 class=md-warn></md-progress-linear></div><div layout=row layout-align=\"center center\" class=md-padding><a>Help keep Chutter running</a></div></div><div class=news><h5>Welcome to Chutter</h5><p>Chutter.co is a new place to share the best stuff on the web. To get started, check out some of the different <span ng-click=editNetworks() class=inline-link>networks</span>When you subscribe to a network for the first time, you are auto-subscribed to their default communities. This can be changed by clicking the slider icon in the left menu upon entering a network.</p><p>P.S. - just click the post's picture to view an embedded / mirrored version of the link. Otherwise, click the title to visit the actual link.</p></div></div><div ng-switch-when=network layout=column layout-fill=layout-fill><div class=description><h5>Trending Communities</h5></div></div></md-content><div ng-if=\"page.scope == 'all'\" id=footer><md-divider></md-divider><div layout=row layout-align=\"center center\" class=md-toolbar-tools><a>help</a><a>contact</a><a>bugs</a><a>faq</a><a>values</a><a>rules</a></div></div></md-sidenav></md-content>");
  $templateCache.put("../app/partials/main/mediaPlayer.html",
    "");
  $templateCache.put("../app/partials/main/networkEdit.html",
    "<md-dialog md-dynamic-height=md-dynamic-height style=\"min-height: 300px\" flex=50><md-toolbar><div class=md-toolbar-tools>Manage Network Subscriptions<span flex=flex></span><md-button ng-click=hideDialog() class=md-icon-button><i class=\"fa fa-close fa-fw\"></i></md-button></div></md-toolbar><md-dialog-content><div layout=row><md-input-container flex=flex><label>Search</label><input ng-model=\"networkFilter\"></md-input-container></div><md-list-item ng-repeat=\"network in networks | filter: networkFilter\" layout=row class=subscription-card><div layout=column flex=90 class=subscription-info><h4 ng-bind=network.name></h4><span ng-bind=\"network.description || 'some description here'\"></span><div class=stats><span><i class=\"fa fa-user fa-fw\"></i>2,349</span><span><i class=\"fa fa-sitemap fa-fw\"></i>{{network.communities_count || 0}}</span></div></div><div layout=\"center center\" layout-fill=layout-fill><md-switch ng-model=network.subscribed aria-label=\"Switch 1\" ng-change=toggle(network)></md-switch></div></md-list-item></md-dialog-content></md-dialog>");
  $templateCache.put("../app/partials/main/networks.html",
    "<md-dialog md-dynamic-height=md-dynamic-height style=\"min-height: 300px\" flex=50><md-subheader class=md-no-sticky>Manage Network Subscriptions</md-subheader><md-list-item ng-repeat=\"network in networkList\"><p ng-bind=network.name></p><span flex=flex></span><md-switch ng-model=network.selected aria-label=\"Switch 1\" ng-change=networkToggle(network)></md-switch></md-list-item></md-dialog>");
  $templateCache.put("../app/partials/main/post.html",
    "<div layout=column layout-fill=layout-fill hide-sm=hide-sm class=vote><md-button flex=flex aria-label=Upvote ng-click=post.updateVote(1)><i ng-class=\"{'active-up' : (post.vote == 1)}\" class=\"fa fa-caret-up fa-2x md-primary\"></i></md-button><md-button flex=flex aria-label=Downvote ng-click=post.updateVote(-1)><i ng-class=\"{'active-down' : (post.vote == -1)}\" class=\"fa fa-caret-down fa-2x\"></i></md-button></div><div class=main><div layout=column layout-align=\"center center\" class=postcontent><div layout-align=\"start center\" ng-switch=post.currentMedia.format style=\"background: #000; width: 100%; top: 0\" class=postcontrols><div layout=row flex=flex ng-switch-when=music class=md-padding><md-button ng-switch=post.audio.audioElement.paused ng-click=post.audio.toggle() class=md-icon-button><i ng-switch-when=true style=\"color: #fff\" class=\"fa fa-play fa-2x\"></i><i ng-switch-default=ng-switch-default style=\"color: #fff\" class=\"fa fa-pause fa-2x\"></i></md-button><md-slider flex=50 ng-model=post.audio.currentTime min=0 max=10 class=md-warn></md-slider><p ng-bind=post.audio.currentTime></p><span flex=flex></span><md-button ng-click=post.toggle() class=md-icon-button><i style=\"color: #fff\" class=\"fa fa-close fa-2x fa-fw\"></i></md-button></div><div layout=row flex=flex ng-switch-default=ng-switch-default class=md-padding><md-button ng-click=post.toggle() aria-label=toggle class=md-icon-button><i style=\"color: #fff\" class=\"fa fa-close fa-2x fa-fw\"></i></md-button><span flex=flex></span><md-button aria-label=\"reset media\" ng-show=\"post.zoomValue &gt; 5\" ng-click=\"post.zoomValue = 5\" class=reset-button>Reset</md-button><md-button aria-label=zoom ng-show=\"post.zoomValue &gt; 1\" ng-click=\"post.zoomValue = 10\" class=md-icon-button><i style=\"color: #fff\" class=\"fa fa-expand fa-2x fa-fw\"></i></md-button></div></div><div flex=100 ng-click=post.toggle($event) class=media><embed-video ng-if=\"post.currentMedia.format == 'video' &amp;&amp; post.zoomValue &gt; 1\" data-ng-href={{post.media[0].stream_link}} autoplay height={{ratioHeight}} width=100%></embed-video><img ng-if=\"(post.currentMedia.format != 'video') &amp;&amp; post.zoomValue &gt; 1\" ng-src={{post.currentMedia.image_link}} style=\"width: 100%\"><div ng-if=\"post.currentMedia.format == 'body'\" layout=column class=body><md-content class=\"md-whiteframe-z1 md-padding\"><div marked=::post.body class=md-padding></div></md-content></div></div></div><div layout=column class=middle><div ng-switch=post.media.length class=top><div ng-switch-when=0 layout=row flex=flex><div class=title><a ng-bind=::post.title ui-sref=\"home.community.comments({id: post.slug, community: post.community_slug})\" class=title-text></a></div></div><div ng-switch-default=ng-switch-default layout=row flex=flex><div class=title><a ng-bind=::post.title href={{::post.media[0].link}} class=title-text></a><span ng-bind=\"'('+post.media[0].attribution+')'\" class=attribution></span></div></div></div><div class=tagline><span ng-bind=\"(post.points || 0) + ' points'\" class=votes></span><span class=submitted-by-text>submitted by</span><a ng-bind=::post.user.username ui-sref=\"user.overview({username: post.username})\" class=user-link></a><span class=time-ago>about 34 minutes ago</span></div><div layout=row flex=100 class=footer><a ui-sref=\"home.community.comments({id: post.slug, community: post.community_slug})\" ng-bind=\"post.comments_count + ' comments'\"></a><a ng-click=save()>save</a><a ng-click=report()>report</a><a ng-click=moderate() ng-if=\"user &amp;&amp; user.moderator\">mod</a></div></div></div>");
  $templateCache.put("../app/partials/main/posts.html",
    "<md-toolbar md-scroll-shrink=true class=\"md-primary md-hue-2\"><div class=md-toolbar-tools><md-tabs class=\"md-primary md-hue-2\"><md-tab label=hot></md-tab><md-tab label=new></md-tab><md-tab><md-tab-label>top</md-tab-label></md-tab></md-tabs></div></md-toolbar><md-content infinite-scroll=myPagingFunction() infinite-scroll-distance=3><post ng-repeat=\"post in page.posts track by post.id\" post=post post-index=$index layout=row layout-sm=column flex=flex id=post-{{post.id}} class=post></post></md-content>");
  $templateCache.put("../app/partials/main/submit.html",
    "<div flex=flex layout=column class=md-padding id=submit><h3 ng-bind=\"'Submit to ' + page.community.name\" class=md-headline></h3><md-tabs flex=flex layout-fill=layout-fill md-border-bottom=md-border-bottom md-dynamic-height=false md-no-disconnect=true><md-tab ng-if=\"permitted('webpage')\" label=Link md-on-select=\"newPost.media_attributes[0].format = 'webpage'\"><webpage-submit-form></webpage-submit-form></md-tab><md-tab ng-if=\"permitted('image')\" label=Image/GIF md-on-select=\"newPost.media_attributes[0].format = 'image'\"><image-submit-form></image-submit-form></md-tab><md-tab ng-if=\"permitted('discussion')\" label=Text><discussion-submit-form></discussion-submit-form></md-tab><md-tab ng-if=\"permitted('music')\" label=Music md-on-select=\"newPost.media_attributes[0].format = 'music'\"><music-submit-form></music-submit-form></md-tab><md-tab ng-if=\"permitted('video')\" label=Video md-on-select=\"newPost.media_attributes[0].format = 'video'\"><video-submit-form></video-submit-form></md-tab></md-tabs></div>");
  $templateCache.put("../app/partials/main/create/layout.html",
    "<md-toolbar class=\"md-whiteframe-z1 md-tall\" id=main-toolbar><div ng-hide=\"user &amp;&amp; user.id\" layout=row class=md-toolbar-tools><img ng-src=vendor/mr-chutter.png style=\"width: 35px\"><a ui-sref=home.all flex=flex ng-click=toggleLeft() id=brand>chutter</a><md-button ng-show=\"$mdMedia('lt-md')\" ng-click=toggleLeft()><i class=\"fa fa-list\"></i></md-button><span flex=flex></span><md-button ng-click=signIn()>Sign In</md-button></div><div ng-show=\"user &amp;&amp; user.id\" layout=row flex=100 class=md-toolbar-tools><div class=toolbar-container><img ng-src=vendor/mr-chutter.png style=\"width: 35px\" hide-sm=\"hide-sm\"><md-button ng-click=toggleLeft() hide-gt-sm=hide-gt-sm class=md-icon-button><i class=\"fa fa-align-justify fa-fw\"></i></md-button><a ui-sref=home.all flex=flex ng-click=toggleLeft() hide-sm=hide-sm id=brand>chutter</a></div><span flex=flex></span><div hide-sm=hide-sm hide-md=hide-md layout=row layout-align=\"end end\" class=toolbar-container><md-button ng-if=user.moderator href=/moderation target=_self>moderation</md-button><md-button ng-if=user.manager href=/management target=_self>management</md-button><md-button href=/me/notifications ng-bind=user.username target=_self></md-button><md-button href=/me/conversations target=_self hide-sm=hide-sm><i class=\"fa fa-envelope-o fa-fw\"></i><md-tooltip>Messages</md-tooltip></md-button><md-button ng-click=logout() hide-sm=hide-sm><i class=\"fa fa-sign-out fa-fw\"></i><md-tooltip>Log out</md-tooltip></md-button></div></div><div layout=row class=\"md-toolbar-tools md-toolbar-tools-bottom\"><div layout=row layout-align=\"center center\" class=toolbar-container><span>Create a community</span><span flex=flex></span></div><span flex=flex></span><div layout=row layout-align=\"center center\" class=toolbar-container><a href=# ng-bind=page.title.text ng-class=\"{'active': page.secondary_title}\" id=primary-title></a><a ng-if=page.secondary_title ui-sref=\"home.community({id: page.secondary_title.slug})\" ng-bind=page.secondary_title.text id=secondary-title></a><span flex=flex></span></div></div></md-toolbar><md-content layout=row flex=flex><md-sidenav md-component-id=left md-is-locked-open=\"$mdMedia('gt-md')\" class=md-sidenav-left><md-content flex=flex role=navigation layout-fill=layout-fill layout=row class=\"offset-toolbar nav-menu gray\" id=scrolly-left><h4>some ettiquete rules</h4></md-content></md-sidenav><md-content flex=flex layout=row class=md-whiteframe-z1 id=content><md-tabs layout=column layout-fill=true md-border-bottom=md-border-bottom md-selected=selectedStep md-dynamic-height=false><md-tab label=Network><md-content layout=column class=md-padding><div class=header-caption-wrapper><h2 class=md-display-1>Select a network</h2><md-divider></md-divider><p class=md-caption>A network is the organizing entity that groups related communities together. To ensure that your community is thriving and successful please select the most appropriate network for the content. For example: A community that makes jokes about programming should belong to a comdey network, not a programming network. You will have options to tag your community such that the most successful posts are syndicated to those ancilary networks as well. TL;DR - Select by genre, not the subject matter of the genre</p></div><div><md-radio-group ng-model=flowState.selectedNetwork><md-radio-button ng-repeat=\"network in page.networks\" ng-value=network class=md-primary>{{network.name}}</md-radio-button></md-radio-group></div><div layout=row><span flex=flex></span><md-button ng-disabled=!newCommunity.network_id ng-click=next() class=\"md-raised md-primary\">Next: Community Details</md-button></div></md-content></md-tab><md-tab label=Details><md-content layout=column class=md-padding><div class=header-caption-wrapper><h2 class=md-display-1>Community Details</h2><md-divider></md-divider><p class=md-caption>Reserve a name, type a description, add tags</p></div><div><md-input-container><label>Name</label><input ng-model=newCommunity.name><div ng-messages=true ng-hide=available><div ng-message=required ng-bind=\"newCommunity.name + ' is not available'\"></div></div></md-input-container><md-subheader ng-bind=slug() ng-disabled=true></md-subheader></div><div><md-input-container flex=flex><label>Description</label><textarea ng-model=newCommunity.description type=text></textarea></md-input-container></div><div layout=row><md-button ng-disabled=!newCommunity.network_id ng-click=back() class=\"md-raised md-primary\">Back: Change Network</md-button><span flex=flex></span><md-button ng-disabled=detailsValid() ng-click=next() class=\"md-raised md-primary\">Next: Rules</md-button></div></md-content></md-tab><md-tab label=Rules><md-content layout=column class=md-padding><div class=header-caption-wrapper><h2 class=md-display-1>Community Rules</h2><md-divider><p class=md-caption>Add community specific rules. These rules should be complimentary to the selected network's content policy. These rules should serve as guidelines for the community and should not simply be a duplication of site-wide or network-wide rules/policies (an example of a community rule could be \"no punchlines in the title\"). These rules will allow users to report posts for violating these rules, and also empower mods to cite one of these rules upon removal of any content.</p></md-divider><div layout=row><span flex=flex></span><md-button ng-click=createCommunityRule() class=\"md-raised md-primary\" id=rule-target><i class=\"fa fa-plus fa-fw\"></i>Create Rule</md-button></div><div><md-list><md-list-item ng-repeat=\"rule in newCommunity.rules_attributes\" class=md-3-line><div class=md-list-item-text><h3 ng-bind=rule.brief_description></h3><h4 ng-bind=rule.detailed_explanation></h4><p ng-if=rule.general>Applies To: The General Community</p><p ng-if=rule.posts>Applies To: Posts</p><p ng-if=rule.comments>Applies To: Comments</p><p ng-if=rule.discouraged>Severity: Discouraged</p><p ng-if=rule.removal>Severity: Removal</p><p ng-if=rule.ban>Severity: Ban</p></div></md-list-item></md-list></div></div><div layout=row><md-button ng-disabled=!newCommunity.network_id ng-click=back() class=\"md-raised md-primary\">Back: Details</md-button><span flex=flex></span><md-button ng-disabled=detailsValid() ng-click=next() class=\"md-raised md-primary\">Next: Customize</md-button></div></md-content></md-tab><md-tab label=Customize><md-content class=md-padding><fieldset class=standard><legend>Permitted Post Types</legend><div ng-repeat=\"format in flowState.selectedNetwork.permitted_formats_list\"><md-checkbox ng-model=newCommunity[format] aria-label=\"Checkbox 1\">{{format}}</md-checkbox></div></fieldset><fieldset class=standard><legend>Rating</legend><div><md-checkbox>SFW</md-checkbox><md-checkbox>NSFW</md-checkbox><md-checkbox>NSFL</md-checkbox></div></fieldset><div layout=row><md-button ng-disabled=!newCommunity.network_id ng-click=back() class=\"md-raised md-primary\">Back: Change Details</md-button><span flex=flex></span><md-button ng-disabled=detailsValid() ng-click=next() class=\"md-raised md-primary\">Next: Review</md-button></div></md-content></md-tab><md-tab label=Review><md-content class=md-padding><h1 class=md-display-2>Coming Soon</h1><div layout=row><md-button ng-disabled=!newCommunity.network_id ng-click=back() class=\"md-raised md-primary\">Back: Change Customization</md-button><span flex=flex></span><md-button ng-disabled=detailsValid() ng-click=submit() class=\"md-raised md-primary\">Create</md-button></div></md-content></md-tab></md-tabs></md-content><md-sidenav md-component-id=right md-is-locked-open=\"$mdMedia('gt-md')\" class=\"md-sidenav-right gray\"><div ng-switch=page.scope layout=column class=offset-toolbar id=scrolly-right><md-content ng-switch-when=submit></md-content></div></md-sidenav></md-content>");
  $templateCache.put("../app/partials/main/menu/link.html",
    "<md-button aria-label=Community style=\"width: 100%\" ui-sref=\"home.community({community: community.slug})\" ui-sref-active=md-primary><div flex=flex layout=row><span ng-bind=::community.name></span><span flex=flex></span></div></md-button>");
  $templateCache.put("../app/partials/main/menu/toggle.html",
    "<md-button aria-controls={{network.name}} aria-label=network aria-expanded={{isOpen()}} ng-click=toggle() ui-sref=\"home.network({network: network.slug})\" ui-sref-active=active class=\"md-button-toggle menu-toggle\"><div flex=flex layout=row class=content><span>{{::network.name}}</span><span flex=flex></span><span ng-show=network.active ng-click=editCommunity()><i class=\"icon ion-android-options\"></i></span></div></md-button><ul id={{::network.name}} class=menu-toggle-list><li ng-repeat=\"community in network.communities\"><menu-link network=network community=::community></menu-link></li></ul>");
  $templateCache.put("../app/partials/main/submit/discussion.html",
    "<md-content layout=column class=md-padding><div layout=column layout-padding=layout-padding><form ng-submit=submit()><div layout=row><md-input-container flex=flex><label>Title</label><input ng-model=newPost.title required></md-input-container></div><div layout=row><md-input-container flex=flex><label>Text</label><textarea ng-model=newPost.body type=text rows=10></textarea></md-input-container></div><div layout=column><md-subheader>Preview</md-subheader><div marked=newPost.body></div></div><div layout=row><span flex=flex></span><md-button type=submit class=\"md-raised md-priary\">Submit</md-button></div></form><div flex=flex ng-if=\"preview &amp;&amp; newPost.title.length &gt; 0\"><md-list id=posts><post post=preview post-index=$index layout=row layout-sm=column flex=flex id=post-{{post.id}} class=post></post></md-list></div></div></md-content>");
  $templateCache.put("../app/partials/main/submit/image.html",
    "<md-content class=md-padding><div layout=column layout-padding=layout-padding><form ng-submit=submit()><div layout=row><md-input-container flex=flex><label>Link</label><input ng-model=newPost.media_attributes[0].link required></md-input-container><div flex=flex ng-show=scraping id=submit-progress></div></div><div layout=row><md-input-container flex=flex><label>Title</label><input ng-model=newPost.title required></md-input-container></div><div layout=row><span flex=flex></span><md-button type=submit class=\"md-raised md-priary\">Submit</md-button></div></form><div flex=flex ng-if=\"preview &amp;&amp; preview.media[0] &amp;&amp; preview.media[0].link\"><md-list id=posts><post post=preview post-index=$index layout=row layout-sm=column flex=flex id=post-{{post.id}} class=post></post></md-list></div></div></md-content>");
  $templateCache.put("../app/partials/main/submit/music.html",
    "<md-content class=md-padding><div layout=column layout-padding=layout-padding style=\"width: 100%\"><md-autocomplete ng-model-options=\"{ debounce: 1000 }\" md-items=\"item in querySearch(query)\" md-min-length=2 md-search-text=query md-item-text=selectedItem.title md-search-text-change=searchTextChange(song.query) md-selected-item-change=selectedItemChange() md-selected-item=selectedItem placeholder=\"Type a song\"><md-item-template><span><img ng-src=\"{{item.thumbnail_link}}\"></span><span class=item-title><md-icon></md-icon><span ng-bind=item.title></span></span></md-item-template><md-not-found>Item not found</md-not-found></md-autocomplete><div layout=row ng-if=selectedItem><md-input-container flex=flex><label>Title</label><input ng-model=newPost.title required></md-input-container></div><div layout=row><span flex=flex></span><md-button ng-click=submit() class=\"md-raised md-priary\">Submit</md-button></div><div flex=flex ng-if=\"preview &amp;&amp; selectedItem\"><md-list id=posts><post post=preview post-index=$index layout=row layout-sm=column flex=flex id=post-{{post.id}} class=post></post></md-list></div></div></md-content>");
  $templateCache.put("../app/partials/main/submit/video.html",
    "<md-content layout=column class=md-padding><div layout=column layout-padding=layout-padding><form ng-submit=submit()><div layout=row><md-input-container flex=flex><label>Link</label><input ng-model=newPost.media_attributes[0].link required></md-input-container><div flex=flex ng-show=scraping id=submit-progress></div></div><div layout=row><md-input-container flex=flex><label>Title</label><input ng-model=newPost.title required></md-input-container></div><div layout=row><span flex=flex></span><md-button type=submit class=\"md-raised md-priary\">Submit</md-button></div></form><div flex=flex ng-if=\"preview &amp;&amp; newPost.media_attributes[0].link\"><md-subheader>Preview</md-subheader><div><post post=preview layout=row></post></div></div></div></md-content>");
  $templateCache.put("../app/partials/main/submit/webpage.html",
    "<md-content class=md-padding><div layout=column layout-padding=layout-padding><form ng-submit=submit()><div layout=row><md-input-container flex=flex><label>Link</label><input ng-model=newPost.media_attributes[0].link required></md-input-container><div flex=flex ng-show=scraping id=submit-progress></div></div><div layout=row><md-input-container flex=flex><label>Title</label><input ng-model=newPost.title required></md-input-container></div><div layout=row><span flex=flex></span><md-button type=submit class=\"md-raised md-priary\">Submit</md-button></div></form><div flex=flex ng-if=\"preview &amp;&amp; newPost.media_attributes[0].link\"><md-list id=posts><post post=preview post-index=$index layout=row layout-sm=column flex=flex id=post-{{post.id}} class=post></post></md-list></div></div></md-content>");
}]);
