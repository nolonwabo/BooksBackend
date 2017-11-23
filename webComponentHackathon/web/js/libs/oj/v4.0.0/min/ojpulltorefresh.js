/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","promise","ojs/ojcomponentcore"],function(a,g){a.Dd={};o_("PullToRefreshUtils",a.Dd,a);a.Dd.W0a=function(c,b,d){var e,f,h,k,l,m,p,t,r,n,q,s,u,v;a.Dd.Hwa(c);e=g(document.createElement("div")).addClass("oj-pulltorefresh-outer");a.Dd.XRa(c,e,b,d);f=g(document.createElement("div")).addClass("oj-pulltorefresh-panel");e.append(f);h=g(c);h.prepend(e);h.on("touchstart.pulltorefresh",function(b){null==g.data(f[0],"data-pullstart")&&0===h[0].scrollTop&&(a.Dd.Oja(b,f,d),r=f.find(".oj-pulltorefresh-icon"),
0<r.length&&(n=r.parent().outerHeight(!0)),d&&!isNaN(d.threshold)&&(l=parseInt(d.threshold,10)),l=isNaN(l)?f.outerHeight(!0):Math.max(0,Math.min(l,f.outerHeight(!0))),f.css("height",0),f.removeClass("oj-pulltorefresh-transition"),g.data(f[0],"data-pullstart",b.originalEvent.touches[0].clientY),g.data(f[0],"data-pullstart-horiz",b.originalEvent.touches[0].clientX),k=!0)}).on("touchmove.pulltorefresh",function(b){m=g.data(f[0],"data-pullstart");if(null!=m&&(p=b.originalEvent.touches[0].clientY-parseInt(m,
10),!(0>p)&&(b.preventDefault(),null==g.data(f[0],"data-closing"))))if(null!=g.data(f[0],"data-loading"))f.css("height",Math.max(p,l));else{if(k&&(k=!1,t=b.originalEvent.touches[0].clientX-parseInt(g.data(f[0],"data-pullstart-horiz"),10),Math.abs(t)>p))return;f.css("height",p);a.Dd.Vy(b,"pull",f,p);null!=r&&0<r.length&&(q=g.data(f[0],"data-lasticonclass"),null!=q&&r.removeClass(q),u=10*Math.round(p/l*10),100<=u?(v="oj-pulltorefresh-icon-full",s=a.va.R("oj-pullToRefresh.titleIconFull")):(v="oj-pulltorefresh-icon-"+
u+"-percent",s=a.va.R("oj-pullToRefresh.titleIcon"+u+"percent")),r.addClass(v),r.attr("title",s),g.data(f[0],"data-lasticonclass",v),a.Dd.cUa(f,p>n))}}).on("touchcancel.pulltorefresh",function(){a.Dd.Zo(f)}).on("touchend.pulltorefresh",function(d){m=g.data(f[0],"data-pullstart");null!=m&&null==g.data(f[0],"data-closing")&&(null!=g.data(f[0],"data-loading")?(p=g.data(f[0],"data-panelheight"),f.css("height",p)):f.outerHeight()<l?(f.addClass("oj-pulltorefresh-transition").css("height",0),a.Dd.Zo(f)):
a.Dd.Pja(d,c,f,b))})};o_("PullToRefreshUtils.setupPullToRefresh",a.Dd.W0a,a);a.Dd.Oja=function(c,b,d){var e,f;a.Dd.Vy(c,"pull",b,0);0==b.children().length&&(d&&(e=d.primaryText,f=d.secondaryText),a.Dd.LFa(b,e,f));b.prev().text(a.va.R("oj-pullToRefresh.ariaRefreshingLink"));b.css("height","auto");g.data(b[0],"data-panelheight",b.outerHeight())};a.Dd.Pja=function(c,b,d,e){var f,h,k,l;f=g.data(d[0],"data-panelheight");d.addClass("oj-pulltorefresh-transition").css("height",f);a.Dd.Vy(c,"release",d,f);
g.data(d[0],"data-loading",!0);h=d.find(".oj-pulltorefresh-icon");0<h.length&&(k=g.data(d[0],"data-lasticonclass"),null!=k&&h.removeClass(k),h.addClass("oj-pulltorefresh-icon-full"));h=a.Context.getContext(b).md().ad({description:"PullToRefresh:handleRelease"});g.data(g(b)[0],"data-pulltorefresh-busystate",h);e().then(function(){l=function(){a.Dd.Vy(c,"complete",d,f);a.Dd.Zo(d);d.off("transitionend",l);d.prev().text("");a.Dd.qf(b)};d.prev().text(a.va.R("oj-pullToRefresh.ariaRefreshCompleteLink"));
d.prev().prev().css("position","");g.data(d[0],"data-closing",!0);d.on("transitionend",l);d.css("height",0)},function(){l=function(){a.Dd.Zo(d);d.off("transitionend",l);d.prev().text("");a.Dd.qf(b)};d.prev().prev().css("position","");g.data(d[0],"data-closing",!0);d.on("transitionend",l);d.css("height",0)})};a.Dd.Hwa=function(c){g(c).children(".oj-pulltorefresh-outer").remove();g(c).off(".pulltorefresh");a.Dd.qf(c)};o_("PullToRefreshUtils.tearDownPullToRefresh",a.Dd.Hwa,a);a.Dd.qf=function(a){var b;
a=g(a)[0];if(b=g.data(a,"data-pulltorefresh-busystate"))b(null),g.removeData(a,"data-pulltorefresh-busystate")};a.Dd.Vy=function(a,b,d,e){b=g.Event("oj"+b);b.originalEvent=a;d.trigger(b,{content:d,distance:e})};a.Dd.LFa=function(a,b,d){var e,f;a.addClass("oj-pulltorefresh-content").attr("aria-hidden","true");e=g(document.createElement("div"));e.addClass("oj-icon oj-pulltorefresh-icon oj-pulltorefresh-icon-initial");f=g(document.createElement("div"));f.addClass("oj-pulltorefresh-icon-container");f.append(e);
g.data(a[0],"data-lasticonclass","oj-pulltorefresh-icon-initial");a.append(f);null!=b&&(b=g(document.createElement("div")).addClass("oj-pulltorefresh-primary-text").text(b),a.append(b),null!=d&&(d=g(document.createElement("div")).addClass("oj-pulltorefresh-secondary-text").text(d),a.append(d)))};a.Dd.cUa=function(a,b){var d,e;d=a.find(".oj-pulltorefresh-primary-text");e=a.find(".oj-pulltorefresh-secondary-text");b?(d&&d.show(),e&&e.show()):(d&&d.hide(),e&&e.hide())};a.Dd.XRa=function(c,b,d,e){var f,
h,k;f=g(document.createElement("a"));f.text(a.va.R("oj-pullToRefresh.ariaRefreshLink"));f.addClass("oj-helper-hidden-accessible").attr("href","#").focus(function(){f.css("position","static")}).blur(function(a){null!=a.relatedTarget&&f.css("position","")}).click(function(f){h=b.children().last();a.Dd.Oja(f,h,e);a.Dd.Pja(f,c,h,d);d()});k=g(document.createElement("div"));k.addClass("oj-helper-hidden-accessible").attr("aria-live","polite");b.append(f);b.append(k)};a.Dd.Zo=function(a){g.removeData(a[0],
"data-pullstart");g.removeData(a[0],"data-pullstart-horiz");g.removeData(a[0],"data-loading");g.removeData(a[0],"data-closing");0<a.find(".oj-pulltorefresh-icon").length&&a.empty()}});