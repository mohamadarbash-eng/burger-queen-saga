(this.webpackJsonpburger=this.webpackJsonpburger||[]).push([[4],{104:function(e,r,t){e.exports={Order:"Order_Order__3kYZJ"}},106:function(e,r,t){"use strict";t.r(r);var n=t(4),a=t(5),i=t(7),o=t(6),s=t(8),u=t(0),c=t.n(u),p=t(104),d=t.n(p),l=function(e){var r=[];for(var t in e.ingredients)r.push({name:t,amount:e.ingredients[t]});var n=r.map((function(e){return c.a.createElement("span",{style:{textTransform:"capitalize",display:"inline-block",margin:"0 8px",border:"1px solid #ccc",padding:"5px"},key:e.name}," ",e.name," (",e.amount,")")}));return c.a.createElement("div",{className:d.a.Order},c.a.createElement("p",null,"Ingredients: ",n),c.a.createElement("p",null,"Price: ",c.a.createElement("strong",null,Number.parseFloat(e.price).toFixed(2))))},h=t(15),m=t(32),b=t(16),f=t(10),g=t(18),O=function(e){function r(){return Object(n.a)(this,r),Object(i.a)(this,Object(o.a)(r).apply(this,arguments))}return Object(s.a)(r,e),Object(a.a)(r,[{key:"componentDidMount",value:function(){this.props.token?this.props.onFetchOrders(this.props.token,this.props.userId):this.props.history.push("/auth")}},{key:"render",value:function(){var e=c.a.createElement(g.a,null);return this.props.loading||(e=this.props.orders.map((function(e){return c.a.createElement(l,{ingredients:e.ingredients,price:+e.totalPrice,key:e.id})}))),c.a.createElement("div",null,e)}}]),r}(u.Component);r.default=Object(f.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(r,t){return e(b.d(r,t))}}}))(Object(m.a)(O,h.a))}}]);
//# sourceMappingURL=4.6fc27b1a.chunk.js.map