(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48c2602e"],{"1dde":function(t,e,a){var r=a("d039"),n=a("b622"),o=a("2d00"),s=n("species");t.exports=function(t){return o>=51||!r((function(){var e=[],a=e.constructor={};return a[s]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},2259:function(t,e,a){"use strict";var r=a("a669"),n=a.n(r);n.a},"391d":function(t,e,a){},"40c8":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-main",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"demo-table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"商品名称"}},[a("span",[t._v(t._s(e.row.name))])]),a("el-form-item",{attrs:{label:"所属店铺"}},[a("span",[t._v(t._s(e.row.shop))])]),a("el-form-item",{attrs:{label:"商品 ID"}},[a("span",[t._v(t._s(e.row.id))])]),a("el-form-item",{attrs:{label:"店铺 ID"}},[a("span",[t._v(t._s(e.row.shopId))])]),a("el-form-item",{attrs:{label:"商品分类"}},[a("span",[t._v(t._s(e.row.category))])]),a("el-form-item",{attrs:{label:"店铺地址"}},[a("span",[t._v(t._s(e.row.address))])]),a("el-form-item",{attrs:{label:"商品描述"}},[a("span",[t._v(t._s(e.row.desc))])])],1)]}}])}),a("el-table-column",{attrs:{label:"商品 ID",sortable:"",prop:"id"}}),a("el-table-column",{attrs:{label:"商品名称",prop:"name"}}),a("el-table-column",{attrs:{label:"描述",prop:"desc"}})],1),a("el-footer",[t._v(" 这是底部 ")])],1)},n=[],o=(a("99af"),a("d81d"),a("d4ec")),s=a("bee2"),c=a("262e"),i=a("2caf"),l=a("9ab4"),d=a("1b40"),f=function(t){Object(c["a"])(a,t);var e=Object(i["a"])(a);function a(){var t;return Object(o["a"])(this,a),t=e.apply(this,arguments),t.tableData=[{id:"12987122",name:"好滋好味鸡蛋仔",category:"江浙小吃、小吃零食",desc:"荷兰优质淡奶，奶香浓而不腻",address:"上海市普陀区真北路",shop:"王小虎夫妻店",shopId:"10333"},{id:"12987123",name:"好滋好味鸡蛋仔",category:"江浙小吃、小吃零食",desc:"荷兰优质淡奶，奶香浓而不腻",address:"上海市普陀区真北路",shop:"王小虎夫妻店",shopId:"10333"},{id:"12987125",name:"好滋好味鸡蛋仔",category:"江浙小吃、小吃零食",desc:"荷兰优质淡奶，奶香浓而不腻",address:"上海市普陀区真北路",shop:"王小虎夫妻店",shopId:"10333"},{id:"12987126",name:"好滋好味鸡蛋仔",category:"江浙小吃、小吃零食",desc:"荷兰优质淡奶，奶香浓而不腻",address:"上海市普陀区真北路",shop:"王小虎夫妻店",shopId:"10333"}],t}return Object(s["a"])(a,[{key:"created",value:function(){this.tableData=this.tableData.concat(JSON.parse(JSON.stringify(this.tableData))).concat(JSON.parse(JSON.stringify(this.tableData))).concat(JSON.parse(JSON.stringify(this.tableData))).concat(JSON.parse(JSON.stringify(this.tableData))),this.tableData.map((function(t,e){return t.id+=e,t}))}}]),a}(d["l"]);f=Object(l["a"])([Object(d["a"])({name:"VueTable"})],f);var u=f,p=u,b=(a("2259"),a("8fed"),a("2877")),m=function(t){t.options.__source="src/tutorial/views/files/VueTable.vue"},h=m,v=Object(b["a"])(p,r,n,!1,null,"5835185e",null);"function"===typeof h&&h(v);e["default"]=v.exports},8418:function(t,e,a){"use strict";var r=a("c04e"),n=a("9bf2"),o=a("5c6c");t.exports=function(t,e,a){var s=r(e);s in t?n.f(t,s,o(0,a)):t[s]=a}},"8fed":function(t,e,a){"use strict";var r=a("391d"),n=a.n(r);n.a},"99af":function(t,e,a){"use strict";var r=a("23e7"),n=a("d039"),o=a("e8b5"),s=a("861d"),c=a("7b0b"),i=a("50c4"),l=a("8418"),d=a("65f0"),f=a("1dde"),u=a("b622"),p=a("2d00"),b=u("isConcatSpreadable"),m=9007199254740991,h="Maximum allowed index exceeded",v=p>=51||!n((function(){var t=[];return t[b]=!1,t.concat()[0]!==t})),_=f("concat"),y=function(t){if(!s(t))return!1;var e=t[b];return void 0!==e?!!e:o(t)},w=!v||!_;r({target:"Array",proto:!0,forced:w},{concat:function(t){var e,a,r,n,o,s=c(this),f=d(s,0),u=0;for(e=-1,r=arguments.length;e<r;e++)if(o=-1===e?s:arguments[e],y(o)){if(n=i(o.length),u+n>m)throw TypeError(h);for(a=0;a<n;a++,u++)a in o&&l(f,u,o[a])}else{if(u>=m)throw TypeError(h);l(f,u++,o)}return f.length=u,f}})},a669:function(t,e,a){},d81d:function(t,e,a){"use strict";var r=a("23e7"),n=a("b727").map,o=a("1dde"),s=a("ae40"),c=o("map"),i=s("map");r({target:"Array",proto:!0,forced:!c||!i},{map:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);