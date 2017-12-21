;(function (){
    

    //---------------------------------------mainFunction------------------
    let Query = function(tag, context = document){
        //let elem;
        if(typeof tag == 'object'){
            return tag;//this[0];
        }
        //if(!context) context = document;
        //if(!tag) elem = document.body;
        if(!tag) tag = '*';
        let nodeList = context.querySelectorAll(tag);
        //------------------------if tag == elem
        let elem = [];
        for(let i = 0; i < nodeList.length; i++){
            elem.push(nodeList[i]);
        }

        //add atributes as props------------------------
        if(elem.length){
            for(let j = 0; j < elem.length; j++){
                for(let i = 0; i < elem[j].attributes.length; i++){
                    let name = elem[j].attributes[i].localName;
                    let value = elem[j].attributes[i].value;
                    eval(`elem[${j}]["${name}"] = '${value}';`);// this need for transfer this[attribute] to callback function (for example str:89)
                }
                //add index itself as prop------------------------------------------
                for(let k = 0; k < elem[j].parentElement.children.length; k++){
                    if(elem[j].parentElement.children[k] == elem[j]){
                        elem[j].index = k;
                    }
                }
                //-------------------------------------------------------------------    
            }
        }
        obj.__proto__ = elem.__proto__;
        elem.__proto__ = obj;
        return elem;
    };
    //---------------------------------------methods------------------
    let obj = {

        addClass: function(clases){
            for(let i = 0; i < this.length; i++){
                let finalclassval = clases;
                let classArr = [];
                while(typeof finalclassval == 'function'){
                    finalclassval = finalclassval.apply(this[i], [i, this[i].className]);
                }
                if(finalclassval) classArr = finalclassval.split(' ');
                for(let j = 0; j < classArr.length; j++){
                    this[i].classList.add(classArr[j]);
                }    
            }
            return this;
        },

        append: function(elem){
            for(let i = 0; i < this.length; i++){
                let finalElem = elem;
                if(typeof elem == 'function'){
                    finalElem = elem;
                    while(typeof finalElem == 'function'){
                        finalElem = finalElem.apply(this[i], [i, this[i].innerHTML]);
                    }
                }

                if(typeof finalElem == 'number'){// --- check here what will be inside element!!!!
                    finalElem = String(finalElem);
                }


                if(typeof finalElem == 'string'){
                    this[i].innerHTML += finalElem;
                }

                if(Array.isArray(finalElem)){
                    for(let j = 0; j < finalElem.length; j++){
                        this[i].appendChild(finalElem[j]);
                    }
                    //return this;
                }

                if(finalElem.nodeType){// DOM object (has a .nodeType property)
                    var toinsert = finalElem.cloneNode(true);// that current Node wouldn't been cut from current position
                    this[i].appendChild(toinsert);
                }
            }      
            return this;
        },

        html: function(text){
          for(let i = 0; i < this.length; i++){
            if(!text) return this[i].innerHTML;
            while(typeof text == 'function'){
                text = text.apply(this[i], [i, this[i].innerHTML]);
            }
            this[i].innerHTML = text;
          }  
            return this;
        },

        attr: function(attr, value){
            let stored = attr;
            if(!value && typeof attr != 'object')return this[0].getAttribute(stored);  
            
          for(let i = 0; i < this.length; i++){
            if(typeof attr == 'object'){
                for(let atribute in attr){
                        while(typeof attr[atribute] == 'function'){
                            attr[atribute] = attr[atribute].apply(this[i], [this[i].index, this[i].getAttribute(atribute)]);
                        }
                        this[i].setAttribute(atribute, attr[atribute]); 
                        eval(`this[${i}]["${atribute}"] = '${attr[atribute]}';`);// this need for transfer this[attribute] to callback function (for example str:89)
                        stored = atribute;
                }
                return this;
            }
            //-----------if attr not an object and value exissts--------------------------
            while(typeof value == 'function'){
                value = value.apply(this[i], [i, this[i].getAttribute(attr)]);
            }
                this[i].setAttribute(attr, value);
                eval(`this[${i}]["${attr}"] = '${value}';`);// this need for transfer this[attribute] to callback function (for example str:89)
          }
            return this;
            
        },

        children: function(tag){
            for(let i = 0; i < this.length; i++){ 
                return Query(tag, this[i]);
            }
        },

        css: function(param){
            for(let i = 0; i < this.length; i++){
                if(typeof param == 'object'){
                    for(str in param){
                        this[i].style[str] = param[str];
                    }
                }
                if(typeof param == 'string'){
                    return this[i].style[param];
                }
            }
        },

        data: function(atr, val){
            for(let i = 0; i < this.length; i++){
                if(!atr && !val) return this[i].dataset;
                if(typeof atr == 'object'){
                    for(let key in atr){
                        this[i].dataset[key] = atr[key];
                    }
                }
                if(typeof atr == 'string' && !val) return this[i].dataset[atr];
                if(atr && val) this[i].dataset[atr] = val;
            }    
            return this;
        },

        on: function(event, selector, callback){
            for(let i = 0; i < this.length; i++){
                if(!callback){
                    callback = selector;
                    this[i].addEventListener(event, callback);
                }    
                else{
                    totalcallback = function(e){
                    let elems = this.querySelectorAll(selector);
                        for(let k = 0; k < elems.length; k++){
                            if(e.target == elems[k])callback();
                        }
                    }
                    this[i].addEventListener(event, totalcallback);
                }
            }    
        return this;
        },

        one: function(event, handler){
            let superMega = function(elem, event, handler){
                handler();
                elem.removeEventListener(event, handler);
            }
            for(let i = 0; i < this.length; i++){

                this[i].addEventListener(event, superMega(this[i], event, handler));
            }    
        return this;
        },

        each: function(callback){
            for(let i = 0; i < this.length; i++){
                let check = callback.apply(this[i], [i, this[i]]);
                if(check === false) return this;
            }    
        return this;
        }
    }

    Query.prototype = obj;
    window.$ = Query;
})();
